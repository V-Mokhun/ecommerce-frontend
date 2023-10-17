import { cn } from "@/shared/lib";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  offset: number;
  limit: number;
  onChange: (offset: number) => void;
}

export const Pagination = ({
  totalPages,
  limit,
  offset,
  onChange,
}: PaginationProps) => {
  const currentPage = offset / limit + 1;

  return (
    <ul className="flex justify-center items-center">
      <li className="inline-flex items-center justify-center">
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          type="button"
          aria-label="Previous page"
          onClick={() => onChange(offset - limit)}
        >
          <ArrowLeft className="w-6 h-6 text-black hover:text-primary transition-colors" />
        </button>
      </li>
      <li
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors",
          {
            "text-primary border-b-2 border-b-primary": currentPage === 1,
          }
        )}
      >
        <button type="button" onClick={() => onChange(0)}>
          1
        </button>
      </li>
      {currentPage === 1 && (
        <>
          {totalPages > 2 && (
            <li
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors"
              )}
            >
              <button type="button" onClick={() => onChange(offset + limit)}>
                2
              </button>
            </li>
          )}
          {totalPages > 3 && (
            <li
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors"
              )}
            >
              <button
                type="button"
                onClick={() => onChange(offset + limit * 2)}
              >
                ...
              </button>
            </li>
          )}
        </>
      )}

      {currentPage > 1 && (
        <>
          {currentPage - 2 > 1 && (
            <li
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors"
              )}
            >
              <button
                type="button"
                onClick={() => onChange(offset - limit * 2)}
              >
                ...
              </button>
            </li>
          )}
          {currentPage !== 2 && (
            <li
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors"
              )}
            >
              <button type="button" onClick={() => onChange(offset - limit)}>
                {currentPage - 1}
              </button>
            </li>
          )}
          {currentPage !== totalPages && (
            <li
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors text-primary border-b-2 border-b-primary"
              )}
            >
              {currentPage}
            </li>
          )}
          {currentPage + 1 < totalPages && (
            <li
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors"
              )}
            >
              <button type="button" onClick={() => onChange(offset + limit)}>
                {currentPage + 1}
              </button>
            </li>
          )}
          {currentPage + 2 < totalPages && (
            <li
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors"
              )}
            >
              <button
                type="button"
                onClick={() => onChange(offset + limit * 2)}
              >
                ...
              </button>
            </li>
          )}
        </>
      )}

      {totalPages > 1 && (
        <li
          className={cn(
            "inline-flex items-center justify-center w-10 h-10 font-light text-lg hover:text-primary transition-colors",
            {
              "text-primary border-b-2 border-b-primary":
                currentPage === totalPages,
            }
          )}
        >
          <button
            type="button"
            onClick={() => onChange((totalPages - 1) * limit)}
          >
            {totalPages}
          </button>
        </li>
      )}
      <li className="inline-flex items-center justify-center">
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          type="button"
          aria-label="Next page"
          onClick={() => onChange(offset + limit)}
        >
          <ArrowRight className="w-6 h-6 text-black hover:text-primary transition-colors" />
        </button>
      </li>
    </ul>
  );
};
