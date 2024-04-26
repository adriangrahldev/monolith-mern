"use client";
import { FormEvent, useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  // const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    // setUser(data);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            <span>¡Sign to access to your dashboard!</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Type your email address"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Passoword</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Type your password"
                />
              </div>
              <div className="flex flex-col px-[2px] ">
                <Button variant={'link'} className="flex-1" size={'sm'}>Forgot password?</Button>
              </div>
              <div className="flex flex-col px-[2px]">
                <Button className="flex-1">Login</Button>
              </div>
              <div className="flex flex-col px-[2px] text-center">
                or
              </div>
              <div className="flex flex-col px-[2px] text-center">
                <Button variant={'outline'} className="flex-1 flex gap-2">
                    <FontAwesomeIcon icon={faGoogle} className="h-6 w-6"></FontAwesomeIcon>
                    Sign in with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex"></CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
