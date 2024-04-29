"use client"
import DefaultCard from "@/components/admin/DefaultCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ProyectPage = () => {
  const params = useParams();
  const { id } = params;

  const project = {
    _id: "a67b1a3b3b7e6d1se0b4e",
    name: "Landing Page",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    clientName: "John Doe",
    tasks: [
      {
        _id: "a67b1a3b3b7e6d1de0b4e",
        title: "Create the layout",
        assignee: "Jane Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        status: "in-progress",
      },
      {
        _id: "a67b1a3b3b17e6d1e0b4e",
        title: "Create the layout",
        assignee: "Jane Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        status: "in-progress",
      },
      {
        _id: "a67b1a3b3b37e6d1e0b4e",
        title: "Create the layout",
        assignee: "Jane Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        status: "in-backlog",
      },
    ],
  };

  return (
    <div className="h-screen space-y-4">
      <div
        id="toolbar"
        className="w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12"
      >
        <Button variant={"ghost"}>
          <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
          Add project
        </Button>
      </div>
      <hr />
      <h1 className="text-3xl font-bold mt-4">Project summary</h1>
      <div id="project-container">
        <Card>
          <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-1 md:flex md:flex-row gap-4">
            <div className="w-[35%] space-y-2">
              <h2 className="text-2xl font-bold">
                {project.name}
              </h2>
              <div id="client">
                <h2 className="text-lg font-bold">Client</h2>
                <p className="pl-5">{project.clientName}</p>
              </div>
              <div id="description">
                <h2 className="text-lg font-bold">Description</h2>
                <p className="pl-5">{project.description}</p>
              </div>
            </div>
            <div id="tasks" className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold my-4 ">Projects</h2>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">In Progres</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="confirm">To Confirm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {project.tasks.map((task) => (
                  <div
                    key={task._id}
                    className="hover:bg-gray-100"
                  >
                    <DefaultCard
                      title={task.title}
                      subtitle={task.status}
                      description={task.description}
                      counter={1}
                      counterText={"day"}
                      link={`/projects/${id}/tasks/${task._id}`}
                      footer={
                        <Progress
                          value={Math.floor(Math.random() * 100)}
                          max={100}

                        ></Progress>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProyectPage;
