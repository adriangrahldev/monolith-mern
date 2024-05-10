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
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import CreateProjectModal from "@/components/modals/CreateProjectModal";
import CreateClientModal from "@/components/modals/CreateClientModal";
import { Client } from "@/interfaces/client";
import { toast } from "sonner";
import { ClientSkeleton } from "@/components/skeletons/ClientSkeleton";




const ClientPage = () => {

    const router = useRouter();
    const params = useParams();
    const { id } = params;


    const { setItems, clearItems } = useBreadcrumb();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);


    const [client, setClient] = useState<Client>({
        _id: "",
        userId: "",
        name: "",
        email: "",
        phone: "",
        projectsCounter: 0,
    });
    const [projects, setProjects] = useState([
        {
            name: "",
            tasksCounter: 0,
            completedTasksCounter: 0,
            _id: "",
        },
    ]);

    const fetchClient = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/clients?clientId=${id}`);
            const data = await res.json();
            console.log(data);
            if (res.status === 401) {
                router.push('/api/auth/login');
            }
            if (res.status === 200) {
                setClient(data.client);
                setProjects(data.projects);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [id, router]);

    const handleDelete = () => {
        const deletePromise = async () => {
            try {
                const res = await fetch(`/api/clients?clientId=${id}`, {
                    method: 'DELETE',
                });
                const data = await res.json();
                if (res.status === 200) {
                    return data;
                } else {
                    throw new Error('Failed to delete');
                }
            } catch (error) {
                throw error;
            }
        };

        toast.promise(
            deletePromise(),
            {
                loading: 'Deleting client...',
                success: (data) => {
                    router.push('/clients');
                    return 'Client successfully deleted!';
                },
                error: (err) => `Deletion failed: ${err.message}`,
            }
        );
    }
    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }


    const handleEdit = (formData: Client) => {
        const editPromise = async () => {
            try {
                const res = await fetch(`/api/clients?clientId=${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (res.status === 200) {
                    return data;
                } else if (res.status === 409) {
                    throw new Error('Client email already exists');
                }
                else {
                    throw new Error('Failed to update');
                }
            } catch (error) {
                throw error;
            }
        };

        toast.promise(
            editPromise(),
            {
                loading: 'Updating client information...',
                success: (data) => {
                    toggleEditModal();
                    fetchClient();
                    return `Client information updated successfully!`;
                },
                error: (err) => `Update failed: ${err.message}`,
            }
        );
    }


    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    }

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
        <>
            <div className="h-screen space-y-4">
                <div
                    id="toolbar"
                    className="w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12"
                >
                    <Button variant={"ghost"}>
                        <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
                        Add Project
                    </Button>
                    <Button variant={"ghost"} onClick={toggleEditModal}>
                        <FontAwesomeIcon icon={faPen} className="mr-2" />
                        Edit Client
                    </Button>
                    <Button variant={"ghost"} onClick={toggleDeleteModal}>
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Delete Client
                    </Button>

                </div>
                <hr />
                <h1 className="text-3xl font-bold mt-4">Client Summary</h1>
                {loading ? <ClientSkeleton /> :
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
                                        {projects.length == 0 ?
                                            <div className="col-span-3 text-center">
                                                <FontAwesomeIcon icon={faBriefcase} size="5x" />
                                                <h2 className="text-2xl font-bold">No projects found</h2>
                                            </div>
                                            :
                                            projects.map((project) => (
                                                <div
                                                    key={project._id}
                                                    className="hover:bg-gray-100"
                                                >
                                                    <DefaultCard
                                                        title={project.name}
                                                        counter={project.tasksCounter}
                                                        counterText={"Tasks"}
                                                        link={`/projects/${project._id}`}
                                                        footer={
                                                            <Progress
                                                                value={project.completedTasksCounter / project.tasksCounter * 100}
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
                    </div>}
            </div>


            <DeleteConfirmationModal
                show={showDeleteModal}
                toggle={toggleDeleteModal}
                onDelete={handleDelete}
                name={client.name}
                type="client"
            />
            <CreateClientModal
                show={showEditModal}
                toggle={toggleEditModal}
                onSubmit={handleEdit}
                initialData={client}
            />
        </>
    );
};

export default ClientPage;
