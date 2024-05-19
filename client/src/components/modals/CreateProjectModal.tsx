import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Client } from "@/interfaces/client";
import { Project } from "@/interfaces/project";
import Image from "next/image";
import { toast } from "sonner";
import { ValidImagesTypes } from "@/interfaces/ValidImagesTypes";

const CreateProjectModal = ({
  show,
  toggle,
  onSubmit,
  initialData,
  initialClient
}: {
  show: boolean;
  toggle: () => void;
  onSubmit?: (formData: FormData) => void;
  initialData?: Project;
  initialClient?: Client;
}) => {
  const [formData, setFormData] = useState<Project>({
    userId: "",
    client: initialClient?._id || "",
    name: "",
    description: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    status: "pending",
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [preview, setPreview] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const validImageTypes = Object.values(ValidImagesTypes);
      if (validImageTypes.includes(file.type as ValidImagesTypes)) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Invalid image type");
        setImage(null);
        e.target.value = "";
      }
    }
  };

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
    if (onSubmit) {
      const formDataForm = new FormData();
      formDataForm.append("client", formData.client as string); // Aseguramos que sea string
      formDataForm.append("name", formData.name);
      formDataForm.append("description", formData.description);
      formDataForm.append("startDate", formData.startDate);
      formDataForm.append("endDate", formData.endDate);
      formDataForm.append("status", formData.status);
      if (image) {
        formDataForm.append("image", image);
      }
      onSubmit(formDataForm);
      toggle();
      setFormData({
        userId: "",
        client: initialClient?._id || "",
        name: "",
        description: "",
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        status: "pending",
      });
      setImage(null);
      setPreview("");
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreview(initialData.image ? initialData.image : "");
    }
  }, [initialData]);

  return show ? (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
      <div className="fixed w-screen h-screen bg-black opacity-50"></div>
      <Card className="z-50 shadow-xl animate-zoom max-lg:w-screen">
        <CardHeader>
          <h1 className="font-bold text-xl">
            {initialData ? "Edit Project" : "Create New Project"}
          </h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <select
              className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              required
              name="client"
              value={formData.client as string}
              onChange={onChange}
              disabled={initialClient ? true : false}
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
                  value={formData.startDate.split("T")[0]}
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
                  value={formData.endDate.split("T")[0]}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm font-semibold mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              />
              {preview && (
                <div className="relative mt-2 h-32 w-32">
                  <Image src={preview} alt="Image Preview" fill style={{ objectFit: 'cover' }} />
                </div>
              )}
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
                className="bg-black text-white rounded-md p-2 px-4 focus:outline-none focus:ring-2 hover:scale-95"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {initialData ? "Save Changes" : "Save Project"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default CreateProjectModal;
