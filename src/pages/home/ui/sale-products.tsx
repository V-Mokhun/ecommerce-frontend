import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Container, Section } from "@/shared/ui";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SaleProductsProps {}

export const SaleProducts = ({}: SaleProductsProps) => {
	

  return (
    <Section>
      <Container>
        <div className="py-4 md:py-8 lg:py-12 pl-3 md:pl-5 bg-primary-500 flex items-stretch text-white">
          <div className="text-center md:py-4 mr-4 xs:mr-8 md:mr-14 lg:mr-20">
            <h3 className="font-medium text-base md:text-xl lg:text-2xl mb-2">
              Products On Sale
            </h3>
            <p className="font-light text-sm md:text-base lg:text-xl mb-auto">
              Show Now!
            </p>
            <NavLink
              className="inline-flex items-center gap-1 mt-4 hover:underline"
              to={PRODUCTS_ROUTE}
            >
              <span>View all</span>
              <ChevronRight className="w-6 h-6" />
            </NavLink>
          </div>
          <div className="flex-1 min-w-0"></div>
        </div>
      </Container>
    </Section>
  );
};
