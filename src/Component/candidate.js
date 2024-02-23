import React, { useEffect, useState } from 'react'
import './content.css'
import SoftwareEngineer from '../Assets/SoftwareEngineer.png'
import Heart from '../Assets/Heart.png'
import DollarIcon from '../Assets/DollarIcon.png'
import locationIcon from '../Assets/locationIcon.png'

function Candidate() {
    let [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            const getjobData = await fetch('http://localhost:4500/getData', {
                method: "GET",
            })
            let data = await getjobData.json()
            setData(data)
        }
        getData()
    }, [])
    console.log(data)
    return (
        <div className='w-[100%] h-[100vh] '>
            {/* {
                data.map((data) => {
                    return (
                        <div key={data._id}>
                            <p>Job Tittle: {data.jobName}</p>
                            <p>Location: {data.location}</p>
                            <p>Salary: {data.salary}</p>
                            <p>Date: {data.date}</p>
                        </div>

                    )
                })
            } */}

            {
                data.map((data) => {
                    return (
                        <div className='flex flex-col gap-5 mt-3
            md:grid md:grid-cols-2 md:gap-8'>

                            <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4'>

                                <div className='flex gap-4
                    md:justify-between'>

                                    <div className='flex gap-4'>
                                        <div className='w-14 h-14 object-contain'>
                                            <img src={SoftwareEngineer}></img>
                                        </div>

                                        <div className='flex flex-col'>
                                            <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>{data.jobDomain}</p>
                                            <div className='flex gap-2 items-center'>
                                                <p className='text-black font-plus-jakarta-sans text-xl font-bold'>{data.jobName}</p>
                                                <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                            </div>

                                        </div>
                                    </div>


                                    <div className='w-10 h-10 rounded-full object-contain border-2 border-gray-400 flex items-center justify-center'>
                                        <img src={Heart}></img>
                                    </div>

                                </div>
                                <div className='w-full flex items-center flex-wrap -300'>
                                    <div className='flex items-center'>
                                        <img src={locationIcon}></img>
                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>{data.location}</p>
                                    </div>

                                </div>
                                <div>
                                    <button className='flex items-center justify-start py-2 px-6 rounded-3xl bg-[#F1F1F1]'>
                                        Part Time
                                    </button>
                                </div>

                                <div className='flex items-center justify-between border-t-2 border-gray-200 py-4'>
                                    <div className='flex gap-3 items-center'>
                                        <img src={DollarIcon} className='w-6 h-6'></img>
                                        <p className='text-black font-plus-jakarta-sans text-lg font-semibold'>{data.salary}<span className='text-[#64666C]'>/ month</span></p>
                                    </div>
                                    <p className='text-[#64666C]'>June 14, 2030</p>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Candidate