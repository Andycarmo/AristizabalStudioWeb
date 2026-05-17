import {
  createContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../config/supabase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    // sesión inicial
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // escuchar cambios auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };

  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}