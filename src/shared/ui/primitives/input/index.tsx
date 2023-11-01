import * as React from "react";

import { cn } from "@/shared/lib";
import { Icon } from "..";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  iconName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onClear, iconName, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex peer h-10 md:h-12 w-full rounded-md border border-gray-400 hover:border-gray-600 hover:text-gray-600 hover:placeholder:text-gray-600 focus:border-primary focus:text-primary focus:placeholder:text-primary transition-colors bg-background p-2.5 pr-8 md:p-3 md:pr-10 text-sm md:text-base text-gray-600 font-light file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:placeholder:text-destructive",
            iconName && "pl-8 md:pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          onClick={onClear}
          className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 peer-hover:text-gray-600 peer-focus:text-primary peer-aria-[invalid=true]:text-destructive"
        >
          <Icon
            name="close-circle"
            className={cn(
              "w-5 h-5 md:w-6 md:h-6 transition-colors text-inherit"
            )}
          />
        </button>
        {iconName && (
          <Icon
            name={iconName}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400 peer-hover:text-gray-600 peer-focus:text-primary transition-colors"
            )}
          />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
