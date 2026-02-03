/* Icons Imports */
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MessagesIcon from '@mui/icons-material/Chat';
import SocietiesIcon from '@mui/icons-material/Group';
import { Home, Settings } from '@mui/icons-material';


/* Configuration for the Mobile navigation bar */
export const mobileConfig = {
  messages: {
    label: "Messages",
    page: "/messages",
    icon: MessagesIcon,
    isLoggedin: true, // User must be logged in to see this tab
  },
  societies: {
    label: "Your Societies",
    page: "/societies",
    icon: SocietiesIcon,
    isLoggedin: true, // User must be logged in to see this tab
  },
  management: {
    label: "Management",
    page: "/management",
    icon: AdminPanelSettingsIcon,
    isLoggedin: true, // User must be logged in to see this tab
    isManager: true, // User must have manager privileges to see this tab
    webOnly: true,  // Only visible to users on a web browser
  },

  /*
  login: {
    label: "Login",
    page: "/login",
    icon: LoginRoundedIcon,
    isLoggedin: false,
  },
  register: {
    label: "Register",
    page: "/register",
    icon: AppRegistrationIcon,
    isLoggedin: false,
  },
  */
};
/* Configuration for the Desktop navigation bar */
export const DesktopMainConfig = {
  home: {
    label: "Home",
    page: "/home",
    icon: Home,
    isLoggedin: false,
  },
  societies: {
    label: "Societies",
    page: "/societies",
    icon: SocietiesIcon,
    isLoggedin: false, 
  },
  management: {
    label: "Management",
    page: "/management",
    icon: AdminPanelSettingsIcon,
    isLoggedin: true, // User must be logged in to see this tab
    isManager: true, // User must have manager privileges to see this tab
  },
};
/* Configuration for the Desktop Settings menu */
export const DesktopSettingsConfig = {
  logout: {
    label: "Logout",
    page: "/logout",
    icon: LoginRoundedIcon,
  },

  Settings: {
    label: "Settings",
    page: "/settings",
    icon: Settings,
},
}

// Function to build Desktop navigation bar items based on user status

export function buildDesktopNavBarItems({isLoggedIn, isManager, webView }) {
  return Object.entries(DesktopMainConfig)
    .filter(([key, item]) => {
      if (item.isLoggedin && !isLoggedIn) return false;
      if (item.isManager && !isManager) return false;
      if (item.webOnly && !webView) return false;
      return true;
    })
    .map(([value, item]) => ({
      value,
      navName: item.label,
      redirectLink: item.page,
      icon: item.icon,
    }));
}

// Function to build Desktop settings menu items based on user status

export function buildDesktopSettingsMenuItems({isLoggedIn, isManager, webView }) {
  return Object.entries(DesktopSettingsConfig)
    .filter(([key, item]) => {
      if (item.isLoggedin && !isLoggedIn) return false;
      if (item.isManager && !isManager) return false;
      if (item.webOnly && !webView) return false;
      return true;
    })
    .map(([value, item]) => ({
      value,
      navName: item.label,
      redirectLink: item.page,
      icon: item.icon,
    }));
}

/* Function to build Mobile navigation bar items based on user status */
export function buildMobileNavBarItems({isLoggedIn, isManager, webView }) {
  return Object.entries(mobileConfig)
    .filter(([key, item]) => {
      if (item.isLoggedin && !isLoggedIn) return false;
      if (item.isManager && !isManager) return false;
      if (item.webOnly && !webView) return false;
      return true;
    })
    .map(([value, item]) => ({
      value,
      navName: item.label,
      redirectLink: item.page,
      icon: item.icon,
    }));
}
