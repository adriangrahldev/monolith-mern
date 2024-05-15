import { Task } from "@/interfaces/task";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import moment from "moment";
import { Button } from "../ui/button";
import Link from "next/link";

export const TaskTable = ({tasks}:{tasks: Task[]}) => {
  

  const getStatus = (status: string) => {
    switch (status) {
        case "in-progress":
            return "In Progress";
        case "completed":
            return "Completed";
        case "in-backlog":
            return "In Backlog";
        default:
            return "In Backlog";
    }
}

  return (
    <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[30%] font-bold">Title</TableHead>
                    <TableHead className="w-[20%] font-bold">Project</TableHead>
                    <TableHead className="w-[15%] font-bold">Start Date</TableHead>
                    <TableHead className="w-[15%] font-bold">End Date</TableHead>
                    <TableHead className="w-[20%] font-bold">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
                {tasks.map((task: Task, index:number) => (
                        <TableRow key={task._id} className={` hover:shadow-xl hover:bg-slate-200 cursor-pointer ${index % 2 === 0 ? 'bg-slate-100' : ''}`}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>
                              <Link href={`/projects/${task.projectId}`} className="p-0 underline">
                              {task.projectName}
                              </Link>
                            </TableCell>
                            <TableCell>
                                {
                                    task.startDate ? moment(task.startDate).format("MMM DD, YYYY") : "No Start Date"
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    task.endDate ? moment(task.endDate).format("MMM DD, YYYY") : "No End Date"
                                }
                            </TableCell>
                            <TableCell>
                               {getStatus(task.status)}
                            </TableCell>
                        </TableRow>
                ))}
            </TableBody>
        </Table>
  );
};

export default TaskTable;
