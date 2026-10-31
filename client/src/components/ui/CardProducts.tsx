import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";

const CardProducts = React.memo(() => {
  return (
    <Card className=" w-full max-w-sm pt-0">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className=" z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          {/* <Badge variant="secondary">Featured</Badge> */}
          @Gelsi
        </CardAction>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
          dignissimos fuga consequuntur voluptate eum, ex possimus recusandae
          nostrum iure enim magni voluptates corrupti nihil modi neque facilis
          exercitationem, officiis inventore.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full button-bg-lightBlue">Message</Button>
      </CardFooter>
    </Card>
  );
});

export default CardProducts;
