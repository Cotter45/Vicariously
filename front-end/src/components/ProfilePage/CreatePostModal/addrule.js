// front-end/src/components/CreatePost/CreatePost.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import './createpost.css';
import { addRule } from "../../../store/posts";


function AddRule({ setAddRules, setShowModal, newPost }) {
    const dispatch = useDispatch();

    const [rule, setRule] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errs = [];

        if (!rule) errs.push('Please let us know what not to do.');

        setErrors(errs);
    }, [rule])

    const submitRule = (e) => {
        e.preventDefault();
        let err = [];

        const newRule = {
            rule
        }

        dispatch(addRule(newRule, newPost.id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    err.push('err');
                    return setErrors(data.errors);
                }
            }).then(() => {
                if (err.length) return;
                setRule('');
                setErrors([]);
                setAddRules(false);
                setShowModal(false);
            })

      }

    return (
        <form className='modal-form' id='create-post' onSubmit={submitRule}>
            <ul>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>Rule</label>
            <input type='text' value={rule} onChange={e => setRule(e.target.value)}></input>
            <p>Please add a new rule</p>
            <button disabled={rule ? false : true} className='edit-profile-button' type="submit">Submit</button>
        </form>
    )
}

export default AddRule;
