"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users">Users</Link>
      {status === "unauthenticated" ? (
        <Link href="/api/auth/signin">Login</Link>
      ) : (
        <div>{session?.user!.name}</div>
      )}
    </div>
  );
};

export default NavBar;
