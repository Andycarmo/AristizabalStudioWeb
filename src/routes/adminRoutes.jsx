import { Route } from "react-router-dom";
import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../admin/pages/Products";
import Works from "../admin/pages/Works";
import Orders from "../admin/pages/Orders";
import Customers from "../admin/pages/Customers";
import Categories from "../admin/pages/Categories";
import Analytics from "../admin/pages/Analytics";
import Settings from "../admin/pages/Settings";

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

      {/* PRODUCTS */}
      <Route
        path="/studio-dashboard/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      {/* WORKS */}
      <Route
        path="/studio-dashboard/works"
        element={
          <ProtectedRoute>
            <Works />
          </ProtectedRoute>
        }
      />

      {/* ORDERS */}
      <Route
        path="/studio-dashboard/orders"
        element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>}
      />

      {/* CUSTOMERS */}
      <Route
        path="/studio-dashboard/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />

      {/* CATEGORIES */}
      <Route
        path="/studio-dashboard/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      {/* ANALYTICS */}
      <Route
        path="/studio-dashboard/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />


      {/* SETTINGS */}
      <Route
        path="/studio-dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />



    </>
  );
}