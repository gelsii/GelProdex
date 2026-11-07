import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ErrorFetching from "@/components/dashboard/ErrorFetching";
import { useFetch } from "@/hooks/useFetch";
import { tokenContext } from "@/contexts/token";
import {
  type productsResponseData,
  type errorMessageResponse,
  type productData,
} from "@/types/messageResponseType";
import type { AxiosError } from "axios";
import ErrorAuthorized from "@/components/dashboard/ErrorAuthorized";

const SearchProductsList = React.memo(() => {
  return (
    <form className="flex gap-2">
      <Input type="text" placeholder="Search Products..." />
      <Button type="submit">
        <Search />
      </Button>
    </form>
  );
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
      <CardFooter>
        <Button variant={"destructive"} className={"w-full"}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
});

const ProductsList = () => {
  const token = React.useContext(tokenContext);

  const { data, isLoading, isSuccess, isError, error } = useFetch<
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

          <div className="hidden lg:flex ">
            <Table>
              <TableCaption>A list of your products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>$ {product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="place-items-center auto-cols-auto sm:columns-2 lg:hidden">
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
