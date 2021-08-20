// front-end/src/components/CreatePost/addimages.js
import { useState } from "react";
import { useDispatch } from "react-redux";

import './createpost.css';
import { addImage } from "../../../store/posts";

function AddImage({ setAddRules, newPost, setAddImages, submitted, setSubmitted }) {
    const dispatch = useDispatch();;

    const [newImage, setNewImage] = useState('');
    const [errors, setErrors] = useState([]);

    const submitImage = (e) => {
        e.preventDefault();
        let err = [];

        if (!newImage.length) return;

        const image = {
            imageUrl: newImage
        }

        dispatch(addImage(image, newPost.id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    err.push('err');
                    return setErrors(data.errors);
                }
            }).then(() => {
                if (err.length) return;
                setNewImage('');
                setErrors([]);
                // setAddImages(false);
                setSubmitted(true);
            })
      }


    return (
        <form className='modal-form' id='create-post' onSubmit={submitImage}>
            <ul>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))}
            </ul>
            <h2>Would you like to add Images?</h2>
            <ul>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))}
            </ul>
            <input
                type='text'
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
            />
            {newImage && (
                <>
                    <img className='post-card-image' src={newImage} alt='preview'></img>

                </>
            )}
            {!newImage && (
                <p>Please enter a link</p>
                )}
            {submitted === false && (
                <button disabled={newImage ? false : true} className='edit-profile-button' type="submit">Add Image</button>
                )}
            {submitted && (
                <>
                    <p>Success!</p>
                    <button disabled={newImage ? false : true} className='edit-profile-button' type="submit">Add Another</button>

                </>
            )}
            <h2>Or</h2>
            <p>Add some rules for your post</p>
            <button
                className='edit-profile-button'
                onClick={(e) => {
                    e.preventDefault()
                    setAddImages(false)
                    setSubmitted(false)
                    setAddRules(true)
                }}
                type="button"
            >Add Rules</button>
        </form>
    )
}

export default AddImage;
