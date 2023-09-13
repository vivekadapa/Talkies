import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FiSearch } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Card from '../components/Card';
import CardPoster from '../components/CardPoster';



const Home = () => {


    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;
    const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=1`;


    const fetchTrending = async () => {
        const res = await axios.get(trendingUrl);
        return res.data;
    }

    const fetchTopRated = async () => {
        const res = await axios.get(topRatedUrl);
        return res.data;
    }

    const searchMovies = async (query) => {
        const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
        const res = await axios.get(searchUrl);
        return res.data.results;
    };



    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTrending();
            setTrending(data.results);
        };

        const fetchDataTopRated = async () => {
            const topData = await fetchTopRated();
            console.log(topData.results);
            setTopRated(topData.results);
            setIsLoading(false);
        }

        fetchData();
        fetchDataTopRated()
    }, [])


    // console.log(topRated);

    return (
        <div className='bg-bgdarkb min-w-full min-h-screen mt-18 pb-8 lg:mt-0'>

            <div className={`p-2 lg:px-14 pt-24 lg:pt-10 w-full flex items-center justify-center`}>
                <label htmlFor="" className='relative sm:w-5/6 w-full'>
                    <button className='absolute translate-y-1/3 translate-x-3/4 sm:translate-x-1/4 text-white' >
                        <FiSearch className='top-0 text-2xl' /></button>
                    <input type="text" className='block mx-auto pl-16 sm:px-12 py-2 w-full border-1 font-light border-none outline-none text-white bg-transparent'
                        placeholder="Search for movies or TV series"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                                const results = await searchMovies(searchQuery);
                                setSearchResults(results);
                            }
                        }}
                    />
                    <button className={`absolute top-0 right-8 translate-y-2/3 sm:translate-x-1/4 text-white ${searchQuery !== '' ? 'block' : 'hidden'}`} onClick={() => {
                        setSearchQuery('')
                        setSearchResults([])
                    }}><AiOutlineCloseCircle className='text-xl' /></button>
                </label>
                <button className='border-1 rounded text-white px-4 py-1 bg-redcol hover:text-redcol hover:bg-white transition-all duration-300 ease-in-out'
                    onClick={async () => {
                        const results = await searchMovies(searchQuery);
                        setSearchResults(results);
                    }}>Search</button>
            </div>
            <div className='pt-14 pl-4 text-white lg:pl-40 lg:pt-10'>
                {isLoading ? (
                    <div className='flex items-center justify-center '>
                        Loading....
                    </div>
                ) : (
                    <>
                        {
                            searchResults.length === 0 ? (
                                <div className='flex flex-col gap-6'>
                                    <div>
                                        <h1 className='text-xl font-light'>Trending</h1>
                                        <div className='card-container flex overflow-x-scroll overflow-y-hidden gap-6 pr-2'>
                                            {trending.length !== 0 ?
                                                trending.map((trending, index) => {
                                                    return trending.title ? <Card id={trending.id} key={index} title={trending.title} year={trending.release_date.slice(0, 4)} type={trending.media_type} img={`https://image.tmdb.org/t/p/original/${trending.backdrop_path}`} /> : ''
                                                })
                                                : 'No movies'}
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className='text-xl font-light'>Recommended For You</h1>
                                        <div className='px-4 card-container flex flex-wrap gap-4'>
                                            {
                                                topRated.length !== 0 ?
                                                    topRated.map((top, index) => {
                                                        return <CardPoster id={top.id} key={index} title={top.title} year={top.release_date.slice(0, 4)} img={`https://image.tmdb.org/t/p/original/${top.poster_path}`} />
                                                    }) : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) :

                                <div className='flex flex-wrap gap-4'>
                                    {searchResults.length !== 0 ? (
                                        searchResults.filter((movie) => movie.backdrop_path)
                                            .map((result, index) => (
                                                <Card
                                                    id={result.id}
                                                    key={index}
                                                    title={result.title || result.name}
                                                    year={(result.release_date || result.first_air_date)?.slice(0, 4)}
                                                    type={result.media_type}
                                                    img={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                                                />
                                            ))
                                    ) : (
                                        'No search results'
                                    )}
                                </div>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default Home