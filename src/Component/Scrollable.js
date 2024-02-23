import React from 'react'
import GermanyPicture from '../Assets/GermanyPicture.png'
function Scrollable() {
    return (
        <div className='w-screen h-[20vh]'>
            <div className='bg-red-200 overflow-x-auto flex gap-5'>
                <img src={GermanyPicture} className='w-72 h-28'></img>
                <img src={GermanyPicture} className='w-72 h-28'></img>
                <img src={GermanyPicture} className='w-72 h-28'></img>
                <img src={GermanyPicture} className='w-72 h-28'></img>
                <img src={GermanyPicture} className='w-72 h-28'></img>
                <img src={GermanyPicture} className='w-72 h-28'></img>
                <img src={GermanyPicture} className='w-72 h-28'></img>
            </div>
        </div>
    )
}

export default Scrollable