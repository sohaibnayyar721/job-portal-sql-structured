import React, { useState, useEffect } from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './loader';


function EmployeerManageJob({ updateCurrentComponent, getJobID }) {
    let token = localStorage.getItem('token')
    let [flag, setFlag] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    let [jobID, setJobID] = useState('')

    async function handleEditJob(jobID) {
        updateCurrentComponent('editJob')
        getJobID(jobID)
    }

    async function handleDeleteJob(jobID) {
        try {
            let reqDelete = await fetch(`http://localhost:4500/employeer/delete/jobs/${jobID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            let response = await reqDelete.json()
            toast.success(response.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            setFlag(true)
        } catch (err) {
            toast.warn("Internal server error", {
                position: toast.POSITION.TOP_CENTER,
            });
        }


    }

    const [getJobs, setGetJobs] = useState([])

    async function getAllJobs() {
        try {
            const getData = await fetch('http://localhost:4500/employer/getAllJob', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            const response = await getData.json()
            console.log("This is all jobs", response.jobs)
            setGetJobs(response.jobs)
            setFlag(false)
            setIsLoading(false)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllJobs()
    }, [flag])

    return (

        <div className='w-full'>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='flex flex-col gap-8 w-full bg-[#eeeeee99] h-[88vh] overflow-y-scroll px-12 py-6'>

                        <div className='border-l-[5px] border-green-700 px-3 '>
                            <p className='text-black font-bold text-xl'>Manage Jobs</p>

                        </div>
                        <div>
                            <div className="overflow-x-auto px-4 bg-white rounded-md">
                                <table className="font-plus-jakarta-sans min-w-full bg-white border-gray-300 ">
                                    <thead>
                                        <tr>
                                            <th className="font-plus-jakarta-sans text-left border-b-[1px] px-2 py-4">Title</th>
                                            <th className="border-b-[1px] p-2">Applicants</th>
                                            <th className="border-b-[1px] p-2">Created & Expired</th>
                                            <th className="border-b-[1px] p-2">Action</th>
                                            {/* <th className="border p-2">Status</th> */}
                                            {/* <th className="border p-2">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getJobs?.map((item, index) => {
                                                return (
                                                    <tr key={index}  >
                                                        <td className="border-b-[1px] text-base text-[#121212]  p-2">
                                                            <div>
                                                                <p className=" text-base text-[#121212] font-semibold ">{item.jobTitle}</p>
                                                                <div className='flex gap-1 items-center '>
                                                                    <PlaceOutlinedIcon className='text-[#64666c] scale-75' />
                                                                    <p className='text-sm font-plus-jakarta-sans'>{item.city ? <span>{item.city}</span> : <span className='text-red-500'>Not Available</span>}</p>
                                                                </div>
                                                            </div>

                                                        </td>
                                                        <td className="border-b-[1px] p-2 text-center">{item.totalApplicants} Applicants(s)</td>
                                                        <td className="border-b-[1px] p-2 text-center">
                                                            <p>Created: {item.date}</p>
                                                            <p >Expiry date: {item.applicationDeadlineDate ? <span >{item.applicationDeadlineDate}</span> : <span className='text-red-600'>Not Available</span>}</p>
                                                        </td>

                                                        <td className="border-b-[1px] p-2 text-center">
                                                            <div className='flex items-center justify-center gap-2 '>
                                                                <button className='bg-green-400 p-3 rounded-md text-white font-semibold' onClick={() => { handleEditJob(item.jobID) }}>Edit Job</button>
                                                                <button className='bg-green-400 p-3 rounded-md text-white font-semibold' onClick={() => { handleDeleteJob(item.jobID) }}>Delete Job</button>


                                                            </div>
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>


                        </div>
                        {/* } */}
                    </div>
            }
        </div>
    )
}

export default EmployeerManageJob