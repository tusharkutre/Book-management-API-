import "../styles/tailwind.css";
import AppRoutes from "../routes/Routes";
import { AuthProvider } from "./context/AuthContext";

// Main entry of the app
const App = () => {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
