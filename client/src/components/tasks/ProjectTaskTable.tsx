import { Task } from "@/interfaces/task";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import moment from "moment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

const ProjectTaskTable = ({tasks, statusFilter, handleTaskUpdate, handleEditTask, handleDeleteTask}:{
    tasks: Task[],
    statusFilter: string,
    handleTaskUpdate: CallableFunction,
    handleEditTask: CallableFunction,
    handleDeleteTask: CallableFunction
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
                    <TableHead className="w-[35%] font-bold">Title</TableHead>
                    <TableHead className="w-[20%] font-bold">Start Date</TableHead>
                    <TableHead className="w-[20%] font-bold">End Date</TableHead>
                    <TableHead className="w-[15%] font-bold">Status</TableHead>
                    <TableHead className="w-[15%] font-bold">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
                {tasks.map((task: Task, index:number) => (
                    statusFilter === "all" || task.status === statusFilter ? (
                        <TableRow key={task._id} className={` hover:shadow-xl hover:bg-slate-200 cursor-pointer ${index % 2 === 0 ? 'bg-slate-100' : ''}`}>
                            <TableCell>{task.title}</TableCell>
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
                                <Select onValueChange={(value:string) => {handleTaskUpdate(task,value)}} value={task.status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in-backlog">In Backlog</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 justify-center">
                                    <Button size={'icon'} className="w-8 h-8" onClick={() => {handleEditTask(task)}}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button size={'icon'} variant={'destructive'} className="w-8 h-8" onClick={() => {handleDeleteTask(task)}}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : null
                ))}
            </TableBody>
        </Table>
    );
}

export default ProjectTaskTable;