import { ACCOUNT_ROUTE } from "@/shared/consts";
import { Icon, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { User } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

interface HeaderUserProps {
  onLogout: () => void;
  user: User;
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
            <Icon name="profile-circle" className="w-6 h-6 shrink-0" />
            <div>
              <NavLink
                to={ACCOUNT_ROUTE}
                className="text-base md:text-lg font-light inline-block transition-colors hover:text-primary"
              >
                {user.name}
              </NavLink>
            </div>
          </li>
          {LIST_ITEMS.map(({ label, icon, href }) => (
            <li className="flex items-center gap-4">
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
