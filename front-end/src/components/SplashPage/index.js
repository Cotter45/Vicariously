// front-end/src/components/SplashPage/index.js
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getFeatures } from '../../store/posts';

import './splashpage.css'

function SplashPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // const user = useSelector(state => state.session.user);
    const posts = useSelector(state => state.posts.featuredPosts);


    const [cities, showCities] = useState(false);
    const [states, showStates] = useState(false);
    const [countries, showCountries] = useState(false);
    const [categories, showCategories] = useState(false);

    useEffect(() => {
        if (posts) return;

        dispatch(getFeatures());
    }, [posts, dispatch])

    const explore = () => {
        history.push('/explore');
    }

    return (
        <div className='main'>
            <div className='splash'>
                <div className='splash-memo'>
                    <h3>No place like home?</h3>
                    <p>Vicariously was created for you to connect with <br></br> people wherever you are and experience what <br></br> home means for them.</p>
                    <button className='category-buttons' onClick={explore}>Explore</button>
                </div>
            </div>
            <div className='featured-posts'>
                <div className='categories-container'>
                    <div className='categories'>
                        <button
                            className={cities ? 'selected' : 'category-buttons'}
                            onClick={() => {
                                showCities(!cities)
                                showStates(false)
                                showCountries(false)
                                showCategories(false)
                            }}
                        >Cities</button>
                    </div>
                    <div className='categories'>
                        <button
                            className={states ? 'selected' : 'category-buttons'}
                            onClick={() => {
                                showCities(false)
                                showStates(!states)
                                showCountries(false)
                                showCategories(false)
                            }}
                        >States</button>
                    </div>
                    <div className='categories'>
                        <button
                            className={countries ? 'selected' : 'category-buttons'}
                            onClick={() => {
                                showCities(false)
                                showStates(false)
                                showCountries(!countries)
                                showCategories(false)
                            }}
                        >Countries</button>
                    </div>
                    <div className='categories'>
                        <button
                            className={categories ? 'selected' : 'category-buttons'}
                            onClick={() => {
                                showCities(false)
                                showStates(false)
                                showCountries(false)
                                showCategories(!categories)
                            }}
                        >Category</button>
                    </div>
                </div>
                <div className='categories-list'>
                    {cities && (
                        <div className='list'>
                            {posts.map(post => (
                                <button
                                    className='selected'
                                    key={post.id}
                                >{post.city}</button>
                            ))}
                        </div>
                    )}
                    {states && (
                        <div className='list'>
                            {posts.map(post => (
                                <button
                                    className='selected'
                                    key={post.id}
                                >{post.state}</button>
                            ))}
                        </div>
                    )}
                    {countries && (
                        <div className='list'>
                            {posts.map(post => (
                                <button
                                    className='selected'
                                    key={post.id}
                                >{post.country}</button>
                            ))}
                        </div>
                    )}
                    {categories && (
                        <div className='list'>
                            {posts.map(post => (
                                post.Categories.map(category => (
                                    <button
                                        className='selected'
                                        key={category.category}
                                    >{category.category}</button>
                                ))
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
