import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Book from "../src/components/Book";
import { useAuth } from "../src/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const router = createBrowserRouter([
  { path: "/", element: <Login/> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/books", element: (
      <ProtectedRoute>
        <Book />
      </ProtectedRoute>
    ) },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;