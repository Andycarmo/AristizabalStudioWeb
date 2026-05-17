import { Route } from "react-router-dom";
import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";


export default function AdminRoutes() {
  return (
    <>
      {/* LOGIN */}
      <Route path="/admin" element={<Login />} />

      {/* DASHBOARD */}
      <Route
        path="/studio-dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </>
  );
}