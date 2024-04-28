import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuthenticated() {
  const { data: session, status: sessionStatus } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(sessionStatus === "authenticated");
  }, [sessionStatus]);

  return { isAuthenticated };
}
