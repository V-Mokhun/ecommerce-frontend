import { ProductCard } from "@/entities";
import { GET_NEW_PRODUCTS, Product } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Container, Section, SectionHeading } from "@/shared/ui";
import { useQuery } from "@apollo/client";

interface NewProductsProps {}

export const NewProducts = ({}: NewProductsProps) => {
  const { data } = useQuery(GET_NEW_PRODUCTS);

  return (
    <Section>
      <Container>
        <SectionHeading viewAllLink={`${PRODUCTS_ROUTE}/?sort=isNew.desc`}>
          New Products
        </SectionHeading>
        <ul className="flex flex-wrap gap-4 md:gap-6 mt-2 md:mt-4">
          {data?.allProduct.map((product) => (
            <li
              className="flex-[0_1_calc(50%-8px)] md:flex-[0_1_calc(25%-18px)]"
              key={product._id}
            >
              <ProductCard product={product as Product} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
