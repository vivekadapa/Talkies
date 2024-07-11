import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Bookmark = () => {
  const { user, token,setUser } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/getbookmarks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data);
        setBookmarks(result.data.data);
      } catch (error) {
        navigate('/login');
        console.log(error);
      }
    };

    getBookmarks();
  }, [user]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredBookmarks = searchQuery
    ? bookmarks.filter((bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : bookmarks;

  return (
    <div className='bg-bgdarkb min-w-full min-h-screen pb-8 mt-16 lg:mt-0'>
      <div className={`p-2 lg:px-14 pt-24 lg:pt-10 w-full flex items-center justify-center`}>
        <label htmlFor="" className='relative sm:w-5/6 w-full'>
          <button className='absolute translate-y-1/3 translate-x-3/4 sm:translate-x-1/4 text-white'>
            <FiSearch className='top-0 text-2xl' />
          </button>
          <input
            type='text'
            className='block mx-auto pl-16 sm:px-12 py-2 w-full border-1 font-light border-none outline-none text-white bg-transparent'
            placeholder='Search your Bookmarks'
            value={searchQuery}
            onChange={handleSearch}
          />
        </label>
      </div>
      <div className='pt-14 pl-4 text-white lg:pl-40 lg:pt-10'>
        <div className='flex flex-wrap gap-4'>
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark, index) => (
              <div className='flex flex-col gap-4'>
                <Link to={`/${bookmark.id}`}>
                  <div
                    key={index}
                    className='relative flex-shrink-0 max-w-[200px] sm:max-w-[250px] mt-4 transition duration-300 cursor-pointer ease-in-out hover:scale-105 hover:text-redcol'
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${bookmark.poster_path}`}
                      alt=''
                      className='w-full h-full rounded hover:rounded-none'
                    />
                    <div className='absolute bottom-4 left-4'>
                      <span className='text-xl'>{bookmark.title}</span>
                    </div>
                  </div>
                </Link>
                <button onClick={async () => {
                  console.log("hello world")
                  try {
                    const removeBookmark = await axios.request({
                      url: `${process.env.REACT_APP_API_URL}/user/removebookmark/${bookmark._id}`,
                      method: 'post',
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    })
                    setUser(removeBookmark.data.user)
                  } catch (error) {
                    console.log(error)
                  }
                }} className='w-full px-4 py-2 bg-redcol transition duration-300 rounded-b-md cursor-pointer ease-in-out hover:scale-[1.01] hover:text-white'>Remove Bookmark</button>
              </div>
            ))
          ) : (
            <p>No bookmarks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
