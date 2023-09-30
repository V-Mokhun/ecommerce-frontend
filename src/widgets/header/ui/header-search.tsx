import { Icon } from "@/shared/ui";

interface HeaderSearchProps {}

export const HeaderSearch = ({}: HeaderSearchProps) => {
  return (
    <button type="button" className="p-2">
      <Icon name="search" className="w-6 h-6" />
    </button>
  );
};
