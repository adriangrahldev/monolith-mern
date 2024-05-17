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
import { toast } from "sonner";
import { SkeletonCard } from "@/components/skeletons/SkeletonCard";

const ClientsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { setItems, clearItems } = useBreadcrumb();
  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState<Client[]>([]);
  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/clients?userId=${user?.sub}`);
      const data = await res.json();
      if (res.status === 401) {
        router.push('/api/auth/login');
      }
      if (res.status === 200) {
        setLoading(false);
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

  const handleRegisterSubmit = (formData: FormData) => {
    const registerPromise = async () => {
      try {
        formData.append('userId', user?.sub as string);
        const res = await fetch('/api/clients', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.status === 200 || res.status === 201) {
          return data;
        } else if (res.status === 409) {
          throw new Error('Client email already exists');
        }
        else {
          throw new Error('Failed to register');
        }
      } catch (error) {
        throw error;
      }
    };

    toast.promise(
      registerPromise(),
      {
        loading: 'Registering client...',
        success: (data) => {
          fetchClients();
          toggleCreateModal();
          return `Client registered successfully!`;
        },
        error: (err) => `Registration failed: ${err.message}`,
      }
    );
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

        {loading ?
          Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
          :
          clients.map((client, index) => (
            <DefaultCard key={index} title={client.name} counter={client.projectsCounter} counterText={'Projects'} avatar={client.avatar} link={`/clients/${client._id}`} />
          ))}

          {
            clients.length === 0 && !loading && <p className="font-semibold text-xl text-center col-span-full">
            When you create a client, it will appear here
          </p>
          
          }
      </div>
      <CreateClientModal show={showCreateModal} toggle={toggleCreateModal} onSubmit={handleRegisterSubmit} />

    </>

  )
}

export default ClientsPage;