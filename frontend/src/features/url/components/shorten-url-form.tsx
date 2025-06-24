import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";
import { createShortUrl } from "../urlThunk";
import { toast } from "sonner";

const urlSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
});

type UrlFormData = z.infer<typeof urlSchema>;

export const ShortenUrlForm = () => {
  const [isShortening, setIsShortening] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
  });

  const handleShortenUrl = async (data: UrlFormData) => {
    setIsShortening(true);
    try {
      const result = await dispatch(createShortUrl(data.originalUrl));
      if (createShortUrl.fulfilled.match(result)) {
        reset();
        toast.success("Done! Your short link is ready.");
      }
    } finally {
      setIsShortening(false);
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm sm:m-10 m-3">
      <CardHeader>
        <CardTitle className="text-white flex items-center text-xl font-bold">
          <Plus className="h-5 w-5 mr-2 text-amber-400" />
          Create Short Link
        </CardTitle>
        <CardDescription className="text-gray-400">Transform your long URLs into elegant short links</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleShortenUrl)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl" className="text-white">
              Original URL
            </Label>
            <div className="flex flex-col sm:flex-row gap-5">
              <Input
                id="originalUrl"
                type="text"
                placeholder="https://example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-amber-400 flex-1"
                {...register("originalUrl")}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold whitespace-nowrap"
                disabled={isShortening || isSubmitting}
              >
                {isShortening || isSubmitting ? "Creating..." : "Shorten URL"}
              </Button>
            </div>
            {errors.originalUrl && <p className="text-sm text-red-500">{errors.originalUrl.message}</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
