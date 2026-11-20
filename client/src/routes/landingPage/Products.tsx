import { Button } from "@/components/ui/button";
import CardProducts from "@/components/ui/CardProducts";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import type { errorMessageResponse } from "@/types/messageResponseType";
import type { responseProducts } from "@/types/productsResponseType";
import type { AxiosError } from "axios";
import React from "react";

const SearchProducts = React.memo(() => {
  return (
    <div className="mb-6 w-full sticky top-22 z-30">
      <form className="flex gap-2">
        <Input
          placeholder="Search Products..."
          className="h-10 backdrop-blur-md "
        />
        <Button type="submit" className="w-32 h-10">
          Search
        </Button>
      </form>
    </div>
  );
});

const Products = () => {
  const { data, isSuccess, isLoading } = useFetch<
    responseProducts,
    AxiosError<errorMessageResponse>
  >({
    url: "/products",
    method: "GET",
  });
  return (
    <section className="w-full h-full flex flex-col justify-center items-start py-8">
      <SearchProducts />
      {isSuccess && (
        <div className="place-items-center auto-cols-auto sm:columns-2 lg:columns-3 xl:columns-4 ">
          {data?.products.map((product, index) => (
            <CardProducts key={index} {...product} />
          ))}
        </div>
      )}

      {isLoading && <h1>loading data...</h1>}
    </section>
  );
};

export default Products;
