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

const ErrorAuthorized = () => {
  return (
    <div>
      <Empty className="shadow-2xl max-w-sm mt-12">
        <EmptyHeader>
          <EmptyTitle>Server Error</EmptyTitle>
          <EmptyDescription>
            Something went wrong. Please try to reload the page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => location.reload()} className={"w-38"}>
            Reload
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default ErrorAuthorized;
