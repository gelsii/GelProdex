import { Button } from "@/components/ui/button";
import CardProducts from "@/components/ui/CardProducts";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
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
        <Button className={"button-bg-lightBlue w-40 mt-4"}>Get Started</Button>
      </div>

      <div className="w-full h-full flex-col flex gap-8 justify-center items-center py-8">
        <h1 className="text-center">New Products</h1>

        <div className="w-full mt-4 grid-auto-cols">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardProducts key={index} />
          ))}
        </div>

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
