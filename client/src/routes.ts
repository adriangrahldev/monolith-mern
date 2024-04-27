import { faBriefcase, faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

export const routes = [
    {
        title: "Home",
        icon: faHouse,
        link: "/dashboard"
    },
    {
        title: "Projects",
        icon: faBriefcase,
        link: "/admin/projects"
    },
    {
        title: "Clients",
        icon: faUsers,
        link: "/admin/clients"
    },
];