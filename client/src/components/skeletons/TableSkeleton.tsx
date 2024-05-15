import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[30%] font-bold"><Skeleton className="h-6" /></TableHead>
                    <TableHead className="w-[20%] font-bold"><Skeleton className="h-6" /></TableHead>
                    <TableHead className="w-[15%] font-bold"><Skeleton className="h-6" /></TableHead>
                    <TableHead className="w-[15%] font-bold"><Skeleton className="h-6" /></TableHead>
                    <TableHead className="w-[20%] font-bold"><Skeleton className="h-6" /></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
                {[1,2,3].map((x: any) => (
                        <TableRow key={x}>
                            <TableCell colSpan={5}><Skeleton className="h-6" /></TableCell>
                        </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableSkeleton;