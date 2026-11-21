import React, { type SubmitEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SquareX, Trash2Icon } from "lucide-react";
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
  type errorMessageResponse,
  type messageResponse,
} from "@/types/messageResponseType";
import type { AxiosError } from "axios";
import ErrorAuthorized from "@/components/dashboard/ErrorAuthorized";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import type {
  dataProductsTypes,
  responseProducts,
} from "@/types/productsResponseType";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import refetchDataContext from "@/contexts/refetchData";

const SearchProductsList = React.memo(() => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const token = React.useContext(tokenContext);

  const { data, isLoading, fetchAPI } = useOnFetch<
    responseProducts,
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
        <section className="w-full h-full p-10 z-35 fixed top-0 left-0 backdrop-blur-sm bg-[#05050547] ">
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

const DeleteDialog = React.memo((props: { id?: string }) => {
  const token = React.useContext(tokenContext);

  const refetch = React.useContext(refetchDataContext);

  const deletingProduct = useOnFetch({
    url: "/products",
    method: "DELETE",
    authorization: `Bearer ${token?.userToken}`,
    onSuccess: (data: messageResponse) => {
      toast.success(data.message);
      refetch?.setRefetchData(true);
    },
    onError: (error: AxiosError<errorMessageResponse>) =>
      toast.error(error.response?.data.detail),
    queries: {
      id: props.id,
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Product?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone, and all related product information will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => deletingProduct.fetchAPI()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

const EditDialog = React.memo((props: dataProductsTypes) => {
  const token = React.useContext(tokenContext);

  const refetch = React.useContext(refetchDataContext);

  const [updatedData, setUpdatedDat] = React.useState({
    name: props.name,
    price: props.price,
    url_message: props.url_message,
    url_image: props.url_image,
    description: props.description,
  });

  const updateProduct = useOnFetch({
    url: "/products",
    method: "PUT",
    authorization: `Bearer ${token?.userToken}`,
    queries: {
      id: props._id,
    },
    dataAxios: updatedData,
    onSuccess: (data: messageResponse) => {
      toast.success(data.message);
      refetch?.setRefetchData(true);
    },
    onError: (err: AxiosError<errorMessageResponse>) =>
      toast.error(err.response?.data.detail),
  });

  const handleUpdateSubmit = React.useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      updateProduct.fetchAPI();
    },
    [updateProduct],
  );

  return (
    <Sheet>
      <SheetTrigger render={<Button variant={"secondary"}>Edit</Button>} />
      <SheetContent className={"overflow-y-scroll scrollbar-none"}>
        <SheetHeader>
          <SheetTitle>Edit your Product</SheetTitle>
          <SheetDescription>
            Update your product information by editing its details, such as the
            product name, description, price, and etc. Make sure to save your
            changes to keep your product details up to date.
          </SheetDescription>

          <form className="grid gap-4 mt-6" onSubmit={handleUpdateSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                defaultValue={props.name}
                required
                id="name"
                onChange={(e) =>
                  setUpdatedDat({ ...updatedData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price]">Price:</Label>
              <Input
                type="number"
                defaultValue={props.price}
                required
                id="price"
                onChange={(e) =>
                  setUpdatedDat({
                    ...updatedData,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url_message">Url Message:</Label>
              <Input
                type="url"
                defaultValue={props.url_message}
                required
                id="url_message"
                onChange={(e) =>
                  setUpdatedDat({
                    ...updatedData,
                    url_message: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url_image">Url Image:</Label>
              <Input
                type="url"
                defaultValue={props.url_image}
                required
                id="url_image"
                onChange={(e) =>
                  setUpdatedDat({
                    ...updatedData,
                    url_image: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description:</Label>
              <Textarea
                defaultValue={props.description}
                id="description"
                required
                className="resize-none h-80"
                onChange={(e) =>
                  setUpdatedDat({
                    ...updatedData,
                    description: e.target.value,
                  })
                }
              ></Textarea>
            </div>

            <Button type="submit" disabled={updateProduct.isLoading}>
              {updateProduct.isLoading ? "Updating..." : "Update Product"}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
});

const CardProductList = React.memo((props: dataProductsTypes) => {
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
        <DeleteDialog id={props._id} />
        <EditDialog {...props} />
      </CardFooter>
    </Card>
  );
});

const ProductsList = () => {
  const token = React.useContext(tokenContext);

  const { data, isLoading, isSuccess, isError } = useFetch<
    responseProducts,
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

          <div className="place-items-center auto-cols-auto sm:columns-2 lg:columns-3 2xl:columns-4 ">
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
