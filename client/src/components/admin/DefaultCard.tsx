import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const DefaultCard = ({
  title,
  counter,
  link,
}: {
  title: string;
  counter: number;
  link: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <Link href={link}>
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="text-end">
        <p className="text-4xl font-bold">{counter}</p>
      </CardContent>
    </Card>
  );
};

export default DefaultCard;
