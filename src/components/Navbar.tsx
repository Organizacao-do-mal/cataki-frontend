import React from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="shadow">
        <div className="flex justify-between items-center py-6 px-10 container mx-auto">
          <div>
            <a className="flex title-font font-medium items-center text-gray-900 ">
              {session?.user?.image ? (
                <>
                  <Image
                    width={80}
                    height={80}
                    alt={"avatar"}
                    src={session.user.image}
                    className="rounded-md"
                  />

                  <span className="ml-3 text-xl">
                    Olá, {session?.user?.name}
                  </span>
                </>
              ) : (
                <h1 className="text-2xl font-bold bg-gradient-to-tr from-indigo-600 to-green-600 bg-clip-text text-transparent hover:cursor-pointer">
                  Adsla
                </h1>
              )}
            </a>
          </div>

          <div>
            <div className="flex items-center">
              <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                {session ? (
                  <TbLogout
                    className="hover:text-red-500 w-10 h-10"
                    onClick={() =>
                      signOut({ callbackUrl: "/login", redirect: true })
                    }
                  />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-text-gray-600  py-2 hover:cursor-pointer hover:text-indigo-600"
                    >
                      LOGIN
                    </Link>
                    <Link
                      href="/register"
                      className="text-text-gray-600  py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600 hover:shadow-lg"
                    >
                      SIGNUP
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
