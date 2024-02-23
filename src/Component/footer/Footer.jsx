import React from 'react'
import logo from '../../assets/pictures/logo.png'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PhoneLogo from '../../assets/pictures/PhoneLogo.png';
import SendIcon from '@mui/icons-material/Send';

function Footer() {
    return (
        <div className='w-full px-4 py-5 overflow-hidden bg-[#F5F5F2] flex flex-col gap-4 
            md:px-10 
            lg:px-14'>

            <div className='flex  flex-wrap items-center justify-between  gap-4 border-gray-300 border-b-[1px]
                md:py-10'>
                <div className='w-[90%] h-[10vh]
                    md:w-[20%] md:h-[10vh]'>
                    <img src={logo} className='w-full h-full object-fill'></img>
                </div>

                {/* <div className='flex items-center justify-center gap-2'>
                    <p className='text-[#121212] text-xl text-normal font-semibold'>Follow us: </p>

                    <FacebookRoundedIcon
                        style={{ fontSize: '45px' }}
                        className='text-black h-28 w-28' />

                    <TwitterIcon
                        style={{ fontSize: '45px' }}
                        className='text-black h-28 w-28' />

                    <LinkedInIcon
                        style={{ fontSize: '45px' }}
                        className='text-black h-28 w-28' />

                    < PinterestIcon
                        style={{ fontSize: '45px' }}
                        className='text-black h-28 w-28' />
                </div> */}
            </div>

            <div className='flex flex-col gap-3
                md:flex-row md:py-8'>
                <div className='flex flex-wrap gap-5 py-2
                    sm:w-[50%]
                    md:flex-col '>
                    <div className='flex gap-4'>
                        <div className='w-12 h-12'>
                            <img src={PhoneLogo} className='w-full h-full object-fill'></img>
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-sm text-[#64666C]'>Need help? 24/7</p>
                            <p className='font-semibold text-black text-lg'>001-1234-8888</p>
                        </div>
                    </div>


                    <div className='w-full
                    md:w-[75%]'>
                        <p className='text-base text-wrap'>Job Searching Just Got Easy. Use Jobtex to run a
                            hiring site and earn money in the process!</p>
                    </div>

                    <div>
                        <p className='text-base text-[#64666C]'> 118 E 128th St, East Chicago, IN 46312, US</p>
                    </div>

                    {/* email send */}
                    {/* <div className='w-[70%] h-12 flex rounded-lg'>
                        <input placeholder='Your email address' className='px-2 w-[85%] rounded-tl-lg rounded-bl-lg '></input>
                        <div className='w-[15%] bg-[#14A077] rounded-tr-lg rounded-br-lg flex items-center justify-center'>
                            <SendIcon className='text-white'/>
                        </div>
                    </div> */}

                </div>

                <div className='w-full grid grid-cols-2 gap-6 
                     md:grid md:grid-cols-4 md:gap-16 md:px-4'>

                    <div className='flex flex-col gap-5 '>
                        <p className='font-bold'>Quick Links</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Job Packages</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Post New Job</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Jobs Listing</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal' >Candidates</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Employers</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Terms of Use</p>
                    </div>

                    <div className='flex flex-col gap-5 '>
                        <p className='font-bold'>For Candidates</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>User Dashboard</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>CV Packages</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Candidate Grid</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Candidate List</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Messages</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Jobs Featured</p>
                    </div>

                    <div className='flex flex-col gap-5 '>
                        <p className='font-bold'>For Employers</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Post New Job</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Jobs Listing</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Employers List</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Job Packages</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>About Us</p>
                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Terms of use</p>

                    </div>

                    {/* Download the app */}
                        {/* <div className='flex flex-col gap-4 '>
                            <p className='font-bold'>Download App</p>
                            <img
                                src='https://demoapus1.com/jobtex-new/wp-content/uploads/2023/05/google-play.png'
                                className='w-48 h-14'
                            ></img>

                            <img
                                src=' https://demoapus1.com/jobtex-new/wp-content/uploads/2023/05/app-store.png'
                                className='w-48 h-14'
                            ></img>
                        </div> */}

                </div>
            </div>




        </div>
    )
}

export default Footer