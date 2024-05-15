"use client"
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useCallback, useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import DefaultCard from "@/components/admin/DefaultCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TaskTable from "@/components/tasks/TaskTable";
import TableSkeleton from '../../../components/skeletons/TableSkeleton';
import DefaultCardSkeleton from "@/components/skeletons/DefaultCardSkeleton";

const AdminHomePage = () => {
  const router = useRouter();

  const { clearItems } = useBreadcrumb();
  const [pendingTasks, setPendingTasks] = useState<any>([])
  const [projectsCount, setProjectsCount] = useState<number>(0)
  const [clientsCount, setClientsCount] = useState<number>(0)
  
  const [fetchingTasks, setFetchingTasks] = useState<boolean>(false)
  const [fetchingProjects, setFetchingProjects] = useState<boolean>(false)
  const [fetchingClients, setFetchingClients] = useState<boolean>(false)

  const fetchProjects = useCallback(async () => {
    setFetchingProjects(true);
      try {
        const res = await fetch(`/api/projects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (res.status === 401) {
          router.push("/api/auth/login");
        }

        const data = await res.json();
        setProjectsCount(data.length);
        setFetchingProjects(false);
      } catch (error) {
        setFetchingProjects(false);
        throw error;

      }
  }, [router])

  const fetchClients = useCallback(async () => {
    setFetchingClients(true);
      try {
        const res = await fetch(`/api/clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (res.status === 401) {
          router.push("/api/auth/login");
        }

        const data = await res.json();
        setClientsCount(data.length);
        setFetchingClients(false);
      } catch (error) {
        setFetchingClients(false);
        throw error;

      }
  }, [router])
  
  const fetchPendingTasks = useCallback(async () => {
    setFetchingTasks(true);
      try {
        const res = await fetch(`/api/tasks?status=in-backlog`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (res.status === 401) {
          router.push("/api/auth/login");
        }

        const data = await res.json();
        setPendingTasks(data);
        setFetchingTasks(false);
      } catch (error) {
        setFetchingTasks(false);
        throw error;

      }
  }, [router]);


  useEffect(() => {
    clearItems();
  }, [clearItems])


  
  useEffect(() => {
    fetchPendingTasks();
  }, [fetchPendingTasks]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid  gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
        
      {
        fetchingProjects && <DefaultCardSkeleton />
      }

      {
        !fetchingProjects && <DefaultCard title="Projects" counter={projectsCount} link="/projects" />
      }

      {
        fetchingClients && <DefaultCardSkeleton />
      }

      {
        !fetchingClients && <DefaultCard title="Clients" counter={clientsCount} link="/clients" />
      }

      </div>

      <hr />

      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Upcoming tasks</h1>
        </CardHeader>
        <CardContent>
          {
            fetchingTasks && <TableSkeleton />
          }
          {
            !fetchingTasks && pendingTasks.length === 0 && <p>No pending tasks</p>
          }
          {
            !fetchingTasks && pendingTasks.length > 0 && <TaskTable tasks={pendingTasks} ></TaskTable>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomePage;
