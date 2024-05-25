"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ErrorScreen from "@/components/ui/ErrorScreen";
import { Input } from "@/components/ui/input";
import { Client, Comment, Project, Task } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faClock, faImage, faRunning } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
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

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === "author") setAuthor(value);
    if (name === "content") setContent(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitPromise = new Promise(async (resolve, reject) => {
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
      success: "Comment sent!",
      error: "An error occurred",
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/view?projectId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProject(data);
      if (!data.isOnline) {
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
    <div className="flex justify-center items-center h-screen">
      <Image src="/isologo1.svg" alt="Monolith Logo" width={200} height={200} priority={true} />
      Loading...
    </div>
  );

  if (!project.isOnline) return <ErrorScreen message="This project is offline, please contact the administrator" />;

  return (
    <main className="overflow-hidden">
      {/* Header */}
      <header className="bg-slate-100 p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image src="/isologo1.svg" alt="Logo" width={48} height={48} className="mr-4" />
              <h1 className="text-2xl font-bold">Monolith</h1>
            </div>
          </Link>
          <div className="flex items-center">
            <Avatar className="mr-2">
              <AvatarImage src={client?.avatar} />
              <AvatarFallback>{client?.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{client?.name}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-1 md:mr-8">
            <h2 className="text-4xl font-bold mb-4">{project?.name}</h2>
            <p className="text-gray-700 text-lg mb-6">{project?.description}</p>
            <Button className="text-lg">View Demo</Button>
          </div>
          <div className="flex-1">
            {project.image &&
              <div className="relative w-full h-80">
                <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
              </div>
            }
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-8">Project Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-6 rounded-lg shadow-lg">
                <Image src={task.image || '/default-task-image.jpg'} alt={task.title} width={400} height={300} className="w-full h-48 object-cover rounded-lg mb-4" />
                {task.status === "completed" ? (
                  <Badge variant={"default"}><FontAwesomeIcon icon={faCheck} />&nbsp;Completed</Badge>
                ) : task.status === "in-progress" ? (
                  <Badge variant={"secondary"}><FontAwesomeIcon icon={faRunning} />&nbsp;In progress</Badge>
                ) : (
                  <Badge variant={"outline"}><FontAwesomeIcon icon={faClock} />&nbsp;In backlog</Badge>
                )}
                <h4 className="text-xl font-semibold mt-2">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
                <div className="flex items-center mt-2">
                  <Badge variant={"default"}>{moment(task.startDate).format("DD/MM/YYYY")}</Badge>
                  <FontAwesomeIcon icon={faArrowRight} className="mx-2" />
                  <Badge variant={"default"}>{moment(task.endDate).format("DD/MM/YYYY")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-2xl font-bold">Comments</h3>
            </CardHeader>
            <CardContent>
              {comments.length === 0 && <p>No comments found</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {comments.map((comment) => (
                  <div key={comment._id} className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold">{comment.author}</h4>
                    <p className="text-gray-600">{comment.content}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant={"default"}>{moment(comment.createdAt).format("DD-MM-YYYY hh:mm")}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold">Add Comment</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="author" className="block text-gray-700">Your name</label>
                  <Input type="text" id="author" name="author" value={author} onChange={handleValueChange} placeholder="Enter your name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-gray-700">Content</label>
                  <Input type="text" id="content" name="content" value={content} onChange={handleValueChange} placeholder="Enter your comment" />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default ViewProject;
