import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

export const TaskTable = ({tasks}:{tasks: any[]}) => {
  return (
    <Table>
      {/* <TableCaption>A list of your upcoming tasks.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-scroll">
        {tasks.map((task: any) => (
          <TableRow key={task.id}>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.dateFrom}</TableCell>
            <TableCell>{task.project}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              <button className="btn btn-primary">Start</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
