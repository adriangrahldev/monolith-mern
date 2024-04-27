"use client"
import DefaultCard from "@/components/admin/DefaultCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";

const AdminHomePage = () => {

    const [pendingTasks, setPendingTasks] = useState<any>([])

    useEffect(() => {
        setPendingTasks([
            {
                id: 1,
                description: "Design new homepage",
                dateFrom: "24 May 2024, 10:00",
                dateTo: "27 May 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 2,
                description: "Design services page",
                dateFrom: "28 May 2024, 10:00",
                dateTo: "30 May 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 3,
                description: "Design about us page",
                dateFrom: "31 May 2024, 10:00",
                dateTo: "4 June 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 4,
                description: "Design contact us page",
                dateFrom: "5 June 2024, 10:00",
                dateTo: "7 June 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 5,
                description: "Design new homepage",
                dateFrom: "24 May 2024, 10:00",
                dateTo: "27 May 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 6,
                description: "Design services page",
                dateFrom: "28 May 2024, 10:00",
                dateTo: "30 May 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 7,
                description: "Design about us page",
                dateFrom: "31 May 2024, 10:00",
                dateTo: "4 June 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 8,
                description: "Design contact us page",
                dateFrom: "5 June 2024, 10:00",
                dateTo: "7 June 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
        ])
    }, []);
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-6 gap-4">
        <DefaultCard title="Clients" counter={2} link="/dashboard/clients" />
        <DefaultCard title="Projects" counter={7} link="/dashboard/projects" />
      </div>

      <hr />

      <Card>
        <CardHeader>
        <h1 className="text-2xl font-bold">Upcoming tasks</h1>
        </CardHeader>
        <CardContent>

            <Table>
            <TableCaption>A list of your upcoming tasks.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[400px]">Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
                {
                    pendingTasks.map((task: any) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.dateFrom}</TableCell>
                            <TableCell>{task.project}</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell>
                                <button className="btn btn-primary">Start</button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomePage;
