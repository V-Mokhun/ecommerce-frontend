import logoImage from "@/assets/images/logo.png";
import { HOME_ROUTE } from "@/shared/consts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/shared/ui";
import { MenuIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavigationLink } from "./header";
import { cn } from "@/shared/lib";

interface HeaderMobileMenuProps {
  links: NavigationLink[];
}

export const HeaderMobileMenu = ({ links }: HeaderMobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="inline-block w-10 h-8 py-1 px-2" />
      </SheetTrigger>
      <SheetContent overlayClassName="z-[60]" className="z-[60]" side="left">
        <SheetClose />
        <NavLink className="pr-8 inline-block mb-5" to={HOME_ROUTE}>
          <img src={logoImage} alt="Logo" className="w-10 h-12" />
        </NavLink>
        <ul className="space-y-3 list-none">
          {links.map((link) => {
            if (link.route !== undefined) {
              return (
                <li className="px-3 py-1" key={link.label}>
                  <NavLink
                    className={({ isActive }) =>
                      cn("font-light", isActive && "text-primary")
                    }
                    to={link.route}
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            } else {
              return (
                <Accordion
                  key={link.label}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value="products">
                    <AccordionTrigger className="px-3 data-[state=open]:text-primary [&[data-state=open]>svg]:text-primary">
                      {link.label}
                    </AccordionTrigger>
                    <AccordionContent className="pl-3">
                      <ul>
                        {link.sublinks.map((sublink) => (
                          <li
                            className="flex items-center gap-2 px-3 py-2"
                            key={sublink.label}
                          >
                            <img
                              src={sublink.icon}
                              alt={sublink.label}
                              className="w-4 h-4"
                            />
                            <NavLink
                              className={({ isActive }) =>
                                cn(
                                  "inline-block font-light hover:text-primary transition-colors text-sm",
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
                    </AccordionContent>
                  </AccordionItem>{" "}
                </Accordion>
              );
            }
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
