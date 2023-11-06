import { GET_SINGLE_PRODUCT, SingleProduct } from "@/shared/api";
import {
  HOME_ROUTE,
  PRODUCTS_ROUTE,
  SINGLE_PRODUCT_ROUTE,
} from "@/shared/consts";
import { Breadcrumbs, Container, Skeleton } from "@/shared/ui";
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

  if (!data)
    return (
      <div className="pb-6">
        <Container>
          <div className="flex items-center overflow-x-auto whitespace-nowrap gap-6 pt-4 md:pt-6 pb-4 md:pb-8 lg:pb-10">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-60" />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-wrap lg:flex-nowrap mb-6 md:mb-8">
            <div className="relative flex-1 md:flex-[0_1_500px]">
              <Skeleton className="md:mb-6 md:max-w-lg flex w-full justify-center h-[200px] sm:h-[250px] md:h-[350px]" />
              <div className="md:flex gap-6 hidden">
                <Skeleton className="w-20 h-[70px]" />
                <Skeleton className="w-20 h-[70px]" />
                <Skeleton className="w-20 h-[70px]" />
                <Skeleton className="w-20 h-[70px]" />
                <Skeleton className="w-20 h-[70px]" />
              </div>
            </div>
            <div className="flex flex-[1_1_100%] flex-col lg:gap-6 order-3 lg:flex-auto lg:order-none">
              <div className="mb-3 lg:mb-0">
                <Skeleton className="mb-2 h-7 w-[90%]" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="mb-3 lg:mb-0">
                <Skeleton className="h-5 w-1/2" />
              </div>
              <div className="mb-3 lg:mb-0">
                <Skeleton className="h-5 w-1/3" />
              </div>
              <Skeleton className="h-5 w-1/4" />
            </div>
            <Skeleton className="hidden lg:block w-[240px] h-48" />
          </div>
        </Container>
      </div>
    );
  const [product] = data.allProduct as [SingleProduct];

  return (
    <section className="pb-6">
      <Container>
        <Breadcrumbs
          links={[
            {
              label: "Products",
              route: PRODUCTS_ROUTE,
            },
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
