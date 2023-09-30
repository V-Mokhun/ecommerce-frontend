import { cn } from "@/shared/lib";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const Icon = ({ className, name, ...props }: IconProps) => {
  return (
    <svg viewBox="0 0 16 16" className={cn("w-4 h-4", className)} {...props}>
      <use xlinkHref={`/sprites/sprite.svg#${name}`} />
    </svg>
  );
};
