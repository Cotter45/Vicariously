// front-end/src/components/CreatePost/CreatePost.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MapContainer from "../../Maps";
import { getKey } from "../../../store/maps";
import './createpost.css';


function CreatePost({ setShowModal }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const key = useSelector(state => state.maps.key);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [location, setLocation] = useState([{
    lat: 39.9526,
    lng: 75.1652,
  }])
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // let edits = {
    //     username,
    //     birthday,
    //     profilePicture,
    //     description
    // }

    setErrors([]);
    return dispatch();
  };

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);


  return (
    <form className='modal-form' id='create-post' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Address
      </label>
        <input
          type="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      <label>
        City
      </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      <label>
        State
      </label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label>
          Country
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <label>
          Description
        </label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <MapContainer location={location} />
      <button className='edit-profile-button' type="submit">Make changes</button>
    </form>
  );
}

export default CreatePost;
