import { ACCOUNT_ROUTE } from "@/shared/consts";
import { Icon, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { NavLink } from "react-router-dom";

interface HeaderUserProps {
  onLogout: () => void;
  user: any;
}

const LIST_ITEMS = [
  {
    label: "Orders",
    icon: <Icon name="bag" className="w-6 h-6" />,
    // href:
  },
];

export const HeaderUser = ({ onLogout, user }: HeaderUserProps) => {
  console.log("user", user);

  return (
    <Popover>
      <PopoverTrigger className="p-2">
        <Icon name="user" className="w-6 h-6" />
      </PopoverTrigger>
      <PopoverContent sideOffset={28.5}>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <Icon name="profile-circle" className="w-6 h-6" />
            <div>
              <NavLink to={ACCOUNT_ROUTE} className="text-base md:text-lg font-light ">
                Jimmy Smith
              </NavLink>
              <span className="text-sm">Jimmy.smith1996@gmail.com</span>
            </div>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
