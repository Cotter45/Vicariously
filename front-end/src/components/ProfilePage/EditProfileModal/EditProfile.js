// front-end/src/components/EditProfileModal/EditProfile.js
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../store/users";

function EditProfile({ username, setUsername, birthday, setBirthday, profilePicture, setProfilePicture, description, setDescription }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let edits = {
        username,
        birthday,
        profilePicture,
        description
    }

    setErrors([]);
    return dispatch(editProfile(edits, user.id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <label>
        Profile Picture
        <input
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          required
        />
        <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      </label>
      <button type="submit">Make changes</button>
    </form>
  );
}

export default EditProfile;
