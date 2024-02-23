import React from 'react'
import { useEffect, useState } from 'react';
import jobs from '../Assets/jobs.png';
import SoftwareEngineer from '../Assets/SoftwareEngineer.png'
import AddIcon from '@mui/icons-material/Add';
import views from '../Assets/views.png'
import shortlisted from '../Assets/Shortlisted.png'
import Loader from './loader'

function EmployeerDashboardDetails() {

    let token = localStorage.getItem('token')
    let [flag, setFlag] = useState(false)
    let [isLoading, setIsLoading] = useState(true)

    const [applicants, setApplicants] = useState([])
    async function getApplicants() {
        try {
            const getData = await fetch('http://localhost:4500/employer/applicants', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            const response = await getData.json()
            setApplicants(response.applicants)
            setFlag(false)
        } catch (err) {
            console.log(err)
        }

    }

    const [dashboardData, setDashboardData] = useState([])
    async function getDashboardData() {
        try {
            const getData = await fetch('http://localhost:4500/employer/dashboard/data', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            const response = await getData.json()
            console.log("this is dashboard data", response)
            setDashboardData(response.data)
            setIsLoading(false)
            setFlag(false)
            console.log(response.data)
            // setApplicants(response)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleShortListCandidate(employerID, candidateID, applicantID) {

        try {
            let postData = await fetch('http://localhost:4500/employer/ShortListCandidate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    employerID: employerID,
                    candidateID: candidateID,
                    applicantID: applicantID
                })
            })
            if (postData.ok) {
                setFlag(true)
                // setRehitApi(true)ssss
            }
        } catch (err) {
            alert("Server Cannot Respond")
        }

    }

    useEffect(() => {
        getDashboardData()
        getApplicants()
    }, [flag])

    return (
        <div className='w-full'>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='flex flex-col gap-8 w-full  bg-[#eeeeee99] h-[88vh] overflow-y-scroll px-12 py-6'>

                        <div className='flex flex-col gap-4 w-full text-green-700 '>
                            <div className='border-l-[5px] border-green-700 px-3 '>
                                <p className='text-black font-semibold text-xl'>Applications statistics</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-8 w-full'>
                            <div className='w-full flex items-center gap-12 justify-start ' >

                                <div className='bg-white rounded-md gap-3 h-32 w-full flex px-3 items-center'>
                                    <img src={jobs} className='w-20 h-20'></img>
                                    <div className='flex flex-col gap-2'>
                                        {dashboardData?.map((data, index) => {
                                            return (<p key={index} className='text-3xl font-semibold'>{data.total_jobs}</p>)
                                        })}

                                        <p className='text-lg font-normal'> Posted Jobs</p>
                                    </div>
                                </div>

                                <div className='bg-white rounded-md gap-3 h-32 w-full flex px-3 items-center'>
                                    <img src={views} className='w-20 h-20'></img>
                                    <div className='flex flex-col gap-2'>


                                        {dashboardData?.map((data, index) => {
                                            return (<p key={index} className='text-3xl font-semibold'>{data.total_applicants}</p>)
                                        })}

                                        <p className='text-lg font-normal'> Application</p>
                                    </div>
                                </div>

                                <div className='bg-white rounded-md gap-3 h-32 w-full flex px-3 items-center'>
                                    <img src={shortlisted} className='w-20 h-20'></img>
                                    <div className='flex flex-col gap-2'>
                                        {dashboardData?.map((data, index) => {
                                            return (<p key={index} className='text-3xl font-semibold'>{data.shortlist_candidate}</p>)
                                        })}
                                        <p className='text-lg font-normal'> Shortlisted</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex gap-4 rounded-md '>

                                <div className='w-full flex flex-col gap-4 bg-white p-5 rounded-md'>
                                    <p className='text-xl font-semibold'>Recent Applicants</p>

                                    {/* {
    applicants.length > 0 ? */}
                                    <div className='w-full flex flex-col gap-8 bg-white'>
                                        <div className=' flex flex-col gap-8 rounded '>

                                            {/* {
    applicants?.length > 0 ? */}
                                            <div className='w-full flex flex-col gap-8 h-[88vh]  '>
                                                <div className='bg-white flex flex-col gap-8 rounded p-5 overflow-y-scroll'>

                                                    {
                                                        applicants.length > 0 ?
                                                            applicants?.map((data, index) => {
                                                                return (
                                                                    <div key={index} className='flex flex-col gap-4'>

                                                                        <div key={index} className='flex flex-col gap-4'>
                                                                            {
                                                                                data?.candidates_info?.map((data, index) => {
                                                                                    return (
                                                                                        <div key={index} className=' w-full border border-solid bg-white hover:shadow-xl rounded hover:border-[#61CE70] border-gray-300 p-4  flex flex-col gap-4'>
                                                                                            <div className='flex items-center justify-between border-b-[1px]  border-gray-300 py-3'>
                                                                                                <div className='flex gap-3 items-center'>
                                                                                                    <p className='text-black font-plus-jakarta-sans text-xl font-semibold'>{data.designation}</p>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className='flex gap-4  items-center justify-cente md:justify-between'>
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
                                                                                                {
                                                                                                    data.status === 'pending' ?
                                                                                                        <p className='text-white bg-yellow-400 h-8 px-2 rounded-md flex items-center justify-center'>Pending</p>

                                                                                                        :
                                                                                                        <p className='text-white h-8 px-2 bg-green-600 rounded-md flex items-center justify-center'>Approved</p>
                                                                                                }

                                                                                                <div className='flex gap-2 items-center justify-center'>
                                                                                                    <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>Dec 23, 2023</p>
                                                                                                </div>


                                                                                                <div className='flex items-center justify-center gap-4'>
                                                                                                    <AddIcon className='hover:text-green-600 scale-125'
                                                                                                        onClick={() => handleShortListCandidate(data.employerID, data.candidateID, data.applicantID)}
                                                                                                    />

                                                                                                    {/* <AddIcon className='hover:text-green-600 scale-125'
                                                        onClick={() => handleShortListCandidate(employerID, data, data._id)}
                                                    />
                                                    <CheckIcon
                                                        className='hover:text-green-600 scale-125'
                                                        onClick={() => handleApproveApplication(employerID, data._id, job._id)}
                                                    />
                                                    <FileDownloadOutlinedIcon
                                                        onClick={() => DownloadPdf(data.resume, candidateFirstName)}
                                                        className='hover:text-green-600 scale-125' /> */}
                                                                                                </div>
                                                                                            </div>
                                                                                            <div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })

                                                                            }


                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            : <p>No Recent Application Found</p>
                                                    }

                                                </div>

                                            </div>
                                            {/* : <div className=' w-full '><p>No Applicants Found</p></div>
    } */}

                                        </div>

                                    </div>
                                    {/* : <div className='p-4 w-full '><p>No Applicants Found</p></div> */}


                                </div>

                                {/* Notification */}
                                {/* <div className='w-[50%] h-[88vh] rounded-md bg-white p-5'>
    
                        <p className='text-xl font-semibold'>Notifications</p>
                    </div> */}

                            </div>
                        </div>



                    </div>
            }

        </div>

    )
}

export default EmployeerDashboardDetails