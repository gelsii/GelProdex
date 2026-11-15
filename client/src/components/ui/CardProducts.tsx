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
import type { dataProductsTypes } from "@/types/productsResponseType";

const CardProducts = React.memo((props: dataProductsTypes) => {
  return (
    <Card className=" w-full max-w-sm pt-0">
      <img
        src={props.url_image}
        alt="Event cover"
        className="w-full h-full rounded-lg"
      />
      <CardHeader>
        <CardAction>
          {/* <Badge variant="secondary">Featured</Badge> */}@{props.username}
        </CardAction>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full button-bg-lightBlue"
          onClick={() => location.assign(props.url_message)}
        >
          Message
        </Button>
      </CardFooter>
    </Card>
  );
});

export default CardProducts;
