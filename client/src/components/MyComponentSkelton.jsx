import React from 'react';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/system';

const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
    backgroundColor: '#282c34',
}));

const MyComponentSkeleton = () => {
    return (
        <div className='relative w-[24rem] h-64 max-w-sm overflow-hidden rounded-lg mt-4'>
            <CustomSkeleton variant="rectangular" width="100%" height="100%" className='rounded' />
            <ul className='absolute flex items-center bottom-12 font-thin left-4'>
                <li className=''>
                    <CustomSkeleton variant="text" width={40} height={20} />
                </li>
                <li className='mx-2 flex items-center gap-1'>
                    <CustomSkeleton variant="circular" width={20} height={20} />
                </li>
            </ul>
            <div className='absolute bottom-4 left-4'>
                <CustomSkeleton variant="text" width={200} height={24} />
            </div>
        </div>
    );
};

export default MyComponentSkeleton;
