import { useState, useEffect } from "react";
import { isAuthenticated } from "../components/Authenticate";

export function useAuth() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    console.log("Run");
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setAuth(result);
    };

    checkAuth();
  }, []);

  return auth;
}
