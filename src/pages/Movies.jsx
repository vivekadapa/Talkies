import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Card from '../components/Card';
import { AiOutlineCloseCircle } from 'react-icons/ai'



const Movies = () => {

  const [bolly, setBolly] = useState([]);
  const [tolly, setTolly] = useState([]);
  const [kolly, setKolly] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hindiMovieURl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=hi`;
  const teluguMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=te`;
  const tamilMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=ta`;


  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchMovies = async (query) => {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
    const res = await axios.get(searchUrl);
    return res.data.results;
  };

  const fetchBolly = async () => {
    const res = await axios.get(hindiMovieURl);
    return res.data;
  }

  const fetchTolly = async () => {
    const res = await axios.get(teluguMovieURL);
    return res.data;
  }

  const fetchKolly = async () => {
    const res = await axios.get(tamilMovieURL);
    return res.data;
  }

  useEffect(() => {
    const fetchHindi = async () => {
      const hindi = await fetchBolly();
      setBolly(hindi.results);
    }

    const fetchTelugu = async () => {
      const telugu = await fetchTolly();
      setTolly(telugu.results);
    }

    const fetchTamil = async () => {
      const tamil = await fetchKolly();
      setKolly(tamil.results);
      setIsLoading(false);
    }


    fetchHindi()
    fetchTelugu()
    fetchTamil()
  },[])

  console.log(bolly)



  return (
    <div className='p-2 bg-bgdarkb min-w-screen min-h-screen pb-8 lg:mt-0'>
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
      <div className='pt-10 px-4 text-white  lg:pl-36'>
        {isLoading ? (
          <div className='flex items-center justify-center '>
            Loading....
          </div>
        )
          : (
            <>
              {
                searchResults.length === 0 ? (
                  <div className='flex flex-col gap-4'>
                    <div>
                      <h1 className='font-light text-2xl'>Movies in Hindi</h1>
                      <div className='movies overflow-x-scroll overflow-y-hidden flex gap-4'>
                        {bolly.length !== 0 ?
                          bolly.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview)
                            .map((movie, index) => {
                              return <Card key={index} id={movie.id} type={movie.media_type} year={movie.release_date.slice(0, 4)} title={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
                            }) : "No movies"
                        }
                      </div>
                    </div>
                    <div>
                      <h1 className='font-light text-2xl'>Movies in Telugu</h1>
                      <div className='movies overflow-x-scroll overflow-y-hidden flex gap-4'>
                        {tolly.length !== 0 ?
                          tolly.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview)
                            .map((movie, index) => {
                              return <Card key={index} id={movie.id} type={movie.media_type} year={movie.release_date.slice(0, 4)} title={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
                            }) : "No movies"
                        }
                      </div>
                    </div>
                    <div>
                      <h1 className='font-light text-2xl'>Movies in Tamil</h1>
                      <div className='movies overflow-x-scroll overflow-y-hidden flex gap-4'>
                        {kolly.length !== 0 ?
                          kolly.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview)
                            .map((movie, index) => {
                              return <Card key={index} id={movie.id} type={movie.media_type} year={movie.release_date.slice(0, 4)} title={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
                            }) : "No movies"
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

export default Movies