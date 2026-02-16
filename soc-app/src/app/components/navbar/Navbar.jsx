"use client";

import * as React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Navbar({ isLoggedIn, isManager }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  /* Wrapper component to switch between Mobile and Desktop navigation bars based on screen size */

  return (
    <>
      {isDesktop ? (
        <DesktopNavbar isLoggedIn={false} isManager={false} />
      ) : (
        <MobileNavbar isLoggedIn={true} isManager={true} />
      )}
    </>
  );
}
