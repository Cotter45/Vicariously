// front-end/src/components/Navigation/searchbar.js
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { searchPosts, getPost } from "../../../store/posts";



function SearchBar() {
    const dispatch = useDispatch();
    let history = useHistory();

    const searchResults = useSelector(state => state.searchResults.searchResults);

    const [searchParams, setSearchParams] = useState('');
    const [viewResults, setViewResults] = useState(false);




    const handleSearch = (e) => {
        e.preventDefault();

        dispatch(searchPosts(searchParams));
        setSearchParams('');
    }

    const viewResult = (id) => {
        dispatch(getPost(id));
        history.push(`/posts/${id}`)
    }

    useEffect(() => {
        if (searchParams === '') return;

        dispatch(searchPosts(searchParams))
    }, [searchParams, dispatch])

    useEffect(() => {
        if (viewResults === false) return;

        const closeSearch = () => {
            setSearchParams('');
            setViewResults(false);
        }

        document.addEventListener('click', closeSearch);
        return () => document.removeEventListener('click', closeSearch);
    }, [viewResults])

    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    placeholder='Search by location...'
                    className='search'
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    onClick={() => setViewResults(true)}
                    ></input>
            </form>
            <div className={viewResults && searchResults? 'results-dropdown' : 'hide-me'}>
                {viewResults && searchResults && searchResults.map(result => (
                    <div key={result.id} className='result' onClick={() => viewResult(result.id)}>
                        <img src={result.Images[0].imageUrl} alt='post'></img>
                        <div className='rating'>
                            <h2>{result.avgRating}</h2>
                            <p>{result.city}, {result.country}</p>
                        </div>
                        <h3>{result.title}</h3>
                    </div>

                ))}
            </div>
        </>
    )
}

export default SearchBar;
