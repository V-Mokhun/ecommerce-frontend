import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Benefits, Breadcrumbs, Container } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { ProductsCategories, ProductsContent } from "./ui";

interface ProductsPageProps {}

export const ProductsPage = ({}: ProductsPageProps) => {
  const { category } = useParams();
  const links = [{ label: "Products", route: `${PRODUCTS_ROUTE}` }];
  if (category)
    links.push({
      label: category
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
      route: `${PRODUCTS_ROUTE}/${category}`,
    });

  return (
    <section>
      <Container>
        <h1 className="sr-only">Catalog</h1>
        <Breadcrumbs links={links} />
        <ProductsCategories />
        <ProductsContent category={category} />
        <Benefits noContainer />
      </Container>
    </section>
  );
};
