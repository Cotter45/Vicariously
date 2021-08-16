// front-end/src/components/Navigation/searchbar.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from "../../store/posts";



function SearchBar() {
    const dispatch = useDispatch();

    const searchResults = useSelector(state => state.searchResults.searchResults);

    const [searchParams, setSearchParams] = useState('');
    const [viewResults, setViewResults] = useState(false);




    const handleSearch = (e) => {
        e.preventDefault();

        dispatch(searchPosts(searchParams));
        setSearchParams('');
    }

    const viewResult = () => {

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
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    onClick={() => setViewResults(true)}
                    ></input>

                <button type='submit'>Search</button>
            </form>
            <div className={viewResults && searchResults? 'results-dropdown' : 'hide-me'}>
                {viewResults && searchResults && searchResults.map(result => (
                    <div key={result.id} className='result' onClick={viewResult}>
                        <h2>{}</h2>
                    </div>

                ))}
            </div>
        </>
    )
}

export default SearchBar;
