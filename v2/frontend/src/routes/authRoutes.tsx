import { Navigate, Outlet } from "react-router-dom";
import { User } from "../redux/models";

function AuthRoutes({ user }: { user: User | undefined }) {

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}

export default AuthRoutes;