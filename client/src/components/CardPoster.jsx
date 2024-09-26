import React from 'react'
import { Link } from 'react-router-dom';

const CardPoster = ({ id, img, title, year, type }) => {
    return (
        <div className='relative flex-shrink-0 w-52 max-[500px]:w-40 mt-4 transition duration-300 cursor-pointer ease-in-out hover:scale-105 group'>
            <Link to={`${id}`}>
                <img src={img} alt="" className='w-full h-full rounded  hover:rounded-none' />
            </Link>
            {/* <ul className='absolute flex items-center p-1 bg-[#fc4747] rounded-sm top-0 font-thin right-0'>
                <li className=''>{year}</li>
            </ul>
            <div className='absolute bottom-2 left-4'>
                <span className='text-sm group-hover:text-redcol'>{title}</span>
            </div> */}
        </div>
    )
}

export default CardPoster