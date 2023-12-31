import logoImage from "@/assets/images/logo.png";
import { GET_CATEGORIES } from "@/shared/api";
import {
  BLOG_ROUTE,
  CONTACT_ROUTE,
  FAQ_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE,
} from "@/shared/consts";
import { useMediaQuery } from "@/shared/lib/hooks";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Container } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HeaderCart } from "./header-cart";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { HeaderNav } from "./header-nav";
import { HeaderSearch } from "./header-search";

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
  const { data } = useQuery(GET_CATEGORIES);
  const [navLinks, setNavLinks] = useState(NAVIGATION_LINKS);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 md:border-b border-solid border-b-primary-100 md:py-4 z-[51] md:z-[21] bg-background">
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
              <NavLink
                onClick={() => {
                  setIsSearchModalOpen(false);
                  document.body.classList.remove("overflow-hidden");
                }}
                className="text-primary-300 font-medium"
                to={HOME_ROUTE}
              >
                TechSphere
              </NavLink>
            </>
          )}
          <div className="flex items-center gap-2">
            {isMd && (
              <HeaderSearch
                isOpen={isSearchModalOpen}
                setIsOpen={(open) => setIsSearchModalOpen(open)}
                isMd={true}
              />
            )}
            <HeaderCart />
          </div>
        </div>
        {!isMd && (
          <div className="flex items-center gap-2 mx-2 pb-2">
            <HeaderSearch
              isOpen={isSearchModalOpen}
              setIsOpen={(open) => setIsSearchModalOpen(open)}
              isMd={false}
            />
          </div>
        )}
      </Container>
    </header>
  );
};
