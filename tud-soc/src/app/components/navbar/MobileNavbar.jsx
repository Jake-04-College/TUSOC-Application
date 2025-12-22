'use client';
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import AdminPanelSettingsSharpIcon from "@mui/icons-material/AdminPanelSettingsSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import StoreSharpIcon from "@mui/icons-material/StoreSharp";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import { usePathname, useRouter } from "next/navigation";


export default function LabelBottomNavigation({ isManager = false }) {
  const [mounted, setMounted] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname(); /*Get the active page - https://nextjs.org/docs/app/api-reference/functions/use-pathname */

  /* Determines which tab on the navbar should be in active state based on the current page opened */
   const getActiveValue = () => {
    if (pathname.startsWith("/account")) return "account";
    if (pathname.startsWith("/order")) return "order";
    if (pathname.startsWith("/cart")) return "cart";
    if (pathname.startsWith("/manager")) return "management";
    if (pathname.startsWith("/settings")) return "settings";
    return "account"; 
  };

    const [value, setValue] = React.useState(getActiveValue());

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!mounted) {
    return null;
  }

  return (
    <BottomNavigation
      sx={{ width: 1, position: "fixed", bottom: 0, left: 0, zIndex: 1000}} 
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Account"
        value="account"
        icon={<AccountCircleSharpIcon />}
        onClick={() => router.push("/account")}
      />
      <BottomNavigationAction
        label="Order"
        value="order"
        icon={<StoreSharpIcon />}
         onClick={() => router.push("/order")}
      />
      <BottomNavigationAction
        label="Cart"
        value="cart"
        icon={<ShoppingCartSharpIcon />}
         onClick={() => router.push("/cart")}
      />

      <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsApplicationsSharpIcon />}
           onClick={() => router.push("/settings")}
        />

      {isManager ? ( /*if true show management tab else don't show */
        <BottomNavigationAction
          label="Management"
          value="management"
          icon={<AdminPanelSettingsSharpIcon />}
           onClick={() => router.push("/manager")}
        />
      ) : null}
    </BottomNavigation>
  );
}
