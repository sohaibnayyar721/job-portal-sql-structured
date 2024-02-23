import React from 'react'
import Loader from '../Loader/Loader'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CompanyLogo from '../../assets/pictures/CompanyLogo.png'
import { useState, useEffect } from 'react';
import ServerError from '../Error/ServerError';

function CandidateRecentlyApplied() {
    const [isLoading, setIsLoading] = useState(true)
    let [recentlyApplied, setRecentlyApplied] = useState([])
    let [serverError, setServerError] = useState(false)
    let token = localStorage.getItem('token')

    useEffect(() => {
        async function getCandidateData() {

            try {
                const getData = await fetch('http://localhost:4500/candidate/recentlyApplied', {

                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const response = await getData.json()
                console.log(response)

                if (response.message === 'Internal Server Error') {
                    setIsLoading(false)
                    setServerError(true)
                }
                setRecentlyApplied(response.findEmployer)
                setIsLoading(false)


            } catch (err) {
                setIsLoading(false)
                setServerError(true)
            }

        }
        getCandidateData()
    }, [])
    return (
        <div className='w-full'>
            {
                serverError ?
                    <div className='h-[86vh]' >
                        <ServerError />
                    </div>
                    :
                    <div>
                        {
                            isLoading ?
                                <Loader />
                                :
                                <div className='flex overflow-y-scroll h-[86vh] flex-col gap-8 w-full  bg-[#eeeeee99] px-8 py-6'>
                                    <div className='bg-white flex flex-col gap-5 px-6 py-4'>
                                        <p className='font-semibold text-xl '>Jobs Applied Recently </p>
                                        <div className='w-full h-auto flex flex-col gap-4'>
                                            {
                                                recentlyApplied?.map((data, index) => {
                                                    return (
                                                        <div key={index} className='flex flex-col gap-4'>
                                                            <div key={index} className='w-full border border-solid hover:shadow-xl hover:border-[#61CE70] border-gray-300 p-4  flex flex-col gap-4'>
                                                                <div className='flex gap-4
                                        md:justify-between'>

                                                                    <div className='flex gap-4 ' >
                                                                        <div className='w-20 h-20 object-contain rounded-full'>
                                                                            {
                                                                                data.companyLogo ?
                                                                                    <img className='w-full h-full rounded-full' src={data.companyLogo}></img>
                                                                                    :
                                                                                    <img className='w-full h-full rounded-full' src={CompanyLogo}></img>

                                                                            }

                                                                        </div>

                                                                        <div className='flex flex-col gap-2'>
                                                                            <p className='text-[#14A077] font-plus-jakarta-sans text-sm font-semibold'>{data.jobTitle}</p>
                                                                            <div className='flex gap-2 items-center'>
                                                                                <p className='text-black font-plus-jakarta-sans text-xl font-bold'>{data.category}</p>
                                                                                <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>

                                                                            </div>

                                                                            <div className='w-full flex items-center gap-2 flex-wrap -300 '>
                                                                                {data.location && (
                                                                                    <div className='flex items-center'>
                                                                                        <LocationOnOutlinedIcon className='text-gray-500 transform scale-90' />
                                                                                        <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.location}</p>
                                                                                    </div>
                                                                                )}
                                                                                {
                                                                                    data.date && (
                                                                                        <div className='flex gap-2 items-center justify-center'>
                                                                                            <CalendarTodayIcon className='text-gray-600 transform scale-75' />
                                                                                            <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.date}</p>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>

                                                                        </div>


                                                                    </div>

                                                                </div>

                                                                {data.jobType ?
                                                                    <div className='w-full '>
                                                                        <button className=' py-2 px-6 rounded-3xl bg-[#F1F1F1]'>
                                                                            {data.jobType}
                                                                        </button>
                                                                    </div>
                                                                    : null}

                                                                <div className='flex items-center justify-between border-t-2 border-gray-200 py-4'>
                                                                    <div className='flex gap-3 items-center'>
                                                                        {
                                                                            data.minSalary && data.maxSalary ?
                                                                                <p className='text-black font-plus-jakarta text-lg font-semibold'>${data.minSalary} - ${data.maxSalary} <span className='text-[#64666C]'>/ month</span></p>

                                                                                : data.minSalary ? (
                                                                                    <p className='text-black font-plus-jakarta-sans text-lg font-semibold'> ${data.minSalary}<span className='text-[#64666C]'>/ month</span></p>

                                                                                )
                                                                                    : data.minSalary ? (
                                                                                        <p className='text-black font-plus-jakarta-sans text-lg font-semibold'> ${data.maxSalary}<span className='text-[#64666C]'>/ month</span></p>

                                                                                    ) : ""
                                                                        }
                                                                    </div>
                                                                    <p className='text-[#64666C]'>{data.date}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div>

    )
}

export default CandidateRecentlyApplied