import { cn } from "@/shared/lib";
import { Menubar, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationLink } from "./header";
import { PRODUCTS_ROUTE } from "@/shared/consts";

interface HeaderNavProps {
  links: NavigationLink[];
}

export const HeaderNav = ({ links }: HeaderNavProps) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

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
                      "inline-block px-1 py-2 lg:px-2 font-light hover:text-primary transition-colors border-b border-solid border-b-transparent hover:border-b-primary-100",
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
              <Popover
                open={open}
                onOpenChange={(op) => setOpen(op)}
                key={link.label}
              >
                <PopoverTrigger
                  className={cn(
                    "group flex p-2 select-none items-center text-base font-light hover:text-primary transition-colors border-b border-solid border-b-transparent hover:border-b-primary-100 outline-none data-[state=open]:text-primary data-[state=open]:border-b-primary",
                    pathname.includes(PRODUCTS_ROUTE) && "text-primary"
                  )}
                >
                  {link.label}{" "}
                  <ChevronDown className="transition-transform group-data-[state=open]:-rotate-180 ml-1" />
                </PopoverTrigger>
                <PopoverContent asChild sideOffset={28.5}>
                  <ul className="min-w-[12rem] w-auto overflow-hidden rounded-t-none rounded-b-md border bg-popover px-4 py-6 space-y-4">
                    {link.sublinks.map((sublink) => (
                      <li
                        onClick={() => setOpen(false)}
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
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            );
          }
        })}
      </Menubar>
    </nav>
  );
};
