import { Outlet, useNavigate } from "react-router-dom";
import AuthInfo from "@auth/zustand";
import { useEffect } from "react";
export default function protectedR() {
  let navigate = useNavigate();
  const user = AuthInfo((state) => state.user);
  const isSage = AuthInfo((state) => state.isSage);
  const pass = AuthInfo((state) => state.pass);

  useEffect(() => {
    if (!user && !isSage && pass !== import.meta.env.VITE_SAGE_PASS) {
      navigate("/", { replace: true });
    }
  }, [user, isSage, pass]);
  return <Outlet />;
}
