"use client";

import * as React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";





export default function Navbar({ isManager = false }) {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  /* Wrapper component to switch between Mobile and Desktop navigation bars based on screen size */

  return (
    <>
      {isDesktop ? (
        <DesktopNavbar session={session} status={status} isLoggedIn={isLoggedIn} />
      ) : (
        <MobileNavbar isLoggedIn={isLoggedIn} isManager={isManager} />
      )}
    </>
  );
}
