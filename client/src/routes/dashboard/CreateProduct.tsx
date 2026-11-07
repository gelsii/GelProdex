import ErrorAuthorized from "@/components/dashboard/ErrorAuthorized";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { tokenContext } from "@/contexts/token";
import { useOnFetch } from "@/hooks/useFetch";
import type {
  errorMessageResponse,
  messageResponse,
  productData,
} from "@/types/messageResponseType";
import type { AxiosError } from "axios";
import React, { type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreateProduct = () => {
  const [formProductData, setFormProductData] = React.useState<productData>({
    name: undefined,
    description: undefined,
    url_message: undefined,
    url_image: undefined,
    price: null,
  });

  const navigate = useNavigate();
  const token = React.useContext(tokenContext);

  const { isLoading, fetchAPI, isError, error } = useOnFetch<
    messageResponse,
    AxiosError<errorMessageResponse>
  >({
    url: "/products",
    method: "POST",
    dataAxios: formProductData,
    onSuccess: (data: messageResponse) => {
      toast.success(data.message);
      navigate("/dashboard", { replace: true });
    },
    onError: (error: AxiosError<errorMessageResponse>) => {
      toast.error(error.response?.data.detail);
    },
    authorization: `Bearer ${token?.userToken}`,
  });

  const handleSubmitCreate = (e: SubmitEvent) => {
    e.preventDefault();
    fetchAPI();
  };

  if (error?.response?.status == 403) {
    return <ErrorAuthorized />;
  }

  return (
    <>
      {
        <section className="w-full py-4 flex justify-center items-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Create Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmitCreate}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name:</Label>
                  <Input
                    type="text"
                    placeholder="name"
                    id="name"
                    onChange={(e) =>
                      setFormProductData({
                        ...formProductData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price:</Label>
                  <Input
                    type="number"
                    placeholder="price"
                    id="price"
                    onChange={(e) =>
                      setFormProductData({
                        ...formProductData,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="urlmessage">Url Message:</Label>
                  <Input
                    type="text"
                    placeholder="url message"
                    id="urlmessage"
                    onChange={(e) =>
                      setFormProductData({
                        ...formProductData,
                        url_message: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="urlImage">Url Image:</Label>
                  <Input
                    type="text"
                    placeholder="url image"
                    id="urlImage"
                    onChange={(e) =>
                      setFormProductData({
                        ...formProductData,
                        url_image: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Descriptiom</Label>
                  <Textarea
                    placeholder="description here."
                    className=" resize-none h-80"
                    onChange={(e) =>
                      setFormProductData({
                        ...formProductData,
                        description: e.target.value,
                      })
                    }
                  ></Textarea>
                </div>

                <Button
                  className={"button-bg-lightBlue h-8"}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      }
    </>
  );
};

export default CreateProduct;
