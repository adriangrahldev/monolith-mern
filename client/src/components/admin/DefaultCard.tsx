import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const DefaultCard = ({
  title,
  subtitle,
  description,
  counter,
  counterText,
  link,
  theme = "light",
  footer,
  avatar
}: {
  title: string;
  subtitle?: string;
  description?: string;
  counter: number;
  counterText?: string;
  link: string;
  theme?: "dark" | "light";
  footer?: React.ReactNode;
  avatar?: string;

}) => {
  return (
    <Card className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {subtitle && <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{subtitle}</h3>}
          </div>

          <Link href={link} className="self-start">
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-between">
          {avatar && <Image src={avatar} alt="avatar" width={44} height={44} className="rounded-full h-fit" />}
          <p className="text-sm">{description}</p>
          <span className="self-end flex flex-col -space-y-1 justify-center">
            <span className="text-4xl font-bold text-end">{counter}</span>
            <span className="text-sm ">{counterText}</span>
          </span>
        </div>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default DefaultCard;
