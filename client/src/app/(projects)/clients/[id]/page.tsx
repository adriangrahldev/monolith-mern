"use client"
import DefaultCard from "@/components/admin/DefaultCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { faPen, faPlusSquare, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";


const client = {
    _id: "a67b1a3b3b7e6d1se0b4e",
    name: "Jhon Doe",
    email: "jhon@doe.com",
    phone: "0971123456",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    projects: [
        {
            _id: "a67b1a3b3b73e6d1e0b4e",
            title: 'Landing Page',
            subtitle: 'Adrian Grahl',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            counter: Math.round(Math.random() * 100),
            counterText: 'Tasks',
        },
        {
            _id: "a67b1a3b3b71e6d1e0b4e",
            title: 'E-commerce',
            subtitle: 'Adrian Grahl',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            counter: Math.round(Math.random() * 100),
            counterText: 'Tasks',
        },
        {
            _id: "a67b1a3b3b7e6d1e05b4e",
            title: 'Blog',
            subtitle: 'Adrian Grahl',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            counter: Math.round(Math.random() * 100),
            counterText: 'Tasks',
        },
        {
            _id: "a67b1a3b3b7e6d1e05bs4e",
            title: 'Blog',
            subtitle: 'Adrian Grahl',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            counter: Math.round(Math.random() * 100),
            counterText: 'Tasks',
        },
    ],
};

const ProyectPage = () => {
    const params = useParams();
    const { id } = params;
    const { setItems, clearItems } = useBreadcrumb();



    useEffect(() => {
        clearItems();
        setItems([
            {
                title: "Clients",
                type: "link",
                link: "/clients",
            },
            {
                title: client.name,
                type: "link",
                link: `/client/${id}`,
            },
        ]);
    }, [id]);

    return (
        <div className="h-screen space-y-4">
            <div
                id="toolbar"
                className="w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12"
            >
                <Button variant={"ghost"}>
                    <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
                    Add Project
                </Button>
                <Button variant={"ghost"}>
                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                    Edit Client
                </Button>
                <Button variant={"ghost"}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete Client
                </Button>

            </div>
            <hr />
            <h1 className="text-3xl font-bold mt-4">Project summary</h1>
            <div id="client-container">
                <Card>
                    <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-1 md:flex md:flex-row gap-4">
                        <div className="space-y-2 md:w-[35%]">
                            <h2 className="text-2xl font-bold">
                                {client.name}
                            </h2>
                            <div className="flex align-middle justify-center">
                                <Image src={client.avatar} alt="avatar" width={70} height={70} className="rounded-full h-fit" />
                            </div>
                            <div id="email">
                                <h2 className="text-lg font-bold">Email:</h2>
                                <p className="pl-5">{client.email}</p>
                            </div>
                            <div id="phone">
                                <h2 className="text-lg font-bold">Phone:</h2>
                                <p className="pl-5">{client.phone}</p>
                            </div>
                        </div>
                        <div id="projects" className="flex-1">
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
                            <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {client.projects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="hover:bg-gray-100"
                                    >
                                        <DefaultCard
                                            title={project.title}
                                            counter={project.counter}
                                            counterText={"Tasks"}
                                            link={`/projects/${project._id}`}
                                            footer={
                                                <Progress
                                                    value={Math.floor(Math.random() * 100)}
                                                    max={100}
                                                > </Progress>
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
