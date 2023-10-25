import { ProductCard } from "@/entities";
import { GET_PRODUCTS, Product } from "@/shared/api";
import { useDebouncedValue } from "@/shared/lib/hooks";
import {
  Dialog,
  DialogContent,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useEffect, useRef, useState } from "react";

interface HeaderSearchProps {
  isMd: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const HeaderSearch = ({
  isMd,
  isOpen,
  setIsOpen,
}: HeaderSearchProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebouncedValue(searchInput);

  const { data, loading, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      limit: 15,
    },
  });

  useEffect(() => {
    refetch({
      filters: {
        name: {
          matches: debouncedSearchInput,
        },
      },
    });
  }, [debouncedSearchInput]);

  const products = data?.products ?? [];
  const content = (
    <>
      {isMd && (
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
      )}
      <div>
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
              Oops, we couldn't find any products matching your search. Try a
              different keyword
            </h3>
          )}
        {debouncedSearchInput.trim().length > 0 && products.length > 0 && (
          <ul className="flex flex-wrap gap-4">
            {products.map((product) => (
              <li className="flex-[0_1_calc(33.3%-12px)]" key={product._id}>
                <ProductCard
                  onProductClick={() => setIsOpen(false)}
                  product={product as Product}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  return (
    <>
      {isMd ? (
        <>
          <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent
              className="md:max-w-2xl lg:max-w-3xl h-[calc(100vh-96px)] top-auto bottom-0 translate-y-0 rounded-none sm:rounded-none md:rounded-lg md:top-1/2 md:bottom-auto md:-translate-y-1/2"
              closeClassName="top-9 right-8 [&>svg]:md:w-6 [&>svg]:md:h-6"
            >
              {content}
            </DialogContent>
          </Dialog>

          <button onClick={() => setIsOpen(true)} type="button" className="p-2">
            <Icon name="search" className="w-6 h-6" />
          </button>
        </>
      ) : (
        <Popover open={isOpen}>
          <PopoverAnchor asChild>
            <div className="relative flex-1">
              <input
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (e.target.value.length > 0) {
                    setIsOpen(true);
                    document.body.classList.add("overflow-hidden");
                  } else {
                    setIsOpen(false);
                    document.body.classList.remove("overflow-hidden");
                  }
                }}
                type="text"
                className="w-full h-10 pl-4 pr-11 bg-gray-200 rounded-md font-light text-xs placeholder:text-gray-600 text-primary focus:outline-none"
                placeholder="What can we help you to find ?"
              />
              <Icon
                name="search"
                className="w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
              />
            </div>
          </PopoverAnchor>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-screen h-[calc(100vh-92px)] flex flex-col border-none rounded-none shadow-none pb-0 px-6"
          >
            {content}
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
