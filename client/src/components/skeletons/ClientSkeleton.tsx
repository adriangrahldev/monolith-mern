import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, } from "../ui/card";

export const ClientSkeleton = () => {
    return (
        <div id="client-container">
            <Card>
                <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-1 md:flex md:flex-row gap-4">
                    <div className="space-y-2 md:w-[35%]">
                        <Skeleton className="h-10 w-3/4" />
                        <div className="flex justify-center">
                            <Skeleton className="h-20 w-20 rounded-full" />
                        </div>
                        <div id="email">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-6 w-3/4" />
                        </div>
                        <div id="phone">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-6 w-3/4" />
                        </div>
                    </div>
                    <div id="projects" className="flex-1">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-10 w-1/2" />
                            <Skeleton className="h-8 w-44" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            <Skeleton className="h-40 col-span-1" />
                            <Skeleton className="h-40 col-span-1" />
                            <Skeleton className="h-40 col-span-1" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
