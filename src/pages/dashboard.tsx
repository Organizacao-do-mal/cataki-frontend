import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

export default function Dashboard() {
  return (
    <Navbar />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
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
