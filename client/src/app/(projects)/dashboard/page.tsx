"use client"
import DefaultCard from "@/components/admin/DefaultCard";
import TaskTable from "@/components/tasks/TaskTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
  const { clearItems } = useBreadcrumb();


  useEffect(() => {
    clearItems();

  }, [clearItems])


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
    ])
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <div className="grid  gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
        <DefaultCard title="Clients" counter={2} link="/clients" />
        <DefaultCard title="Projects" counter={7} link="/projects" />
      </div>

      <hr />

      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Upcoming tasks</h1>
        </CardHeader>
        <CardContent>
          <TaskTable tasks={pendingTasks} ></TaskTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomePage;
