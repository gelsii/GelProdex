import { Button } from "@/components/ui/button";
import CardProducts from "@/components/ui/CardProducts";
import { Separator } from "@/components/ui/separator";
import { useFetch } from "@/hooks/useFetch";
import type { errorMessageResponse } from "@/types/messageResponseType";
import type { responseProducts } from "@/types/productsResponseType";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } = useFetch<
    responseProducts,
    AxiosError<errorMessageResponse>
  >({
    url: "/products?limit=3&skip=0",
    method: "GET",
  });

  return (
    <section className="w-full h-fit  flex flex-col justify-center items-center px-4 gap-14">
      <div className="text-left h-full mt-8 flex-col-start-items sm:text-center md:mt-24">
        <h2 className="sm:text-xl">Welcome Sa</h2>
        <h1 className="font-extrabold text-3xl sm:text-5xl">
          GEL <span className="text-lightBlue">PRODEX</span>
        </h1>
        <p className="max-w-120 text-lg">
          pwede kang mag post ng iyong produkto sa pamamagitan ng GET STARTED,
          ito ang GelProdex na market shop
        </p>
      </div>

      <Separator />

      <div className="w-full h-full flex-col flex gap-8 justify-center items-center py-8">
        <h1 className="text-center">New Products</h1>

        {isSuccess && (
          <div className="w-full mt-4 grid-auto-cols">
            {data?.products.map((item, index) => (
              <CardProducts key={index} {...item} />
            ))}
          </div>
        )}

        <Button
          onClick={() => navigate("/products")}
          className={"button-bg-lightBlue w-38 "}
        >
          More Products
        </Button>
      </div>
    </section>
  );
};

export default Home;
