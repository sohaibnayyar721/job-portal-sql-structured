import React from 'react'
import logo from '../Assets/logo.png'
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
function SideBar() {
    const [menuButton, setMenuButton] = useState(false)
    return (
        <div className='w-[85%] h-[90vh] bg-red-300 fixed top-0 left-0
    '>
            <div className='flex items-center justify-between bg-red-300 py-4 px-2 border-b-2 border-gray-300'>
                <img className='w-25 h-10' src={logo}></img>
                <CloseIcon onClick={() => { setMenuButton(false) }} />
            </div>

            <div className='flex flex-col items-center justify-between h-full bg-white py-4'>
                <div className='w-full flex flex-col gap-2 px-8'>
                    <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                        <h1>Home</h1>
                        <ArrowForwardIosIcon className='text-gray-700' />
                    </div>
                    <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                        <h1>Home</h1>
                        <ArrowForwardIosIcon className='text-gray-700' />
                    </div>
                    <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                        <h1>Home</h1>
                        <ArrowForwardIosIcon className='text-gray-700' />
                    </div>
                    <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                        <h1>Home</h1>
                        <ArrowForwardIosIcon className='text-gray-700' />
                    </div>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <button className='bg-[#14A077] py-4 px-20 rounded-xl text-white font-bold text-lg'>Post a Job</button>
                </div>

            </div>

        </div>
    )
}

export default SideBar