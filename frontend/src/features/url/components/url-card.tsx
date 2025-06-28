import { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type UrlCardProps = {
  original: string;
  short: string;
};

export const UrlCard = ({ original, short }: UrlCardProps) => {
  const [copied, setCopied] = useState(false);
  const shortUrl = `${import.meta.env.VITE_API_BASE_URL}/urls/s/${short}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
      <div className="relative bg-white/10 text-white rounded-lg p-4 border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="absolute top-2 right-2 z-10">
          <Popover open={copied}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy();
                }}
                aria-label="Copy shortened URL"
                className="h-5 w-5 text-white cursor-pointer bg-transparent hover:bg-transparent hover:scale-115"
              >
                {copied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              side="top"
              className="w-auto px-3 py-1.5 text-[12px] rounded-md text-white bg-white/20 backdrop-blur-xs border border-white/10 shadow-lg"
            >
              Copied to clipboard!
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 h-full">
          <div className="flex-1">
            <p className="text-sm text-gray-400">Original URL</p>
            <p className="break-words">{original}</p>
          </div>

          <div className="flex flex-col justify-end sm:items-end mt-2 mr-5 sm:mt-0">
            <p className="text-sm bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent hover:from-amber-500 hover:to-orange-600">
              Short code: <span className="font-bold">{short}</span>
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};
