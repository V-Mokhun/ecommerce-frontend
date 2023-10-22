import { GET_SINGLE_PRODUCT, SingleProduct } from "@/shared/api";
import {
  HOME_ROUTE,
  PRODUCTS_ROUTE,
  SINGLE_PRODUCT_ROUTE,
} from "@/shared/consts";
import { Breadcrumbs, Button, Container, Icon } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";

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
        <div className="flex gap-6">
          <div className="flex-[0_1_500px]"></div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-base md:text-lg lg:text-xl font-medium mb-2">
                {product.name}
              </h1>
              <div className="py-2 px-1 bg-primary-500 text-xs font-medium text-white inline-flex items-center rounded-sm gap-0.5">
                <Icon className="text-white" name="star" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <ul className="flex items-center justify-between flex-wrap gap-2">
              {product.isInStock ? (
                <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
                  <Icon name="stock" className="w-5 h-5 text-primary" />
                  <span>In Stock</span>
                </li>
              ) : (
                <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
                  <Icon name="stock" className="w-5 h-5 text-destructive" />
                  <span>Unavailable</span>
                </li>
              )}
              {product.isGuaranteed && (
                <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
                  <Icon name="guaranteed" className="w-5 h-5 text-primary" />
                  <span>Guaranteed</span>
                </li>
              )}
              {product.isFreeDelivery && (
                <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
                  <Icon name="delivery" className="w-5 h-5" />
                  <span>Free Delivery</span>
                </li>
              )}
            </ul>
            <div className="flex items-center gap-6">
              <span>Select Color:</span>
              <ul className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <li
                    key={color.name}
                    className="inline-flex items-center gap-1"
                  >
                    <input
                      id={`color-${color.name}`}
                      className="sr-only peer"
                      type="radio"
                      name="color"
                    />
                    <label
                      className="cursor-pointer inline-flex gap-1 relative"
                      htmlFor={`color-${color.name}`}
                    >
                      <span
                        className="inline-block w-5 h-5 rounded-full"
                        style={{ backgroundColor: color.value.hex }}
                      />
                      <span className="md:hidden font-light text-sm">
                        {color.name}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-xs w-full p-6 bg-background shadow-md rounded-lg">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xl font-medium">
                  ${product.price.toFixed(2)}
                </span>
                {product.isOnSale && (
                  <div className="flex items-center gap-0.5">
                    <Icon name="discount" className="w-6 h-6" />
                    <span className="font-medium text-secondary">
                      -{product.salePercentage?.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
              {product.isOnSale && (
                <span className="text-sm font-light text-gray-600">
                  last price: ${product.oldPrice?.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Button>Buy Now</Button>
              <Button variant="outline">Add to Cart</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
