import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";

const CardProducts = () => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          {/* <Badge variant="secondary">Featured</Badge> */}
          @Gelsi
        </CardAction>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus dignissimos fuga consequuntur voluptate eum, ex possimus recusandae nostrum iure enim magni voluptates corrupti nihil modi neque facilis exercitationem, officiis inventore.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full button-bg-lightBlue">Message</Button>
      </CardFooter>
    </Card>
  );
};

export default CardProducts;
