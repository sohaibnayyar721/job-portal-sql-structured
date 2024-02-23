import React, { useState } from 'react'
import PersonImage from '../../assets/pictures/Person.png'
import SearchIcon from '../../assets/pictures/SearchIcon.png'
import locationIcon from '../../assets/pictures/locationIcon.png'
import Bar from '../../assets/pictures/bar.png'
import SoftwareEngineer from '../../assets/pictures/SoftwareEngineer.png'
import WorldPicture from '../../assets/pictures/WorldPicture.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EastIcon from '@mui/icons-material/East';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import brand1 from '../../assets/pictures/brand1.png'
import brand2 from '../../assets/pictures/brand2.png'
import brand3 from '../../assets/pictures/brand3.png'
import brand4 from '../../assets/pictures/brand4.png'
import brand5 from '../../assets/pictures/brand5.png'
import Select from 'react-select'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import '../../css/animate.css'
import ServerError from '../Error/ServerError'
import CompanyLogo from '../../assets/pictures/CompanyLogo.png'
import PalestineFamily from '../../assets/pictures/Palestine Family.png'
import Turkey from '../../assets/pictures/Istanbaul.jpg'
import Pakistan from '../../assets/pictures/Karachi.jpg'
import SaudiArabia from '../../assets/pictures/Riyadh.jpg'
import Egypt from '../../assets/pictures/Cairo.jpg'
import Indonesia from '../../assets/pictures/Indonesia.jpg'
import Morocco from '../../assets/pictures/Morocco.jpg'
import Bangladesh from '../../assets/pictures/Bangladesh.png'

import Malaysia from '../../assets/pictures/Malaysia.jpg'
// import { Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../css/styles.css';

import CheckIcon from '@mui/icons-material/Check';
import Freelance from '../../assets/pictures/Freelance.png'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useLocation } from 'react-router-dom'

function Content() {
    let locations = useLocation()
    function handleJobSearch(employerID, jobID) {

        if (locations.pathname.includes('candidate')) {
            navigate(`/candidate/job/${employerID}/${jobID}`)
        }
        else if (locations.pathname.includes('employeer')) {
            navigate(`/employeer/job/${employerID}/${jobID}`)
        }
        else {
            navigate(`/job/${employerID}/${jobID}`)

        }
    }
    // --------Variable Declaration--------
    let Cities = [
        Turkey,
        Pakistan,
        Bangladesh,
        SaudiArabia,
        Malaysia,
        Egypt,
        Indonesia,
        Morocco]

    const navigate = useNavigate();
    let [getFeaturedJobData, setGetFeaturedJobData] = useState([])
    let [category, setCategory] = useState([])
    let [dynamicTitle, setDynamicTitle] = useState([])
    let [jobTitle, setJobTitle] = useState('')
    let [location, setlocation] = useState('')
    let [serverError, setServerError] = useState(false)
    let [getJobLocation, setGetJobLocation] = useState([])

    // ----------------End--------------

    const data = getJobLocation ? Object.entries(getJobLocation).map(([key, value], index) => ({
        id: index + 1,
        img: Cities[index],  // Assuming you have images like Istanbul, Karachi, etc.
        title: key,
        unit: `Open Jobs (${value})`
    }))
        : []


    // ---------------Functions----------------

    //__________ Search job by category from home page __________

    function searchByCategory(getCategory) {

        let url = '/'

        if (locations.pathname.includes('candidate')) {
            url += `candidate/jobSearch?category=${encodeURIComponent(getCategory)}`
            navigate(url)

        }

        else if (locations.pathname.includes('employeer')) {
            url += `employer/jobSearch?category=${encodeURIComponent(getCategory)}`
            navigate(url)

        }

        else {
            url += `jobSearchHome?category=${encodeURIComponent(getCategory)}`
            navigate(url)
        }
    }

    //__________ Get job api __________

    async function getFeaturedJob() {
        try {
            const getFeaturedJob = await fetch('http://localhost:4500/getAllData', {

                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const response = await getFeaturedJob.json()
            console.log("This is error message",response.message)

            setGetFeaturedJobData(response?.allJobs)
            setCategory(response?.categories)
            setDynamicTitle(response?.title)
            setGetJobLocation(response?.jobByLocation)
        } catch (err) {
            console.log("this is error from content",err.message )
            setServerError(true)
            // alert("Server Can't respond")
        }
    }


    useEffect(() => {
        getFeaturedJob()
    }, []);


    const handleLocationInput = (selectedOption, { action }) => {
        if (action === "clear") {
            setlocation("");
        }
        else {
            setlocation(selectedOption.value);

        }
    }

    let removeDuplicateLocation = getFeaturedJobData ? [...new Set(getFeaturedJobData
        .filter(data => data.location !== "")
        .map(data => data.location)

    )]
        : []

    const LocationOption = removeDuplicateLocation.map(data => ({
        value: data,
        label: data,
    }));

    const customStyles = {

        option: (provided, state) => ({
            ...provided,
            border: state.isFocused ? 'none' : 'none',
            color: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'transparent',
                color: 'green',
            },
        }),

        control: (provided) => ({
            ...provided,
            // width: '330%',
            minHeight: '45px',
            width: "100%",
            border: 0,
            // This line disable the blue border
            boxShadow: 'none'
            // outline:'none'
        }),

        indicatorSeparator: () => ({ display: "none" }),

    };

    function findJob() {
        let url = '/';

        if (locations.pathname.includes('candidate')) {

            if (jobTitle && location) {
                url += `candidate/jobSearch?job=${jobTitle}&location=${encodeURIComponent(location)}`;
                navigate(url)
            }

            else if (jobTitle) {
                url += `candidate/jobSearch?job=${encodeURIComponent(jobTitle)}`;
                navigate(url)
            }
            else if (location) {
                url += `candidate/jobSearch?location=${encodeURIComponent(location)}`;
                navigate(url)
            }
            else {
                navigate(`/candidate/jobSearch`)
            }
        }

        else if (locations.pathname.includes('employeer')) {

            if (jobTitle && location) {
                url += `employer/jobSearch?job=${jobTitle}&location=${encodeURIComponent(location)}`;
                navigate(url)
            }

            else if (jobTitle) {
                url += `employer/jobSearch?job=${encodeURIComponent(jobTitle)}`;
                navigate(url)
            }
            else if (location) {
                url += `employer/jobSearch?location=${encodeURIComponent(location)}`;
                navigate(url)
            }
            else {
                navigate(`/employer/jobSearch`)
            }
        }

        else {

            if (jobTitle && location) {
                url += `jobSearchHome?job=${jobTitle}&location=${encodeURIComponent(location)}`;
                navigate(url)
            }

            else if (jobTitle) {
                url += `jobSearchHome?job=${encodeURIComponent(jobTitle)}`;
                navigate(url)
            }
            else if (location) {
                url += `jobSearchHome?location=${encodeURIComponent(location)}`;
                navigate(url)
            }
            else {
                navigate(`/jobSearchHome`)
            }
        }
    }

    function findJobByCountry(countryName) {
        let url = '/';

        if (locations.pathname.includes('candidate')) {
            url += jobTitle ? `candidate/jobSearch${jobTitle}?&location=${encodeURIComponent(countryName)}` : `candidate/jobSearch?location=${encodeURIComponent(countryName)}`;
            navigate(url);
        }

        else if (locations.pathname.includes('employeer')) {
            url += jobTitle ? `employer/jobSearch${jobTitle}?&location=${encodeURIComponent(countryName)}` : `employer/jobSearch?location=${encodeURIComponent(countryName)}`;
            navigate(url);
        }
        else {
            url += jobTitle ? `jobSearchHome${jobTitle}?&location=${encodeURIComponent(countryName)}` : `jobSearchHome?location=${encodeURIComponent(countryName)}`;
            navigate(url);
        }
    }

    const capitalizeFirstLetterInSentence = (sentence) => {
        let jobtitle = sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return jobtitle
    };

    let [getCategory, setGetCategory] = useState('')
    const filterByTitle = (category) => {
        setGetCategory(category)
        console.log(category)
        // return getFeaturedJobData.filter(obj => obj.jobTitle.toLowerCase() !== title.toLowerCase());
    };

    let getCategorys = getFeaturedJobData ?
        [...new Set(getFeaturedJobData.filter(data => data.category !== "").map(data => data.category))]
        : []

    return (
        <div className='font-plus-jakarta'>
            {
                serverError ?
                    <ServerError />
                    :
                    <div className=''>
                        <div className='flex flex-col bg-white gap-8'>

                            <div>
                                <div className='flex flex-col bg-[#E2F9EE]
                            md:flex-row  '>

                                    <div className=' flex w-full flex-col gap-10 px-5 py-8 
                                        md:w-[60%] md:px-4 md:py-20
                                        lg:w-[60%] lg:px-14 lg:py-20'>

                                        <div data-wow-duration="1s" data-wow-delay="1s" className='wow fadeInUp'>
                                            <div className=' flex flex-col gap-6 '>

                                                <div className=' gap-6 flex-col  mt-2'>
                                                    <p className=' text-black  font-plus-jakarta
                                 md:text-4xl 
                                '
                                                    >Empower Dreams </p>


                                                    <p className='mt-3 text-[#14a077]  font-plus-jakarta font-semibold
                            md:text-5xl 
                            lg:text-6xl'
                                                    >Jobs for Every Need </p>

                                                </div>


                                                <div className='w-full md:w-[70%] '>
                                                    <p className='text-[#64666C] font-gilroy-regular  text-xl leading-normal'>Resume-Library is a true performance-based job board. Enjoy custom hiring products and access to up to 10,000 new resume registrations daily, with no subscriptions or user licences.</p>
                                                </div>

                                                <div className='flex flex-col gap-5 '>
                                                    <div className=' h-auto flex flex-col gap-3 px-3 items-center border-4 rounded-lg border-[#1DBF73] bg-white py-2
                                                        md:flex-row md:gap-2 md:px-3
                                                        '>

                                                        <div className='w-full h-16 border-b-2 border-gray-300 flex flex-row items-center gap-2 px-2
                                md:border-none'>
                                                            <img src={SearchIcon} className='w-8 h-8'></img>
                                                            <input placeholder='Job title, keywords or Company' className='w-full outline-none '
                                                                onChange={(e) => { setJobTitle(e.target.value) }}
                                                            ></input>
                                                        </div>

                                                        <img src={Bar} className='hidden md:flex'></img>

                                                        <div className='w-full h-16 border-b-2  border-gray-300 flex flex-row items-center gap-0 px-2
                                md:border-none'>
                                                            <LocationOnOutlinedIcon className='text-gray-300' />

                                                            <div className='w-full'>
                                                                <Select
                                                                    onChange={handleLocationInput}
                                                                    // className='border-none'
                                                                    options={LocationOption}
                                                                    styles={customStyles}
                                                                    placeholder='Location'
                                                                    isClearable
                                                                    theme={(theme) => ({
                                                                        ...theme,
                                                                        colors: {
                                                                            ...theme.colors,
                                                                            primary25: 'transparent',
                                                                            primary: 'green',
                                                                            // border:"none"

                                                                        },
                                                                    })}
                                                                />
                                                            </div>

                                                        </div>

                                                        <button className=' w-full h-14  bg-[#14a077] rounded text-white font-inter text-xl  font-sans font-plus-jakarta font-semibold
                                     md:w-72 md:px-4
                                '
                                                            onClick={findJob}
                                                        >Find Jobs</button>
                                                    </div>

                                                    {/* <div className='flex gap-3 flex-wrap 
                                md:flex-row md:gap-2
                                '>
                                                        <p className='text-[#64666C] font-semibold'>Designer </p>
                                                        <p className='text-[#64666C] font-semibold'>Developer </p>
                                                        <p className='text-[#64666C] font-semibold'>Tester </p>
                                                        <p className='text-[#64666C] font-semibold'>ML Expert </p>

                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <img src={PersonImage} data-wow-duration="1s" data-wow-delay="1s" className=' wow zoomIn hidden h-full 
                                    lg:w-[40%] lg:h-[85vh] lg:flex lg:mt-20'></img>

                                </div>

                                <div className='w-full bg-[#123841] items-end justify-end py-10 px-5 '>
                                    <div className='wow fadeInUp flex flex-col gap-8' data-wow-duration="1s" data-wow-delay="1s">
                                        <p className='text-white text-center font-gilroy-bold text-xl font-bold leading-normal'>Over 100,000 recruiters use JOBTAX to modernize their hiring</p>

                                        <div className='w-full flex flex-row items-center justify-between
            md:justify-center '>

                                            <button className='w-10 h-10 rounded-full bg-white
                md:hidden'><KeyboardArrowLeftIcon /></button>

                                            <div className='flex items-center justify-between w-full px-12'>


                                                <img src={brand1} className=' h-12'></img>
                                                <img src={brand2} className=' h-12'></img>
                                                <img src={brand3} className=' h-12'></img>

                                                <img src={brand4} className='h-12'></img>
                                                <img src={brand5} className='h-12'></img>
                                            </div>
                                            <button className='w-10 h-10 rounded-full bg-white
                md:hidden'
                                            ><KeyboardArrowRightIcon /></button>
                                        </div>
                                    </div>


                                </div>
                            </div>


                            <div data-wow-duration="1s" data-wow-delay="1s" className='wow fadeInUp px-5 flex flex-col gap-2 bg-white
    lg:px-14'>
                                <div className='flex flex-col gap-2
            md:flex-row md:items-center md:justify-between'>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-black dark:text-white font-plus-jakarta-sans text-3xl font-bold'>Browse by category</p>
                                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Recruitment Made Easy in 100 seconds</p>
                                    </div>

                                    <div className='flex gap-2 items-center cursor-pointer'
                                        onClick={() => { navigate('/jobSearchHome') }}
                                    >
                                        <p className='text-black text-xl font-semibold'>All Categories</p>
                                        <EastIcon className='text-[#14A077]' />
                                    </div>

                                </div>


                                <div className='w-full flex flex-col rounded-md mt-5 gap-3
                            md:grid md:grid-cols-5'>

                                    {
                                        category?.map((data) => {
                                            return (
                                                Object.entries(data).map(([key, value], index) => {
                                                    return (
                                                        <div key={index} className='w-full  px-4 rounded-md flex flex-col py-4 gap-1 bg-[#F5F5F5] hover:bg-[#121212] before:text-black hover:text-white '
                                                            onClick={() => { searchByCategory(key) }}>
                                                            <p className=' font-plus-jakarta-sans text-xl font-bold '>{key}</p>
                                                            <p className='font-plus-jakarta-sans text-md font-normal'> {value} Jobs available</p>
                                                            <div className='mt-2 flex items-center'>
                                                                <p className='text-teal-500 font-plus-jakarta-sans text-md font-semibold'>Explore Job</p>
                                                                <KeyboardArrowRightIcon className='text-teal-500' />
                                                            </div>
                                                        </div>
                                                    )
                                                })

                                            )
                                        })
                                    }

                                </div>
                            </div>

                            <div data-wow-duration="1s" className='wow fadeInUp px-5 flex flex-col gap-6 bg-white
                        lg:px-14'

                            >

                                <div className='flex flex-col items-center justify-center bg-white gap-3'>
                                    <p className='text-gray-700 text-center font-bold text-3xl'>Featured Job</p>
                                    <p className='text-[#404145] text-center font-normal text-xl'>Find the job that’s perfect for you. about 800+ new jobs everyday</p>
                                </div>

                                <div className='flex flex-col gap-4 bg-white'>

                                    <div className='flex flex-row gap-4 overflow-x-scroll
            md:items-center md:justify-center'>

                                        <button className='whitespace-nowrap rounded-3xl bg-[#14A077] text-lg font-bold text-white px-8 py-3
                md:py-2'
                                            onClick={() => { filterByTitle('') }}>
                                            All Jobs
                                        </button>


                                        {
                                            getCategorys?.map((data, index) => {
                                                return (
                                                    <button key={index} className='whitespace-nowrap rounded-3xl bg-[#14A077] text-lg font-bold text-white px-4 py md:py-2'
                                                        onClick={() => { filterByTitle(data) }}
                                                    >
                                                        {data}
                                                    </button>
                                                )
                                            })
                                        }


                                    </div>

                                    <div className='md:grid md:grid-cols-2 md:gap-8 overflow-x-scroll'>

                                        {
                                            getFeaturedJobData?.filter(obj => obj.category.toLowerCase().includes(getCategory.toLowerCase()))
                                                .map((data, index) => {
                                                    let getJobTitleCamelCase = capitalizeFirstLetterInSentence(data.jobTitle)
                                                    return (


                                                        <div key={index}
                                                            onClick={() => { handleJobSearch(data.employerID, data.jobID) }}
                                                        >
                                                            <div className='w-full border border-solid hover:shadow-xl rounded-md    hover:border-[#61CE70] border-gray-300 p-4  flex flex-col gap-4'
                                                            >
                                                                <div className='flex gap-4
                                                                                            md:justify-between'>
                                                                    <div className='flex gap-4 ' >
                                                                        <div className='w-20 h-20 object-contain rounded-full'>
                                                                            {
                                                                                data.companyLogo ?
                                                                                    <div className='h-12 w-12 rounded-full object-contain'>
                                                                                        <img className='w-full h-full rounded-full object-contain' src={data.companyLogo}></img>
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
                                                                            <p className='text-black font-plus-jakarta-sans text-sm font-bold'>{data.companyName}</p>
                                                                            <div className='w-full flex items-center gap-2 flex-wrap -300 '>

                                                                                {data.location && (
                                                                                    <div className='flex items-center'>
                                                                                        <LocationOnOutlinedIcon className='text-gray-500 transform scale-90' />
                                                                                        <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.location}</p>
                                                                                    </div>
                                                                                )}
                                                                                {
                                                                                    data.date && (
                                                                                        <div className='flex gap-2 items-center justify-center'>
                                                                                            <CalendarTodayIcon className='text-gray-600 transform scale-75' />
                                                                                            <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.date}</p>
                                                                                        </div>
                                                                                    )
                                                                                }


                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>


                                                                {data.jobType ?
                                                                    <div className='w-full '>
                                                                        <button className=' py-2 px-6 rounded-3xl bg-[#F1F1F1]'>
                                                                            {data.jobType}
                                                                        </button>
                                                                    </div>


                                                                    : null}
                                                                <div className='flex items-center justify-between border-t-2 border-gray-200 py-4'>
                                                                    <div className='flex gap-3 items-center'>
                                                                        {/* <img src={DollarIcon} className='w-6 h-6'></img> */}

                                                                        {
                                                                            data.minSalary && data.maxSalary ?
                                                                                <p className='text-black font-plus-jakarta text-lg font-semibold'>${data.minSalary} - ${data.maxSalary} <span className='text-[#64666C]'>/ month</span></p>

                                                                                : data.minSalary ? (
                                                                                    <p className='text-black font-plus-jakarta-sans text-lg font-semibold'> ${data.minSalary}<span className='text-[#64666C]'>/ month</span></p>

                                                                                )
                                                                                    : data.minSalary ? (
                                                                                        <p className='text-black font-plus-jakarta-sans text-lg font-semibold'> ${data.maxSalary}<span className='text-[#64666C]'>/ month</span></p>

                                                                                    )

                                                                                        : ""
                                                                        }
                                                                    </div>
                                                                    <p className='text-[#64666C]'>{data.date}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className='flex  bg-[#E2F9EE]'>
                                <div className='flex-1 '>
                                    <img data-wow-delay="1s" className='wow zoomIn w-[90vh]' src={PalestineFamily}></img>
                                </div>

                                <div className='flex-1'>
                                    <div className='px-14 h-full flex flex-col gap-5 justify-center'>
                                        <h1 className='text-3xl font-semibold'>Get the job that's</h1>
                                        <h1 className='text-5xl font-semibold'> <span className='text-red-500'>Right</span> <span className='text-green-600'>For</span> <span className='text-black'>You</span></h1>
                                        <p className='font-plus-jakarta-sans'>
                                            Supporting job creation initiatives in Palestine is crucial for fostering economic growth and improving livelihoods. By investing in sustainable projects and industries, such as agriculture, technology, and small businesses, opportunities can be generated, empowering the Palestinian people to contribute actively to their local economies. Additionally, fostering entrepreneurship, vocational training, and skill development programs will further enhance employability and create a resilient job market. International collaboration and partnerships can play a vital role in promoting economic stability and empowering individuals, contributing to the overall socio-economic well-being of Palestine. </p>
                                        {/* <div className='flex'></div> */}
                                        <div>
                                            <button className='border-2 border-black py-2 px-4 rounded-md'
                                                onClick={() => { navigate('/jobSearchHome') }}
                                            >
                                                <div className='flex gap-3'>
                                                    <p>View All Jobs</p>
                                                    <EastIcon />
                                                </div>
                                            </button>
                                            {/* <h1></h1> */}
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className='flex items-center justify-center'>
                                <div className='flex items-center justify-center'>
                                    <img className='w-[90vh]' src={Freelance}></img>
                                </div>

                                {/* <div className=' bg-yellow-300'> */}
                                <div className='w-[30%] h-full flex flex-col gap-10 justify-center'>
                                    <h1 className='leading-15 text-3xl font-semibold font-plus-jakarta-sans'>Get over 50.000+ talented experts in ICCA Job Portal.</h1>
                                    <p className=' text-base font-plus-jakarta-sans'> A full hybrid workforce management tools are yours to use, as well as access to our top 1% of talent.</p>

                                    <div className='flex flex-col gap-4'>

                                        <div className='flex gap-3'>
                                            <CheckIcon />
                                            <p className='font-plus-jakarta-sans font-semibold text-lg'>Seamless searching</p>
                                        </div>

                                        <div className='flex gap-3'>
                                            <CheckIcon />
                                            <p className='font-plus-jakarta-sans font-semibold text-lg'>Get top 3% experts for your project</p>
                                        </div>

                                        <div className='flex gap-3'>
                                            <CheckIcon />
                                            <p className='font-plus-jakarta-sans font-semibold text-lg'>Protected payments system</p>
                                        </div>
                                    </div>

                                    {/* <div className='flex'></div> */}
                                    <div>
                                        <button className='bg-yellow-300 py-3 px-6 rounded-full font-semibold'
                                            onClick={() => { navigate('/jobSearchHome') }}>
                                            View All Jobs
                                        </button>
                                        {/* <h1></h1> */}
                                    </div>


                                </div>

                                {/* </div> */}

                            </div>


                            <div className='flex flex-col gap-6  bg-[#F5F5F2] py-16'>

                                <div data-wow-duration="1s" data-wow-delay="1s" className='wow fadeInUp flex flex-col items-center justify-center '>
                                    <p className='text-gray-700 text-center font-bold text-3xl mt-4'>Jobs By Location</p>
                                    <p className='text-[#404145] text-center font-normal text-xl mt-4'>Find your favourite jobs and get the benefits of yourself</p>
                                </div>
                                {/* <div className='h-[60vh] w-auto'> */}
                                <div className="col-lg-12 wow fadeInUp">
                                    <Swiper
                                        spaceBetween={30}
                                        // pagination={{
                                        //     clickable: true,
                                        // }}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        slidesPerView={1}
                                        className="location-slider"
                                        loop={true}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        breakpoints={{
                                            600: {
                                                slidesPerView: 2,
                                                spaceBetween: 19.5,
                                            },
                                            991: {
                                                slidesPerView: 3,
                                                spaceBetween: 19.5,
                                            },
                                            1400: {
                                                slidesPerView: 4,
                                                spaceBetween: 19.5,
                                            },
                                        }}
                                    >
                                        {data.map((idx) => (
                                            <SwiperSlide key={idx.id}
                                                style={{
                                                    height: '100%',
                                                    objectFit: "contain",
                                                    width: "300px",
                                                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))'
                                                }}>
                                                <div className="w-full  h-full">
                                                    <img

                                                        className='w-full h-full'
                                                        src={idx.img}
                                                        alt="images" />
                                                </div>
                                                <div className="description">
                                                    <h6>
                                                        <p>{idx.title}</p>
                                                    </h6>
                                                    <p>
                                                        {idx.unit}
                                                    </p>


                                                </div>
                                                <div
                                                    style={{ background: 'linear-gradient(to bottom,transparent,transparent,transparent ,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))' }}
                                                    className="w-full fixed bottom-0 h-screen"
                                                    onClick={() => findJobByCountry(idx.title)}
                                                >
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                {/* </div> */}


                                {/* <div className='flex flex-col 
        md:flex-row '>
                            <div className='w-full '>
                                <div className='w-full overflow-x-auto overflow-hidden flex gap-4'>
                                    <Swiper
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        // navigation={true}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide>Slide 1</SwiperSlide>
                                        <SwiperSlide>Slide 2</SwiperSlide>
                                        <SwiperSlide>Slide 3</SwiperSlide>
                                        <SwiperSlide>Slide 4</SwiperSlide>
                                        <SwiperSlide>Slide 5</SwiperSlide>
                                        <SwiperSlide>Slide 6</SwiperSlide>
                                        <SwiperSlide>Slide 7</SwiperSlide>
                                        <SwiperSlide>Slide 8</SwiperSlide>
                                        <SwiperSlide>Slide 9</SwiperSlide>
                                    </Swiper>
                                    <img src={GermanyPicture} className='w-44 h-[40vh] md:w-72 md:h-[60vh] '></img>
                                    <img src={GermanyPicture} className='w-44 h-[40vh] md:w-72 md:h-[60vh] '></img>
                                    <img src={GermanyPicture} className='w-44 h-[40vh] md:w-72 md:h-[60vh] '></img>
                                    <img src={GermanyPicture} className='w-44 h-[40vh] md:w-72 md:h-[60vh] '></img>
                                    <img src={GermanyPicture} className='w-44 h-[40vh] md:w-72 md:h-[60vh] '></img>
                                    <img src={GermanyPicture} className='w-44 h-[40vh] md:w-72 md:h-[60vh] '></img>
                                </div>
                            </div>
                        </div> */}

                            </div>

                            <div className='flex flex-col
        md:flex-row'>
                                <div className='w-full flex items-center justify-center'>
                                    <div data-wow-delay="1s" className='wow zoomIn w-[80%] h-[65vh] mt-6'>
                                        <img src={WorldPicture} className='w-full h-full object-fit'></img>
                                    </div>
                                </div>


                                <div className='w-full flex items-center justify-center'>
                                    <div data-wow-duration="1s" data-wow-delay="1s" className='wow fadeInRight px-7 gap-4 flex flex-col justify-center'>
                                        <p className='text-left text-gray-700 font-semibold text-3xl '>Get the job that's right for you</p>
                                        <p className='text-left text-gray-700 font-normal text-lg leading-5'>Search millions of jobs and get the inside scoop on companies with employee
                                            reviews, personalized salary tools, and more.</p>

                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon className='text-[#14A077]' />
                                            <p className='text-left text-gray-700 font-normal text-lg'>Access to millions of job seekers</p>
                                        </div>

                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon className='text-[#14A077]' />
                                            <p className='text-left text-gray-700 font-normal text-lg'>Only pay for the candidates you want to contact</p>
                                        </div>

                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon className='text-[#14A077]' />
                                            <p className='text-left text-gray-700 font-normal text-lg'>Post unlimited jobs for free—all from one place</p>
                                        </div>

                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon className='text-[#14A077]' />
                                            <p className='text-left text-gray-700 font-normal text-lg'>Premium job placement on SimplyHired, Indeed, & over 100 job sites</p>
                                        </div>

                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon className='text-[#14A077]' />
                                            <p className='text-left text-gray-700 font-normal text-lg'>Hiring solutions & pricing that works with seasonal hiring changes</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* <div className='w-full px-7 gap-4 flex flex-col'>
        <p className='text-left text-gray-700 font-semibold text-3xl '>Get the job that's right for you</p>
        <p className='text-left text-gray-700 font-normal text-lg leading-5'>Search millions of jobs and get the inside scoop on companies with employee
            reviews, personalized salary tools, and more.</p>
    
        <div className='flex gap-2 items-center'>
            <CheckCircleIcon className='text-[#14A077]' />
            <p className='text-left text-gray-700 font-normal text-lg'>Access to millions of job seekers</p>
        </div>
    
        <div className='flex gap-2 items-center'>
            <CheckCircleIcon className='text-[#14A077]' />
            <p className='text-left text-gray-700 font-normal text-lg'>Only pay for the candidates you want to contact</p>
        </div>
    
        <div className='flex gap-2 items-center'>
            <CheckCircleIcon className='text-[#14A077]' />
            <p className='text-left text-gray-700 font-normal text-lg'>Post unlimited jobs for free—all from one place</p>
        </div>
    
        <div className='flex gap-2 items-center'>
            <CheckCircleIcon className='text-[#14A077]' />
            <p className='text-left text-gray-700 font-normal text-lg'>Premium job placement on SimplyHired, Indeed, & over 100 job sites</p>
        </div>
    
        <div className='flex gap-2 items-center'>
            <CheckCircleIcon className='text-[#14A077]' />
            <p className='text-left text-gray-700 font-normal text-lg'>Hiring solutions & pricing that works with seasonal hiring changes</p>
        </div>
    </div> */}

                            <div data-wow-duration="1s" data-wow-delay="1s" className='wow fadeInUp flex flex-col gap-2 bg-white px-5
    lg:px-14 md:py-5'>
                                <div className='flex gap-2 flex-col
        md:justify-between md:items-center md:flex-row
        '>

                                    <div className=' flex flex-col gap-2 bg-white '>
                                        <p className='text-black dark:text-white font-plus-jakarta-sans text-3xl font-semibold'>Top Employers</p>
                                        <p className='text-gray-600 font-plus-jakarta-sans text-base font-normal'>Showing companies based on reviews and recent job openings</p>

                                    </div>

                                    <div>
                                        <p className='text-black text-xl font-semibold'>All Employers</p>
                                    </div>

                                </div>

                                {/* <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop
            className="tes-category-job"
        >
    
            <SwiperSlide >
                <div className="group-category-job padding wow fadeInUp">
    
                    <div className='flex flex-col
        md:grid md:grid-cols-4 md:gap-10'>
                        <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                            <div className='flex gap-4 flex-wrap'>
    
                                
                                <img src={SoftwareEngineer} className='w-10 h-10'></img>
                              
    
                                <div className='flex flex-col flex-wrap'>
    
                                    <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                    <div className='flex gap-2 items-center flex-wrap'>
                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                    </div>
    
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex items-center'>
                                            <img src={locationIcon} className='w-8 h-8'></img>
                                            <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                        </div>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
    
                        <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                            <div className='flex gap-4 flex-wrap'>
    
                               
                                <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                
    
                                <div className='flex flex-col flex-wrap'>
    
                                    <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                    <div className='flex gap-2 items-center flex-wrap'>
                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                    </div>
    
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex items-center'>
                                            <img src={locationIcon} className='w-8 h-8'></img>
                                            <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                        </div>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
    
                        <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                            <div className='flex gap-4 flex-wrap'>
    
                     
                                <img src={SoftwareEngineer} className='w-10 h-10'></img>
                               
    
                                <div className='flex flex-col flex-wrap'>
    
                                    <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                    <div className='flex gap-2 items-center flex-wrap'>
                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                    </div>
    
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex items-center'>
                                            <img src={locationIcon} className='w-8 h-8'></img>
                                            <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                        </div>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
    
                        <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                            <div className='flex gap-4 flex-wrap'>
    
                               
                                <img src={SoftwareEngineer} className='w-10 h-10'></img>
                             
    
                                <div className='flex flex-col flex-wrap'>
    
                                    <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                    <div className='flex gap-2 items-center flex-wrap'>
                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                    </div>
    
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex items-center'>
                                            <img src={locationIcon} className='w-8 h-8'></img>
                                            <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                        </div>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
    
                        <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                            <div className='flex gap-4 flex-wrap'>
    
                              
                                <img src={SoftwareEngineer} className='w-10 h-10'></img>
                             
    
                                <div className='flex flex-col flex-wrap'>
    
                                    <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                    <div className='flex gap-2 items-center flex-wrap'>
                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                    </div>
    
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex items-center'>
                                            <img src={locationIcon} className='w-8 h-8'></img>
                                            <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                        </div>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
    
                        <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                            <div className='flex gap-4 flex-wrap'>
    
                             
                                <img src={SoftwareEngineer} className='w-10 h-10'></img>
                               
    
                                <div className='flex flex-col flex-wrap'>
    
                                    <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                    <div className='flex gap-2 items-center flex-wrap'>
                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                    </div>
    
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex items-center'>
                                            <img src={locationIcon} className='w-8 h-8'></img>
                                            <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                        </div>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
    
                        <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                            <div className='flex gap-4 flex-wrap'>
    
                              
                                <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                
    
                                <div className='flex flex-col flex-wrap'>
    
                                    <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                    <div className='flex gap-2 items-center flex-wrap'>
                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                    </div>
    
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex items-center'>
                                            <img src={locationIcon} className='w-8 h-8'></img>
                                            <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                        </div>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                </div>
            </SwiperSlide>
    
        </Swiper> */}

                                {/* <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop
        >
            <SwiperSlide>
                <div>
                    <h1>Slide 1</h1>
                </div>
                <div>
                    <h1>Slide 2</h1>
                </div>
                <div>
                    <h1>Slide 3</h1>
                </div>
                <div>
                    <h1>Slide 4</h1>
                </div>
    
            </SwiperSlide>
            ...
        </Swiper> */}



                                <div className='flex flex-col
                            md:grid md:grid-cols-4 md:gap-10'>
                                    <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                                        <div className='flex gap-4 flex-wrap'>

                                            {/* <div className='w-14 h-14 object-contain'> */}
                                            <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                            {/* </div> */}

                                            <div className='flex flex-col flex-wrap'>

                                                <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                                <div className='flex gap-2 items-center flex-wrap'>
                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                </div>

                                                <div className='flex items-center flex-wrap'>
                                                    <div className='flex items-center'>
                                                        <img src={locationIcon} className='w-8 h-8'></img>
                                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                                        <div className='flex gap-4 flex-wrap'>

                                            {/* <div className='w-14 h-14 object-contain'> */}
                                            <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                            {/* </div> */}

                                            <div className='flex flex-col flex-wrap'>

                                                <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                                <div className='flex gap-2 items-center flex-wrap'>
                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                </div>

                                                <div className='flex items-center flex-wrap'>
                                                    <div className='flex items-center'>
                                                        <img src={locationIcon} className='w-8 h-8'></img>
                                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                                        <div className='flex gap-4 flex-wrap'>

                                            {/* <div className='w-14 h-14 object-contain'> */}
                                            <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                            {/* </div> */}

                                            <div className='flex flex-col flex-wrap'>

                                                <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                                <div className='flex gap-2 items-center flex-wrap'>
                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                </div>

                                                <div className='flex items-center flex-wrap'>
                                                    <div className='flex items-center'>
                                                        <img src={locationIcon} className='w-8 h-8'></img>
                                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                                        <div className='flex gap-4 flex-wrap'>

                                            {/* <div className='w-14 h-14 object-contain'> */}
                                            <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                            {/* </div> */}

                                            <div className='flex flex-col flex-wrap'>

                                                <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                                <div className='flex gap-2 items-center flex-wrap'>
                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                </div>

                                                <div className='flex items-center flex-wrap'>
                                                    <div className='flex items-center'>
                                                        <img src={locationIcon} className='w-8 h-8'></img>
                                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                                        <div className='flex gap-4 flex-wrap'>

                                            {/* <div className='w-14 h-14 object-contain'> */}
                                            <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                            {/* </div> */}

                                            <div className='flex flex-col flex-wrap'>

                                                <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                                <div className='flex gap-2 items-center flex-wrap'>
                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                </div>

                                                <div className='flex items-center flex-wrap'>
                                                    <div className='flex items-center'>
                                                        <img src={locationIcon} className='w-8 h-8'></img>
                                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                                        <div className='flex gap-4 flex-wrap'>

                                            {/* <div className='w-14 h-14 object-contain'> */}
                                            <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                            {/* </div> */}

                                            <div className='flex flex-col flex-wrap'>

                                                <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                                <div className='flex gap-2 items-center flex-wrap'>
                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                </div>

                                                <div className='flex items-center flex-wrap'>
                                                    <div className='flex items-center'>
                                                        <img src={locationIcon} className='w-8 h-8'></img>
                                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='w-full border border-solid border-gray-300 p-4 rounded-md flex flex-col gap-4 mt-6 '>
                                        <div className='flex gap-4 flex-wrap'>

                                            {/* <div className='w-14 h-14 object-contain'> */}
                                            <img src={SoftwareEngineer} className='w-10 h-10'></img>
                                            {/* </div> */}

                                            <div className='flex flex-col flex-wrap'>

                                                <p className='text-teal-500 font-plus-jakarta-sans text-lg font-semibold'>IT & Networking</p>
                                                <div className='flex gap-2 items-center flex-wrap'>
                                                    <p className='text-black font-plus-jakarta-sans text-xl font-bold'>Mermedia Ltd</p>
                                                    <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                </div>

                                                <div className='flex items-center flex-wrap'>
                                                    <div className='flex items-center'>
                                                        <img src={locationIcon} className='w-8 h-8'></img>
                                                        <p className='text-gray-600 font-plus-jakarta-sans text-lg font-normal'>52 Irving Pl, NY</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div >

            }


        </div >
    )
}

export default Content