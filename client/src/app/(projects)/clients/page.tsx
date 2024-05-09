'use client'
import DefaultCard from "@/components/admin/DefaultCard";
import { Button } from "@/components/ui/button";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from 'react';
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useRouter } from "next/navigation";
import CreateClientModal from "@/components/modals/CreateClientModal";
import { Client } from "@/interfaces/client";
import { useUser } from "@auth0/nextjs-auth0/client";


const ClientsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { setItems, clearItems } = useBreadcrumb();

  const [clients, setClients] = useState<Client[]>([]);
  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch(`/api/clients?userId=${user?.sub}`);
      const data = await res.json();
      if (res.status === 401) {
        router.push('/api/auth/login');
      }
      if (res.status === 200) {
        setClients(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user, router])

  useEffect(() => {
    clearItems();
    setItems([{
      title: "Clients",
      link: "/clients",
    },])
    fetchClients();
  }, [fetchClients, setItems, clearItems])


  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleRegisterSubmit = async (formData: Client) => {
    console.log(formData);
    console.log(user);

    formData.userId = user?.sub as string;

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    fetchClients();
    toggleCreateModal();
  }

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  }

  return (
    <>
      <div id='toolbar' className='w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12 '>
        <Button variant={'ghost'} onClick={toggleCreateModal}>
          <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
          Add Client
        </Button>
      </div>
      <hr />
      <div id='projects-container' className='grid xl:grid-cols-4 grid-rows-3 gap-4 rounded-md lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 '>
        {clients.map((client, index) => (
          <DefaultCard key={index} title={client.name} counter={client.projectsCounter} counterText={'Projects'} avatar={client.avatar} link={`/clients/${client._id}`} />
        ))}
      </div>
      <CreateClientModal show={showCreateModal} toggle={toggleCreateModal} onSubmit={handleRegisterSubmit} />

    </>

  )
}

export default ClientsPage;