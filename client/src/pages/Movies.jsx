import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';
import Search from '../components/Search.jsx';
// import DisplaySlider from '../components/DisplaySlider.jsx';
import MyComponentSkeleton from '../components/MyComponentSkelton.jsx';


const Movies = () => {
  const [bolly, setBolly] = useState([]);
  const [tolly, setTolly] = useState([]);
  const [kolly, setKolly] = useState([]);

  const token = localStorage.getItem("jwt_token")
  const [isLoading, setIsLoading] = useState(true);
  const hindiMovieURl = `${process.env.REACT_APP_API_URL}/tmdb/moviesByLang/hi`;
  const teluguMovieURL = `${process.env.REACT_APP_API_URL}/tmdb/moviesByLang/te`;
  const tamilMovieURL = `${process.env.REACT_APP_API_URL}/tmdb/moviesByLang/ta`;

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchBolly = async () => {
    const res = await axios.get(hindiMovieURl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  };

  const fetchTolly = async () => {
    const res = await axios.get(teluguMovieURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  };

  const fetchKolly = async () => {
    const res = await axios.get(tamilMovieURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  };

  useEffect(() => {
    const fetchHindi = async () => {
      const hindi = await fetchBolly();
      setBolly(hindi.results);
    };

    const fetchTelugu = async () => {
      const telugu = await fetchTolly();
      setTolly(telugu.results);
    };

    const fetchTamil = async () => {
      const tamil = await fetchKolly();
      setKolly(tamil.results);
      setIsLoading(false);
    };

    fetchHindi();
    fetchTelugu();
    fetchTamil();
  }, []);

  return (
    <div className='p-2 bg-bgdarkb min-w-screen min-h-screen pb-8 lg:mt-0'>
      <Search searchResults={searchResults} setSearchResults={setSearchResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className='pt-10 text-white  lg:pl-32'>
        {
          <>
            {searchResults.length === 0 ? (
              <div className='flex flex-col gap-4'>
                <h1 className='mx-4 text-xl'>Movies In Hindi</h1>
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div className="flex flex-nowrap">
                    {bolly && bolly.length !== 0 ? (
                      bolly.map((bolly, index) => {
                        return bolly.title ? (
                          <div className='inline-block px-3'>
                            <Card
                              id={bolly.id}
                              key={index}
                              title={bolly.title}
                              year={bolly.release_date.slice(0, 4)}
                              type={bolly.media_type}
                              img={`https://image.tmdb.org/t/p/original/${bolly.backdrop_path}`}
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
                <h1 className='mx-4 text-xl'>Movies In Telugu</h1>
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div className="flex flex-nowrap">
                    {tolly && tolly.length !== 0 ? (
                      tolly.map((tolly, index) => {
                        return tolly.title ? (
                          <div className='inline-block px-3'>
                            <Card
                              id={tolly.id}
                              key={index}
                              title={tolly.title}
                              year={tolly.release_date.slice(0, 4)}
                              type={tolly.media_type}
                              img={`https://image.tmdb.org/t/p/original/${tolly.backdrop_path}`}
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
                <h1 className='mx-4 text-xl'>Movies In Tamil</h1>
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div className="flex flex-nowrap">
                    {kolly && kolly.length !== 0 ? (
                      kolly.map((kolly, index) => {
                        return kolly.title ? (
                          <div className='inline-block px-3'>
                            <Card
                              id={kolly.id}
                              key={index}
                              title={kolly.title}
                              year={kolly.release_date.slice(0, 4)}
                              type={kolly.media_type}
                              img={`https://image.tmdb.org/t/p/original/${kolly.backdrop_path}`}
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
                {/* <DisplaySlider title={'Movies In Hindi'} array={bolly} type={'Movie'} />
                <DisplaySlider title={'Movies In Telugu'} array={tolly} type={'Movie'} />
                <DisplaySlider title={'Movies In Tamil'} array={kolly} type={'Movie'} /> */}
              </div>
            ) : (
              <div className='flex flex-wrap gap-4'>
                {searchResults.length !== 0 ? (
                  searchResults
                    .filter((movie) => movie.backdrop_path)
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
            )}
          </>
        }
      </div>
    </div>
  );
};

export default Movies;
