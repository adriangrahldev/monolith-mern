"use client"
import DefaultCard from "@/components/admin/DefaultCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { faBriefcase, faPen, faPlusSquare, faRecycle, faTrash, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useCallback, useEffect, useState } from "react";




const ProyectPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { setItems, clearItems } = useBreadcrumb();
    const [client, setClient] = useState({
        name: "",
        email: "",
        phone: "",
        avatar: "",
        projects: [{ _id: "", title: "", counter: 0 }],
    });

    const fetchClient = useCallback(async () => {
        try {
            const res = await fetch(`/api/clients?clientId=${id}`);
            const data = await res.json();
            if (res.status === 401) {
                router.push('/api/auth/login');
            }
            if (res.status === 200) {
                setClient(data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [id, router]);

    useEffect(() => {
        fetchClient();
        clearItems();
        setItems([
            {
                title: "Clients",
                type: "link",
                link: "/clients",
            },
            {
                title: client.name,
                link: `/clients/${id}`,
            },
        ]);
    }, [id, clearItems, setItems, client.name, fetchClient]);

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
                                {
                                    client.avatar ?
                                        <div className="w-20 h-20 bg-gray-300 rounded-full">
                                            <Image
                                                src={client.avatar}
                                                alt={client.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                        : <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUserCircle} size="3x" />
                                        </div>
                                }
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
                                {!client.projects ?
                                    <div className="col-span-3 text-center">
                                        <FontAwesomeIcon icon={faBriefcase} size="5x" />
                                        <h2 className="text-2xl font-bold">No projects found</h2>
                                    </div>
                                    :
                                    client.projects.map((project) => (
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
