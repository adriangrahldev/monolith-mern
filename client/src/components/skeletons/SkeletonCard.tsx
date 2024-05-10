import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard = ({ theme = "light" }) => {
    return (
        <Card className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <CardHeader className="py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-6 w-36 rounded-md" />
                        <Skeleton className="h-4 w-24 rounded-md mt-2" />
                    </div>
                    <Skeleton className="w-6 h-6 rounded-full" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 justify-between">
                    <Skeleton className="w-11 h-11 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex flex-col items-end">
                        <Skeleton className="h-8 w-12 rounded-md" />
                        <Skeleton className="h-4 w-20 rounded-md mt-1" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-4 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
};

