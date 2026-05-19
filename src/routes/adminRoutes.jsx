import { Route } from "react-router-dom";
import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../admin/pages/Products";


export default function AdminRoutes() {
  return (
    <>
      {/* LOGIN */}
      <Route path="/admin" element={<Login />} />

      {/* PRODUCTS */}
      <Route
        path="/studio-dashboard/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

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