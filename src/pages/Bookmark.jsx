import React from 'react'
import {FiSearch} from 'react-icons/fi'

const Bookmark = () => {
  return (
    <div className='bg-bgdarkb min-w-screen min-h-screen mt-16 lg:mt-0'>
        <div className={`lg:px-14 pt-24 lg:pt-10 w-full flex items-center justify-center`}>
        <label htmlFor="" className='relative sm:w-5/6 w-full'>
            <button className='absolute translate-y-1/3 translate-x-3/4 sm:translate-x-1/4 text-white'><FiSearch className='top-0 text-2xl' /></button>
            <input type="text" className='block mx-auto pl-16 sm:px-12 py-2 w-full border-1 font-light border-none outline-none text-white bg-transparent' 
            placeholder="Search your Bookmarks" />
        </label>
        </div>
        <div className='pt-20 text-white lg:pl-36'>
            <p>Bookmarks page</p>
        </div>
    </div>
  )
}

export default Bookmark