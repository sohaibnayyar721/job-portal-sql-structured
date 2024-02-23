import React, { useState, useEffect } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Navbar2 from '../../component/Navbar/Navbar2';
import { useNavigate } from 'react-router-dom';
import CandidateRecentlyApplied from '../../component/Candidate/CandidateRecentlyApplied';
import ServerError from '../../component/Error/ServerError';

function CandidateDashboard() {

    let [serverError, setServerError] = useState(false)
    let token = localStorage.getItem('token')

    async function getCandidateData() {

        try {
            const getData = await fetch('http://localhost:4500/candidate/dashboard', {

                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            const response = await getData.json()
            if (response.message === "Invalid token") {
                setServerError(true)
            }
            console.log(response)

        } catch (err) {
            setServerError(true)
            console.log("Server Can't respond")
        }

    }

    useEffect(() => {
        getCandidateData()
    }, [])

    const [currentComponent, setCurrentComponent] = useState('dashboard');
    const handleComponentChange = (component) => {
        setCurrentComponent(component);
    };

    let naviagte = useNavigate()
    function logout() {
        localStorage.removeItem('token')
        naviagte('/')
    }

    return (
        <div>
            {
                serverError ?
                    <div className='h-[100vh]'>
                        <ServerError />
                    </div>
                    :
                    <div>
                        <Navbar2 />
                        <div className='flex relative'>
                            {/* Side Bar */}
                            <div className='hidden w-[23%] h-[86vh] bg-white overflow-y-scroll
                            md:flex'>
                                <div className='flex w-full flex-col items-center justify-between bg-white py-4'>
                                    <div className='w-full flex flex-col gap-2 px-2'>
                                        <div className={`flex gap-2 items-center ${currentComponent === 'dashboard' && 'font-semibold bg-[#F5F5F2]'} before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold active:bg-[#F5F5F2]  hover:bg-[#F5F5F2] px-2 py-2`}
                                            onClick={() => handleComponentChange('dashboard')}>
                                            <div><DashboardIcon /></div>
                                            <h1 className='text-black'>Dashboard</h1>
                                        </div>

                                        <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'
                                            onClick={logout}>
                                            <LogoutIcon />
                                            <h1 className='text-black'>Logout</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                currentComponent === 'dashboard' && (
                                    <CandidateRecentlyApplied />
                                )
                            }

                        </div>
                    </div>
            }
        </div>

    )
}

export default CandidateDashboard