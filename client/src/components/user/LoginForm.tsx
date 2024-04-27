import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


const LoginForm = ({handleSubmit}:{handleSubmit: CallableFunction}) => {

    return (
     
        <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            <span>¡Sign to access to your dashboard!</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e)=> handleSubmit(e)}>
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
     )

}

export default LoginForm;