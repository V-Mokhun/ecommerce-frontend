import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Benefits, Breadcrumbs, Container } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { ProductsCategories } from "./products-categories";

interface ProductsPageProps {}

export const ProductsPage = ({}: ProductsPageProps) => {
  const { category } = useParams();
  console.log(category);

  return (
    <section>
      <Container>
        <h1 className="sr-only">Catalog</h1>
        <Breadcrumbs
          links={[
            { label: "Products", route: `${PRODUCTS_ROUTE}/${category}` },
          ]}
        />
        <ProductsCategories />
        <Benefits noContainer />
      </Container>
    </section>
  );
};
