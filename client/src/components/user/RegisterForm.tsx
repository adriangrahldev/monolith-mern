import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";


const RegisterForm = ({handleSubmit}:{handleSubmit: CallableFunction}) => {

    return (
     
        <Card>
        <CardHeader>
          <CardTitle className="max-lg:text-2xl"> Sign Up</CardTitle>
          <CardDescription>
            <span>
              Complete the form below to create an account. Already have an account? <Link href={"/user/login"}> <span className="underline">Sign in here</span></Link>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e)=> handleSubmit(e)}>
            <div className="grid w-full items-center gap-2">
              <div className="flex max-lg:flex-col justify-between gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  type="text"
                  id="fullname"
                  placeholder="What's your name?"
                />
              </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Type your email address"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Type your password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex flex-col px-[2px]">
                <Button className="flex-1">Create account</Button>
              </div>
              <div className="flex flex-col px-[2px] text-center">
                or
              </div>
              <div className="flex flex-col px-[2px] text-center">
                <Button variant={'outline'} className="flex-1 flex gap-2">
                    <FontAwesomeIcon icon={faGoogle} className="h-6 w-6"></FontAwesomeIcon>
                    Sign up with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex"></CardFooter>
      </Card>
     )

}

export default RegisterForm;