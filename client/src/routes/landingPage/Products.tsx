import { Button } from "@/components/ui/button";
import CardProducts from "@/components/ui/CardProducts";
import { Input } from "@/components/ui/input";
import { useFetch, useOnFetch } from "@/hooks/useFetch";
import type { errorMessageResponse } from "@/types/messageResponseType";
import type { responseProducts } from "@/types/productsResponseType";
import type { AxiosError } from "axios";
import { SquareX } from "lucide-react";
import React, { type SubmitEvent } from "react";
import { toast } from "sonner";

const SearchProducts = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const { data, isLoading, fetchAPI, isSuccess } = useOnFetch<
    responseProducts,
    AxiosError<errorMessageResponse>
  >({
    url: "/products_search/",
    method: "GET",
    queries: {
      search_name: searchValue,
    },
    onError: (err: AxiosError<errorMessageResponse>) => {
      toast.error(err.response?.data.detail);
      setIsOpen(false);
    },
  });

  const handleSearchSubmit = React.useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      fetchAPI();

      setIsOpen(true);
    },
    [fetchAPI],
  );
  return (
    <>
      <div className="mb-6 w-full sticky top-22 z-30">
        <form className="flex gap-2" onSubmit={handleSearchSubmit}>
          <Input
            placeholder={
              isLoading
                ? "Searching products..... Please wait."
                : "Search Products..."
            }
            className="h-10 backdrop-blur-md "
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button type="submit" className="w-32 h-10" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>

      {isOpen && !isLoading && (
        <div className="fixed h-full w-full  p-12 bg-[#00000063] top-0 left-0 z-30">
          <div className="flex justify-between mb-8 items-center">
            <h1 className="text-2xl font-bold text-white">Products:</h1>
            <SquareX
              className="w-8 h-8 text-white cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {isSuccess && (
            <>
              <div className="place-items-center w-full h-full auto-cols-auto sm:columns-2 lg:columns-3 xl:columns-4 ">
                {data?.products.map((product, index) => (
                  <CardProducts key={index} {...product} />
                ))}
              </div>

              {data?.products.length == 0 && (
                <h1 className="text-2xl text-white font-black">
                  No found Products
                </h1>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

const Products = () => {
  const { data, isSuccess, isLoading } = useFetch<
    responseProducts,
    AxiosError<errorMessageResponse>
  >({
    url: `/products?limit=0`,
    method: "GET",
  });

  return (
    <section className="w-full h-full flex flex-col justify-center items-start py-8">
      <SearchProducts />
      {isSuccess && (
        <>
          <div className="place-items-center w-full h-full auto-cols-auto sm:columns-2 lg:columns-3 xl:columns-4 ">
            {data?.products.map((product, index) => (
              <CardProducts key={index} {...product} />
            ))}
          </div>
        </>
      )}

      {isLoading && <h1>loading data...</h1>}
    </section>
  );
};

export default Products;
