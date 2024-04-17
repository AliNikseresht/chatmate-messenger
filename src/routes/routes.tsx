import ForgotPassword from "../pages/Settings/_component/ForgotPassword";
import EditProfile from "../pages/Settings/_component/EditProfile";
import Notifications from "../pages/Notifications/Notifications";
import UserProfile from "../pages/UserProfile/UserProfile";
import Messages from "../pages/messages/Messages";
import Setting from "../pages/Settings/Setting";
import Explore from "../pages/Explore/Explore";
import Profile from "../pages/Profile/Profile";
import Create from "../pages/Create/Create";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/logIn/Login";
import Home from "../pages/home/Home";

export const mainRoutes = [
  {
    path: "/",
    element: <Home />,
    title: "Main",
  },
  {
    path: "/login",
    element: <Login />,
    title: "Login",
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    title: "Signup",
  },
  {
    path: "/explore",
    element: <Explore />,
    title: "Explore",
  },
  {
    path: "/create",
    element: <Create />,
    title: "Create",
  },
  {
    path: "/notifications",
    element: <Notifications />,
    title: "Notifications",
  },
  {
    path: "/messages",
    element: <Messages />,
    title: "Messages",
  },
  {
    path: "/profile",
    element: <Profile />,
    title: "Profile",
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
    title: "Profile",
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    title: "ForgotPassword",
  },
  {
    path: "/settings",
    element: <Setting />,
    title: "Settings",
  },
  {
    path: "/profile/:userId",
    element: <UserProfile />,
    title: "User Profile",
  },
];
