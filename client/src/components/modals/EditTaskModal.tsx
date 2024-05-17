import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Task } from "@/interfaces/task";
import moment from "moment";

const EditTaskModal = ({
  task,
  show,
  toggle,
  onSubmit,
}: {
  task: Task;
  show: boolean;
  toggle: () => void;
  onSubmit?: (formData: Task) => void;
}) => {
  const [formData, setFormData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (onSubmit) {
      onSubmit(formData);
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

  useEffect(() => {
    setFormData({...task});
  }, [task]);

  return (show && formData) ? (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
      <div className="fixed w-screen h-screen bg-black opacity-50"></div>
      <Card className="z-50 w-2/6 max-lg:w-screen shadow-xl animate-zoom">
        <CardHeader>
          <h1 className="font-bold text-xl">Edit Task</h1>
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
                  value={moment(formData.startDate).format("YYYY-MM-DD")}
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
                  value={moment(formData.endDate).format("YYYY-MM-DD")}
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
                Save Changes
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : null;
};

export default EditTaskModal;
