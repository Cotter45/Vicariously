import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login, logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function NavMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.querySelector("main");
    const handleClick = (e: MouseEvent) => {
      setIsOpen(!isOpen);
    };

    body && body.addEventListener("click", handleClick, { once: true });

    return () => {
      body && body.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <>
      <input
        checked={isOpen}
        onChange={() => {}}
        type="checkbox"
        id="menu-toggle"
      />
      <label
        data-testid="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        htmlFor="menu-toggle"
        className="hamburger"
      >
        <span className="bun bun-top">
          <span className="bun-crust bun-crust-top"></span>
        </span>
        <span className="bun bun-bottom">
          <span className="bun-crust bun-crust-bottom"></span>
        </span>
      </label>
      <section
        style={{
          maxWidth: isOpen ? "400px" : 0,
        }}
        className="menu"
      >
        <>
          {!user ? (
            <>
              <div onClick={() => navigate('/login')} data-testid="signup-button" className="menu-item">
                Log In
              </div>
              <div onClick={() => navigate('/signup')} data-testid="signup-button" className="menu-item">
                Sign Up
              </div>
              <div
                data-testid="login-demo-button"
                onClick={() => {
                  dispatch(
                    login({
                      email: "demo@demo.com",
                      password: "password",
                    })
                  ).then(() => navigate('/'));
                }}
                className="menu-item"
              >
                Demo
              </div>
            </>
          ) : (
            <>
              <div
                data-testid="logout-button"
                onClick={() => dispatch(logout())}
                className="menu-item"
              >
                Sign Out
              </div>
            </>
          )}
        </>
      </section>
    </>
  );
}
