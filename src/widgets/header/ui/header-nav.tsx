import { NavLink } from "react-router-dom";
import { NavigationLink } from "./header";
import { cn } from "@/shared/lib";

interface HeaderNavProps {
  links: NavigationLink[];
}

const getLinkClasses = (isActive: boolean) =>
  cn(
    "inline-block p-2 font-light hover:text-primary transition-colors border-b border-solid border-b-transparent hover:border-b-primary-100",
    isActive && "border-b-primary"
  );

export const HeaderNav = ({ links }: HeaderNavProps) => {
  return (
    <nav className="flex-1">
      <ul className="flex items-center gap-6">
        {links.map((link) => {
          if (link.route) {
            return (
              <li key={link.label}>
                <NavLink
                  className={({ isActive }) => getLinkClasses(isActive)}
                  to={link.route}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          } else {
            return <li key={link.label}></li>;
          }
        })}
      </ul>
    </nav>
  );
};
