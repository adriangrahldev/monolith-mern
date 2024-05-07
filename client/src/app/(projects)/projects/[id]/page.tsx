"use client"
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import moment from "moment";
import Image from "next/image";

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
import { Task } from "@/interfaces/task";
import { Project } from "@/interfaces/project";
import { Client } from "@/interfaces/client";

const ProjectPage = () => {
  const user = useUser();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [project, setProject] = useState<Project | undefined>();
  const [commentContent, setCommentContent] = useState("");
  const { setItems } = useBreadcrumb();

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const toggleCreateTaskModal = () => {
    setShowCreateTaskModal(!showCreateTaskModal);
  };

  const handleCreateTaskSubmit = (formData: Task) => {
    console.log(formData);
    toggleCreateTaskModal();
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      content: commentContent,
      admin: true,
      author: user.user?.nickname || "Admin",
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

  return (
    <>
      <div className="h-screen space-y-4">
        <div
          id="toolbar"
          className="w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12"
        >
          <Button variant={"ghost"} onClick={toggleCreateTaskModal}>
            <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
            Add Task
          </Button>
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
                      {(project.client as Client).name || ""}
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
                    <Select>
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">In Progres</SelectItem>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="confirm">To Confirm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {/* {project.tasks.map((task) => (
                      <div
                        key={task._id}
                        className="hover:bg-gray-100"
                      >
                        <DefaultCard
                          title={task.title}
                          subtitle={task.status === "in-progress" ? "In Progress" : task.status === "in-backlog" ? "In Backlog" : "Complete"}
                          description={task.description}
                          counter={1}
                          counterText={"day"}
                          footer={
                            <Progress
                              value={Math.floor(Math.random() * 100)}
                              max={100}

                            ></Progress>
                          }
                        />
                      </div>
                    ))} */}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <h1 className="text-3xl font-bold mt-4">Comments</h1>
        <div id="comments-container">
          <Card>
            <CardContent className="pt-4">
              <div id="comments">
                {project?.comments?.length ? (
                  project?.comments?.map((comment) => (
                    <div key={comment._id} className={`flex gap-4 ps-4 py-2 border-b-2 mb-1 border-s-2 ${comment.admin ? 'border-s-black' : 'border-s-gray-400'}`}>
                      <div className="w-12 h-12 bg-gray-200 rounded-full">
                        {user.user?.picture ? (
                          <Image src={user.user?.picture} alt="avatar" className="w-full h-full rounded-full" width={64} height={64} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <h1 className="text-2xl font-bold">{comment.author?.charAt(0)}</h1>
                          </div>
                        )
                        }
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2
                            className={`font-bold  ${
                              comment.admin ? "text-black" : "text-gray-600"
                            }`}
                          >
                            {comment.author || "Undefined Author"}
                          </h2>
                          <span className="text-xs border-s-2 ps-2">
                            {moment(comment.createdAt).format("MMM DD, YYYY hh:mm")}
                          </span>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments</p>
                )}
              </div>
              <hr className="my-2" />
              <form onSubmit={handleCommentSubmit}>
                <div id="add-comment" className="flex flex-col">
                  <textarea
                    placeholder="Add a comment"
                    name="content"
                    id="content"
                    className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                    required
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  ></textarea>
                  <div>
                    <Button variant="default" type="submit" className="mt-2">
                      Add Comment
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <CreateTaskModal
        show={showCreateTaskModal}
        toggle={toggleCreateTaskModal}
        onSubmit={handleCreateTaskSubmit}
      />
    </>
  );
};

export default ProjectPage;
