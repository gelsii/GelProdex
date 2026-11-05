import { Button } from "@/components/ui/button";
import React, { type SubmitEvent } from "react";
import axios, { AxiosError } from "axios";
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
import { useNavigate } from "react-router";
import { useOnFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import type {
  errorMessageResponse,
  messageResponse,
} from "@/types/messageResponseType";

const SignIn = () => {
  const navigate = useNavigate();

  const [formSignInData, setFormSignInData] = React.useState({
    email: "",
    password: "",
  });

  const { fetchAPI, isLoading } = useOnFetch({
    url: "/auth/signin",
    method: "POST",
    authData: {
      username: formSignInData.email,
      password: formSignInData.password,
    },
    onSuccess: (data: messageResponse) => {
      toast.success(data.message);
      navigate("/dashboard", { replace: true });
    },
    onError: (error: AxiosError<errorMessageResponse>) =>
      toast.error(error.response?.data.detail),
  });

  const handleSignInButton = React.useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      fetchAPI();
    },
    [fetchAPI],
  );

  return (
    <Card className="w-full max-w-sm shadow-[-8px_10px_6px_lightBlue]">
      <CardHeader>
        <CardTitle>Sign In to your account</CardTitle>
        <CardDescription>
          Enter your email below to Sign In to your account
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            className={"hover:text-lightBlue"}
            onClick={() => navigate("/auth/signup", { replace: true })}
          >
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignInButton}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="h-10"
                onChange={(e) =>
                  setFormSignInData({
                    ...formSignInData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:text-lightBlue"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                className="h-10"
                required
                onChange={(e) =>
                  setFormSignInData({
                    ...formSignInData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-3">
              <Button
                type="submit"
                className="w-full button-bg-lightBlue h-10"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
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

export default SignIn;
