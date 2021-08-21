// front-end/src/components/CreatePost/CreatePost.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../../store/users";


function EditPost({ setShowModal, post, setEdit, setUpdate }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    function randomLatOrLong(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [title, setTitle] = useState(post.title);
    const [address, setAddress] = useState(post.address);
    const [city, setCity] = useState(post.city);
    const [state, setState] = useState(post.state);
    const [country, setCountry] = useState(post.country);
    const [lat] = useState(randomLatOrLong(25, 45));
    const [lng] = useState(randomLatOrLong(-115, -75));
    const [description, setDescription] = useState(post.description);
    const [imageUrl, setImageUrl] = useState(post.Images[0].imageUrl);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errs = [];

        if (title.length < 5 || title.length > 100) errs.push('Title must be between 5 and 100 characters.');
        if (!address || !city || !state || !country) errs.push('You must include your address.');
        if (!description) errs.push('Please provide a description.');
        if (!imageUrl) errs.push('Please provide a picture.');

        setErrors(errs);
    }, [address, city, country, description, imageUrl, state, title.length])

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        await dispatch(editPost(newPost, post.id));
        setUpdate(true);
        setEdit(false);
    }

  return (
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
        <button className='edit-profile-button' type="submit">Submit Changes</button>
    </form>
  );
}

export default EditPost;
