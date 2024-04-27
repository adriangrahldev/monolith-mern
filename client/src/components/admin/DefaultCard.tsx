import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const DefaultCard = ({
  title,
  description,
  counter,
  link,
  theme = "light",
}: {
  title: string;
  description?: string;
  counter: number;
  link: string;
  theme?: "dark" | "light";
}) => {
  return (
    <Card className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <Link href={link}>
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p>{description}</p>
          <span className="text-4xl font-bold">{counter}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultCard;
