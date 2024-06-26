import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Client } from "@/interfaces/client";

const CreateClientModal = ({
  show,
  toggle,
  onSubmit,
}: {
  show: boolean;
  toggle: () => void;
  onSubmit?: (formData: Client) => void;
}) => {
  const [formData, setFormData] = useState<Client>({
    _id: "",
    userId: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return show ? (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center">
      <div className="fixed w-screen h-screen bg-black opacity-50"></div>
      <Card className="z-50 w-2/6 shadow-xl animate-zoom">
        <CardHeader>
          <h1 className="font-bold text-xl">Register New Client</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Client Name"
              className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />

            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                  required
                />
              </div>
              <div className=" flex flex-col flex-1">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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
              Create Client
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default CreateClientModal;
