import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { User } from "../../redux/models";

import './auth.css';

function Login({ user }: { user: User | undefined }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    navigate("/posts/explore");
  };

  if (user) return <Navigate to="/posts/explore" />;
  return (
    <main className="main">
      <form style={{ height: "calc(100vh - 80px" }} onSubmit={handleSubmit} className="login-form">
        <label className="form-label" htmlFor="email">
          Email
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-label" htmlFor="password">
          Password
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="form-button">
          Login
        </button>
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </form>
    </main>
  );
}

export default Login;