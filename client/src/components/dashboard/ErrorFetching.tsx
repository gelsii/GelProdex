import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "../ui/button";

type ErrorFetchingProps = {
  title?: any;
  description?: string;
  buttons?: React.ReactNode
};
const ErrorFetching = React.memo((props: ErrorFetchingProps) => {
    console.log(props.description)
  return (
    <div className="w-full h-screen flex justify-center items-center px-4">
      <Empty className="shadow-2xl max-w-sm">
        <EmptyHeader>
          {/* <EmptyMedia variant="icon"><War /></EmptyMedia> */}
          <EmptyTitle>{props.title}</EmptyTitle>
          <EmptyDescription>{props.description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {props.buttons}
        </EmptyContent>
      </Empty>
    </div>
  );
});

export default ErrorFetching;
