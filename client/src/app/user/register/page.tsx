"use client";
import { FormEvent, useState } from "react";
import RegisterForm from "@/components/user/RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/users/register", {
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
    <div className="w-screen h-screen flex items-center bg-50 max-lg:px-2">
      <div className="w-[55%] px-24 text-center max-lg:hidden">
        <p className="text-justify items-center flex flex-col mb-10 mt-10">
          <Image src={"/logotipo1.png"} alt="Logotipo" width={512} height={512} className="w-80" ></Image>
        </p>
        <p className="mb-4 text-justify">
          Monolith is a project management tool for freelancers. It helps you to manage your projects, clients, and invoices in one place.
        </p>
        <p className="text-justify">
          Monolith is designed to simplify your project management experience. With Monolith, you can effortlessly organize your projects, clients, and invoices all in one place. Say goodbye to the hassle of juggling multiple tools and platforms. Monolith streamlines your workflow, allowing you to focus on what you do best - delivering exceptional results to your clients. Whether you're a freelancer or a small business owner, Monolith is the ultimate solution for efficient project management. Try Monolith today and experience the power of simplicity.
        </p>
      </div>
      <div className="w-[45%] max-lg:w-max px-32 max-lg:px-0">
        <RegisterForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterPage;
