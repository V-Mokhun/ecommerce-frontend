import { useMediaQuery } from "@/shared/lib/hooks";
import { Icon } from "@/shared/ui";

interface HeaderSearchProps {}

export const HeaderSearch = ({}: HeaderSearchProps) => {
  const isMd = useMediaQuery("(min-width: 768px)");

  return isMd ? (
    <button type="button" className="p-2">
      <Icon name="search" className="w-6 h-6" />
    </button>
  ) : (
    <div className="relative flex-1 mr-2">
      <input
        type="text"
        className="w-full h-10 pl-4 pr-11 bg-gray-200 rounded-md font-light text-xs placeholder:text-gray-600 text-primary focus:outline-none"
        placeholder="What can we help you to find ?"
      />
      <Icon
        name="search"
        className="w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
      />
    </div>
  );
};
