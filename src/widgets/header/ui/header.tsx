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
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES_QUERY } from "@/shared/api";
import { useEffect, useState } from "react";
import { imageBuilder } from "@/shared/lib/image-builder";

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
    sublinks: [],
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
  const { isAuthenticated } = useAuth0();
  const { data } = useQuery(GET_CATEGORIES_QUERY);
  const [navLinks, setNavLinks] = useState(NAVIGATION_LINKS);

  const showCart = isMd || (!isMd && isAuthenticated);

  useEffect(() => {
    const productsLink = navLinks.find((link) => link.label === "Products");
    if (
      !data ||
      (productsLink &&
        productsLink.route === undefined &&
        productsLink.sublinks.length > 0)
    )
      return;

    const sublinks = data.allCategory
      .map((category) => ({
        label: category.name!,
        icon: imageBuilder(category.icon!).url(),
        route: `${PRODUCTS_ROUTE}/${category.slug?.current}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setNavLinks((prev) => {
      return prev.map((link) => {
        if (link.label === "Products") {
          return {
            ...link,
            sublinks,
          };
        }
        return link;
      });
    });
  }, [data, navLinks]);

  return (
    <header className="md:border-b border-solid border-b-primary-100 md:py-4 relative z-[51] md:z-10 bg-background">
      <Container>
        <div className="flex items-center justify-between gap-4 py-2 md:py-0">
          {isMd ? (
            <>
              <NavLink to={HOME_ROUTE}>
                <img src={logoImage} alt="Logo" className="w-14 h-16" />
              </NavLink>
              <HeaderNav links={navLinks} />
            </>
          ) : (
            <>
              <HeaderMobileMenu
                links={navLinks.filter((link) => link.label !== "Home")}
              />
              <NavLink className="text-primary-300 font-medium" to={HOME_ROUTE}>
                Ecommerce
              </NavLink>
            </>
          )}
          <div className="flex items-center gap-2">
            {isMd && <HeaderSearch isMd={isMd} />}
            {showCart && <HeaderCart />}
            <HeaderAuth />
          </div>
        </div>
        {!isMd && (
          <div className="flex items-center gap-2 mx-2">
            {!showCart && <HeaderCart />}
            <HeaderSearch isMd={isMd} />
          </div>
        )}
      </Container>
    </header>
  );
};
