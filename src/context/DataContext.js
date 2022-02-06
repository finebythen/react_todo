import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResult] = useState([]);
	const { data, isLoading, fetchError } = useAxiosFetch('http://localhost:3500/posts');

	useEffect(() => {
		setPosts(data);
	}, [data]);

	useEffect(() => {
		const filteredResults = posts.filter(post => 
			(
				(post.body).toLowerCase().includes(search.toLowerCase())
				|| (post.title).toLowerCase().includes(search.toLowerCase())
			));
		setSearchResult(filteredResults.reverse());
	}, [posts, search]);

    return(
        <DataContext.Provider value={{
            search,
            posts,
            fetchError,
            isLoading,
            searchResults,
            setPosts,
            setSearch,
        }}>{ children }</DataContext.Provider>
    )
};

export default DataContext;