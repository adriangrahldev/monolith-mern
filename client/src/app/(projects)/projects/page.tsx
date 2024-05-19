"use client";
import { Button } from "@/components/ui/button";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultCard from "@/components/admin/DefaultCard";
import { useCallback, useEffect, useState } from "react";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import CreateProjectModal from "@/components/modals/CreateProjectModal";
import { Project } from "@/interfaces/project";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Progress } from "@/components/ui/progress";
import { SkeletonCard } from "@/components/skeletons/SkeletonCard";
import { toast } from "sonner";

const ProjectsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { setItems, clearItems } = useBreadcrumb();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [fetchingProjects, setFetchingProjects] = useState<boolean>(false);

  const fetchProjects = useCallback(async () => {
    setFetchingProjects(true);
    try {
      const res = await fetch(`/api/projects?userId=${user?.sub}`);
      const data = await res.json();
      if (res.status === 401) {
        router.push("/api/auth/login");
      }
      if (res.status === 200) {
        setProjects(data);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setFetchingProjects(false);
    }
  }, [user, router]);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const handleRegisterSubmit = (formData: FormData) => {
    const registerPromise = async () => {
      try {
        const userId = user?.sub as string;
        formData.append("userId", userId);

        const res = await fetch('/api/projects', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.status === 200 || res.status === 201) {
          return data;
        } else {
          throw new Error('Failed to register');
        }
      } catch (error) {
        throw error;
      }
    };

    toast.promise(
      registerPromise(),
      {
        loading: 'Registering project...',
        success: (data) => {
          fetchProjects();
          return `Project registered successfully!`;
        },
        error: (err) => `Registration failed: ${err.message}`,
      }
    );
  }


  useEffect(() => {
    clearItems();
    setItems([
      {
        title: "Projects",
        link: "/projects",
      },
    ]);
    fetchProjects();
  }, [fetchProjects, setItems, clearItems])

  return (
    <>
      <div
        id="toolbar"
        className="w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12 "
      >
        <Button
          variant={"ghost"}
          onClick={() => {
            toggleCreateModal();
          }}
        >
          <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
          Add Project
        </Button>
      </div>
      <hr />
      <div
        id="projects-container"
        className="grid xl:grid-cols-4 grid-rows-3 gap-4 rounded-md lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 "
      >
        {
          fetchingProjects && (
            <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
          )
        }

        {
          !fetchingProjects && projects.length === 0 && <p className="font-semibold text-xl text-center col-span-full">
            When you create a project, it will appear here
          </p>
        }
        {
          !fetchingProjects && projects.length > 0 && projects.map((project: Project, index) => (
            <DefaultCard
              key={index}
              title={project.name}
              subtitle={moment(project.createdAt).format("DD/MM/YYYY")}
              avatar={project.image ? project.image : ""}
              description={project.description}
              counter={project.tasksCounter || 0}
              counterText={"Tasks"}
              link={`/projects/${project._id}`}
              footer={
                <Progress
                  value={(project.completedTasksCounter! / project.tasksCounter! * 100) || 0}
                  max={100}
                > </Progress>
              }
            />
          ))
        }
      </div>
      <CreateProjectModal
        show={showCreateModal}
        toggle={toggleCreateModal}
        onSubmit={handleRegisterSubmit}
      />
    </>
  );
};

export default ProjectsPage;
