import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/Card.jsx';
import CardPoster from '../components/CardPoster.jsx';
import { useAuth } from '../AuthContext.jsx';
import Search from '../components/Search.jsx';
// import DisplaySlider from '../components/DisplaySlider.jsx';
import SkeltonComponent from '../components/SkeltonComponent.jsx';
import MyComponentSkeleton from '../components/MyComponentSkelton.jsx';
// import Rolling from './Rolling.'



const Home = () => {

    const token = localStorage.getItem("jwt_token")
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isLoading, setIsLoading] = useState(true);


    const fetchTrending = async () => {
        const res = await axios.request({
            url: `${process.env.REACT_APP_API_URL}/tmdb/trendingmovies`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res)
        return res.data.data;
    }

    const fetchTopRated = async () => {
        const res = await axios.request({
            url: `${process.env.REACT_APP_API_URL}/tmdb/topratedmovies`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data.data;
    }

    const searchMovies = async (query) => {
        const res = await axios.request({
            url: `${process.env.REACT_APP_API_URL}/tmdb/searchmovie/${query}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data.results;
    };



    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTrending();
            setTrending(data.results);
        };

        const fetchDataTopRated = async () => {
            const topData = await fetchTopRated();
            setTopRated(topData.results);
            setIsLoading(false);
        }

        fetchData();
        fetchDataTopRated()
    }, [])


    return (
        <div className='bg-bgdarkb min-w-full min-h-screen mt-18 pb-8 lg:mt-0'>
            <Search searchResults={searchResults} setSearchResults={setSearchResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className='pt-14 text-white lg:pl-32 lg:pt-10'>
                {
                    <>
                        {
                            searchResults && searchResults.length === 0 ? (
                                <div className=''>

                                    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                                        <div className="flex flex-nowrap">
                                            {trending && trending.length !== 0 ? (
                                                trending.map((trending, index) => {
                                                    return trending.title ? (
                                                        <div className='inline-block px-3'>
                                                            <Card
                                                                id={trending.id}
                                                                key={index}
                                                                title={trending.title}
                                                                year={trending.release_date.slice(0, 4)}
                                                                type={trending.media_type}
                                                                img={`https://image.tmdb.org/t/p/original/${trending.backdrop_path}`}
                                                            />
                                                        </div>
                                                    ) : (
                                                        ''
                                                    );
                                                })
                                            ) : (
                                                <div className='flex gap-4'>
                                                    <MyComponentSkeleton key={1} />
                                                    <MyComponentSkeleton key={2} />
                                                    <MyComponentSkeleton key={3} />
                                                    <MyComponentSkeleton key={4} />
                                                    <MyComponentSkeleton key={5} />
                                                    <MyComponentSkeleton key={6} />
                                                    <MyComponentSkeleton key={7} />
                                                </div>

                                            )}
                                        </div>
                                    </div>
                                    <div className='px-8'>
                                        <h1 className='text-xl font-light'>Recommended For You</h1>
                                        <div className='card-container flex flex-wrap gap-4'>
                                            {
                                                topRated && topRated.length !== 0 ?
                                                    topRated.map((top, index) => {
                                                        return <CardPoster id={top.id} key={index} title={top.title} year={top.release_date.slice(0, 4)} img={`https://image.tmdb.org/t/p/original/${top.poster_path}`} />
                                                    }) : <>

                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                        <SkeltonComponent />
                                                    </>
                                            }

                                            {/* <ul class="inline-flex -space-x-px text-sm">
                                                <li>
                                                    <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                                </li>
                                                <li>
                                                    <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                                                </li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                            ) :

                                <div className='flex flex-wrap gap-4 mx-12'>
                                    {searchResults && searchResults.length !== 0 ? (
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
                }
            </div>
        </div>
    )
}

export default Home