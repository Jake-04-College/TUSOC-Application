/* Icons Imports */
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MessagesIcon from '@mui/icons-material/Chat';
import SocietiesIcon from '@mui/icons-material/Group';


/* Configuration for the navigation bar */
export const navConfig = {
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

/* Function to build navigation bar items based on user status 
    Is the user logged in?  
    Is the user an admin?
    Is the user viewing the web app on a browser or mobile device?
*/
export function buildNavBarItems({isLoggedIn, isManager, webView }) {
  return Object.entries(navConfig)
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