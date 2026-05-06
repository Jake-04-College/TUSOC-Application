"use client";

import * as React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import { useSession } from "next-auth/react";





export default function Navbar({ isManager = false }) {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;

  /* Wrapper component to switch between Mobile and Desktop navigation bars based on screen size */

  return (
    <>
      <DesktopNavbar session={session} status={status} isLoggedIn={isLoggedIn} />
      <MobileNavbar isLoggedIn={isLoggedIn} isManager={isManager} />
    </>
  );
}
