import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const DefaultCard = ({
  title,
  subtitle,
  description,
  counter,
  link,
  theme = "light",
}: {
  title: string;
  subtitle?: string;
  description?: string;
  counter: number;
  link: string;
  theme?: "dark" | "light";
}) => {
  return (
    <Card className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {subtitle && <h3 className="text-sm font-semibold text-slate-500">{subtitle}</h3> }
          </div>

          <Link href={link} className="self-start">
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-between">
          <p className="text-sm">{description}</p>
          <span className="text-4xl font-bold self-end">{counter}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultCard;
