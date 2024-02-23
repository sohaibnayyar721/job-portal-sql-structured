
import logo from '../../assets/pictures/logo.png'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import { useEffect, } from 'react';
import '../../css/navbar.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar2() {
    let naviagte = useNavigate()
    const [menuButton, setMenuButton] = useState(false)

    let [userData, setData] = useState([])

    let [showData, setShowData] = useState(false)
    useEffect(() => {
        async function getCandidateData() {
            let token = localStorage.getItem('token')

            try {
                const getData = await fetch('http://localhost:4500/candidate/dashboard', {

                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const response = await getData.json()
                console.log(response)
                setShowData(true)
                setData(response.findCandidate)
                localStorage.setItem('alertShown', 'true');

            } catch (err) {
                console.log("Server Can't respond")
            }

        }
        getCandidateData()
    }, [])

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('alertShown')
        naviagte('/')

    }

    let [showSidebar, setShowSidebar] = useState(false)
    return (
        <div className='font-plus-jakarta'>
            {/* <ToastContainer/> */}
            <div className=' w-full flex flex-wrap overflow-hidden bg-white h-24 items-center md:px-9' >
                <div className="  w-full flex flex-row px-5 items-center  justify-between flex-wrap">

                    <div className='flex gap-11'>
                        <div className='logo flex gap-12 '>
                            <img src={logo} className='w-full h-full object-contain'></img>


                        </div>

                    </div>

                    <div className=''>

                        <div className="hidden flex-row items-center gap-8 justify-center
                            lg:flex ">


                            <div className='flex flex-row items-center text-[17px]'>
                                <Link to='/candidate'>Home</Link>
                            </div>

                            <div className='flex flex-row items-center text-[17px]'>
                                <Link to='/candidate/jobSearch'>Find Jobs</Link>
                            </div>

                            <div className='flex flex-row items-center text-[17px]'>
                                <Link >About</Link>
                            </div>

                            <div className='flex flex-row items-center text-[17px]'>
                                <Link >Contact</Link>
                            </div>



                        </div>
                    </div>
                    {/* </div> */}

                    {
                        menuButton ?
                            <div className='wow wow-exclude w-[85%] h-[100vh] bg-white fixed z-10 top-0 left-0 px-5
                                md:hidden'>
                                <div className='flex items-center justify-between py-4  border-b-2 border-gray-300'>
                                    <img className='w-25 h-10' src={logo}></img>
                                    <CloseIcon onClick={() => { setMenuButton(false) }} />
                                </div>

                                <div className='flex flex-col items-center justify-between h-[90vh]  py-10'>
                                    <div className='w-full flex flex-col gap-2  '>
                                        <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                                            <label>Home</label>
                                            <ArrowForwardIosIcon className='text-gray-700' />
                                        </div>
                                        <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                                            <h1>Home</h1>
                                            <ArrowForwardIosIcon className='text-gray-700' />
                                        </div>
                                        <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                                            <h1>Home</h1>
                                            <ArrowForwardIosIcon className='text-gray-700' />
                                        </div>
                                        <div className='flex items-center justify-between border-b-[1px] border-gray-300  py-4'>
                                            <h1>Home</h1>
                                            <ArrowForwardIosIcon className='text-gray-700' />
                                        </div>
                                    </div>

                                    <button className='w-full h-14 px-2 bg-[#14A077] rounded text-white font-bold text-lg'>Post a Job</button>

                                </div>

                            </div>
                            : ""
                    }

                    <div className='hidden showMenuIcons gap-3
                    md:gap-5'>
                        <PermIdentitySharpIcon className=' ' />
                        <NotificationsNoneIcon className='  ' />
                        <MenuIcon className='  ' onClick={() => { setMenuButton(true) }} />
                    </div>

                    <div>

                    </div>

                    <div className=' hidden showPostAJobButton  md:flex md:items-center md:justify-center gap-8 items-end'>
                        {/* <NotificationsNoneIcon className='transform scale-125' /> */}

                        <div className='flex gap-8 items-center justify-center'>
                            <div className='flex gap-3 items-center justify-center'>
                                <div className=' flex gap-2 items-center justify-center cursor-pointer'
                                    onClick={() => setShowSidebar(!showSidebar)}
                                //     onMouseEnter={() => setShowSidebar(true)}
                                // onMouseLeave={() => setShowSidebar(false)}
                                >

                                    {/* <img className='h-12 w-12 rounded-3xl ' src={personImage}></img>   */}
                                    {
                                        userData?.map((data, index) => {
                                            // let firstName = data.fullName.split(' ')[0]
                                            return (
                                                <p key={index} className='text-base'>{data.fullName}</p>
                                            )
                                        })
                                    }

                                    <ExpandMoreIcon />
                                    {
                                        showSidebar &&
                                        <div className='absolute z-10 top-20 w-64 flex  flex-col items-center justify-between bg-white py-2 border-[1px] border-gray-300'
                                            onMouseEnter={() => setShowSidebar(true)}
                                            onMouseLeave={() => setShowSidebar(false)}
                                        >
                                            <div className='w-full flex flex-col gap-2 px-2'>
                                                <div className='flex gap-2 items-center before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'
                                                    onClick={() => naviagte('/candidate/dashboard')}>
                                                    <div><DashboardIcon /></div>
                                                    <h6 className='text-black' >Dashboard</h6>
                                                </div>

                                                {/* <div className='flex gap-2 items-center before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                                                            <div><AccountCircleRoundedIcon /></div>
                                                            <h1 className='text-black'>Profile</h1>
                                                        </div>
                                                        <div className='flex gap-2 items-center before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'>
                                                            <ArticleIcon />
                                                            <h1 className='text-black'>My Resume</h1>
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
                                                        </div> */}
                                                <div className='flex gap-2 items-center before:text-black hover:text-green-700 rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'
                                                    onClick={logout}>
                                                    <LogoutIcon />
                                                    <h1 className='text-black'

                                                    >Logout</h1>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                </div>


                                {/* </div> */}




                                {/* {login && <Login setLogin={setLogin} />} */}
                                {/* <button onClick={() => { setLogin(true) }}>
                                    Login/Register
                                </button> */}

                            </div>
                        </div>
                        <button className='w-36 showPostAJobButton text-base font-semibold hover:text-white hover:bg-[#14a077] flex items-center justify-center py-3 rounded text-medium font-sans font-jakarta border-[1px] border-[#14A077]'
                        // onClick={logout}
                        >
                            Post Job</button>
                    </div>
                    {/* {
                        login ?
                            <Login />
                            : ""
                    } */}

                </div>
            </div>
            {/* Navbar */}
        </div>

    )

}

export default Navbar2