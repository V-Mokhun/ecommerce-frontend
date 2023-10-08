import { cn } from "@/shared/lib";
import { HTMLAttributes } from "react";
import { Icon } from "..";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderArrowProps extends HTMLAttributes<HTMLButtonElement> {
  light?: boolean;
  right?: boolean;
  disabled?: boolean;
}

export const SliderArrow = ({
  light,
  right,
  className,
  disabled,
  ...props
}: SliderArrowProps) => {
  return (
    <button
      aria-label={right ? "Next Slide" : "Previous Slide"}
      type="button"
      disabled={disabled}
      className={cn(
        "w-8 h-8 rounded-full transition-colors inline-flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 z-10 disabled:opacity-50 disabled:cursor-not-allowed",
        light
          ? "bg-gray-100 hover:bg-gray-300"
          : "bg-gray-500 hover:bg-gray-600",
        right ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {right ? (
        <ChevronRight
          className={cn("", light ? "text-primary-500" : "text-white")}
        />
      ) : (
        <ChevronLeft
          className={cn("", light ? "text-primary-500" : "text-white")}
        />
      )}
    </button>
  );
};
