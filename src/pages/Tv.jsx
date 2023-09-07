import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import axios from 'axios';
import Card from '../components/Card';
import CardPoster from '../components/CardPoster';
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Tv = () => {


  const [tv, setTv] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const [isLoading, setIsLoading] = useState(true);
  const searchMovies = async (query) => {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
    const res = await axios.get(searchUrl);
    return res.data.results;
  };
  const tvUrl = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  const topRatedTv = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`

  const fetchTv = async () => {
    const res = await axios.get(tvUrl);
    return res.data;
  }

  const fetchTopRated = async () => {
    const res = await axios.get(topRatedTv);
    return res.data;
  }

  useEffect(() => {
    const fetchTvData = async () => {
      const data = await fetchTv();
      setTv(data.results)
    }

    const fetchTop = async () => {
      const data = await fetchTopRated();
      setTopRated(data.results)
      setIsLoading(false);
    }

    fetchTvData();
    fetchTop();


  }, [])

  console.log(tv)

  return (
    <div className='bg-bgdarkb min-w-screen min-h-screen mt-16 lg:mt-0'>

      <div className={`lg:px-14 pt-24 lg:pt-10 w-full flex items-center justify-center`}>
        <label htmlFor="" className='relative sm:w-5/6 w-full'>
          <button className='absolute translate-y-1/3 translate-x-3/4 sm:translate-x-1/4 text-white' >
            <FiSearch className='top-0 text-2xl' /></button>
          <input type="text" className='block mx-auto pl-16 sm:px-12 py-2 w-full border-1 font-light border-none outline-none text-white bg-transparent'
            placeholder="Search for movies or TV series"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={`absolute top-0 right-8 translate-y-2/3 sm:translate-x-1/4 text-white ${searchQuery !== '' ? 'block' : 'hidden'}`} onClick={() => {
            setSearchQuery('')
            setSearchResults([])
          }}><AiOutlineCloseCircle className='text-xl' /></button>
        </label>
        <button className='border-1 rounded text-white px-4 py-1 bg-redcol hover:text-redcol hover:bg-white transition-all duration-300 ease-in-out' onClick={async () => {
          const results = await searchMovies(searchQuery);
          setSearchResults(results);
        }}>Search</button>
      </div>

      <div className='pt-14 pl-4 pb-8 text-white lg:pl-4 lg:pt-1'>
        {isLoading ? (
          <div className='flex items-center justify-center '>
            Loading....
          </div>
        ) : (
          <>
            {
              searchResults.length === 0 ? (
                <div className='flex flex-col gap-8 py-10 px-4 text-white lg:pl-36'>
                  <div>
                    <h1>Trending In Tv</h1>
                    <div className='card-container flex overflow-x-scroll overflow-y-hidden   gap-6'>
                      {tv.length !== 0 ?
                        tv.map((tv, index) => {
                          return tv.name && tv.backdrop_path ? <Card id={tv.id} key={index} title={tv.original_name} type={tv.media_type} year={tv.first_air_date.slice(0, 4)} img={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`} /> : ''
                        })
                        : 'No Shows'}
                    </div>
                  </div>
                  <div>
                    <h1>TopRated In Tv</h1>
                    <div className='px-4 card-container flex flex-wrap gap-4'>
                      {topRated.length !== 0 ?
                        topRated.map((tv, index) => {
                          return tv.name && tv.backdrop_path ? <CardPoster id={tv.id} key={index} title={tv.name} type={tv.media_type} year={tv.first_air_date.slice(0, 4)} img={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} /> : ''
                        })
                        : 'No Shows'}
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

export default Tv