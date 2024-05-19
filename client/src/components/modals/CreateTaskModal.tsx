import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Task } from "@/interfaces/task";
import moment from "moment";
import Image from "next/image";
import { toast } from "sonner";
import { ValidImagesTypes } from "@/interfaces/ValidImagesTypes";

const CreateTaskModal = ({
  show,
  toggle,
  onSubmit,
}: {
  show: boolean;
  toggle: () => void;
  onSubmit?: (formData: FormData) => void;
}) => {
  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: "",
    status: "in-backlog",
    projectId: "",
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formDataForm = new FormData();
      formDataForm.append("title", formData.title);
      formDataForm.append("description", formData.description || "");
      formDataForm.append("startDate", formData.startDate);
      formDataForm.append("endDate", formData.endDate);
      formDataForm.append("status", formData.status);
      formDataForm.append("projectId", formData.projectId);
      if (image) {
        formDataForm.append("image", image);
      }
      onSubmit(formDataForm);
      setFormData({
        _id: "",
        title: "",
        description: "",
        startDate: moment().format("YYYY-MM-DD"),
        endDate: "",
        status: "in-backlog",
        projectId: "",
      });
      setImage(null);
      setPreview("");
      toggle();
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return show ? (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
      <div className="fixed w-screen h-screen bg-black opacity-50"></div>
      <Card className="z-50 w-2/6 max-lg:w-screen shadow-xl animate-zoom">
        <CardHeader>
          <h1 className="font-bold text-xl">Create New Task</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm font-semibold mb-1">
                Title *
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                name="title"
                value={formData.title}
                onChange={onChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-sm font-semibold mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm font-semibold mb-1">
                  End Date (optional)
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={onChange}
                  className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-sm font-semibold mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-transparent"
              >
                <option value="">Select Status</option>
                <option value="in-backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
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
                Create Task
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default CreateTaskModal;
