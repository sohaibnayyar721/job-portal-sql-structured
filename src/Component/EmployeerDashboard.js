import React, { useEffect } from 'react'
import Navbar3 from './navbar3'
import EmployeerJobApplicants from './EmployeerJobApplicants'
import SideBar from './SideBar'
import logo from '../Assets/logo.png'
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import HttpsIcon from '@mui/icons-material/Https';
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import jobs from '../Assets/jobs.png';
import review from '../Assets/Review.png'
import views from '../Assets/views.png'
import shortlisted from '../Assets/Shortlisted.png'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import Select from 'react-select'
import SoftwareEngineer from '../Assets/SoftwareEngineer.png'
import Heart from '../Assets/Heart.png'
import DollarIcon from '../Assets/DollarIcon.png'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InfoIcon from '@mui/icons-material/Info';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { formatDistanceToNow } from 'date-fns';
import data from '../Assets/data/data'
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WorkIcon from '@mui/icons-material/Work';
import EmployerEditJob from '../Component/EmployerEditJob'
import EmployerManangeJob from '../Component/EmployeerManageJob'
import { useRef } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LocalActivityRounded, LocationCity } from '@mui/icons-material';
import Loader from './loader'
import EmployeerShortlistCandidate from './EmployeerShortlistCandidate'
import EmployeerSubmitJob from './EmployeerSubmitJob'
import EmployeerDashboardDetails from './EmployeerDashboardDetails'
import EmployerChangePassword from './EmployerChangePassword'
function CandidateDashboard() {

    // [setShowDashboard] = useState()
    let [employerID, setEmployerID] = useState(null)
    let token = localStorage.getItem('token')

    let [currentComponent, setCurrentComponent] = useState("dashboard")
    function updateCurrentComponent(componentName) {
        setCurrentComponent(componentName)
    }

    let [jobID, setJobID] = useState('')
    function getJobID(jobID) {
        setJobID(jobID)
    }

    useEffect(() => {
        async function getEmployerData() {

            try {
                const getData = await fetch('http://localhost:4500/employeer/dashboard', {

                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const response = await getData.json()
                console.log("this is from employeer",response)
                setEmployerID(response.employeerData[0].employerID)


            } catch (err) {
                console.log(err)
                console.log("Server Can't respond")
            }

        }
        getEmployerData()
    }, [])

    return (

        <div className='font-plus-jakarta'>
            <ToastContainer />
            <div>
                <Navbar3 />
                {/* {
                    showDashboard ? */}
                <div className='flex'>
                    <div className='hidden w-[23%] h-[88vh] bg-white overflow-y-scroll
                                md:flex'>

                        <div className='flex w-full flex-col items-center justify-between bg-white py-4'>
                            <div className='w-full flex flex-col gap-2 px-2'>

                                <div className={`flex gap-2 items-center ${currentComponent === 'dashboard' && 'font-semibold bg-[#F5F5F2]'} before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold active:bg-[#F5F5F2]  hover:bg-[#F5F5F2] px-2 py-2`}

                                    onClick={() => updateCurrentComponent('dashboard')}
                                >

                                    <div><DashboardIcon /></div>
                                    <h1 className='text-black'>Dashboard</h1>
                                </div>

                                <div className={`flex gap-2 items-center ${currentComponent === 'myJobs' && 'font-semibold bg-[#F5F5F2]'} before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold active:bg-[#F5F5F2]  hover:bg-[#F5F5F2] px-2 py-2`}
                                    onClick={() => updateCurrentComponent('myJobs')}>
                                    <WorkIcon />
                                    <h1 className='text-black'>My Jobs</h1>
                                </div>

                                <div className={`flex gap-2 items-center ${currentComponent === 'submitJob' && 'font-semibold bg-[#F5F5F2]'} before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold active:bg-[#F5F5F2]  hover:bg-[#F5F5F2] px-2 py-2`}
                                    onClick={() => updateCurrentComponent('submitJob')}>
                                    <div><UploadFileIcon /></div>
                                    <h1 className='text-black'>Submit Job</h1>
                                </div>

                                <div className={`flex gap-2 items-center ${currentComponent === 'jobApplicants' && 'font-semibold bg-[#F5F5F2]'} before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold active:bg-[#F5F5F2]  hover:bg-[#F5F5F2] px-2 py-2`}
                                    onClick={() => updateCurrentComponent('jobApplicants')}   >

                                    <div><FactCheckIcon /></div>
                                    <h1 className='text-black'>Job Applicants</h1>
                                </div>

                                <div className={`flex gap-2 items-center ${currentComponent === 'CandidateShortlist' && 'font-semibold bg-[#F5F5F2]'} before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold active:bg-[#F5F5F2]  hover:bg-[#F5F5F2] px-2 py-2`}
                                    onClick={() => updateCurrentComponent('CandidateShortlist')}
                                >

                                    <div><FavoriteIcon /></div>
                                    <h1 className='text-black'>Candidate Shortlist</h1>
                                </div>

                                <div className={`flex gap-2 items-center ${currentComponent === 'changePassword' && 'font-semibold bg-[#F5F5F2]'} before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold active:bg-[#F5F5F2]  hover:bg-[#F5F5F2] px-2 py-2`}
                                    onClick={() => updateCurrentComponent('changePassword')}>
                                    <HttpsIcon />
                                    <h1 className='text-black'>Change Password</h1>
                                </div>

                                {/* <div className='flex gap-2 items-center before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>

                        <div><AccountCircleRoundedIcon /></div>
                        <h1 className='text-black'>Profile</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <ArticleIcon />
                        <h1 className='text-black'>My Profile</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <FactCheckIcon />
                        <h1 className='text-black'>My Applied</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <FavoriteRoundedIcon />
                        <h1 className='text-black'>Job Shortlist</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <PeopleRoundedIcon />
                        <h1 className='text-black'>Following Employers</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <NotificationsNoneIcon />
                        <h1 className='text-black'>Job Alerts</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <MonetizationOnIcon />
                        <h1 className='text-black'>Packages</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <MessageIcon />
                        <h1 className='text-black'>Messages</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <GroupsIcon />
                        <h1 className='text-black'>Meetings</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <HttpsIcon />
                        <h1 className='text-black'>Change Password</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <DeleteIcon />
                        <h1 className='text-black'>Delete Profile</h1>
                    </div>

                    <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                        <LogoutIcon />
                        <h1 className='text-black'>Logout</h1>
                    </div> */}
                            </div>

                        </div>

                    </div>
                    {/* Submit job right side */}
                    {
                        currentComponent === "submitJob" &&

                        <EmployeerSubmitJob />
                    }

                    {/* Job Applicants right side */}
                    {
                        currentComponent === "jobApplicants" &&
                        <EmployeerJobApplicants />
                    }

                    {
                        currentComponent === "CandidateShortlist" &&
                        (
                            <EmployeerShortlistCandidate />
                        )
                    }

                    {
                        currentComponent === "dashboard" &&
                        (
                            <EmployeerDashboardDetails />
                        )
                    }

                    {
                        currentComponent === "myJobs" &&
                        (<EmployerManangeJob updateCurrentComponent={updateCurrentComponent} getJobID={getJobID} />)
                    }

                    {
                        currentComponent === "editJob" &&
                        (<EmployerEditJob updateCurrentComponent={updateCurrentComponent} jobID={jobID} />)
                    }

                    {
                        currentComponent === "changePassword" &&
                        (
                            <EmployerChangePassword employerID={employerID}/>
                        )
                    }

                </div>

            </div>

        </div>

    )
}

export default CandidateDashboard