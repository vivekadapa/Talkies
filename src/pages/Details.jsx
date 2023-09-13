import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BsPlayFill } from 'react-icons/bs';



const Details = () => {
    const Location = useLocation();
    console.log(Location.pathname)
    console.log(Location.pathname.slice(1))

    const [isLoading, setIsLoading] = useState(true);


    const id = () => {
        const pathname = Location.pathname;
        if (pathname.includes('/tv/')) {
            return pathname.replace('/tv/', '');
        } else if (pathname.includes('/movies/')) {
            return pathname.replace('/movies/', '');
        } else {
            return pathname.slice(1);
        }
    }


    const [movieDetails, setMovieDetails] = useState({});
    const [cast, setCast] = useState([]);

    const movieDetailUrl = Location.pathname.includes('/tv/') ? `https://api.themoviedb.org/3/tv/${id()}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos` : `https://api.themoviedb.org/3/movie/${id()}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;
    const castDetailUrl = Location.pathname.includes('/tv/') ? `https://api.themoviedb.org/3/tv/${id()}/credits?api_key=${process.env.REACT_APP_API_KEY}` : `https://api.themoviedb.org/3/movie/${id()}/credits?api_key=${process.env.REACT_APP_API_KEY}`;

    const fetchMovieDetails = async () => {
        const res = await axios.get(movieDetailUrl)
        return res.data;
    }

    const fetchCastDetails = async () => {
        const res = await axios.get(castDetailUrl)
        return res.data;
    }

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await fetchMovieDetails();
            setMovieDetails(data);
        }

        const fetchCast = async () => {
            const data = await fetchCastDetails();
            setCast(data.cast)
            setIsLoading(false)
        }

        fetchMovie();
        fetchCast();
    }, [])




    return (
        <div className='bg-bgdarkb max-w-full min-h-screen mt-16 pb-8 lg:mt-0'>
            <div className='pt-12 px-4 text-white  lg:pl-36'>
                {isLoading ? (
                    <div className='flex items-center justify-center '>
                        Loading....
                    </div>
                ) :
                    (
                        <>
                            {
                                Location.pathname.includes('/tv/') ?
                                    (<div className='my-8 lg:flex'>
                                        <div className='sm:mx-4 hidden lg:block'>
                                            <img src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} alt="" className='lg:max-w-sm rounded-md' />
                                        </div>
                                        <div className='sm:mx-4 block lg:hidden'>
                                            <img src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} alt="" className='lg:max-w-sm rounded-md' />
                                        </div>
                                        <div className='m-4 lg:w-2/3'>
                                            <div className='flex flex-col gap-6 lg:flex-row justify-between pr-24 lg:items-center'>
                                                <div className='flex flex-col'>
                                                    <h1 className='sm:text-4xl font-thin'>{movieDetails.original_name}</h1>
                                                    <div className='flex mt-3 text-slate-400'>
                                                        {movieDetails.first_air_date && (
                                                            <p className='pr-2 border-r-2'>{movieDetails.first_air_date.slice(0, 4)}</p>
                                                        )}
                                                        {movieDetails.number_of_seasons && (
                                                            <p className='px-2 border-r-2'>{movieDetails.number_of_seasons} {movieDetails.number_of_seasons > 1 ? 'Seasons' : 'Season'}</p>
                                                        )}
                                                        {movieDetails.genres && movieDetails.genres.length > 0 && (
                                                            <p className='px-2'>{movieDetails.genres[0].name}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        movieDetails.videos && movieDetails.videos.results && movieDetails.videos.results.length > 0 &&
                                                        (
                                                            <button className='flex items-center'>
                                                                <BsPlayFill className='play text-4xl text-white border-2 rounded-full' />
                                                                <p className='mx-2'>Watch Trailer</p>
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className='my-8 lg:pr-16 font-light'>
                                                <p className='text-xl'>Overview:</p>
                                                <p className='pl-4 text-slate-400 text-sm sm:text-lg' style={{ lineHeight: '2rem' }}>{movieDetails.overview}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    : (<div className='my-8 md:flex'>
                                        <div className='sm:mx-4 hidden md:block'>
                                            <img src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} alt="" className='md:max-w-sm rounded-md' />
                                        </div>
                                        <div className='sm:mx-4 block md:hidden'>
                                            <img src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} alt="" className='md:max-w-sm rounded-md' />
                                        </div>
                                        <div className='m-4 md:w-2/3'>
                                            <div className='flex flex-col gap-6 lg:flex-row justify-between pr-24 lg:items-center'>
                                                <div className='flex flex-col'>
                                                    <h1 className='text-xl sm:text-4xl font-thin'>{movieDetails.title}</h1>
                                                    <div className='flex mt-3 text-slate-400'>
                                                        {movieDetails.release_date && (
                                                            <p className='pr-2 border-r-2'>{movieDetails.release_date.slice(0, 4)}</p>
                                                        )}
                                                        {movieDetails.runtime && (
                                                            <p className='px-2 border-r-2'>{movieDetails.runtime}min</p>
                                                        )}
                                                        {movieDetails.genres && movieDetails.genres.length > 0 && (
                                                            <p className='px-2'>{movieDetails.genres[0].name}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        movieDetails.videos && movieDetails.videos.results && movieDetails.videos.results.length > 0 &&
                                                        (
                                                            <button className='flex items-center'>
                                                                <BsPlayFill className='play text-4xl text-white border-2 rounded-full' />
                                                                <p className='mx-2'>Watch Trailer</p>
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className='my-4 md:my-8 sm:pr-16 font-light'>
                                                <p className='text-xl'>Overview:</p>
                                                <p className='pl-4 w-full text-slate-400 text-sm sm:text-lg' style={{ lineHeight: '2rem' }}>{movieDetails.overview}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            }
                        </>
                    )}

                {

                    cast.length !== 0 && !isLoading ?
                        (<div>
                            <h1>Cast and Crew</h1>
                            <div className='flex flex-wrap my-4 flex-shrink-0 gap-4 '>
                                {
                                    cast.filter(person => person.profile_path && person.name)
                                        .map((person, index) => {
                                            if (index < 10) {
                                                return <div key={index} className='relative max-w-[200px] transition duration-300 cursor-pointer ease-in-out hover:scale-105 text-white hover:text-redcol'>
                                                    <a href={`https://en.wikipedia.org/wiki/${person.name.replaceAll(" ", "_")}`} target='_blank'>
                                                        <img src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} alt="" className='rounded-sm w-full h-full' />
                                                        <p className='absolute bottom-2 left-2 '>{person.name}</p>
                                                    </a>
                                                </div>
                                            }
                                            return null;
                                        })
                                }

                            </div>
                        </div>
                        )
                        :
                        ""
                }

            </div>

        </div>
    )
}

export default Details