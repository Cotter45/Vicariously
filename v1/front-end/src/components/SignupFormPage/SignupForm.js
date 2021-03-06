// front-end/src/components/SignupFormPage/SignupFormModal.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";


function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ birthday, setBirthday ] = useState("");
  const [ profilePicture, setProfilePicture ] = useState("");
  const [ description, setDescription ] = useState("");
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    let errors = [];


    if (!username) errors.push('Username must be at least 3 characters.');
    if (!email.includes('@') || email.includes(" ")) errors.push('Please enter a valid email.');
    if (!birthday) errors.push('Please enter a valid birthday.');
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')) errors.push('Password must contain at least 1 lowercase letter, uppercase letter, number and special character (i.e. "!@#$%^&*")')
    if (password !== confirmPassword) errors.push('Password and confirm password must match.')

    if (errors.length) setErrors(errors);
  }, [ username, email, birthday, password, confirmPassword ])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, birthday, profilePicture, description }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className='modal-form' id='create-post' onSubmit={handleSubmit}>
      <ul>
        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
      </label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>
        Username
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>
        Confirm Password
      </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <label>
        Birthday
      </label>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
      <label>
        Profile Picture
      </label>
      <input
        type="url"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
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
      <button className='category-buttons' type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
