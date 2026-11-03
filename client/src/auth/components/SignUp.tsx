import React, { type SubmitEvent } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useOnFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import type {
  messageResponse,
  errorMessageResponse,
} from "@/types/messageResponseType";
import type { AxiosError } from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formSignUpData, setFormSignUpData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const { fetchAPI, isLoading } = useOnFetch<
    messageResponse,
    errorMessageResponse
  >({
    url: "/auth/signup",
    method: "POST",
    dataAxios: formSignUpData,
    onSuccess: (data) => toast.success(data.message),
    onError: (error: AxiosError<errorMessageResponse>) => toast.error(error.response?.data.detail),
  });

  const handleSignUpButton = React.useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();

      fetchAPI();
    },
    [fetchAPI],
  );

  return (
    <Card className="w-full max-w-sm shadow-[8px_10px_6px_lightBlue]">
      <CardHeader>
        <CardTitle>Sign Up Account</CardTitle>
        <CardDescription>
          Enter your email below to Sign Up Account
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            className={"hover:text-lightBlue"}
            onClick={() => navigate("/auth/signin", { replace: true })}
          >
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUpButton}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username.ex.Mark"
                required
                className="h-10"
                onChange={(e) =>
                  setFormSignUpData({
                    ...formSignUpData,
                    username: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="h-10"
                onChange={(e) =>
                  setFormSignUpData({
                    ...formSignUpData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="h-10"
                onChange={(e) =>
                  setFormSignUpData({
                    ...formSignUpData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-3">
              <Button
                type="submit"
                className="w-full button-bg-lightBlue"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
              <Button
                type="button"
                className="border-lightBlue bg-transparent text-lightBlue w-full hover:bg-transparent"
                onClick={() => navigate("/", { replace: true })}
              >
                Back
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
