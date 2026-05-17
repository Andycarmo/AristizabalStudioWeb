import { Routes } from "react-router-dom";
import PublicRoutes from "./publicRoutes";
import AdminRoutes from "./adminRoutes";

export default function AppRouter() {
  return (
    <Routes>
      {PublicRoutes()}
      {AdminRoutes()}
    </Routes>
  );
}