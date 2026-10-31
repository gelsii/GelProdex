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

const ProductsList = () => {
  return (
    <section className="w-full grid gap-4 h-full py-8">
      <div className="w-full flex justify-between items-center">
        <Label>Products:</Label>
        <SearchProductsList />
      </div>
      <Table >
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 2 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>$ 800099999</TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique velit illum saepe aut incidunt repellat officiis est
                cum animi! Autem ex minima, enim perspiciatis obcaecati eius eos
                mollitia nostrum quae?Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Asperiores rem doloribus, veniam consectetur
                nisi optio atque architecto quam magni natus eveniet facere
                minus hic, sequi dolor maxime! Magnam, sint impedit! Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Natus eum dolores
                ipsa nesciunt nihil consectetur animi ex optio a, nisi, sapiente
                vitae tempore maxime exercitationem fugit iusto ab quisquam id.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                voluptas rem, possimus odit deleniti esse libero, dolorum illum
                dignissimos enim ipsum omnis dolores est similique quibusdam
                quod dolore, sapiente saepe.
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ProductsList;
