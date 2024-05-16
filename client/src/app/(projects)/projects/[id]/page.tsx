"use client";
// Importaciones de librerías y componentes externos
import { faArrowsLeftRight, faChevronCircleRight, faCommentDots, faEdit, faEye, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "sonner";

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
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import EditTaskModal from "@/components/modals/EditTaskModal";
import Link from "next/link";
import EditProjectModal from "@/components/modals/EditProjectModal";
import { Badge } from "@/components/ui/badge";

// Componente principal
const ProjectPage = () => {
  // Hooks de estado
  const [project, setProject] = useState<Project | undefined>();
  const [commentContent, setCommentContent] = useState("");
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetchingTasks, setFetchingTasks] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  // Hooks de contexto
  const { setItems } = useBreadcrumb();

  // Hooks de routing
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // Hook de autenticación
  const { user } = useUser();

  // Funciones de manejo de estado
  const toggleCreateTaskModal = () => {
    setShowCreateTaskModal(!showCreateTaskModal);
  };
  const toggleCommentsPanel = () => {
    setShowCommentsPanel(!showCommentsPanel);
  };
  const toggleEditTaskModal = () => {
    setShowEditTaskModal(!showEditTaskModal);
  };
  const toggleEditProjectModal = () => {
    setShowEditProjectModal(!showEditProjectModal);
  }

  // Funcion para manejar la actualización de una tarea
  const handleEditTaskSubmit = async (formData: Task) => {
    const updateTaskPromise = async () => {
      setFetchingTasks(true);
      const data = {
        ...formData,
        projectId: id,
        userId: user?.sub as string,
      };

      try {
        const res = await fetch(`/api/tasks?taskId=${formData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 401) {
          router.push("/api/auth/login");
        }
        fetchTasks();
        toggleEditTaskModal();
        fetchProject();
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    toast.promise(updateTaskPromise(), {
      loading: "Updating task...",
      success: (data) => {
        fetchTasks();
        setFetchingTasks(false);
        return `Task updated successfully!`;
      },
      error: (err) => `Task update has failed: ${err.message}`,
    });
  };

  // Funcion para manejar la eliminación de una tarea
  const handleDeleteTask = async (task: Task) => {
    const deleteTaskPromise = async () => {
      setFetchingTasks(true);
      try {
        const res = await fetch(`/api/tasks?taskId=${task._id}`, {
          method: "DELETE",
        });
        if (res.status === 401) {
          router.push("/api/auth/login");
        }
        fetchTasks();
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    toast.promise(deleteTaskPromise(), {
      loading: "Deleting task...",
      success: (data) => {
        fetchTasks();
        setFetchingTasks(false);
        return `Task deleted successfully!`;
      },
      error: (err) => `Task deletion has failed: ${err.message}`,
    });
  };

  // Funcion para manejar la creación de una tarea
  const handleCreateTaskSubmit = async (formData: Task) => {
    const createTaskPromise = async () => {
      setFetchingTasks(true);
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
        throw error;
      }
    };

    toast.promise(createTaskPromise(), {
      loading: "Registering task...",
      success: (data) => {
        fetchTasks();
        setFetchingTasks(false);
        return `Task created successfully!`;
      },
      error: (err) => `Task creation has failed: ${err.message}`,
    });
  };

  // Funcion para manejar el cambio de filtro de estado
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  // Funcion para manejar el envio de un comentario
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

  // Funcion para manejar la actualización de una tarea
  const handleTaskUpdate = async (task: Task, status: string) => {
    const updateTaskPromise = async () => {
      const data = {
        ...task,
        status: status,
      };

      try {
        const res = await fetch(`/api/tasks?taskId=${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 401) {
          router.push("/api/auth/login");
        }
      } catch (error) {
        throw error;
      }
    };

    toast.promise(updateTaskPromise(), {
      loading: "Updating task...",
      success: (data) => {
        fetchTasks();
        return `Task updated successfully!`;
      },
      error: (err) => `Update failed: ${err.message}`,
    });
  };


  // Funcion para manejar la actualización de un proyecto
  const handleEditProjectSubmit = async (formData: Project) => {
    const updateProjectPromise = async () => {
      const data = {
        ...formData,
      };

      try {
        const res = await fetch(`/api/projects?projectId=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 401) {
          router.push("/api/auth/login");
        }
        fetchProject();
        toggleEditProjectModal();
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    toast.promise(updateProjectPromise(), {
      loading: "Updating project...",
      success: (data) => {
        fetchProject();
        return `Project updated successfully!`;
      },
      error: (err) => `Update failed: ${err.message}`,
    });
  };

  // Funciones de efecto para obtener los datos del proyecto y las tareas
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

  // Funciones de efecto para obtener los datos del proyecto
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
    } catch (error) {
      console.log(error);
    }
  }, [id, router]);


  // Efectos para actualizar el breadcrumb y obtener los datos del proyecto y las tareas
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


  // Efectos para obtener los datos del proyecto y las tareas
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // Efectos para obtener los datos de las tareas
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
            <Button variant={"ghost"} onClick={toggleEditProjectModal}>
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Project
            </Button>
            <Button variant={"ghost"} onClick={toggleCreateTaskModal}>
              <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
              Add Task
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <Button variant={"ghost"} onClick={toggleCommentsPanel}>
              <FontAwesomeIcon icon={faCommentDots} className="mr-2 max-lg:mr-0" />
              <span className="max-lg:hidden">Comments</span>
            </Button>
          </div>
        </div>
        <hr />
        <h1 className="text-3xl font-bold mt-4">Project summary</h1>
        <div id="project-container">
          {project && (
            <Card>
              <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-1 md:flex md:flex-row gap-4">
                <div className="w-[35%] max-lg:w-full space-y-2">
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  <div id="client">
                    <h2 className="text-md font-semibold text-gray-500">Client</h2>
                    <div className="font-bold">
                      {project.client && 
                        (
                          <div className="flex gap-2">
                          {(project.client as Client).name}
                          <Link href={'/clients/'+(project.client as Client)._id} className="w-6 h-6 " >
                            <FontAwesomeIcon icon={faChevronCircleRight} />
                          </Link>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div id="dates">
                    <h2 className="text-md font-semibold text-gray-500">Date</h2>
                    <div className="font-bold flex gap-2 items-center">
                      <Badge variant={'outline'}>{project.startDate.split('T')[0]}</Badge>
                      <FontAwesomeIcon icon={faArrowsLeftRight} />
                      <Badge variant={'outline'}>{project.endDate.split('T')[0]}</Badge>
                    </div>
                  </div>
                  <div id="description">
                    <h2 className="text-md font-semibold text-gray-500">Description</h2>
                    <p className="font-bold">{project.description}</p>
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
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="">
                    {fetchingTasks && <TableSkeleton />}
                    {!fetchingTasks && tasks.length === 0 && <p>No tasks</p>}
                    {!fetchingTasks && tasks.length > 0 && (
                      <ProjectTaskTable
                        tasks={tasks}
                        statusFilter={statusFilter}
                        handleTaskUpdate={handleTaskUpdate}
                        handleEditTask={(task: Task) => {
                          setSelectedTask(task);
                          toggleEditTaskModal();
                        }}
                        handleDeleteTask={handleDeleteTask}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {showCommentsPanel && (
        <CommentsPanel
          comments={project?.comments}
          user={user}
          onSubmit={handleCommentSubmit}
          toggleCommentsPanel={toggleCommentsPanel}
        />
      )}

      <CreateTaskModal
        show={showCreateTaskModal}
        toggle={toggleCreateTaskModal}
        onSubmit={handleCreateTaskSubmit}
      />

      {selectedTask && (
        <EditTaskModal
          show={showEditTaskModal}
          toggle={toggleEditTaskModal}
          task={selectedTask}
          onSubmit={handleEditTaskSubmit}
        />
      )}
      
      <EditProjectModal 
      project={project!}
      show={showEditProjectModal}
      toggle={toggleEditProjectModal}
      onSubmit={(formData)=>{handleEditProjectSubmit(formData!)}}
      />
      
    </>
  );
};

export default ProjectPage;
