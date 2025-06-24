import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Link2 } from "lucide-react";
import { UrlCard } from "./url-card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchUserUrls } from "../urlThunk";
import PaginationControls from "@/components/ui/pagination-controls";

export const UrlList = () => {
  const dispatch = useAppDispatch();
  const { urls, meta, loading } = useAppSelector((state) => state.urls);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchUserUrls({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!urls.length) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-md sm:mx-10 mx-3 mb-10 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <FolderOpen className="h-10 w-10 text-amber-400" />
          </div>
          <CardTitle className="text-white text-xl font-semibold">
            No Shortened Links Yet
          </CardTitle>
          <CardDescription className="text-gray-400 max-w-md mx-auto">
            Start creating trackable short links with a single click.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-500">
            Once you shorten a link, it will be saved here for easy reuse and insight tracking.
          </p>
        </CardContent>
      </Card>
    );
  }

return (
  <div className="relative">
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm sm:mx-10 mx-3 mb-10">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Link2 className="h-5 w-5 mr-2 text-amber-400" />
          Shortened Links
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your recently shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        {urls.map((url, index) => (
          <UrlCard key={index} original={url.originalUrl} short={url.shortCode} />
        ))}

        {meta && (
          <PaginationControls
            currentPage={meta.currentPage}
            totalResults={meta.totalItems}
            onPageChange={handlePageChange}
          />
        )}
      </CardContent>
    </Card>

    {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-10 rounded-md sm:mx-10 mx-3 ">
        <p className="text-white font-medium">Loading...</p>
      </div>
    )}
  </div>
);

};
