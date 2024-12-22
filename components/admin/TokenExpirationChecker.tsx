'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TokenEspieard } from "../TOAST/toasts";


const TokenExpirationChecker: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
        const expirationTime = tokenPayload.exp * 1000;
        const isExpired = Date.now() >= expirationTime;

        if (isExpired) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          TokenEspieard();
          router.push("/admin");
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 1000);

    checkTokenExpiration();

    return () => clearInterval(intervalId);
  }, [router]);

  return null;
};

export default TokenExpirationChecker;
