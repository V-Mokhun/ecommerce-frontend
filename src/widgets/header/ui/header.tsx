import {
  BLOG_ROUTE,
  CONTACT_ROUTE,
  FAQ_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE,
} from "@/shared/consts";
import { Container } from "@/shared/ui";
import { NavLink } from "react-router-dom";
import logoImage from "@/assets/images/logo.png";
import mobileIcon from "@/assets/icons/mobile.svg";
import { HeaderNav } from "./header-nav";
import { HeaderSearch } from "./header-search";
import { HeaderCart } from "./header-cart";
import { HeaderAuth } from "./header-auth";
import { useMediaQuery } from "@/shared/lib/hooks";
import { HeaderMobileMenu } from "./header-mobile-menu";

export type NavigationLink =
  | { label: string; route: string }
  | {
      label: string;
      route: undefined;
      sublinks: { label: string; icon: string; route: string }[];
    };

const NAVIGATION_LINKS: NavigationLink[] = [
  {
    label: "Home",
    route: HOME_ROUTE,
  },
  {
    label: "Products",
    route: undefined,
    sublinks: [
      {
        label: "Mobile Phones",
        icon: mobileIcon,
        route: PRODUCTS_ROUTE,
      },
      {
        label: "Laptops & Computers ",
        icon: mobileIcon,
        route: PRODUCTS_ROUTE,
      },
      {
        label: "Wearables",
        icon: mobileIcon,
        route: PRODUCTS_ROUTE,
      },
      {
        label: "Networking",
        icon: mobileIcon,
        route: PRODUCTS_ROUTE,
      },
    ],
  },
  {
    label: "Blog",
    route: BLOG_ROUTE,
  },
  {
    label: "FAQ",
    route: FAQ_ROUTE,
  },
  {
    label: "Contact Us",
    route: CONTACT_ROUTE,
  },
];

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const isMd = useMediaQuery("(min-width: 768px)");

  return (
    <header className="border-b border-solid border-b-primary-100 py-4">
      <Container>
        <div className="flex items-center justify-between gap-4">
          {isMd ? (
            <>
              <NavLink to={HOME_ROUTE}>
                <img src={logoImage} alt="Logo" className="w-14 h-16" />
              </NavLink>
              <HeaderNav links={NAVIGATION_LINKS} />
            </>
          ) : (
            <>
              <HeaderMobileMenu
                links={NAVIGATION_LINKS.filter((link) => link.label !== "Home")}
              />
            </>
          )}
          <div className="flex items-center gap-2">
            <HeaderSearch />
            <HeaderCart />
            <HeaderAuth />
          </div>
        </div>
      </Container>
    </header>
  );
};
