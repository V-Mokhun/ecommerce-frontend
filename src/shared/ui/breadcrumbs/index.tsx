import { HOME_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "..";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  links: {
    label: string;
    route: string;
  }[];
}

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  const allLinks = [{ label: "Home", route: HOME_ROUTE }, ...links];

  return (
    <ul className="flex items-center whitespace-nowrap md:whitespace-normal overflow-x-auto md:flex-wrap md:gap-y-4 pt-4 md:pt-6 pb-4 md:pb-8 lg:pb-10">
      {allLinks.map((link, index, arr) => (
        <li className="inline-flex items-center" key={link.label}>
          <NavLink
            to={link.route}
            end
            className={({ isActive }) =>
              cn(
                "text-xs md:text-base lg:text-lg inline-block font-light hover:text-primary transition-colors pb-0.5",
                isActive && "text-primary border-b border-b-primary"
              )
            }
          >
            {link.label}
          </NavLink>
          {index !== arr.length - 1 && (
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
          )}
        </li>
      ))}
    </ul>
  );
};
