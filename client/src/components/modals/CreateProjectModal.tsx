import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Client } from "@/interfaces/client";
import { Project } from "@/interfaces/project";

const CreateProjectModal = ({
  show,
  toggle,
  onSubmit
}: {
  show: boolean;
  toggle: () => void;
  onSubmit?: (formData: Project) => void;
}) => {
  const [formData, setFormData] = useState<Project>({
    _id: "",
    userID: "",
    clientID: "",
    name: "",
    description: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    status: "pending",
  });

  const [clients, setClients] = useState<Client[]>([
    {
      _id: "1",
      userId: "151321",
      name: "Adrian Grahl",
      email: "client1@gmail.com",
      phone: "123456789",
    },
    {
      _id: "2",
      userId: "151322",
      name: "John Doe",
      email: "clien2@gmail.com",
      phone: "123456789",
    },
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "startDate" || name === "endDate"
        ? moment(value).format("YYYY-MM-DD")
        : value;

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  return show ? (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center">
      <div className="fixed w-screen h-screen bg-black opacity-50"></div>
      <Card className="z-50 w-2/6 shadow-xl animate-zoom">
        <CardHeader>
          <h1 className="font-bold text-xl">Create New Project</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <select
              className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              required
            >
              <option value="" disabled selected>
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
              value={formData.name}
              onChange={onChange}
              required
            />
            <textarea
              placeholder="Description"
              className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              name="description"
              value={formData.description}
              onChange={onChange}
              required
            ></textarea>

            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                  required
                />
              </div>
              <div className=" flex flex-col flex-1">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="self-end bg-black text-white rounded-md p-2 px-4 focus:outline-none focus:ring-2 hover:scale-95"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Register
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default CreateProjectModal;
