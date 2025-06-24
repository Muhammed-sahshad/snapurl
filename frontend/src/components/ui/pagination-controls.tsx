import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalResults,
  onPageChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalResults / 10);

  const getPages = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-10">
      <Pagination>
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={`transition-colors cursor-pointer ${
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-white/10 text-white border border-white/10 rounded-md px-3 py-1"
              }`}
            />
          </PaginationItem>

          {getPages().map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="px-2 text-gray-400">...</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm border transition-colors duration-200 cursor-pointer ${
                    currentPage === page
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold"
                      : "text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              className={`transition-colors cursor-pointer ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-white/10 text-white border border-white/10 rounded-md px-3 py-1"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
