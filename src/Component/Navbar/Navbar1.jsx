
import logo from '../../assets/pictures/logo.png'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import { useEffect, } from 'react';
import Login from '../Login/Login';
import '../../css/navbar.css'

import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

function Navbar1() {
    let naviagte = useNavigate()
    let [login, setLogin] = useState(false)
    const [menuButton, setMenuButton] = useState(false)
    let [employerLogin, setEmployerLogin] = useState(false)

    function handlePostAJob() {
        setLogin(true)
        setEmployerLogin('EmployerLogin')
    }
    return (
        <div className='font-plus-jakarta flex flex-wrap overflow-hidden border-gray-200 border-b-[1px] bg-white h-24 items-center md:px-9' >
            <div className="w-full flex flex-row px-5 items-center  justify-between flex-wrap">

                <div className='flex gap-11'>
                    <div className='logo flex gap-12 '>
                        <img src={logo} className='w-full h-full object-contain'></img>
                    </div>

                </div>

                <div className=''>

                    <div className="hidden flex-row items-center gap-8 justify-center
                        lg:flex ">



                        <div className='flex flex-row items-center text-[17px] font-medium'>
                            <Link to='/' className='text-[#121212]' >Home</Link>
                        </div>

                        <div className='flex flex-row items-center text-[17px]'>
                            <Link to='/jobSearchHome'>Find Jobs</Link>
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

                                <button className='w-full h-14 px-2 bg-[#14A077] rounded text-white font-bold text-lg'
                                // onClick={CheckToaster}
                                >Post a Job</button>

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
                            <PermIdentitySharpIcon className='transform scale-125 rounded-none ' />

                            <button
                                onClick={() => { setLogin(true) }} className='font-medium text-base'>Login/Register</button>
                            {login && <Login setLogin={setLogin} employerLogin={employerLogin} setEmployerLogin={setEmployerLogin}/>}
                            {/* {employerLogin && <EmployerLogin />} */}

                        </div>
                    </div>
                    <button className='w-36 showPostAJobButton text-base font-semibold hover:text-white hover:bg-[#14a077] flex items-center justify-center py-3 rounded text-medium font-sans font-jakarta border-[1px] border-[#14A077]'
                        onClick={handlePostAJob}
                    >Post a Job</button>
                    {/* {employerLogin  && (<EmployerLogin/>)} */}
                </div>
            </div>
        </div>
    )

}

export default Navbar1