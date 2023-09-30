import { Icon, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

interface HeaderCartProps {}

export const HeaderCart = ({}: HeaderCartProps) => {
  return (
    <Popover>
      <PopoverTrigger className="p-2 relative">
        <Icon name="cart" className="w-6 h-6" />
        <span className="absolute inline-block w-5 h-5 bg-primary rounded-full right-0.5 bottom-0 text-white font-light">
          3
        </span>
      </PopoverTrigger>
      <PopoverContent sideOffset={28.5}>Cart</PopoverContent>
    </Popover>
  );
};
