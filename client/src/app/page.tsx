import { Button } from "@/components/ui/button";
import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";

// export const Metadata = {
//   title: "Monolith",
//   description: "A project management tool for freelancers.",
// };

export default async function Home() {
  const session = await getSession();
  return (
    <div className="px-4">
      <div className="flex justify-between">
        <div className="flex items-center justify-center ">
          <Image src="/logotipo1.png" alt="Monolith Logo" width={180} height={40} />
        </div >
        {session ?
          <Link href="/dashboard">
            <Button variant="link">Dashboard</Button>
          </Link> :
          <div>
            <Link href="/api/auth/login">
              <Button variant="link">Login</Button>
            </Link>
            <Link href="/api/auth/signup">
              <Button variant="link">Register</Button>
            </Link>
          </div>

        }
      </div>

      <main className="flex flex-col items-center justify-center min-h-[90vh] py-2">
        <Image src="/isologo1.svg" alt="Monolith Logo" width={200} height={200} />
        <h1 className="text-4xl font-bold">
          Welcome to Monolith!
        </h1>
        <p className="mt-3 text-xl">
          A project management tool for freelancers.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">Manage Projects</h2>
            <p>Effortlessly organize your projects in one place.</p>
          </div>
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">Manage Clients</h2>
            <p>Keep track of all your client information and interactions.</p>
          </div>
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">Manage tasks</h2>
            <p>Generate and manage tasks directly through Monolith.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
