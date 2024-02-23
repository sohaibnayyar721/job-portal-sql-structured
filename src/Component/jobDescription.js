import React, { useEffect } from 'react'
import Navbar from './navbar'
import Office from '../Assets/officeWorkSpace.jpg'
import SoftwareEngineer from '../Assets/SoftwareEngineer.png'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Heart from '../Assets/Heart.png'
import SendIcon from '@mui/icons-material/Send';
import DollarIcon from '../Assets/DollarIcon.png'
import ShareIcon from '@mui/icons-material/Share';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Footer from './footer';
import './jobDescription.css'
import CompanyLogo from '../Assets/CompanyLogo.png'
import Navbar2 from './navbar2'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CandidateDetails from './CandidateDetails';
import Navbar3 from './navbar3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Diversity1 } from '@mui/icons-material';
import Loader from './loader';
import parse from 'html-react-parser';

function JobDescription() {
    let { employeerId, getSingleJObId } = useParams();

    let [userExists, setUserExists] = useState(false)

    let token = localStorage.getItem('token')
    async function ShowUserNavbar() {

        try {
            const postData = await fetch('http://localhost:4500/candidate/dashboard', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })

            const response = await postData.json()

            if (response.message === "Successful log in") {
                setUserExists(true)
                setCandidateData(response.findCandidate)
            }
        }
        catch (err) {
            alert('Server Cannot respond')
            console.log(err)

        }
    }

    let [employeerExists, setEmployeerExists] = useState(false)
    async function ShowEmployerNavbar() {
        try {
            const postData = await fetch('http://localhost:4500/employeer/dashboard', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                // body: JSON.stringify({ jobId:jobId})
            })

            const response = await postData.json()

            if (response.message === "Successful log in") {
                setEmployeerExists(true)
            }
        }
        catch (err) {
            alert('Server Cannot respond')
            console.log(err)

        }
    }


    let [descriptionData, setdescriptionData] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    async function GetDescriptionData() {
        try {
            const data = await fetch(`http://localhost:4500/job/${employeerId}/${getSingleJObId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const DescriptionData = await data.json()
            console.log(DescriptionData)
        
            setdescriptionData(DescriptionData.getJobs)
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
            alert('server cannot respond')
        }

    }

    console.log(descriptionData)
    const navigate = useNavigate()
    let [candidateData, setCandidateData] = useState([])

    let [showDescription, setShowDescription] = useState(false)
    let [showDetails, setShowDetails] = useState(false)
    let [showCandidateNavbar, setShowCandidateNavbar] = useState(false)



    async function applyJob(jobId) {

        if (userExists) {
            setShowDescription(true)
            setShowDetails(true)
            setShowCandidateNavbar(true)
        }
        else if (employeerExists) {
            toast.warn("Please Login as candidate to apply", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else {
            toast.error("You are not Login!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    useEffect(() => {
        GetDescriptionData()
        ShowUserNavbar()
        ShowEmployerNavbar()
    }, [])
    const capitalizeFirstLetterInSentence = (sentence) => {
        let jobtitle = sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return jobtitle
    };

    return (
        <div>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='overflow-hidden '>
                        <ToastContainer />
                        <CandidateDetails setShowDetails={setShowDetails} showDetails={showDetails} candidateData={candidateData} employeerId={employeerId} />
                        <div>
                            {
                                descriptionData?.map((data, index) => {
                                    let getJobTitleCamelCase = capitalizeFirstLetterInSentence(data.jobTitle)
                                    return (
                                        <div key={index} className='font-plus-jakarta bg-white w-full px-5 py-5 flex flex-col gap-6 
                                            lg:flex-row  lg:justify-between
                                            md:px-14 md:py-12 '>
                                            <div className='flex w-full flex-col 
                                                lg:w-[63%]'>
                                                <div className='flex flex-col py-6 border-gray-300 border-b-2'>
                                                    <div className='setCenter flex flex-col items-center justify-center gap-4 flex-wrap
                                                        md:items-center md:justify-between md:flex-row'>
                                                        <div className='flex gap-4 ' >
                                                            <div className='w-20 h-20 object-contain rounded-full' >
                                                                {
                                                                    data.companyLogo ?
                                                                        <div className='h-12 w-12 rounded-full object-contain'>
                                                                            <img className='w-full h-full rounded-full object-contain ' src={data.companyLogo}></img>

                                                                        </div>
                                                                        :
                                                                        <img className='w-full h-full rounded-full' src={CompanyLogo}></img>

                                                                }
                                                            </div>
                                                            <div className='flex flex-col gap-2'>
                                                                <p className='text-[#14A077] font-plus-jakarta-sans text-sm font-semibold'>{getJobTitleCamelCase}</p>
                                                                <div className='flex gap-2 items-center'>
                                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>{data.category}</p>
                                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                                </div>

                                                                <div className='w-full flex items-center gap-2 flex-wrap -300 '>
                                                                    {data.location ?
                                                                        <div className='flex items-center'>
                                                                            <LocationOnOutlinedIcon className='text-gray-500 ' />
                                                                            <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.location}</p>
                                                                        </div>
                                                                        : null}

                                                                    <div className='flex gap-2 items-center justify-center'>
                                                                        <CalendarTodayIcon className='text-gray-600 ' />
                                                                        <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.date}</p>
                                                                    </div>
                                                                </div>
                                                                {data.jobType ?
                                                                    <div className='mt-3 w-28 bg-[#f1f1f1] flex items-center justify-center py-2 px-4 rounded-3xl '>
                                                                        {data.jobType}
                                                                    </div>
                                                                    : null}
                                                            </div>
                                                        </div>

                                                        <div className='setRigthcenter flex flex-col gap-3 px-r-4 
                                                            md:items-end '>
                                                            <div className='flex flex-wrap gap-4 
                                                                md:flex-col'>
                                                                {/* Share Icons */}

                                                                {/* <div className='setCenter flex gap-4 justify-end '>
                                                                <div className='w-10 h-10 rounded-full object-contain border-2 border-gray-400 flex items-center justify-center'>
                                                                    <ShareIcon />
                                                                </div>

                                                                <div className='w-10 h-10 rounded-full object-contain border-2 border-gray-400 flex items-center justify-center'>
                                                                    <img src={Heart}></img>
                                                                </div>

                                                            </div> */}

                                                                <button className='text-white font-bold bg-[#14A077] px-12 py-4 rounded'
                                                                    onClick={() => { applyJob(data._id) }}>
                                                                    <div className='flex gap-2 items-center justify-center'>
                                                                        <SendIcon className=' ' />
                                                                        <p>Apply Now</p>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                            {data.applicationDeadlineDate ?
                                                                <p className='text-[#dc3545]'>  Deadline date: <span className='text-black font-medium'>{data.applicationDeadlineDate}</span></p>

                                                                : null}

                                                            {
                                                                data.minSalary && data.maxSalary ?
                                                                    <div className='flex gap-3 items-center'>
                                                                        <img src={DollarIcon} className='w-6 h-6'></img>
                                                                        <p className='text-black font-plus-jakarta-sans text-lg font-semibold'>{data.minSalary} - {data.maxSalary} <span className='text-[#64666C]'>/ month</span></p>
                                                                    </div>

                                                                    : data.minSalary ?
                                                                        <div className='flex gap-3 items-center'>
                                                                            <img src={DollarIcon} className='w-6 h-6'></img>
                                                                            <p className='text-black font-plus-jakarta-sans text-lg font-semibold'>{data.minSalary} <span className='text-[#64666C]'>/ month</span></p>
                                                                        </div>

                                                                        : data.maxSalary ?
                                                                            <div className='flex gap-3 items-center'>
                                                                                <img src={DollarIcon} className='w-6 h-6'></img>
                                                                                <p className='text-black font-plus-jakarta-sans text-lg font-semibold'>{data.maxSalary} <span className='text-[#64666C]'>/ month</span></p>
                                                                            </div>
                                                                            : null

                                                            }


                                                        </div>


                                                    </div>
                                                </div>

                                                <div className='mt-4'>
                                                    <h1 className='text-xl font-semibold '>Job Description</h1>
                                                    <div
                                                        className='jobDescription'
                                                    >
                                                        {parse(data.jobDescription)}
                                                        {/* {parse('<h1>Hello World</h1>')}
                                            {parse('<h1>Lorem ipsum</h1>')} */}
                                                    </div>
                                                </div>

                                                {/* <div className='flex flex-col gap-6  mt-4'>
                                        <div className='flex  gap-3 items-center flex-wrap'>
                                            <p className='text-[#121212] text-base text-normal font-semibold'>Share this post: </p>

                                            <div className='flex  gap-3 items-center'>
                                                <FacebookRoundedIcon
                                                    style={{ fontSize: '40px' }}
                                                    className='text-black h-28 w-28' />

                                                <TwitterIcon
                                                    style={{ fontSize: '40px' }}
                                                    className='text-black h-28 w-28' />

                                                <LinkedInIcon
                                                    style={{ fontSize: '40px' }}
                                                    className='text-black h-28 w-28' />

                                                < PinterestIcon
                                                    style={{ fontSize: '40px' }}
                                                    className='text-black h-28 w-28' />
                                            </div>
                                        </div>

                                        <div className='flex gap-5 w-full h-52 overflow-x-scroll'>
                                            <img src={Office} className='w-72 h-full'></img>
                                            <img src={Office} className='w-72 h-full'></img>
                                            <img src={Office} className='w-72 h-full'></img>
                                            <img src={Office} className='w-72 h-full'></img>
                                            <img src={Office} className='w-72 h-full'></img>
                                            <img src={Office} className='w-72 h-full'></img>
                                        </div>

                                        <div className='w-full h-[60vh] rounded-lg'>
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src="https://www.youtube.com/embed/TUN8PtDGRaA?controls=0&autoplay=1"
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    // allowfullscreen
                                                    ></iframe>
                                                </div>
                                    </div> */}

                                            </div>

                                            <div className='w-full flex flex-col gap-8
       lg:w-[30%]'>

                                                <div className='w-full rounded bg-[#F5F5F5] px-5 py-3 flex flex-col gap-2'>
                                                    <p className='text-xl font-semibold mt-3'>Information</p>

                                                    <div className='flex flex-col '>
                                                        <div className='flex flex-wrap items-center justify-between border-b-2 border-gray-300 py-4 '>
                                                            <p className='text-lg text-gray-500 font-normal'>Date Posted</p>
                                                            <p className='text-lg font-normal'>{data.date}</p>
                                                        </div>

                                                        <div className='flex flex-wrap  items-center justify-between border-b-2 border-gray-300 py-4'>
                                                            <p className='text-lg text-gray-500 font-normal'>Location</p>
                                                            {data.location ?

                                                                <p className='text-lg font-normal'>{data.location}</p>

                                                                : <p className='text-lg text-red-500 font-normal'>Not Available</p>}
                                                        </div>

                                                        <div className='flex flex-wrap  items-center justify-between border-b-2 border-gray-300 py-4'>
                                                            <p className='text-lg text-gray-500 font-normal'>Category</p>
                                                            {data.category ?

                                                                <p className='text-lg font-normal'>{data.category}</p>

                                                                : <p className='text-lg text-red-500 font-normal'>Not Available</p>}
                                                        </div>

                                                        <div className='flex flex-wrap  items-center justify-between border-b-2 border-gray-300 py-4'>
                                                            <p className='text-lg text-gray-500 font-normal'>Offered Salary:</p>
                                                            {
                                                                data.minSalary && data.maxSalary ?

                                                                    <p className='text-lg font-normal'>{data.minSalary} - {data.maxSalary} / month</p>

                                                                    : data.minSalary ?

                                                                        <p className='text-lg font-normal'>{data.minSalary} / month</p>


                                                                        : data.maxSalary ?

                                                                            <p className='text-lg font-normal'>{data.minSalary} / month</p>

                                                                            : <p className='text-lg text-red-500 font-normal'>Not Available</p>
                                                            }
                                                        </div>

                                                        <div className='flex flex-wrap  items-center justify-between border-b-2 border-gray-300 py-4'>
                                                            <p className='text-lg text-gray-500 font-normal'>Expiration date</p>
                                                            {data.applicationDeadlineDate ?
                                                                <p className='text-lg font-normal'>{data.applicationDeadlineDate}</p>

                                                                : <p className='text-lg text-red-500 font-normal'>Not Available</p>}
                                                        </div>
                                                        <div className='flex flex-wrap  items-center justify-between border-b-2 border-gray-300 py-4'>
                                                            <p className='text-lg text-gray-500 font-normal'>Experience</p>
                                                            {data.Experience ?

                                                                <p className='text-lg font-normal'>{data.Experience}</p>


                                                                : <p className='text-lg text-red-500 font-normal'>Not Available</p>}
                                                        </div>
                                                        {
                                                            data.gender ?
                                                                <div className='flex flex-wrap  items-center justify-between border-b-2 border-gray-300 py-4'>
                                                                    <p className='text-lg text-gray-500 font-normal'>Gender</p>
                                                                    <p className='text-lg font-normal'>{data.gender}</p>
                                                                </div>
                                                                : null
                                                        }

                                                        <div className='flex flex-wrap  items-center justify-between border-b-2 border-gray-300 py-4'>
                                                            <p className='text-lg text-gray-500 font-normal'>Qualification</p>
                                                            {
                                                                data.qualification ?

                                                                    <p className='text-lg font-normal'>{data.qualification}</p>

                                                                    : <p className='text-lg text-red-500 font-normal'>Not Available</p>
                                                            }
                                                        </div>

                                                        <div className='flex flex-wrap  items-center justify-between border-gray-300 py-4'>
                                                            <p className='text-lg text-gray-500 font-normal'>Career Level</p>
                                                            {
                                                                data.careerLevel ?

                                                                    <p className='text-lg font-normal'>{data.careerLevel}</p>

                                                                    : <p className='text-lg text-red-500 font-normal'>Not Available</p>
                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* Employeer Information */}
                                                {/* <div className='w-full rounded bg-[#F5F5F5] px-5 py-6 flex flex-col gap-2'>
                                        <p className='text-xl font-semibold '>Employer Information</p>

                                        <div className='flex flex-col'>

                                            <div className='flex items-center gap-3 border-b-2 border-gray-300 py-4'>
                                                <img src={SoftwareEngineer}></img>
                                                <div className='flex flex-col gap-1'>
                                                    <p className=' text-base text-black font-medium'>Aprico Ltd</p>
                                                    <p className='text-base text-[#14A077] font-normal'>View Profile</p>
                                                </div>

                                            </div>

                                            <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                                                <p className=' text-lg text-gray-500 font-normal'>Category</p>
                                                <p className='text-sm text-[#14A077] font-semibold'>Engineering</p>
                                            </div>

                                            <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                                                <p className='text-lg text-gray-500 font-normal'>Founded Date:</p>
                                                <p className='text-lg font-normal'>1979</p>
                                            </div>

                                            <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                                                <p className='text-lg text-gray-500 font-normal'>Location:</p>
                                                <p className='text-lg font-normal'>United States</p>
                                            </div>

                                            <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                                                <p className='text-lg text-gray-500 font-normal'>Phone Number:</p>
                                                <p className='text-lg font-normal'>(+88)123-456-789</p>
                                            </div>

                                            <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                                                <p className='text-lg text-gray-500 font-normal'>Email:</p>
                                                <p className='text-lg font-normal'>apricoltd@apus.com</p>
                                            </div>

                                            <div className='flex flex-wrap items-center justify-between py-4'>
                                                <p className='text-lg text-gray-500 font-normal'>Socials:</p>
                                                <div className='flex  gap-3 items-center'>

                                                    <FacebookRoundedIcon
                                                        style={{ fontSize: '35px' }}
                                                        className='text-black h-24 w-24' />

                                                    <TwitterIcon
                                                        style={{ fontSize: '35px' }}
                                                        className='text-black ' />

                                                    <LinkedInIcon
                                                        style={{ fontSize: '35px' }}
                                                        className='text-black h-28 w-28' />

                                                    < PinterestIcon
                                                        style={{ fontSize: '35px' }}
                                                        className='text-black h-28 w-28' />
                                                </div>
                                            </div>

                                            <button className='hover:bg-[#14A077] hover:text-white w-full border-[1px] border-green-600 h-14 mt-4 text-base font-semibold rounded'>envato.com</button>

                                        </div>

                                    </div> */}

                                                {/* Employer Contact Message */}
                                                {/* <div className='w-full rounded bg-[#F5F5F5] px-5 py-6 flex flex-col gap-5'>
                                        <p className='text-xl font-semibold '>Contact Aprico Ltd</p>

                                        <div className='flex flex-col gap-'>

                                            <div className='w-full flex flex-col gap-3'>
                                                <input className='h-12 w-full rounded-lg px-3 outline-green-600 ' placeholder='Subject'></input>
                                                <input className='h-12 w-full rounded-lg px-3 outline-green-600' placeholder='hello'></input>
                                                <input className='h-12 w-full rounded-lg px-3 outline-green-600' placeholder='hello'></input>
                                                <input className='h-20  w-full rounded-lg px-3 outline-green-600' placeholder='Message'></input>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-6 items-center'>
                                            <button className='hover:bg-green-700 bg-[#14A077] text-white w-full  h-12 mt-4 text-base font-bold rounded'>
                                                Send Message</button>

                                            <a href='' className=''>Private Message</a>
                                        </div>
                                    </div> */}
                                            </div>
                                        </div>
                                        // )
                                        // })
                                    )
                                })
                            }
                        </div>

                    </div>
                // {/* } */}
            }
        </div>
    )
}

export default JobDescription