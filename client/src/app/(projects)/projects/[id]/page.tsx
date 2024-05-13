"use client";
// Importaciones de librerías y componentes externos
import { faCommentDots, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

// Importaciones de componentes y contextos propios
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateTaskModal from "@/components/modals/CreateTaskModal";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

// Importaciones de interfaces
import { Task } from "@/interfaces/task";
import { Project } from "@/interfaces/project";
import { Client } from "@/interfaces/client";

// Importaciones de componentes de terceros
import ProjectTaskTable from "@/components/tasks/ProjectTaskTable";
import CommentsPanel from "@/components/projects/comments/CommentsPanel";

// Componente principal
const ProjectPage = () => {
  // Hooks de estado
  const [project, setProject] = useState<Project | undefined>();
  const [commentContent, setCommentContent] = useState("");
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Hooks de contexto
  const { setItems } = useBreadcrumb();

  // Hooks de routing
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // Hook de autenticación
  const { user } = useUser();

  const toggleCreateTaskModal = () => {
    setShowCreateTaskModal(!showCreateTaskModal);
  };

  const toggleCommentsPanel = () => {
    setShowCommentsPanel(!showCommentsPanel);
  }

  const handleCreateTaskSubmit = async (formData: Task) => {
    const data = {
      ...formData,
      projectId: id,
      userId: user?.sub as string,
    };
      
    try {
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        router.push("/api/auth/login");
      }
      fetchTasks();
      toggleCreateTaskModal();
      fetchProject();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleCommentSubmit = async (content: string) => {
    const data = {
      content: content,
      admin: true,
      author: user?.nickname || "Admin",
      clientId: "",
      projectId: id,
    };

    try {
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        router.push("/api/auth/login");
      }
      fetchProject();
      setCommentContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks?projectId=${id}`);
      const data = await res.json();
      if (res.status === 401) {
        router.push("/api/auth/login");
      }
      if (res.status === 200) {
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, router]);

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects?projectId=${id}`);
      const data = await res.json();
      if (res.status === 401) {
        router.push("/api/auth/login");
      }
      if (res.status === 200) {
        setProject(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [id, router]);

  useEffect(() => {
    setItems([
      {
        title: "Projects",
        type: "link",
        link: "/projects",
      },
      {
        title: project?.name || "Project",
        link: `/projects/${id}`,
      },
    ]);
  }, [id, project?.name, setItems]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <div className="h-screen space-y-4">
        <div
          id="toolbar"
          className="w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12"
        >
          <div className="flex-1 flex justify-start">
            <Button variant={"ghost"} onClick={toggleCreateTaskModal}>
              <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
              Add Task
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <Button variant={"ghost"} onClick={toggleCommentsPanel}>
              <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
              Comments
            </Button>
          </div>
        </div>
        <hr />
        <h1 className="text-3xl font-bold mt-4">Project summary</h1>
        <div id="project-container">
          {project && (
            <Card>
              <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-1 md:flex md:flex-row gap-4">
                <div className="w-[35%] space-y-2">
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  <div id="client">
                    <h2 className="text-lg font-bold">Client</h2>
                    <p className="pl-2">
                      {(project.client && (project.client as Client).name) ||
                        "Sin Cliente"}
                    </p>
                  </div>
                  <div id="description">
                    <h2 className="text-lg font-bold">Description</h2>
                    <p className="pl-2">{project.description}</p>
                  </div>
                </div>
                <div id="tasks" className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold my-4 ">Tasks</h2>
                    <Select
                      value={statusFilter}
                      onValueChange={handleStatusFilterChange}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="in-backlog">Backlog</SelectItem>
                        <SelectItem value="in-progress">In Progres</SelectItem>
                        <SelectItem value="complete">Complete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="">
                    <ProjectTaskTable
                      tasks={tasks}
                      statusFilter={statusFilter}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {
        showCommentsPanel && (
          <CommentsPanel
            comments={project?.comments}
            user={user}
            onSubmit={handleCommentSubmit}
            toggleCommentsPanel={toggleCommentsPanel}
          />
        )
      }

      <CreateTaskModal
        show={showCreateTaskModal}
        toggle={toggleCreateTaskModal}
        onSubmit={handleCreateTaskSubmit}
      />
    </>
  );
};

export default ProjectPage;
