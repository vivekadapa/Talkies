import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { BiGame } from 'react-icons/bi';

const SkeltonComponent = () => {
    return (
        <div className='relative flex-shrink-0 w-52 mt-4'>
            <Skeleton variant="rectangular" width="100%" height={308} sx={{bgcolor:"#282c34"}} className='rounded' />
            <ul className='absolute flex items-center top-2 font-thin right-4'>
                <li className=''>
                    <Skeleton variant="text" width={40} height={20} sx={{bgcolor:"#282c34"}}  />
                </li>
            </ul>
            <div className='absolute bottom-2 left-4'>
                <Skeleton variant="text" width={100} height={20} sx={{bgcolor:"#282c34"}} />
            </div>
        </div>
    )
}

export default SkeltonComponent