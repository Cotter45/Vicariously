import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/login";
import FourOhFour from "../components/404";
import AuthRoutes from "./authRoutes";
import SignUp from "../components/auth/signup";
import { User } from "../redux/models";
import Splash from "../components/splash";

function Router({ user }: { user: User | undefined }) {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login user={user} />} />
      <Route path="/signup" element={<SignUp user={user} />} />
      <Route path="*" element={<FourOhFour />} />
      <Route element={<AuthRoutes user={user} />}>
        <Route path="/" element={<div>App</div>}>
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
