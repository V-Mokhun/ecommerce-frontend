import { cn } from "@/shared/lib";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/shared/ui";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavigationLink } from "./header";

interface HeaderNavProps {
  links: NavigationLink[];
}

export const HeaderNav = ({ links }: HeaderNavProps) => {
  return (
    <nav className="flex-1">
      <Menubar className="gap-6 justify-center">
        {links.map((link) => {
          if (link.route !== undefined) {
            return (
              <li key={link.label}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "inline-block p-2 font-light hover:text-primary transition-colors border-b border-solid border-b-transparent hover:border-b-primary-100",
                      isActive && "text-primary border-b-primary"
                    )
                  }
                  to={link.route}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          } else {
            return (
              <MenubarMenu key={link.label}>
                <MenubarTrigger className="group">
                  {link.label}{" "}
                  <ChevronDown className="transition-transform group-data-[state=open]:-rotate-180 ml-1" />
                </MenubarTrigger>
                <MenubarContent>
                  {link.sublinks.map((sublink) => (
                    <MenubarItem
                      className="flex items-center gap-2"
                      key={sublink.label}
                    >
                      <img
                        src={sublink.icon}
                        alt={sublink.label}
                        className="w-6 h-6"
                      />
                      <NavLink
                        className={({ isActive }) =>
                          cn(
                            "inline-block font-light hover:text-primary transition-colors",
                            isActive && "text-primary"
                          )
                        }
                        to={sublink.route}
                      >
                        {sublink.label}
                      </NavLink>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            );
          }
        })}
      </Menubar>
    </nav>
  );
};
