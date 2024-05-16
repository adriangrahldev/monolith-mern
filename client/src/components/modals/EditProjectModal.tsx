import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Client } from "@/interfaces/client";
import { Project } from "@/interfaces/project";

const EditProjectModal = ({
  show,
  toggle,
  onSubmit,
  project
}: {
  show: boolean;
  toggle: () => void;
  onSubmit?: (formData: Project) => void;
  project: Project
}) => {

  const [formData, setFormData] = useState<Project | undefined>(undefined);
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      if (res.status === 200) {
        setClients(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData!);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "startDate" || name === "endDate"
        ? moment(value).format("YYYY-MM-DD")
        : value;

    setFormData({
      ...formData!,
      [name]: formattedValue,
    });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(()=> {
    setFormData({...project})
  }, [project, show]);

  return show ? (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
      <div className="fixed w-screen h-screen bg-black opacity-50"></div>
      <Card className="z-50 w-fit shadow-xl animate-zoom">
        <CardHeader>
          <h1 className="font-bold text-xl">Edit Project</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <select
              className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              required
              name="client"
              value={(formData?.client as string)}
              disabled
            >
              <option value="" disabled>
                Select Client
              </option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Project Name"
              className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              name="name"
              value={formData?.name}
              onChange={onChange}
              required
            />
            <textarea
              placeholder="Description"
              className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              name="description"
              value={formData?.description}
              onChange={onChange}
              required
            ></textarea>

            <div className="flex gap-2 max-w-full">
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData?.startDate.split("T")[0]}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                  required
                />
              </div>
              <div className=" flex flex-col">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData?.endDate.split("T")[0]}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                  required
                />
              </div>
            </div>

            <div className="w-full flex justify-between mt-2">
              <button
                type="button"
                onClick={toggle}
                className="bg-gray-200 text-black rounded-md p-2 px-4 focus:outline-none focus:ring-2 hover:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" bg-black text-white rounded-md p-2 px-4 focus:outline-none focus:ring-2 hover:scale-95"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default EditProjectModal;