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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username.ex.Mark"
                required
                className="h-10"
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
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required className="h-10" />
            </div>

            <div className="grid gap-3">
              <Button type="submit" className="w-full button-bg-lightBlue">
                Login
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
