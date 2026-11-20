import React, { type SubmitEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOutIcon, Search, SquareX } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch, useOnFetch } from "@/hooks/useFetch";
import { tokenContext } from "@/contexts/token";
import {
  type productsResponseData,
  type errorMessageResponse,
  type productData,
} from "@/types/messageResponseType";
import type { AxiosError } from "axios";
import ErrorAuthorized from "@/components/dashboard/ErrorAuthorized";
import { toast } from "sonner";

const SearchProductsList = React.memo(() => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const token = React.useContext(tokenContext);

  const { data, isLoading, fetchAPI } = useOnFetch<
    productsResponseData,
    AxiosError<errorMessageResponse>
  >({
    url: "/products_search/user",
    method: "GET",
    queries: {
      search: searchValue,
    },
    authorization: `Bearer ${token?.userToken}`,
    onError: (err: AxiosError<errorMessageResponse>) =>
      toast.error(err.response?.data.detail),
  });

  const submitSearchProduct = React.useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      setIsOpen(true);
      fetchAPI();
    },
    [fetchAPI],
  );
  return (
    <>
      <form className="flex gap-2" onSubmit={submitSearchProduct}>
        <Input
          type="text"
          placeholder="Search Products..."
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
        <Button type="submit">
          <Search />
        </Button>
      </form>
      {isOpen && (
        <section className="w-full h-full p-10 z-100 fixed top-0 left-0 backdrop-blur-sm bg-[#05050547] ">
          <div className="flex justify-between">
            <h1 className="font-bold text-blue-600 text-xl">
              Searched Product
            </h1>
            <SquareX
              className="text-lightBlue w-8 h-8 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {isLoading && <h1>Searching....</h1>}
          <div className="place-items-center my-4 auto-cols-auto sm:columns-2 lg:columns-3 xl:columns-4 ">
            {data?.products.map((product, index) => (
              <CardProductList key={index} {...product} />
            ))}

            {data?.products.length == 0 && <h1>No found products</h1>}
          </div>
        </section>
      )}
    </>
  );
});

const DeleteDialog = React.memo(() => {
  return;
});

const EditDialog = React.memo(() => {
  return;
});

const CardProductList = React.memo((props: productData) => {
  return (
    <Card className="w-full max-w-sm shadow-2xl mb-4">
      <CardHeader>
        <img
          src={props.url_image}
          alt=""
          className="w-full h-full rounded-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{props.name}</CardTitle>
        <CardTitle className="my-2">${props.price}</CardTitle>

        <CardDescription>{props.description}</CardDescription>
      </CardContent>
      <CardFooter className="grid gap-2">
        <Button variant={"destructive"} className={"w-full"}>
          Delete
        </Button>
        <Button variant={"secondary"}>Edit</Button>
      </CardFooter>
    </Card>
  );
});

const ProductsList = () => {
  const token = React.useContext(tokenContext);

  const { data, isLoading, isSuccess, isError } = useFetch<
    productsResponseData,
    AxiosError<errorMessageResponse>
  >({
    url: "/products/user",
    method: "GET",
    authorization: `Bearer ${token?.userToken}`,
  });
  return (
    <>
      {isSuccess && (
        <section className="w-full grid  gap-4 h-full py-8">
          <div className="w-full flex justify-between items-center">
            <Label>Products:</Label>
            <SearchProductsList />
          </div>

          <div className="place-items-center auto-cols-auto sm:columns-2 lg:columns-3 xl:columns-4 ">
            {data?.products.map((product, index) => (
              <CardProductList key={index} {...product} />
            ))}
          </div>
        </section>
      )}

      {isLoading && <h1>Loading data...</h1>}

      {isError && (
        <div className="w-full h-full flex justify-center items-center">
          <ErrorAuthorized />
        </div>
      )}
    </>
  );
};

export default ProductsList;
