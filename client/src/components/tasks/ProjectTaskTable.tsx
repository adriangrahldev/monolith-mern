import { Task } from "@/interfaces/task";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import moment from "moment";

const ProjectTaskTable = ({tasks, statusFilter}:{
    tasks: Task[],
    statusFilter: string
}) => {


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
                    <TableHead className="w-[35%]">Description</TableHead>
                    <TableHead className="w-[20%]">Start Date</TableHead>
                    <TableHead className="w-[20%]">End Date</TableHead>
                    <TableHead className="w-[15%]">Status</TableHead>
                    <TableHead className="w-[15%]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
                {tasks.map((task: Task, index:number) => (
                    statusFilter === "all" || task.status === statusFilter ? (
                        <TableRow key={task._id} className={` hover:shadow-xl hover:bg-slate-300 cursor-pointer ${index % 2 === 0 ? 'bg-slate-200' : ''}`}>
                            <TableCell>{task.description}</TableCell>
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
                            <TableCell>{getStatus(task.status)}</TableCell>
                            <TableCell>
                                <button className="btn btn-primary">Start</button>
                            </TableCell>
                        </TableRow>
                    ) : null
                ))}
            </TableBody>
        </Table>
    );
}

export default ProjectTaskTable;