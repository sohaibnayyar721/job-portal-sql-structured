
import logo from '../../assets/pictures/logo.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, } from 'react';
import '../../css/navbar.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';



function Navbar3() {
    let naviagte = useNavigate()
    const [menuButton, setMenuButton] = useState(false)
    let [showSidebar, setShowSidebar] = useState(false)
    let [employerID, setEmployerID] = useState('')
    let [userData, setData] = useState([])

    useEffect(() => {
        async function getCandidateData() {
            let token = localStorage.getItem('token')

            try {
                const getData = await fetch('http://localhost:4500/employeer/dashboard', {

                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const response = await getData.json()
                console.log("This is from employer dashboard", response)

                localStorage.setItem('alertShown', 'true');
                response.employeerData?.forEach((item) => {
                    setData(item)
                    setEmployerID(item.employerID)
                    console.log("this is navbar3", item)
                })

            } catch (err) {
                console.log(err)
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

    return (

        <div className='font-plus-jakarta border-gray-200 border-b-[1px] w-full flex flex-wrap overflow-hidden bg-white h-24 items-center md:px-9' >
            <div className="  w-full flex flex-row px-5 items-center  justify-between flex-wrap">

                <div className='flex gap-11'>
                    <div className='logo flex gap-12 '>
                        <img src={logo} className='w-full h-full object-contain'></img>
                    </div>
                </div>

                <div className=''>

                    <div className="hidden flex-row items-center gap-8 justify-center
                            lg:flex ">

                        <div className='flex flex-row items-center text-[17px]'
                        >
                            <Link to='/employeer'>Home</Link>
                        </div>

                        <div className='flex flex-row items-center text-[17px]'>
                            <Link >Jobs</Link>
                        </div>

                        <div className='flex flex-row items-center text-[17px]'>
                            <Link >About</Link>
                        </div>

                        <div className='flex flex-row items-center text-[17px]'>
                            <Link >Contact</Link>
                        </div>



                    </div>
                </div>


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


                                <div className='h-12 w-12 rounded-full object-contain'>
                                    <img className='w-full h-full rounded-full object-contain ' src={userData.companyLogo}></img>
                                </div>
                                <p className='font-normal font-plus-jakarta'>{userData.companyName?.split(' ')[0]}</p>


                                <ExpandMoreIcon />
                                {
                                    showSidebar &&
                                    <div className='absolute z-10 top-20 w-64 flex  flex-col items-center justify-between bg-white py-2 border-[1px] border-gray-300'
                                        onMouseEnter={() => setShowSidebar(true)}
                                        onMouseLeave={() => setShowSidebar(false)}
                                    >
                                        <div className='w-full flex flex-col gap-2 px-2'>

                                            <div className=' flex gap-2 items-center before:text-black hover:text-green-700  rounded before:font-normal hover:font-semibold  hover:bg-[#F5F5F2] px-2 py-2'
                                                // onClick={() => { naviagte('/EmployeerDashboard') }}
                                                // onClick={()=>{setCurrentPage('employerDashboard')} }
                                                onClick={() => { naviagte('/EmployeerDashboard') }}
                                            >
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
                        onClick={() => { naviagte('/EmployeerDashboard') }}
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




    )

}

export default Navbar3