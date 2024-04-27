import { faProjectDiagram, faBorderAll, faUsers } from "@fortawesome/free-solid-svg-icons";

export const routes = [
    {
        title: "Home",
        icon: faBorderAll,
        path: "/dashboard"
    },
    {
        title: "Projects",
        icon: faProjectDiagram,
        path: "/projects"
    },
    {
        title: "Clients",
        icon: faUsers,
        path: "/clients"
    },
];