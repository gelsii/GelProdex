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
import type { dataProductsTypes } from "@/types/productsResponseType";

const CardProducts = React.memo((props: dataProductsTypes) => {
  return (
    <Card className=" w-full max-w-sm">
      <CardHeader>
        <img
          src={props.url_image}
          alt="Event cover"
          className="w-full h-full rounded-lg "
        />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <CardTitle>{props.name}</CardTitle>{" "}
          <CardTitle>@{props.username}</CardTitle>
        </div>
        <CardDescription>{props.description}</CardDescription>
      </CardContent>

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
