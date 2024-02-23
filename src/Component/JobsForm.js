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
import SearchIcon from '@mui/icons-material/Search';
import Footer from './footer';
import Loader from './loader';
import './jobDescription.css'
import { useState } from 'react';
import Select from 'react-select'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ReactSlider from "react-slider";
import './JobForm.css'
import { Navigate, useLocation, useNavigate, useHi } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import Navbar2 from './navbar2';
import Navbar3 from './navbar3';
function JobForms() {

    let [jobTitle, setJobTitle] = useState('')

    let [filtersData, setFiltersData] = useState([])
    let [getAllJobs, setGetAllJobs] = useState([])
    let [showMessage, setShowMessage] = useState(false)
    let [showData, setShowData] = useState(true)
    const [value, setValue] = useState([0, 1000]);
    let [isLoading, setIsLoading] = useState(true)


    let navigate = useNavigate()
    const location = useLocation();

    let jobFormUrl = new URLSearchParams(location.search).get('job')
    let locationFromUrl = new URLSearchParams(location.search).get('location')
    const categoryFromUrl = new URLSearchParams(location.search).get('category');
    const jobTypeFromUrl = new URLSearchParams(location.search).get('jobType');

    let [listLocation, setListLocation] = useState("")
    let [category, setCategory] = useState("")
    let [jobTypes, setjobTypes] = useState("")
    let [careerLevel, setCareerLevel] = useState("")
    let [experience, setExperience] = useState("")

    let removeDuplicateLocation = getAllJobs ? [... new Set(getAllJobs.filter(data => data.location !== "").map(data => data.location))] : []
    let removeDuplicateCategory = getAllJobs ? [... new Set(getAllJobs.filter(data => data.category !== "").map(data => data.category))] : []
    let removeDuplicateJobTypes = getAllJobs ? [... new Set(getAllJobs.filter(data => data.jobType !== "").map(data => data.jobType))] : []
    let removeDuplicateCareerLevel = getAllJobs ? [... new Set(getAllJobs.filter(data => data.careerLevel !== "").map(data => data.careerLevel))] : []
    let removeDuplicateExperience = getAllJobs ? [... new Set(getAllJobs.filter(data => data.Experience !== "").map(data => data.Experience))] : []


    const listLocationOption = removeDuplicateLocation.map(data => ({
        value: data,
        label: data,
    }));


    const categoryOption = removeDuplicateCategory?.map(data => ({
        value: data,
        label: data,
    }));

    const jobTypesOption = removeDuplicateJobTypes?.map(data => ({
        value: data,
        label: data,
    }));

    const careerLevelOption = removeDuplicateCareerLevel?.map(data => ({
        value: data,
        label: data,
    }));

    const experienceOption = removeDuplicateExperience?.map(data => ({
        value: data,
        label: data,
    }));


    async function GetFilterData() {
        try {
            const getFilterData = await fetch(`http://localhost:4500/job/filter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        jobTitle: jobFormUrl?.toLocaleLowerCase(),
                        listLocation: locationFromUrl,
                        category: categoryFromUrl ? categoryFromUrl : '',
                        jobTypes: jobTypes,
                        minSalaray: value[0],
                        maxSalaray: value[1],
                        // industry: industry,
                        careerLevel, careerLevel,
                        experience: experience,
                    }

                )
            })

            if (!getFilterData) {
                throw new Error("Server Can't response");
            }

            const FilterData = await getFilterData.json()
            setFiltersData(FilterData.FindData)
            setIsLoading(false)


            if (FilterData.message) {
                setShowData(false)
                setShowMessage(true)
            }

        } catch (err) {
            console.log(err)
            console.log(`An error occurred while fetching data.`)
        }


    }

    async function GetAllJobs() {
        try {
            const GetAllJobs = await fetch(`http://localhost:4500/getAllData`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (!GetAllJobs) {
                throw new Error("Server Can't response");
            }
            const jobsData = await GetAllJobs.json()
            setGetAllJobs(jobsData.allJobs)
            setIsLoading(false)


        } catch (err) {
            console.log('An error occurred while fetching data.')
        }
    }

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
                // body: JSON.stringify({ jobId:jobId})
            })

            const response = await postData.json()

            if (response.message === "Successful log in") {
                setUserExists(true)
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
            // border: '1px',
            // This line disable the blue border
            boxShadow: 'green'
            // outline:'none'
        }),

        indicatorSeparator: () => ({ display: "none" }),

    };

    function onChangeJobTitle(e) {
        setJobTitle(e.target.value)
        navigate({ search: `?job=${encodeURIComponent(e.target.value)}${locationFromUrl ? `&location=${locationFromUrl}` : ''}${categoryFromUrl ? `&category=${categoryFromUrl}` : ''}` })

    }

    const handlelistLocation = (selectedOption, { action }) => {
        if (action === "clear") {
            setListLocation("")
            const locationParams = new URLSearchParams(location.search);
            locationParams.delete('location')
            const queryString = locationParams.toString();
            const newUrl = queryString ? `?${queryString}` : ``;
            navigate(newUrl);
        }
        else {
            setListLocation(selectedOption.value);
            navigate({ search: `${jobFormUrl ? `?job=${jobFormUrl}` : ``}${jobFormUrl ? `&location=${selectedOption.value}` : `?location=${selectedOption.value}`}${categoryFromUrl ? `&category=${categoryFromUrl}` : ``} ` })
        }

    }

    const handleCategory = (selectedOption, { action }) => {
        if (action === "clear") {
            setCategory("");
            const locationParams = new URLSearchParams(location.search);
            locationParams.delete('category')
            const queryString = locationParams.toString();
            const newUrl = queryString ? `?${queryString}` : ``;
            navigate(newUrl);
        }

        else {
            setCategory(selectedOption.value);
            navigate({ search: `${jobFormUrl ? `?job=${jobFormUrl}` : ``}${locationFromUrl ? `&location=${locationFromUrl}` : ``}${jobFormUrl || locationFromUrl ? `&category=${selectedOption.value}` : `?category=${selectedOption.value}`} ` })

        }
    }


    const handlejobTypes = (selectedOption, { action }) => {

        if (action === "clear") {
            setjobTypes("");
        }

        else {
            setjobTypes(selectedOption.value);
            // navigate({ search: `${jobFormUrl ? `?job=${jobFormUrl}` : ``}${locationFromUrl ? `&location=${locationFromUrl}` : ``}${jobFormUrl || locationFromUrl || categoryFromUrl ? `&category=${categoryFromUrl}` : `?category=${categoryFromUrl}`}${jobFormUrl || locationFromUrl || categoryFromUrl ? `&jobType=${selectedOption.value}`:`?jobType=${selectedOption.value}`} ` })
            navigate({ search: `${jobFormUrl ? `?job=${jobFormUrl}` : ``}${locationFromUrl ? `&location=${locationFromUrl}` : ``}${categoryFromUrl ? `&category=${categoryFromUrl}` : ``}${jobFormUrl || locationFromUrl || categoryFromUrl ? `&jobType=${selectedOption.value}`:`?jobType=${selectedOption.value}`} ` })
           

        }
    }


    const handleCareerLevel = (selectedOption, { action }) => {
        if (action === "clear") {
            setCareerLevel("");
        }
        else {
            setCareerLevel(selectedOption.value);
        }
    }

    const handleExperience = (selectedOption, { action }) => {
        if (action === "clear") {
            setExperience("");
        }
        else {
            setExperience(selectedOption.value);
        }
    }

    useEffect(() => {
        GetFilterData()
    }, [location.search, jobTitle, listLocation, careerLevel, experience, category, jobTypes, value[0], value[1]])

    useEffect(() => {
        GetAllJobs()
        ShowEmployerNavbar()
        ShowUserNavbar()
    }, [])

    const title = "Salary"

    const capitalizeFirstLetterInSentence = (sentence) => {
        let jobtitle = sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return jobtitle
    };




    function handleJobSearch(employerID, jobID) {

        if (location.pathname.includes('candidate')) {
            navigate(`/candidate/job/${employerID}/${jobID}`)
        }
        else if (location.pathname.includes('employer')) {
            navigate(`/employeer/job/${employerID}/${jobID}`)
        }
        else {
            navigate(`/job/${employerID}/${jobID}`)

        }
    }
    return (
        <div>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='overflow-hidden bg-white'>

                        <div className='flex gap-10 py-10  px-16'>
                            {/* <div className=''> */}
                            <div className='w-96 rounded h-[1000px] bg-[#e3e0e0]  px-5 py-6 flex flex-col gap-2'>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col '>
                                        <p className='font-semibold text-lg'>Job Title</p>
                                        <div className='relative w-full h-16 border-b-2 border-gray-300 flex flex-row items-center gap-2 
                                md:border-none'>
                                            <SearchIcon className='absolute left-2' />
                                            <input placeholder='Job title, keywords or Company' className='h-12 px-9 rounded-md border-[1px] border-gray-200 w-full outline-[#14A077] outline-[1px] '
                                                onChange={onChangeJobTitle}
                                                value={jobFormUrl ? jobFormUrl : ""}

                                            // onChange={(e) => setTextFieldValue(e.target.value)}
                                            // value={textFieldValue} 

                                            ></input>
                                        </div>
                                    </div>

                                    <div className='flex flex-col '>
                                        <p className='font-semibold text-lg'>List Location</p>
                                        <div className='relative w-full h-16 border-b-2  border-gray-300 flex flex-row items-center gap-2 
                                md:border-none'>
                                            <div className='w-full'>
                                                <Select
                                                    onChange={handlelistLocation}
                                                    value={listLocationOption.find(option => option.value === locationFromUrl)}


                                                    // onChange={(e) => setSelectValue1(e.target.value)}
                                                    // value={listLocationOption.find(option => option.value === selectValue1)}

                                                    options={listLocationOption}
                                                    styles={customStyles}
                                                    isClearable
                                                    placeholder='All Location'
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: 'transparent',
                                                            primary: 'green',
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col '>
                                        <p className='font-semibold text-lg'>Categories</p>
                                        <div className='relative w-full h-16 border-b-2  border-gray-300 flex flex-row items-center gap-2 
                                md:border-none'>

                                            <div className='w-full'>
                                                <Select
                                                    onChange={handleCategory}
                                                    value={categoryOption.find(option => option.value === categoryFromUrl)}

                                                    // onChange={(e) => setSelectValue2(e.target.value)}
                                                    // value={selectValue2}

                                                    options={categoryOption}
                                                    styles={customStyles}
                                                    isClearable
                                                    defaultValue={categoryFromUrl}
                                                    placeholder='All Category'
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: 'transparent',
                                                            primary: 'green',
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col '>
                                        <p className='font-semibold text-lg'>Job Types</p>
                                        <div className='relative w-full h-16 border-b-2  border-gray-300 flex flex-row items-center gap-2 
                                md:border-none'>
                                            <div className='w-full'>
                                                <Select
                                                    onChange={handlejobTypes}

                                                    // onChange={(e) => setSelectValue3(e.target.value)}
                                                    // value={selectValue3}

                                                    options={jobTypesOption}
                                                    isClearable
                                                    styles={customStyles}
                                                    placeholder='All Category'
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: 'transparent',
                                                            primary: 'green',
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="z-0 group-form">
                                        <div className="group-range-title">
                                            <label>
                                                {title}
                                                <span>{value[0]}$ &nbsp;-</span>
                                                <span>{value[1]}$</span>
                                            </label>
                                        </div>
                                        <ReactSlider
                                            ariaLabelledby="slider-label"
                                            className="horizontal-slider st2"
                                            min={0}
                                            max={1000}
                                            defaultValue={[0, 1000]}
                                            thumbClassName="example-thumb"
                                            trackClassName="example-track"
                                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                            onChange={(value) => setValue(value)}
                                        />
                                    </div>

                                    {/* <div className='flex flex-col '>
                        <p className='font-semibold text-lg'>Industry</p>
                        <div className='relative w-full h-16 border-b-2  border-gray-300 flex flex-row items-center gap-2 
                                md:border-none'>
                            <div className='w-full'>
                                <Select
                                    onChange={handleIndustry}
                                    options={industryOption}
                                    isClearable
                                    styles={customStyles}
                                    placeholder='Industry'
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'transparent',
                                            primary: 'green',
                                        },
                                    })}
                                />
                            </div>
                        </div>
                    </div> */}

                                    <div className='flex flex-col '>
                                        <p className='font-semibold text-lg'>Career Level</p>
                                        <div className='relative w-full h-16 border-b-2  border-gray-300 flex flex-row items-center gap-2 
                             md:border-none'>

                                            <div className='w-full'>
                                                <Select
                                                    onChange={handleCareerLevel}
                                                    options={careerLevelOption}
                                                    isClearable
                                                    styles={customStyles}
                                                    placeholder='Career Level'
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: 'transparent',
                                                            primary: 'green',
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col '>
                                        <p className='font-semibold text-lg'>Experience</p>
                                        <div className='relative w-full h-16 border-b-2  border-gray-300 flex flex-row items-center gap-2 
                                md:border-none'>

                                            <div className='z-2  w-full'>
                                                <Select
                                                    onChange={handleExperience}
                                                    options={experienceOption}
                                                    styles={customStyles}
                                                    isClearable
                                                    placeholder='All Category'
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: 'transparent',
                                                            primary: 'green',
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {
                                filtersData?.length > 0 ?
                                    <div className=' h-full gap-6 grid grid-cols-2'>

                                        {filtersData?.map((data) => {
                                            let getJobTitleCamelCase = capitalizeFirstLetterInSentence(data.jobTitle)
                                            return (
                                                <div key={data.jobID} onClick={() => handleJobSearch(data.employerID, data.jobID)}>
                                                    <div className='w-96 rounded-md border border-solid hover:shadow-xl hover:border-[#61CE70] border-gray-300 p-4 flex flex-col gap-4'>
                                                        <div className='flex gap-4
                                            md:justify-between'>

                                                            <div className='flex gap-4 ' >
                                                                <div className='w-14 h-14 rounded-full object-contain'>
                                                                    <img className='w-full h-full rounded-full ' src={data.companyLogo}></img>
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                    <p className='text-[#14A077] font-plus-jakarta-sans text-sm font-semibold'>{getJobTitleCamelCase}</p>
                                                                    <div className='flex gap-2 items-center'>
                                                                        <p className='text-black font-plus-jakarta-sans text-xl font-bold'>{data.category}</p>
                                                                        <div className='w-4 h-4 rounded-full bg-[#504CFE]'></div>
                                                                    </div>

                                                                    <div className='w-full flex items-center gap-2 flex-wrap -300 '>
                                                                        <div className='flex items-center'>

                                                                            <LocationOnOutlinedIcon className='text-gray-500 transform scale-90' />
                                                                            <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.location}</p>
                                                                        </div>

                                                                        <div className='flex gap-2 items-center justify-center'>
                                                                            <CalendarTodayIcon className='text-gray-600 transform scale-75' />
                                                                            <p className='text-gray-600 font-plus-jakarta-sans text-sm font-normal'>{data.date}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                        {
                                                            data.type ?
                                                                <div>
                                                                    <button className='flex items-center justify-start py-2 px-6 rounded-3xl bg-[#F1F1F1]'>
                                                                        {data.type}
                                                                    </button>
                                                                </div>
                                                                : ""
                                                        }

                                                        <div className='flex items-center justify-between border-t-2 border-gray-200 py-4'>
                                                            <div className='flex gap-3 items-center'>
                                                                <img src={DollarIcon} className='w-6 h-6'></img>
                                                                <p className='text-black font-plus-jakarta-sans text-lg font-semibold'>${data.minSalary} - ${data.maxSalary}<span className='text-[#64666C]'>/ month</span></p>
                                                            </div>
                                                            <p className='text-[#64666C]'>{data.date}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                    : <div ><h1>No Job Found</h1></div>
                            }

                        </div>

                    </div>
            }
        </div>


    )
}

export default JobForms