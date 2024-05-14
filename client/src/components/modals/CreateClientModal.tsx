import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { Client } from "@/interfaces/client";
import Image from "next/image";
import { ValidImagesTypes } from "@/interfaces/ValidImagesTypes";
import { toast } from "sonner";

const CreateClientModal = ({
  show,
  toggle,
  onSubmit,
  initialData,
}: {
  show: boolean;
  toggle: () => void;
  onSubmit?: (formData: FormData) => void;
  initialData?: Client;
}) => {
  const [formData, setFormData] = useState<Client>({
    _id: "",
    userId: "",
    name: "",
    email: "",
    phone: "",
    projectsCounter: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreview(initialData.avatar ? initialData.avatar : "");
    }
  }, [initialData]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview("");
    }
  }, [image]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {

      const formDataForm = new FormData();
      formDataForm.append("name", formData.name);
      formDataForm.append("email", formData.email ? formData.email : "");
      formDataForm.append("phone", formData.phone ? formData.phone : "");
      if (image) {

        formDataForm.append("image", image);
      }
      console.log(formDataForm);
      onSubmit(formDataForm);
    }
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

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const validImageTypes = Object.values(ValidImagesTypes);
      if (validImageTypes.includes(file.type as ValidImagesTypes)) {
        setImage(file);
      } else {
        toast.error("Invalid image type");
        setImage(null);
        e.target.value = "";
      }
    }
  };

  return show ? (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
      <div className="fixed w-screen h-screen bg-black opacity-50"></div>
      <Card className="z-50 w-full max-w-lg md:max-w-2xl shadow-xl animate-zoom">
        <CardHeader>
          <h1 className="font-bold text-xl">Register New Client</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm font-semibold mb-1">
                Client Name
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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
                <FontAwesomeIcon icon={initialData ? faEdit : faSave} className="mr-2" />
                {initialData ? "Update" : "Create Client"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default CreateClientModal;
