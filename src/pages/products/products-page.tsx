import { HOME_ROUTE, PRODUCTS_ROUTE } from "@/shared/consts";
import { Benefits, Breadcrumbs, Container } from "@/shared/ui";
import { Navigate, useParams } from "react-router-dom";
import { ProductsCategories, ProductsContent } from "./ui";

interface ProductsPageProps {}

export const ProductsPage = ({}: ProductsPageProps) => {
  const { category } = useParams();

  if (!category) return <Navigate to={HOME_ROUTE} />;

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
        <ProductsContent category={category} />
        <Benefits noContainer />
      </Container>
    </section>
  );
};
