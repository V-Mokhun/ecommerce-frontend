import { ACCOUNT_ROUTE } from "@/shared/consts";
import { Icon, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { User } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

interface HeaderUserProps {
  onLogout: () => void;
  user: User;
  isMd: boolean;
}

const LIST_ITEMS = [
  {
    label: "Orders",
    icon: <Icon name="bag" className="w-6 h-6" />,
    href: ACCOUNT_ROUTE,
  },
  {
    label: "Wishlist",
    icon: <Icon name="heart" className="w-6 h-6" />,
    href: ACCOUNT_ROUTE,
  },
  {
    label: "Payments",
    icon: <Icon name="dollar-circle" className="w-6 h-6" />,
    href: ACCOUNT_ROUTE,
  },
];

export const HeaderUser = ({ onLogout, user, isMd }: HeaderUserProps) => {
  return (
    <Popover>
      <PopoverTrigger className="p-2">
        <Icon name="user" className="w-6 h-6" />
      </PopoverTrigger>
      <PopoverContent
        className="w-screen h-[100dvh] md:h-auto md:w-72 pt-20 md:pt-4"
        sideOffset={isMd ? 28.5 : 0}
      >
        <ul className="space-y-6">
          <li className="flex items-center gap-4">
            <Icon name="profile-circle" className="w-6 h-6 shrink-0" />
            <NavLink
              to={ACCOUNT_ROUTE}
              className="text-base md:text-lg font-light inline-block transition-colors hover:text-primary"
            >
              {user.name}
            </NavLink>
          </li>
          {LIST_ITEMS.map(({ label, icon, href }) => (
            <li key={label} className="flex items-center gap-4">
              {icon}{" "}
              <NavLink
                to={href}
                className="text-base md:text-lg font-light transition-colors hover:text-primary"
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="flex items-center gap-4">
            <Icon name="logout" className="w-6 h-6" />
            <button
              onClick={onLogout}
              className="text-base md:text-lg font-light transition-colors hover:text-primary"
            >
              Log out
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
