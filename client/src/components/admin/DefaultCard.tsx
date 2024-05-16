import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ReactNode } from 'react';

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
  subtitle?: ReactNode | string;
  description?: string;
  counter: number;
  counterText?: string;
  link?: string;
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
            {subtitle && (typeof subtitle === 'string') && <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{subtitle}</h3>}
            {subtitle && (typeof subtitle !== 'string') && subtitle}
          </div>

          {
            link && (
              <Link href={link} className="self-start">
                <ChevronRightIcon className="w-6 h-6" />
              </Link>
            )
          }

        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-between">
          {avatar && (
            <div className="relative w-11 h-11 rounded-full overflow-hidden">
              <Image
                src={avatar}
                alt="avatar"
                fill
                sizes="(max-width: 768px) 200px, 200px"
                className="rounded-full object-cover"
              />
            </div>
          )}
          <p className="text-sm">{description}</p>
          <span className="self-end flex flex-col -space-y-1 justify-center">
            <span className="text-4xl font-bold text-end">{counter}</span>
            <span className="text-sm">{counterText}</span>
          </span>
        </div>
      </CardContent>
      {footer && <CardFooter className="h-fit">{footer}</CardFooter>}
    </Card>
  );
};

export default DefaultCard;
