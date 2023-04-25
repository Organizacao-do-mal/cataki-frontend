import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { TbLogout } from "react-icons/tb";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <header className="text-gray-600 body-font flex justify-between">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {session?.user?.image && (
            <Image
              width={80}
              height={80}
              alt={"avatar"}
              src={session.user.image}
            />
          )}
          <span className="ml-3 text-xl">Olá, {session?.user?.name}</span>
        </a>
      </div>
      <div className="items-center flex mr-10">
        <TbLogout className="hover:text-red-500 w-10 h-10" onClick={() => signOut({callbackUrl:"/login", redirect: true})} />
      </div>
    </header>
  );
}
