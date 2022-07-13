
import { useNavigate } from 'react-router-dom';
import mapboxgl from "mapbox-gl";

import splashImage from './images/road_trip.png';
import rentalImage from './/images/rental.png';
import './splash.css';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/authSlice';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { authFetch } from '../../redux/authFetch';

function Splash() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mapContainer = useRef<any>(null);

  const [location, setLocation] = useState('');
  const [mapToken, setMapToken] = useState('');
  const [lng, setLng] = useState(-122.41);
  const [lat, setLat] = useState(37.77);
  const [zoom, setZoom] = useState(10);
  const [map, setMap] = useState<mapboxgl.Map>();

  useEffect(() => {
    if (mapToken) return;
    (async () => {
      const response = await authFetch('/api/mapbox');
      const data = await response.json();
      setMapToken(data.data);
      mapboxgl.accessToken = data.data;
    })();
  }, [mapToken]);

  useEffect(() => {
    if (!mapToken) return; 

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      setZoom(+map.getZoom().toFixed(2));
    });
    
    map.on("resize", () => {
      setZoom(+map.getZoom().toFixed(2));
    });

    setMap(map);
    // Clean up on unmount
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapToken]);

  useEffect(() => {
    if (!map) return;
    map.setZoom(zoom);
  }, [zoom, map]);

  useEffect(() => {
    if (!map) return;
    map.setCenter([lng, lat]);
  }, [lng, lat, map]);

  const getLocations = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/mapbox/location?' + new URLSearchParams({
      address: location,
    }));
    const locations = await response.json();
    if (locations.features.length > 0) {
      setLng(locations.features[0].center[0]);
      setLat(locations.features[0].center[1]);
    }
  }

  return (
    <main className="">
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
                <p>Your community grows here.</p>
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

          <div className="splash-search">
            <div className="splash-search-top">
              <h2 className="splash-search-title">Search Locations</h2>
              <form style={{ margin: 0 }} className="login-form" onSubmit={getLocations}>
                <label className="form-label" htmlFor="location">
                  <input
                    style={{ width: "80%", margin: "0 auto" }}
                    className="form-input"
                    type="text"
                    placeholder="Enter a location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
                <button className="splash-button" type="submit">
                  Search
                </button>
              </form>
            </div>
            <div style={{ position: "relative" }}>
              <div ref={mapContainer} className="map-container" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Splash;