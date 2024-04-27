import DefaultCard from "@/components/admin/DefaultCard";

const AdminHomePage = () => {
    return (
        <div className="grid grid-cols-6 gap-4">
            <DefaultCard title='Clients' counter={2} link='/dashboard/clients' />
            <DefaultCard title='Projects' counter={7} link='/dashboard/projects' />
        </div>
    );
}

export default AdminHomePage;