"use client";
import { FormEvent, useState } from "react";
import LoginForm from "@/components/user/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = () => {
  // const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    // setUser(data);
  };

return (
    <div className="w-screen h-screen flex items-center">
        <div className="w-[60%] px-44 text-center">
            <h1 className="text-4xl font-bold text-center mb-4">Welcome to Monolith</h1>
            <p className="mb-4">
                Monolith is a project management tool for freelancers. It helps you to manage your projects, clients, and invoices in one place.
            </p>
            <p>
            Monolith is designed to simplify your project management experience. With Monolith, you can effortlessly organize your projects, clients, and invoices all in one place. Say goodbye to the hassle of juggling multiple tools and platforms. Monolith streamlines your workflow, allowing you to focus on what you do best - delivering exceptional results to your clients. Whether you're a freelancer or a small business owner, Monolith is the ultimate solution for efficient project management. Try Monolith today and experience the power of simplicity.
            </p>

        </div>
        <div className="w-[40%] px-24">
            <LoginForm handleSubmit={handleSubmit} />
        </div>
    </div>
);
};

export default LoginPage;
