import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {

  const { user } = useContext(AuthContext);

  // si NO hay usuario
  if (!user) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  // si SÍ hay usuario
  return children;
}