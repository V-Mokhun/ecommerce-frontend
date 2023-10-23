import { ProductDetail } from "@/shared/api";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProductDetailsProps {
  details: ProductDetail[];
}

const DETAILS_TO_SHOW = 6;

export const ProductDetails = ({
  details: initialDetails,
}: ProductDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const details = isExpanded
    ? initialDetails
    : initialDetails.slice(0, DETAILS_TO_SHOW);

  return (
    <div id="details">
      <h2 className="text-sm font-medium md:text-lg lg:text-xl mb-4">
        Technical Details
      </h2>
      <ul className="flex flex-col md:gap-1">
        {details.map((detail, idx) => (
          <li
            className={cn(
              "flex items-center justify-between gap-2 p-2 md:px-3 md:py-4 rounded-lg text-xs md:text-sm lg:text-base",
              idx % 2 !== 0 && "bg-gray-50"
            )}
          >
            <span className="text-gray-600 flex-[0_0_30%] font-light md:font-medium">
              {detail.name}
            </span>
            <p className="font-light flex-auto text-gray-900">{detail.value}</p>
          </li>
        ))}
      </ul>
      {initialDetails.length > DETAILS_TO_SHOW && (
        <Button variant="text" onClick={() => setIsExpanded((prev) => !prev)}>
          <span>{isExpanded ? "Show less" : "Show more"}</span>
          <ChevronDown
            className={cn(
              "w-6 h-6 ml-1 transition-transform",
              isExpanded && "transform rotate-180"
            )}
          />
        </Button>
      )}
    </div>
  );
};
