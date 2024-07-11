import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';
import CardPoster from '../components/CardPoster.jsx';
import Search from '../components/Search.jsx';
// import DisplaySlider from '../components/DisplaySlider.jsx';
import SkeltonComponent from '../components/SkeltonComponent.jsx';
import MyComponentSkeleton from '../components/MyComponentSkelton.jsx';


const Tv = () => {
  const [tv, setTv] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const tvUrl = `${process.env.REACT_APP_API_URL}/tmdb/trendingtv`;
  const topRatedTv = `${process.env.REACT_APP_API_URL}/tmdb/topratedtv`;

  const fetchTv = async () => {
    const res = await axios.get(tvUrl);
    return res.data.data;
  };

  const fetchTopRated = async () => {
    const res = await axios.get(topRatedTv);
    return res.data.data;
  };

  useEffect(() => {
    const fetchTvData = async () => {
      const data = await fetchTv();
      console.log(data.results)
      setTv(data.results);
    };

    const fetchTop = async () => {
      const data = await fetchTopRated();
      setTopRated(data.results);
      setIsLoading(false);
    };

    fetchTvData();
    fetchTop();
  }, []);

  return (
    <div className='bg-bgdarkb min-w-screen min-h-screen mt-18 pb-8 lg:mt-0'>

      <Search searchResults={searchResults} setSearchResults={setSearchResults} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <div className='pt-14 pb-8 text-white lg:pt-1'>
        {
          <>
            {searchResults.length === 0 ? (
              <div className='flex flex-col gap-8 py-10 pr-8 text-white lg:pl-36'>
                {/* <DisplaySlider title={'tv in TV'} array={tv} type={'Shows'} /> */}
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div className="flex flex-nowrap">
                    {tv && tv.length !== 0 ? (
                      tv.map((tv, index) => {
                        return tv.name ? (
                          <div className='inline-block px-3'>
                            <Card
                              id={tv.id}
                              key={index}
                              title={tv.name}
                              year={tv.first_air_date.slice(0, 4)}
                              type={tv.media_type}
                              img={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`}
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
                <div>
                  <h1>TopRated In Tv</h1>
                  <div className='px-4 card-container flex flex-wrap gap-4'>
                    {topRated.length !== 0 ? (
                      topRated.map((tv, index) => {
                        return tv.name && tv.backdrop_path ? (
                          <CardPoster
                            id={tv.id}
                            key={index}
                            title={tv.name}
                            type={tv.media_type}
                            year={tv.first_air_date.slice(0, 4)}
                            img={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                          />
                        ) : (
                          ''
                        );
                      })
                    ) : (
                      <>
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
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-wrap gap-4 pt-8 pl-32'>
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

export default Tv;
