import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../src/components/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
