import React from 'react'
import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import SoftwareEngineer from '../../assets/pictures/SoftwareEngineer.png'
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ServerError from '../Error/ServerError';
import { toast } from 'react-toastify';

function EmployeerJobApplicants() {
    const [applicants, setApplicants] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let token = localStorage.getItem('token')
    let [serverError, setServerError] = useState(false)

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
            if (response.message === 'Internal Server Error') {
                setIsLoading(false)
                setServerError(true)
            }
            setApplicants(response.applicants)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            setServerError(true)
        }

    }

    async function handleShortListCandidate(employerID, candidateID, applicantID) {

        try {
            let postData = await fetch('http://localhost:4500/employer/ShortListCandidate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    employerID: employerID,
                    candidateID: candidateID,
                    applicantID: applicantID
                })
            })

            const response = await postData.json()
            if (response.message === 'Internal Server Error') {
                return toast.error(response.message, {
                    position: "top-center",
                });
            }

            toast.success(response.message, {
                position: "top-center",
            });
            setIsLoading(true)
        } catch (err) {
            toast.error("Internal Server Errors", {
                position: "top-center",
            });
        }

    }

    const [blobUrl, setBlobUrl] = useState(null);
    async function DownloadPdf(pdfUrl, candidateName) {

        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            setBlobUrl(blobUrl);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${candidateName}.pdf`; // Specify the desired file name
            link.click();
        } catch (error) {
            alert(error)
        }

    }

    useEffect(() => {
        getApplicants()
    }, [isLoading])
    return (
      <div  className='w-full'>
        {
            serverError?
            <ServerError/>
            :
            <div>
            {
                isLoading ?
                    <Loader /> :
                    <div className='w-full'>
                        <div className='flex flex-col gap-8 w-full bg-[#eeeeee99] h-[88vh] overflow-y-scroll px-12 py-6'>

                            <div className='px-3 border-l-[5px] border-green-700 '>
                                <p className='text-black font-bold text-xl'>All Applicants</p>

                            </div>

                            <div className='w-full flex flex-col gap-8 h-[88vh] bg-[#eeeeee99]  '>
                                <div className='bg-white flex flex-col gap-8 rounded p-5 '>
                                    {
                                        applicants?.length > 0 ?
                                            applicants?.map((data, index) => {
                                                return (
                                                    <div key={index} className='flex flex-col gap-4'>

                                                        <div key={index} className='flex flex-col gap-4'>
                                                            <div className='bg-[#14a077] p-3 rounded-md'>
                                                                <p className='text-white'>{data.jobTitle}</p>
                                                            </div>

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
                                                /> */}
                                                                                    <FileDownloadOutlinedIcon
                                                                                        onClick={() => DownloadPdf(data.resume, data.fullName)}
                                                                                        className='hover:text-green-600 scale-125' />
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
                                            : <p>No Applicants Found</p>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>

        }
      </div>
    )
}

export default EmployeerJobApplicants