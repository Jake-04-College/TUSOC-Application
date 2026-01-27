"use client";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import { buildMobileNavBarItems } from "./config/navConfig";

export default function MobileNavbar({
  isLoggedIn = true,
  isManager = false,
}) {
  const router = useRouter();
  const pathname = usePathname();

  /* Build the navigation items based on user status
    if webView is false, it indicates the user is on a mobile device else user is on web browser
    Management tab is only visible to managers on a web browser */

  const items = React.useMemo(
    () => buildMobileNavBarItems({ isLoggedIn, isManager, webView: false }),
    [isLoggedIn, isManager]
  );

  // Code responsible for handing the current active tab and updating according to user navigation.
  const activeValue = React.useMemo(() => {
    let activeItem = items.find((item) =>
      pathname.startsWith(item.redirectLink)
    );
    return activeItem ? activeItem.value : null;
  }, [items, pathname]);

  // Code reponsible for handling tab changes and redirecting to the appropriate page if page does not exist redirect to not-found page
  const handleChange = (_event, newValue) => {
    const target = items.find((item) => item.value === newValue)?.redirectLink;

    if (target && target !== pathname) {
      router.push(target);
    } else {
      router.push("/not-found");
    }
  };

  return (
    <BottomNavigation
      sx={{
        display: { xs: "flex", md: "none" }, 
        width: 1,
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#d1d5daff",
      }}
      value={activeValue}
      onChange={handleChange}
      showLabels
    >
      {items.map(({ value, navName, icon: Icon }) => (
        <BottomNavigationAction
          key={value}
          label={navName}
          value={value}
          icon={<Icon />}
        />
      ))}
    </BottomNavigation>
  );
}
