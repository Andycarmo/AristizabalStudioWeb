import { Route } from "react-router-dom";
import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../admin/pages/Products";
import RecentWorks from "../admin/pages/RecentWorksAdmin";
import Orders from "../admin/pages/Orders";
import OrderDetails from "../admin/pages/OrderDetails";
import Customers from "../admin/pages/Customers";
import Categories from "../admin/pages/Categories";
import Analytics from "../admin/pages/Analytics";
import Website from "../admin/pages/Website";
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

      {/* RECENT WORKS */}
      <Route
        path="/studio-dashboard/recent-works-admin"
        element={
          <ProtectedRoute>
            <RecentWorks />
          </ProtectedRoute>
        }
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

      {/* ORDERS */}
      <Route
        path="/studio-dashboard/orders"
        element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>}
      />

      {/* ORDERS DETAILS */}
      <Route
        path="/studio-dashboard/orders/:orderId"
        element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>}
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
        path="/studio-dashboard/website"
        element={
          <ProtectedRoute>
            <Website />
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