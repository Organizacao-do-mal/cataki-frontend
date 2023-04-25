import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Logo from "../../../public/logo-green.svg"

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Home</title>
      </Head>

      <div className="max-w-sm w-full space-y-8">
        <div>
          <Image
            width={384}
            height={100}
            className="mx-auto h-12 w-auto"
            src={Logo}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre em sua conta
          </h2>
        </div>

        <div>
          <button
            onClick={() => {
              signIn("google");
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6BC55C] hover:bg-[#2B761F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaGoogle
                className="h-5 w-5 text-white group-hover:text-[#6BC55C]"
                aria-hidden="true"
              />
            </span>
            Entre com o google
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
