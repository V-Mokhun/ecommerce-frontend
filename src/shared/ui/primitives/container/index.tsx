import { cn } from "@/shared/lib";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = ({
  className,
  children,
  ...restProps
}: ContainerProps) => {
  return (
    <div className={cn("px-4 max-w-container mx-auto")} {...restProps}>
      {children}
    </div>
  );
};
