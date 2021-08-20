// front-end/src/components/CreatePost/CreatePost.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './createpost.css';
import { createPost } from "../../../store/posts";
import AddImage from "./addimages";
import AddRule from "./addrule";


function CreatePost({ setShowModal }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const newPost = useSelector(state => state.posts.newPost);

  function randomLatOrLong(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat] = useState(randomLatOrLong(25, 45));
    const [lng] = useState(randomLatOrLong(-115, -75));
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const [addImages, setAddImages] = useState(false);
    const [addPost, setAddPost] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [addRules, setAddRules] = useState(false);

    useEffect(() => {
        let errs = [];

        if (title.length < 5 || title.length > 100) errs.push('Title must be between 5 and 100 characters.');
        if (!address || !city || !state || !country) errs.push('You must include your address.');
        if (!description) errs.push('Please provide a description.');
        if (!imageUrl) errs.push('Please provide a picture.');

        setErrors(errs);
    }, [address, city, country, description, imageUrl, state, title.length])

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = [];

    let newPost = {
        title,
        address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        imageUrl,
        hostId: user.id
    }

    dispatch(createPost(newPost))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                err.push('err');
                return setErrors(data.errors);
            }
        }).then(() => {
            if (err.length) return;
            setTitle('');
            setAddress('');
            setCity('');
            setState('');
            setCountry('');
            setDescription('');
            setImageUrl('');
            setErrors([]);
            setAddPost(false);
            setAddImages(true);
        })
  };


  return (
    <>
      {addPost && (
        <form className='modal-form' id='create-post' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Title
            </label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
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
                <label>
                Image URL
                </label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
          <button className='edit-profile-button' type="submit">Create</button>
      </form>
    )}
    {addImages && addRules === false && addPost === false && (
        <AddImage setAddRules={setAddRules} newPost={newPost} submitted={submitted} setSubmitted={setSubmitted} setAddImages={setAddImages} />
    )}
    {addRules && addImages === false && addPost === false && submitted === false && (
        <AddRule setAddRules={setAddRules} setShowModal={setShowModal} newPost={newPost} />
    )}
    </>
  );
}

export default CreatePost;
