import { Routes, Route } from "react-router-dom";

import Login from "../admin/pages/Login";

import Dashboard from "../admin/pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

export default function AdminRoutes() {

  return (

    <Routes>

      {/* LOGIN */}
      <Route
        path="/studio-dashboard/login"
        element={<Login />}
      />

      {/* DASHBOARD PROTEGIDO */}
      <Route
        path="/studio-dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>

  );

}