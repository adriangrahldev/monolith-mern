"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ErrorScreen from "@/components/ui/ErrorScreen";
import { Input } from "@/components/ui/input";
import { Client } from "@/interfaces/client";
import { Comment } from "@/interfaces/comment";
import { Project } from "@/interfaces/project";
import { Task } from "@/interfaces/task";

import {
    faArrowRight,
  faArrowRightArrowLeft,
  faArrowsLeftRight,
  faCheck,
  faClock,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "author") setAuthor(value);
    if (name === "content") setContent(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const submitPromise = new Promise(async (resolve, reject) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author,
                content,
                projectId: id,
                admin: false
            }),
            });
            const data = await response.json();
            setComments([...comments, data]);
            resolve(data);
        } catch (error) {
            console.error(error);
            reject(error);
        } finally {
            setAuthor(client?.name || "");
            setContent("");
        }
    });

    toast.promise(submitPromise, {
        loading: "Sending comment...",
        success: "Comment send!",
        error: "An error occurred",
    });
  };


  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/view?projectId=${id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProject(data);
      if(!data.isOnline){
        toast.error("This project is offline, please contact your administrator");
      }
      setClient(data.client as Client);
      setTasks(data.tasks as Task[]);
      setComments(data.comments as Comment[]);
      setAuthor(data.client?.name || "");
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!project || !client) return (
    <div className="flex animate-zoom-repeat justify-center flex-col items-center w-screen h-screen">
            <Image src="/isologo1.svg" alt="Monolith Logo" width={200} height={200} priority={true} />
            Loading...
        </div>
  );
  if(!project.isOnline) return <ErrorScreen message="This project is offline, please contact the administrator" />;
  return (
    <main className="overflow-hidden">
      <header className="bg-slate-100">
        <div id="headerInfo">
          <div
            id="projectInfo"
            className="p-6 max-lg:p-2 w-full grid grid-cols-12 items-center"
          >
            <div id="appLogo" className="hidden max-lg:flex col-span-12 ">
              <Image src="/isologo1.svg" alt="Logo" width={48} height={48} />
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <h1 className="text-6xl max-lg:text-3xl font-semibold">{project?.name}</h1>
              <div className="flex items-center">
                <Badge variant={"default"}>
                  {moment(project?.startDate).format("DD/MM/YYYY")}
                </Badge>
                <FontAwesomeIcon icon={faArrowsLeftRight} className="mx-2" />
                <Badge variant={"default"}>
                  {moment(project?.endDate).format("DD/MM/YYYY")}
                </Badge>
              </div>
              <p className="mb-2 text-gray-500 font-semibold text-lg">
                {project?.description}
              </p>
            </div>
            <div id="appLogo" className="max-lg:hidden">
              <Image src="/isologo1.svg" alt="Logo" width={96} height={96} />
            </div>
          </div>
          <div className="grid grid-cols-3 max-lg:grid-cols-1 bg-black p-4 w-full">
            <div
              id="clientInfo"
              className="flex items-center gap-2 justify-center max-lg:justify-start max-lg:border-b-2 border-gray-500 pb-3"
            >
              <Avatar>
                <AvatarImage src={client?.avatar} />
                <AvatarFallback>
                  {client?.name!.charAt(0)!.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-white">
                <p className="font-semibold">{client?.name}</p>
                <p className="font-semibold">{client?.email}</p>
              </div>
            </div>
            <div
              id="taskCounter"

              className="flex items-center gap-2 justify-center max-lg:justify-start max-lg:border-b-2 border-gray-500 py-3"            >
              <span className="text-white font-semibold text-lg">
                {project?.tasksCounter} Total tasks
              </span>
            </div>
            <div
              id="completedTask"

              className="flex items-center gap-2 justify-center max-lg:justify-start max-lg:border-b-2 border-gray-500 py-3"            >
              <span className="text-white font-semibold text-lg">
                {project?.completedTasksCounter} Completed tasks
              </span>
            </div>
          </div>
        </div>
      </header>
      <Card id="taskView" className="p-4 max-lg:p-0 border-none shadow-none w-full">
        <CardHeader>
          <h1 className="text-2xl font-bold">Tasks</h1>
        </CardHeader>
        <CardContent>
          {
            tasks.length === 0 && (
                <p>No tasks found</p>
            )
          }
          <div id="taskList" className="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
            {tasks.map((task) => (
              <div key={task._id} className="bg-slate-100 p-4 max-lg:p-1.5">
                    {/* Show task status (in-progess, in-backlog and completed) */}
                    {
                        task.status === "completed" ? (
                            <Badge variant={"default"}><FontAwesomeIcon icon={faCheck}/>&nbsp;Completed</Badge>
                        ) : task.status === "in-progress" ? (
                            <Badge variant={"secondary"}>&nbsp;
                            <FontAwesomeIcon icon={faRunning}/>&nbsp;
                             In progress</Badge>
                        ) : (
                            <Badge variant={"outline"}>
                                <FontAwesomeIcon icon={faClock}/>&nbsp;
                                In backlog</Badge>
                        )
                    }
                <h2 className="text-2xl font-semibold">{task.title}</h2>
                <p className="text-gray-500 font-semibold">
                  {task.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={"default"}>
                    {moment(task.startDate).format("DD/MM/YYYY")}
                  </Badge>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="mx-2"
                  />
                  <Badge variant={"default"}>
                    {task.endDate === null
                      ? "No end date"
                      : moment(task.endDate).format("DD/MM/YYYY")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card id="commentView" className="p-4 max-lg:p-0 border-none shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-bold">Comments</h1>
        </CardHeader>
        <CardContent>
          {
            comments.length === 0 && (
                <p>No comments found</p>
            )
          }
          <div id="commentList" className="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-slate-100 p-4">
                <h2 className="text-2xl font-semibold">{comment.author}</h2>
                <p className="text-gray-500 font-semibold">{comment.content}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={"default"}>
                    {moment(comment.createdAt).format("DD-MM-YYYY hh:mm")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card id="commentForm" className="border-none shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-bold">Add Comment</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Your name
              </label>
              <Input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={handleValueChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Content
              </label>
              <Input
                id="content"
                name="content"
                value={content}
                onChange={handleValueChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your comment"
              ></Input>
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ViewProject;
