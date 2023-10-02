import { Icon, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

interface HeaderCartProps {}

export const HeaderCart = ({}: HeaderCartProps) => {
  return (
    <Popover>
      <PopoverTrigger className="p-2 relative">
        <Icon name="cart" className="w-6 h-6" />
        <span className="text-xs md:text-base absolute inline-flex justify-center items-center w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full right-0.5 bottom-0 text-white font-light">
          3
        </span>
      </PopoverTrigger>
      <PopoverContent className="md:w-[512px]" sideOffset={28.5}>
        Cart
      </PopoverContent>
    </Popover>
  );
};
