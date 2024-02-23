import React, { useEffect } from 'react'
import Navbar3 from '../../component/Navbar/Navbar3';
import EmployeerJobApplicants from '../../component/Employer/EmployerJobApplicants';
import HttpsIcon from '@mui/icons-material/Https';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';

import EmployerEditJob from '../../component/Employer/EmployerEditjob';
import EmployeerManageJob from '../../component/Employer/EmployerManageJob';
import EmployeerShortlistCandidate from '../../component/Employer/EmployerShortlistCandidate';
import EmployeerSubmitJob from '../../component/Employer/EmployerSubmitJob';
import EmployeerDashboardDetails from '../../component/Employer/EmployerDashboardDetails';
import EmployerChangePassword from '../../component/Employer/EmployerChangePassword';
import ServerError from '../../component/Error/ServerError';

function EmployerDashBoard() {

    let [employerID, setEmployerID] = useState(null)
    let token = localStorage.getItem('token')
    let [serverError, setServerError] = useState(false)

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
                console.log("this is from employeer", response)
                if (response.message === 'Internal Server Error' || response.message === "Invalid token") {
                    setServerError(true)
                }
                setEmployerID(response.employeerData[0].employerID)
            }
            catch (err) {
                setServerError(true)

            }
        }
        getEmployerData()
    }, [])

    return (
        <div>
            {
                serverError ?
                <div className='h-[100vh]'>
                    <ServerError />
                </div>
                    
                    :
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
                                    (<EmployeerManageJob updateCurrentComponent={updateCurrentComponent} getJobID={getJobID} />)
                                }

                                {
                                    currentComponent === "editJob" &&
                                    (<EmployerEditJob updateCurrentComponent={updateCurrentComponent} jobID={jobID} />)
                                }

                                {
                                    currentComponent === "changePassword" &&
                                    (
                                        <EmployerChangePassword employerID={employerID} />
                                    )
                                }

                            </div>

                        </div>

                    </div>
            }
        </div>
    )
}

export default EmployerDashBoard