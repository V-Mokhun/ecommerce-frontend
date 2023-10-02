import logoImage from "@/assets/images/logo.png";
import { HOME_ROUTE } from "@/shared/consts";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/shared/ui";
import { MenuIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface HeaderMobileMenuProps {}

export const HeaderMobileMenu = ({}: HeaderMobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="w-6 h-6" />{" "}
      </SheetTrigger>
      <SheetContent side="left">
        <SheetClose />
        <NavLink className="pr-8 inline-block" to={HOME_ROUTE}>
          <img src={logoImage} alt="Logo" className="w-10 h-12" />
        </NavLink>
      </SheetContent>
    </Sheet>
  );
};
