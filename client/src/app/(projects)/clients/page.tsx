'use client'
import DefaultCard from "@/components/admin/DefaultCard";
import { Button } from "@/components/ui/button";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useParams } from "next/navigation";
import CreateClientModal from "@/components/modals/CreateClientModal";
import { Client } from "@/interfaces/client";


const ClientsPage = () => {
  const params = useParams();
  const { id } = params;
  const { setItems, clearItems } = useBreadcrumb();

  useEffect(() => {
    clearItems();
    setItems([{
      title: "Clients",
      link: "/clients",
    },])
  }, [])



  const clients = [
    {
      _id: "a67b1a3b3b73e6d1e0b4e",
      name: 'Adrian Grahl',
      totalProjects: 5,
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg'
    },
    {
      _id: "a67b1a3b3b73e6d1e0b4e",
      name: 'Adrian Grahl',
      totalProjects: 5,
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg'

    },
    {
      _id: "a67b1a3b3b73e6d1e0b4e",
      name: 'Adrian Grahl',
      totalProjects: 5,
    },
    {
      _id: "a67b1a3b3b73e6d1e0b4e",
      name: 'Adrian Grahl',
      totalProjects: 5,
    },
    {
      _id: "a67b1a3b3b73e6d1e0b4e",
      name: 'Adrian Grahl',
      totalProjects: 5,
    },


  ]

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleRegisterSubmit = (formData: Client) => {
    console.log(formData);
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
          <DefaultCard key={index} title={client.name} counter={Math.round(Math.random() * 100)} counterText={'Projects'} avatar={client.avatar} link={`/clients/${client._id}`} />
        ))}
      </div>
      <CreateClientModal show={showCreateModal} toggle={toggleCreateModal} onSubmit={handleRegisterSubmit} />

    </>

  )
}

export default ClientsPage;