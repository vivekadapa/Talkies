import React from 'react'
import {FcClapperboard} from 'react-icons/fc'
import {BsFillGridFill} from 'react-icons/bs'
import {MdLocalMovies} from 'react-icons/md'
import {BsBookmark} from 'react-icons/bs'
import {PiTelevisionBold} from 'react-icons/pi'

const Navbar = () => {
  return (
    <nav className='fixed w-full shadow-xl flex justify-between items-center p-4 bg-bgblue lg:left-3 lg:top-3 lg:justify-between lg:items-center lg:flex-col lg:w-auto lg:min-h-[95%] lg:rounded-xl lg:shadow-2xl lg:px-6'>
        <div>
            <FcClapperboard className='clap text-4xl' />  
        </div>
        <div className='flex items-center lg:flex-col lg:justify-center'>
            <a href="" className='mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 text-white border-2 border-slate-600 p-1'> <BsFillGridFill className='text-2xl ' /> </a>
            <a href="" className='mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 text-slate-400 border-2 border-slate-600 p-1'> <PiTelevisionBold className='text-2xl'  /> </a>
            <a href="" className='mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 text-slate-400 border-2 border-slate-600 p-1'> <MdLocalMovies className='text-2xl' /> </a>
            <a href="" className='mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 text-slate-400 border-2 border-slate-600 p-1'> <BsBookmark className='text-2xl'  /> </a>
        </div>
        <div className='' >
            <img src="/images/demo1-avatar.jpg" className='w-10 border-2 rounded-full border-white' alt="" />
        </div>
    </nav>
  )
}

export default Navbar