
import { useNavigate } from 'react-router-dom';

import splashImage from './images/road_trip.png';
import rentalImage from './/images/rental.png';
import './splash.css';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/authSlice';

function Splash() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <main className="main">
      <div className="splash">
        <div className="splash-landing">
          <h1 className="splash-title">What are you waiting for?</h1>
          <div className="splash-buttons">
            <button
              onClick={() => navigate("/login")}
              className="splash-button"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="splash-button"
            >
              Sign Up
            </button>
          </div>
          <img className="splash-banner" src={splashImage} alt="logo" />
        </div>

        <div className="splash-wrapper">
          <div className="splash-try">
            <div className="splash-try-top">
              <div className="splash-try-text">
                <h2 className="splash-try-title">Try it out!</h2>
                <p>Your community is larger than you think.</p>
                <button
                  data-testid="login-demo-button"
                  onClick={() => {
                    dispatch(
                      login({
                        email: "demo@demo.com",
                        password: "password",
                      })
                    ).then(() => navigate("/"));
                  }}
                  className="splash-button"
                >
                  Demo
                </button>
              </div>
            </div>
            <div className="splash-try-bottom">
              <img className="splash-try-image" src={rentalImage} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Splash;