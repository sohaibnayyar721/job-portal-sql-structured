import React from 'react'
import { useEffect, useState } from 'react'
import SoftwareEngineer from '../Assets/SoftwareEngineer.png'
import Loader from './loader'

function EmployeerShortlistCandidate() {

    let token = localStorage.getItem('token')
    let [isLoading, setIsLoading] = useState(true)
    const [shortlistData, setShortlistData] = useState([])

    async function getCandidateShortlist() {
        try {
            const getData = await fetch('http://localhost:4500/employer/shortlistCandidate/data', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            const response = await getData.json()
            setShortlistData(response.shortlistData)
            setIsLoading(false)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCandidateShortlist()
    }, [])
    return (
        <div className='w-full'>
            {
                isLoading ?
                    <Loader /> :
                    <div className='flex flex-col gap-8 w-full bg-[#eeeeee99] h-[88vh] overflow-y-scroll px-12 py-6'>

                        <div className=' flex flex-col gap-4 w-full text-green-700 '>

                            <div className='border-l-[5px] border-green-700 px-3 '>
                                <p className='text-black font-bold text-xl'>Candidate Shortlist</p>

                            </div>
                        </div>

                        <div className='w-full flex flex-col gap-8 bg-white p-5'>
                            <div className=' flex flex-col gap-8 rounded '>


                                {
                                    shortlistData?.map((data, index) => {
                                        return (
                                            <div key={index} className='flex flex-col gap-4'>


                                                <div key={index} className=' w-full border border-solid bg-white hover:shadow-xl rounded hover:border-[#61CE70] border-gray-300 p-4  flex flex-col gap-4'>

                                                    <div className='flex items-center justify-between border-b-[1px]  border-gray-300 py-3'>
                                                        <div className='flex gap-3 items-center'>
                                                            <p className='text-black font-plus-jakarta-sans text-xl font-semibold'>{data.designation}</p>
                                                        </div>
                                                    </div>

                                                    <div className='flex gap-4 items-center justify-center
md:justify-between'>
                                                        <div className='flex gap-4 ' >
                                                            <div className='w-14 h-14 object-contain'>
                                                                <img src={SoftwareEngineer}></img>
                                                            </div>
                                                            <div className='flex flex-col gap-2'>
                                                                <p className='text-black font-plus-jakarta-sans text-xl font-semibold'>{data.fullName}</p>
                                                                <div className='flex gap-2 items-center'>
                                                                    <p className='text-[#14a077] font-plus-jakarta-sans text-base font-bold'>{data.designation}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* {
                           data?.status === 'pending' ?
                               <p className='text-white bg-yellow-400 h-8 px-2 rounded-md flex items-center justify-center'>Pending</p>

                               :
                               <p className='text-white h-8 px-2 bg-green-600 rounded-md flex items-center justify-center'>Approved</p>
                       } */}

                                                        <div className='flex gap-2 items-center justify-center'>
                                                            <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>Dec 23, 2023</p>
                                                        </div>


                                                        {/* <div className='flex items-center justify-center gap-4'>

                           <CheckIcon
                               className='hover:text-green-600 scale-100'
                               onClick={() => handleShortListCandidate(employerID, data)}
                           />
                           <FileDownloadOutlinedIcon
                               onClick={() => DownloadPdf(data.resume, candidateFirstName)}
                               className='hover:text-green-600 scale-125' />
                       </div> */}

                                                    </div>
                                                    <div>
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
    )
}

export default EmployeerShortlistCandidate