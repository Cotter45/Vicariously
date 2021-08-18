// front-end/src/components/SplashPage/index.js
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import { getFeatures } from '../../store/posts';

import './splashpage.css'

function SplashPage() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const posts = useSelector(state => state.posts.featuredPosts)

    useEffect(() => {
        if (posts) return;

        dispatch(getFeatures());
    }, [posts, dispatch])

    return (
        <div className='main'>
            <div className='splash'>
                <div className='splash-memo'>
                    <h3>No place like home?</h3>
                    <p>Vicariously was created for you to connect with <br></br> people wherever you are and experience what <br></br> home means for them.</p>
                </div>
            </div>
            <div className='featured-posts'>
                <div className='categories'>
                    <NavLink to='/categories/location'>Location</NavLink>
                </div>
            </div>
            <Switch>
                <Route path='/categories/location'>
                    <h2>hello</h2>
                </Route>
            </Switch>
        </div>
    )
}

export default SplashPage;
