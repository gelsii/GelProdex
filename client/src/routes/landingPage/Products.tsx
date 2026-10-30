import { Button } from "@/components/ui/button";
import CardProducts from "@/components/ui/CardProducts";
import { Input } from "@/components/ui/input";
import React from "react";


const SearchProducts = React.memo(() => {
  return <div className="mb-6 w-full sticky top-22 z-30">
    <form className="flex gap-2">
      <Input placeholder="Search Products..." className="h-10 backdrop-blur-md " />
      <Button type="submit" className="w-32 h-10">Search</Button>
    </form>
  </div>
})

const Products = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-start py-8">
      <SearchProducts />
      <div className="w-full h-fit grid-auto-cols">
        {Array.from({ length: 18 }).map((_, index) => (
          <CardProducts key={index} />
        ))}
      </div>
    </section>
  );
};

export default Products;
