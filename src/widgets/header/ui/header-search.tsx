import { GET_PRODUCTS } from "@/shared/api";
import { useDebouncedValue } from "@/shared/lib/hooks";
import { Dialog, DialogContent, Icon } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { useState } from "react";

interface HeaderSearchProps {
  isMd: boolean;
}

export const HeaderSearch = ({ isMd }: HeaderSearchProps) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebouncedValue(searchInput);

  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      filters: {
        name: { matches: debouncedSearchInput },
      },
      limit: 15,
    },
  });
  const products = data?.products ?? [];

  return isMd ? (
    <>
      <button
        onClick={() => setIsModalActive(true)}
        type="button"
        className="p-2"
      >
        <Icon name="search" className="w-6 h-6" />
      </button>

      <Dialog
        open={isModalActive}
        onOpenChange={(open) => setIsModalActive(open)}
      >
        <DialogContent
          className="md:max-w-2xl lg:max-w-3xl"
          closeClassName="top-9 right-8 [&>svg]:md:w-6 [&>svg]:md:h-6"
        >
          <div className="relative max-w-md mb-2">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              className="w-full h-12 pl-4 pr-11 bg-background rounded-md font-light text-sm text-gray-800 placeholder:text-gray-800 border border-black focus:outline-none"
              placeholder="What can we help you to find ?"
            />
            <Icon
              name="search"
              className="w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
            />
          </div>
          <div className="">
            {debouncedSearchInput.trim().length === 0 && (
              <h3 className="text-2xl font-medium">
                Start typing to search for products
              </h3>
            )}
            {debouncedSearchInput.trim().length > 0 && loading && (
              <h3 className="text-2xl font-medium">Loading...</h3>
            )}
            {debouncedSearchInput.trim().length > 0 &&
              !loading &&
              products.length === 0 && (
                <h3 className="text-2xl font-medium">
                  Oops, we couldn't find any products matching your search. Try
                  a different keyword
                </h3>
              )}
            {debouncedSearchInput.trim().length > 0 && products.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {products.map((product) => (
                  <li key={product._id}>{product.name}</li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full h-10 pl-4 pr-11 bg-gray-200 rounded-md font-light text-xs placeholder:text-gray-600 text-primary focus:outline-none"
        placeholder="What can we help you to find ?"
      />
      <Icon
        name="search"
        className="w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
      />
    </div>
  );
};
