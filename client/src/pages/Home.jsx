import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/Card.jsx';
import CardPoster from '../components/CardPoster.jsx';
import { useAuth } from '../AuthContext.jsx';
import Search from '../components/Search.jsx';
// import DisplaySlider from '../components/DisplaySlider.jsx';
import SkeltonComponent from '../components/SkeltonComponent.jsx';
import MyComponentSkeleton from '../components/MyComponentSkelton.jsx';




const Home = () => {

    const { user, token } = useAuth();
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isLoading, setIsLoading] = useState(true);


    const fetchTrending = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tmdb/trendingmovies`);
        console.log(res)
        return res.data.data;
    }

    const fetchTopRated = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tmdb/topratedmovies`);
        return res.data.data;
    }

    const searchMovies = async (query) => {
        const searchUrl = `${process.env.REACT_APP_API_URL}/tmdb/searchmovie/${query}`
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
                                                    <MyComponentSkeleton />
                                                    <MyComponentSkeleton />
                                                    <MyComponentSkeleton />
                                                    <MyComponentSkeleton />
                                                    <MyComponentSkeleton />
                                                    <MyComponentSkeleton />
                                                    <MyComponentSkeleton />
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
                                        </div>
                                    </div>
                                </div>
                            ) :

                                <div className='flex flex-wrap gap-4'>
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