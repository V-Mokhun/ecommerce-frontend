import { GET_SINGLE_PRODUCT, SingleProduct } from "@/shared/api";
import {
  HOME_ROUTE,
  PRODUCTS_ROUTE,
  SINGLE_PRODUCT_ROUTE,
} from "@/shared/consts";
import { Breadcrumbs, Container } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { ProductContent } from "./ui";

interface ProductPageProps {}

export const ProductPage = ({}: ProductPageProps) => {
  const { slug } = useParams();
  const { data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { slug: slug || "" },
  });

  if (!slug) return <Navigate to={HOME_ROUTE} />;

  if (!data) return null;
  const [product] = data.allProduct as [SingleProduct];

  return (
    <section>
      <Container>
        <Breadcrumbs
          links={[
            {
              label: product.category.name,
              route: `${PRODUCTS_ROUTE}/${product.category.slug.current}`,
            },
            {
              label: product.name,
              route: `${SINGLE_PRODUCT_ROUTE}/${product.slug.current}`,
            },
          ]}
        />
        <ProductContent product={product} />
      </Container>
    </section>
  );
};
