import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select'
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import InfoIcon from '@mui/icons-material/Info';
import data from '../src/Assets/data/data'


function EmployeerSubmitJob() {

    const [jobTitle, setJobTitle] = useState('')
    const [category, setCategory] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    // const [jobType, setJobType] = useState('')
    const [minSalary, setMinSalary] = useState('')
    const [maxSalary, setMaxSalary] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [applicationDeadlineDate, setApplicationDeadlineDate] = useState('')
    const [externalURLforApplyJob, setExternalURLforApplyJob] = useState('')
    const [jobApplyEmail, setJobApplyEmail] = useState('')
    // const [industry, setIndustry] = useState('')
    const [careerLevel, setCareerLevel] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [rate, setRate] = useState('')
    let [Experience, setExperience] = useState("")
    let [length, setLength] = useState("")
    let [expectedHour, setExpectedHour] = useState("")
    let [fixedAt, setFixedAt] = useState("")
    let [rangeFrom, setRangeFrom] = useState("")
    let [rangeTo, setRangeTo] = useState("")
    let [maxNotMoreThan, setMaxNotMoreThan] = useState("")
    let [minNotLessThan, setMinNotLessThan] = useState("")
    let [zipCode, setZipCode] = useState("")
    let [type, setType] = useState("")

    let [periods, setPeriods] = useState("")
    let [JobApplyType, setJobApplyType] = useState("")
    let [SalaryType, setSalaryType] = useState("")

    // Messages

    let [JobTitleMessage, setJobTitleMessage] = useState('')
    let [JobDescMessage, setJobDescMessage] = useState('')
    let [categoryMessage, setCategoryMessage] = useState('')
    let [appDeadLineMessage, setAppDeadLineMessage] = useState('')
    let [phoneNumberMessage, setPhoneNumberMessage] = useState('')
    let [minSalaryMessage, setMinSalaryMessage] = useState('')
    let [maxSalaryMessage, setMaxSalaryMessage] = useState('')
    let [rateMessage, setRateMessage] = useState('')
    let [ExperienceMessage, setExperienceMessage] = useState('')
    // let [industryMessage, setIndustryMessage] = useState('')
    let [careerLevelMessage, setCareerLevelMessage] = useState('')
    let [TypeMessage, setTypeMessage] = useState('')
    let [lengthMessage, setLengthMessage] = useState('')
    let [periodsMessage, setPeriodsMessage] = useState('')
    let [expectedHourMessage, setExpectedHourMessage] = useState('')
    let [fixedAtMessage, setfixedAtMessage] = useState('')
    let [rangeFromMessage, setRangeFromMessage] = useState("")
    let [rangeToMessage, setRangeToMessage] = useState("")
    let [maxNotMoreThanMessage, setMaxNotMoreThanMessage] = useState("")
    let [minNotLessThanMessage, setMinNotLessThanMessage] = useState("")
    let [cityMessage, setCityMessage] = useState("")
    let [countryMessage, setCountryMessage] = useState("")
    let [addressMessage, setAddressMessage] = useState("")
    let [zipCodeMessages, setZipCodeMessages] = useState("")


    // Validators

    let [JobTitleValidator, setJobTitleValidator] = useState(false)
    let [JobDescValidator, setJobDescValidator] = useState(false)
    let [appDeadLineValidator, setAppDeadLineValidator] = useState(false)
    let [phoneNumberValidator, setPhoneNumberValidator] = useState(false)
    let [minSalaryValidator, setMinSalaryValidator] = useState(false)
    let [maxSalaryValidator, setMaxSalaryValidator] = useState(false)
    let [addressValidator, setAddressValidator] = useState(false)

    let [categoryValidator, setCategoryValidator] = useState(false)
    // let [industryValidator, setIndustryValidator] = useState(false)
    let [careerLevelValidator, setCareerLevelValidator] = useState(false)
    let [TypeValidator, setTypeValidator] = useState(false)
    let [lengthValidator, setLengthValidator] = useState(false)

    let [expectedHourValidator, setExpectedHourValidator] = useState(false)

    let [fixedAtValidator, setFixedAtValidator] = useState(false)
    let [fixedAtTypeValidator, setFixedAtTypeValidator] = useState(false)

    let [rangeFromValidator, setRangeFromValidator] = useState(false)
    let [rangeToValidator, setRangeToValidator] = useState(false)
    let [rangeFromTypeValidator, setRangeFromTypeValidator] = useState(false)
    let [rangeToTypeValidator, setRangeToTypeValidator] = useState(false)
    let [maxNotMoreThanValidator, setMaxNotMoreThanValidator] = useState(false)
    let [maxNotMoreThanTypeValidator, setMaxNotMoreThanTypeValidator] = useState(false)

    let [minNotLessThanValidator, setMinNotLessThanValidator] = useState(false)
    let [minNotLessThanTypeValidator, setMinNotLessThanTypeValidator] = useState(false)

    let [zipCodeValidator, setZipCodeValidator] = useState(false)
    let [zipCodeTypeValidator, setZipCodeTypeValidator] = useState(false)

    let [ExperienceValidator, setExperienceValidator] = useState(false)
    let [cityValidator, setCityValidator] = useState(false)
    let [countryValidator, setCountryValidator] = useState(false)
    let [rateValidator, setRateValidator] = useState(false)

    const [showError, setShowError] = useState(false);


    const date = new Date(applicationDeadlineDate);
    // if(applicationDeadlineDate){
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    // }

    const [companyLogo, setCompanyLogo] = useState(null);


    // -------------ON CHANGE FUNCTIONS--------------------

    const handleCompanyLogoChange = (event) => {
        setCompanyLogo(event.target.files[0]);
    };

    function handleChangeJobTitle(e) {
        setJobTitle(e.target.value)
    }

    const handleChangeCategory = (selectedOption, { action }) => {
        if (action === "clear") {
            setCategory('');
        }
        else {
            if (selectedOption.value) {
                setCategoryMessage('')
                setCategoryValidator(false)
            }
            setCategory(selectedOption.value);
        }
    }

    const handleDateChange = date => {
        if (date) {
            setAppDeadLineMessage('')
            setAppDeadLineValidator(false)
        }
        setApplicationDeadlineDate(date);
    };

    function handleChangePhoneNumber(e) {
        setPhoneNumber(e.target.value)
    }

    function handleChangeMinSalary(e) {
        setMinSalary(e.target.value)
    }

    function handleChangeMaxSalary(e) {
        setMaxSalary(e.target.value)
    }

    const handleChangeCareerLevel = (selectedOption, { action }) => {
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

    const handleChangeType = (selectedOption, { action }) => {
        if (action === "clear") {
            setType("");
        }
        else {
            setType(selectedOption.value);
            if (selectedOption.value !== "cancel") {
                setLength('')
                setPeriods('')
            }

        }
    }

    const handleChangePeriods = (selectedOption, { action }) => {
        if (action === "clear") {
            setPeriods("");
        }
        else {
            setPeriods(selectedOption.value);

        }
    }

    const handleExpectedHour = (selectedOption, { action }) => {
        if (action === "clear") {
            setExpectedHour("");
            setFixedAt('')
            setRangeFrom('')
            setRangeTo('')
            setMaxNotMoreThan('')
            setMinNotLessThan('')
        }
        else {
            setExpectedHour(selectedOption.value);
            if (selectedOption.value !== "cancel") {
                setFixedAt('');
                setRangeFrom('')
                setRangeTo('')
                setMaxNotMoreThan('')
                setMinNotLessThan('')
            }

        }
    }

    const handleChangeCity = (selectedOption, { action }) => {
        if (action === "clear") {
            setCity("");
        }
        else {
            setCity(selectedOption.value);

        }
    }

    const handleChangeCountry = (selectedOption, { action }) => {
        if (action === "clear") {
            setCountry("");
        }
        else {
            setCountry(selectedOption.value);

        }
    }

    const handleRate = (selectedOption, { action }) => {

        if (action === "clear") {
            setRate("");
        }
        else {
            setRate(selectedOption.value);

        }
    }


    // ---------------------END---------------------


    // -------------------SELECT OPTION-------------

    const categoryOption = [
        { value: "Administrative and Clerical", label: "Administrative and Clerical" },
        { value: "Information Technology", label: "Information Technology" },
        { value: "Healthcare", label: "Healthcare" },
        { value: "Education", label: "Education" },
        { value: "Finance", label: "Finance" },
        { value: "Sales and Marketing", label: "Sales and Marketing" },
        { value: "Finance", label: "Finance" },

        { value: "Customer Service", label: "Customer Service" },
        { value: "Manufacturing and Production", label: "Manufacturing and Production" },
        { value: "Retail", label: "Retail" },
        { value: "Construction and Maintenance", label: "Construction and Maintenance" },
        { value: "Transportation and Logistics", label: "Transportation and Logistics" },
        { value: "Science and Research", label: "Science and Research" },
        { value: "Engineering", label: "Engineering" },
        { value: "Human Resources", label: "Human Resources" },
        { value: "Legal", label: "Legal" },

        { value: "Media and Communication", label: "Media and Communication" },
        { value: "Arts and Entertainment", label: "Arts and Entertainment" },
        { value: "Government and Public Service", label: "Government and Public Service" },
        { value: "Nonprofit and Social Services:", label: "Nonprofit and Social Services:" },
        { value: "Consulting", label: "Consulting" },

    ]

    const rateOption = [
        { value: "per hour", label: "per hour" },
        { value: "per month", label: "per month" },
        { value: "per year", label: "per year" },
        { value: "per day", label: "per day" }
    ]

    const CareerLevelOption = [
        { value: "Entry Level", label: "Entry Level" },
        { value: "Mid Level", label: "Mid Level" },
        { value: "Senior Level", label: "Senior Level" },
        { value: "Expert Level", label: "Expert Level" },

    ]

    const ExperienceOption = [
        { value: "1-2 Year", label: "1-2 Year" },
        { value: "2-5 Year", label: "2-5 Year" },
        { value: "5-10 Year", label: "5-10 Year" },
        { value: "10+ Year", label: "10+ Year" },
    ]

    const jobtypeOption = [
        { value: "Freelance", label: "Freelance" },
        { value: "Fresher", label: "Fresher" },

        { value: "Onsite", label: "Onsite" },
        { value: "Part Time", label: "Part Time" },

        { value: "Temporary", label: "Temporary" },
        { value: "Internship", label: "Internship" },
        { value: "Contract", label: "Contract" },

    ]

    const PeriodsOption = [
        { value: "Month", label: "Month" },
        { value: "Day", label: "Day" },
        { value: "Week", label: "Week" },
    ]

    const partTimeOption = [
        { value: "Fixed Hour", label: "Fixed Hour" },
        { value: "Range", label: "Range" },
        { value: "Maximum", label: "Maximum" },
        { value: "Minimum", label: "Minimum" },

    ]

    let countryOption = [
        { value: "Turkey", label: "Turkey" },
        { value: "Pakistan", label: "Pakistan" },
        { value: "Bangladesh", label: "Bangladesh" },
        { value: "Saudi Arabia", label: "Saudi Arabia" },
        { value: "Malaysia", label: "Malaysia" },
        { value: "Egypt", label: "Egypt" },
        { value: "Indonesia", label: "Indonesia" },
        { value: "Morocco", label: "Morocco" },
    ]

    const cityOption = data[country]?.map(city => ({
        value: city,
        label: city,
    }));

    const customStyles = {

        option: (provided, state) => ({
            ...provided,
            color: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'transparent',
                color: 'green',
            },
        }),

        control: (provided, state) => ({
            ...provided,
            minHeight: '45px',
        }),
        indicatorSeparator: () => ({ display: "none" }),

    };

    // ---------------------END---------------------

    const isValid = (
        !jobTitle || !jobDescription || !category ||
        // !applicationDeadlineDate || phoneNumberValidator ||
        // !minSalary || !maxSalary || minSalaryValidator || maxSalaryValidator || !rate || 
        // !Experience  || !industry || !careerLevel ||
        // !type || !city || !country || !address || !zipCode || zipCodeTypeValidator ||

        (type === 'Contract' || type === 'Internship'
            || type === 'Temporary' ? !length || lengthValidator || !periods : "")
        ||

        (type === 'Part Time'
            ? !expectedHour : "") ||

        (expectedHour === 'Fixed Hour'
            ? !fixedAt || fixedAtTypeValidator : "") ||

        (expectedHour === 'Range'
            ? !rangeFrom || rangeFromTypeValidator || !rangeTo || rangeToTypeValidator : "") ||

        (expectedHour === 'Maximum'
            ? !maxNotMoreThan || maxNotMoreThanTypeValidator : "") ||

        (expectedHour === 'Minimum' ?
            !minNotLessThan || minNotLessThanTypeValidator : "")

    )

    async function EmployerPostData() {
        if (isValid) {
            setShowError(isValid);
        } else {
            setShowError(false)
        }

        setJobTitleMessage('')
        setJobTitleValidator(false)

        setJobDescMessage('')
        setJobDescValidator(false)

        setCategoryMessage('')
        setCategoryValidator(false)

        setAppDeadLineMessage('')
        setAppDeadLineValidator(false)

        setPhoneNumberMessage('')
        setPhoneNumberValidator(false)

        setMinSalaryMessage('')
        setMinSalaryValidator(false)


        setMaxSalaryMessage('')
        setMaxSalaryValidator(false)

        setRateMessage('')
        setRateValidator(false)

        setExperienceMessage('')
        setExperienceValidator(false)

        setCareerLevelMessage('')
        setCareerLevelValidator(false)

        setTypeMessage('')
        setTypeValidator(false)

        setLengthMessage('')
        setPeriodsMessage('')

        setExpectedHourMessage('')
        setExpectedHourValidator(false)

        setfixedAtMessage('')
        setFixedAtValidator(false)
        setFixedAtTypeValidator(false)

        setRangeFromMessage('')
        setRangeFromValidator(false)
        setRangeFromTypeValidator(false)

        setRangeToMessage('')
        setRangeToValidator(false)
        setRangeToTypeValidator(false)

        setMaxNotMoreThanMessage('')
        setMaxNotMoreThanValidator(false)
        setMaxNotMoreThanTypeValidator(false)

        setMinNotLessThanMessage('')
        setMinNotLessThanValidator(false)
        setMinNotLessThanTypeValidator(false)

        setCityMessage('')
        setCityValidator(false)

        setCountryMessage('')
        setCountryValidator(false)

        setAddressMessage('')
        setAddressValidator(false)

        setLengthValidator(false)

        setZipCodeMessages('')
        setZipCodeValidator(false)
        setZipCodeTypeValidator(false)
        const numberRegex = /^\d+$/;



        if (!jobTitle) {
            setJobTitleMessage('Please Enter Job title')
            setJobTitleValidator(true)
        }

        if (!jobDescription) {
            setJobDescMessage('Please Enter Job description')
            setJobDescValidator(true)
        }

        if (!category) {
            setCategoryMessage('Please Enter Category')
            setCategoryValidator(true)
        }

        // if (!applicationDeadlineDate) {
        //     setAppDeadLineMessage('Please Enter Date')
        //     setAppDeadLineValidator(true)
        // }

        // if (!phoneNumber) {
        //     setPhoneNumberMessage('Please Enter Phone Number')
        //     setPhoneNumberValidator(true)
        // }

        if (phoneNumber) {
            if (!phoneNumber.startsWith('03')) {
                setPhoneNumberMessage('Phone Number start from: "03" ')
                setPhoneNumberValidator(true)
            }
            if (phoneNumber.length !== 11) {
                setPhoneNumberMessage('Phone Number length should be 11 ')
                setPhoneNumberValidator(true)
            }
            const numberRegex = /^\d+$/;
            if (!numberRegex.test(phoneNumber)) {
                setPhoneNumberValidator(true)
                setPhoneNumberMessage("Phone Number must be a number ")
                // setType(true)
            }
        }

        // if (!minSalary) {
        //     setMinSalaryMessage('Please Enter Minimum Salary')
        //     setMinSalaryValidator(true)
        // }


        if (minSalary) {
            if (!numberRegex.test(minSalary)) {
                setMinSalaryValidator(true)
                setMinSalaryMessage("Minimum Salary must be in the format of Number")
                // setType(true)
            }
        }

        // if (!maxSalary) {
        //     setMaxSalaryMessage('Please Enter Maximum Salary')
        //     setMaxSalaryValidator(true)
        // }

        if (maxSalary) {
            if (!numberRegex.test(maxSalary)) {
                setMaxSalaryValidator(true)
                setMaxSalaryMessage("Maximum Salary must be in the format of Number")
                // setType(true)
            }
        }

        // if (!rate) {
        //     setRateMessage('Please Select rate')
        //     setRateValidator(true)
        // }

        // if (!Experience) {
        //     setExperienceMessage('Please Select Experience')
        //     setExperienceValidator(true)
        // }


        // if (!industry) {
        //     setIndustryMessage('Please Select industry')
        //     setIndustryValidator(true)
        // }

        // if (!careerLevel) {
        //     setCareerLevelMessage('Please Select career level')
        //     setCareerLevelValidator(true)
        // }

        // if (!type) {
        //     setTypeMessage('Please Select type')
        //     setTypeValidator(true)
        // }

        if (type === 'Contract' || type === 'Internship'
            || type === 'Temporary') {

            const regex = /^(\d+|\d+\s*-\s*\d+)$/;
            if (!regex.test(length)) {
                setLengthValidator(true)
                setLengthMessage("Contract length must be in the format '1' or '1 - 2'")
                // setType(true)
            }

            if (!periods) {
                setPeriodsMessage('Please Select periods')
            }
        }

        if (type === 'Part Time') {

            if (!expectedHour) {
                setExpectedHourMessage('Please Select Expected Hour')
                setExpectedHourValidator(true)
            }

            const contractLengthRegex = /^\d+$/;
            if (expectedHour === 'Fixed Hour') {
                if (!fixedAt) {
                    setfixedAtMessage('Please Select Fixed Hour')
                    setFixedAtValidator(true)
                }

                if (fixedAt) {
                    if (!contractLengthRegex.test(fixedAt)) {
                        setFixedAtTypeValidator(true)
                        setfixedAtMessage("Fixed Hour must be in the format of number like: '1' ")
                    }
                }

            }
            const rangeFromLengthRegex = /^\d+$/;
            if (expectedHour === 'Range') {
                if (!rangeFrom) {
                    setRangeFromMessage('Please Select Start Range')
                    setRangeFromValidator(true)
                }


                if (rangeFrom) {
                    if (!rangeFromLengthRegex.test(rangeFrom)) {
                        setRangeFromTypeValidator(true)
                        setRangeFromMessage("Fixed Hour must be in the format of number like: '1' ")
                    }
                }

                if (!rangeTo) {
                    setRangeToMessage('Please Select End Range')
                    setRangeToValidator(true)
                }
                if (rangeTo) {
                    if (!rangeFromLengthRegex.test(rangeTo)) {
                        setRangeToTypeValidator(true)
                        setRangeToMessage("Fixed Hour must be in the format of number like: '1' ")
                    }
                }

            }

            if (expectedHour === 'Maximum') {
                if (!maxNotMoreThan) {
                    setMaxNotMoreThanMessage('Please Select Maximum Hour')
                    setMaxNotMoreThanValidator(true)
                }
                if (maxNotMoreThan) {
                    if (!rangeFromLengthRegex.test(maxNotMoreThan)) {
                        setMaxNotMoreThanTypeValidator(true)
                        setMaxNotMoreThanMessage("Fixed Hour must be in the format of number like: '1' ")
                    }
                }

            }

            if (expectedHour === 'Minimum') {
                if (!minNotLessThan) {
                    setMinNotLessThanMessage('Please Select Minimum Hour')
                    setMinNotLessThanValidator(true)
                }
                if (minNotLessThan) {
                    if (!rangeFromLengthRegex.test(minNotLessThan)) {
                        setMinNotLessThanTypeValidator(true)
                        setMinNotLessThanMessage("Fixed Hour must be in the format of number like: '1' ")
                    }
                }
            }

        }

        // if (!city) {
        //     setCityMessage('Please Select City')
        //     setCityValidator(true)
        // }

        // if (!country) {
        //     setCountryMessage('Please Select Country')
        //     setCountryValidator(true)
        // }

        // if (!address) {
        //     setAddressMessage('Please Enter Address')
        //     setAddressValidator(true)
        // }


        // if (!zipCode) {
        //     setZipCodeMessages('Please Enter zip code')
        //     setZipCodeValidator(true)
        // }

        if (zipCode) {
            const numberRegex = /^[0-9]+$/

            if (!numberRegex.test(zipCode)) {
                setZipCodeTypeValidator(true)
                setZipCodeValidator(true)
                setZipCodeMessages("Zip code must be a number")
                // setType(true)
            }
        }


        if (!isValid) {

            try {
                const formData = new FormData();

                formData.append('image', companyLogo);
                formData.append('employerID', employerID);
                formData.append('employerData', employeerData);

                formData.append('jobTitle', jobTitle.toLowerCase());
                formData.append('category', category);
                formData.append('location', country);
                formData.append('minSalary', minSalary);
                formData.append('maxSalary', maxSalary);
                formData.append('jobDescription', jobDescription);
                formData.append('jobType', type);
                formData.append('JobApplyType', JobApplyType);
                formData.append('SalaryType', SalaryType);
                formData.append('Experience', Experience);
                if (applicationDeadlineDate) {
                    formData.append('applicationDeadlineDate', formattedDate);
                }

                formData.append('externalURLforApplyJob', externalURLforApplyJob);
                formData.append('jobApplyEmail', jobApplyEmail);
                formData.append('phoneNumber', phoneNumber);

                // formData.append('industry', industry);
                formData.append('careerLevel', careerLevel);
                formData.append('city', city);
                formData.append('address', address);
                formData.append('zipCode', zipCode);


                console.log(formData)
                const employeerId = employeerData?.map(data => data.employeerId)

                const getFeaturedJob = await fetch('http://localhost:4500/employerAddJob', {
                    method: "POST",
                    body: formData

                })
                const response = await getFeaturedJob.json()
                if (response.message === 'Job Posted Successfully') {
                    toast.success("Job Posted Successfully!", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
            catch (err) {
                console.log(err)
                alert("Server Cannot Respond")
            }

        }

    }

    let [userData, setData] = useState([])
    let [employeerData, setEmployeerData] = useState([])
    let [employerID, setEmployerID] = useState('')

    useEffect(() => {
        async function getEmployerData() {
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
                console.log("This is from employeer Submit Job dashboard",response)
                if (response.message === "Successful log in") {
                    localStorage.setItem('alertShown', 'true');

                    response.employeerData.forEach((item) => {
                        setData(item)
                        setEmployerID(item.employerID)
                    })
                }

                else {
                    alert(response.message)
                }

            } catch (err) {
                console.log(err)
                console.log("Server Can't respond")
            }

        }
        getEmployerData()
    }, [])
    return (
        <div className='flex relative overflow-y-auto h-[88vh] flex-col gap-8 w-full  bg-[#eeeeee99] px-12 py-6'>

            <div className=' flex flex-col gap-4 w-full text-green-700 '>

                <div className='border-l-[5px] border-green-700 px-3 '>
                    <p className='text-black font-bold text-xl'>Post a new Job</p>

                </div>
            </div>

            <div className='bg-white'>

                <div className='flex flex-col border-gray-300 border-b-[1px] gap-5 px-8 py-8'>

                    <div className='flex flex-col gap-3'>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3 '>
                            <p className="font-semibold">Job Title*</p>
                            <input
                                value={jobTitle}
                                onChange={handleChangeJobTitle}
                                className={`w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5] ${JobTitleValidator && 'border-[1px] border-red-700'}`}
                                placeholder='Job Title'></input>

                            <p className='text-red-700'>{JobTitleMessage}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 pb-8'>
                        <div className='flex flex-col gap-3 '>
                            <p className="font-semibold">Job Description*</p>

                            <ReactQuill
                                className={`h-[40vh]  ${JobDescValidator && 'border-[1px] border-red-700'}`}
                                theme="snow"
                                value={jobDescription}
                                onChange={setJobDescription}
                            />
                        </div>

                    </div>
                    <p className='text-red-700'>{JobDescMessage}</p>
                </div>

                <div className='flex flex-col border-gray-300 border-b-[1px] gap-5 px-8 py-8'>

                    <div className='flex flex-col gap-6'>
                        <p className='font-semibold text-xl'>Information</p>
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">Category*</p>

                                <Select
                                    onChange={handleChangeCategory}
                                    value={category ? categoryOption.find((opt) => opt.value === category) : null}
                                    className={`${categoryValidator && 'rounded-md border-[1px] border-red-700'}  `}
                                    options={categoryOption}
                                    styles={customStyles}
                                    placeholder='Select Category'
                                    isClearable
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'transparent',
                                            primary: 'green',
                                        },
                                    })}
                                />
                                <p className='text-red-700'>{categoryMessage}</p>
                            </div>
                        </div>

                        {/* <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">Type</p>

                                <Select
                                    onChange={handleChangeType}
                                    className='border-none'
                                    options={jobtypeOption}
                                    styles={customStyles}
                                    isClearable
                                    placeholder='Select Type'
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'transparent',
                                            primary: 'green',
                                        },
                                    })}
                                />
                                <p className='text-red-700'>{TypeMessage}</p>
                                {
                                    type === "Intership" || type === "Contract" ||
                                        type === "Temporary"
                                        ?
                                        <div className='w-full  flex gap-3'>

                                            <div className='w-full flex flex-col gap-2'>
                                                <p className="font-semibold">
                                                    Length</p>
                                                <input className='w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='Length'
                                                    onChange={(e) => { setLength(e.target.value) }}
                                                ></input>
                                                <p className='text-red-700'>{lengthMessage}</p>
                                            </div>


                                            <div className='w-full flex flex-col gap-2'>
                                                <p className="font-semibold">
                                                    Periods</p>
                                                <Select
                                                    onChange={handleChangePeriods}
                                                    className='border-none'
                                                    options={PeriodsOption}
                                                    styles={customStyles}

                                                    isClearable
                                                    placeholder='Select Periods'
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: 'transparent',
                                                            primary: 'green',
                                                        },
                                                    })}
                                                />
                                                <p className='text-red-700'>{periodsMessage}</p>
                                            </div>
                                        </div>
                                        : ""
                                }

                                {
                                    type === 'Part Time' && (
                                        <div className='flex gap-2'>

                                            <div className='w-full flex flex-col gap-2'>
                                                <p className='font-semibold'>Expected hours</p>


                                                <div className='w-full  flex gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <p className='font-semibold'>Show by</p>
                                                        <Select
                                                            onChange={handleChangePartTime}
                                                            className='border-none'
                                                            options={partTimeOption}
                                                            styles={customStyles}

                                                            isClearable
                                                            placeholder='Select Hours'
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
                                                    {
                                                        partTime === 'Fixed Hour' && (
                                                            <div className=' flex gap-2'>
                                                                <div className='flex flex-col gap-2'>
                                                                    <p className='font-semibold'>Fixed at</p>
                                                                    <div className='flex gap-3'>
                                                                        <input className='w-full h-11 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='Length'
                                                                            onChange={(e) => { setLength(e.target.value) }}
                                                                        ></input>
                                                                        <p className='font-semibold'>Hour Per Week</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        partTime === 'Range' && (
                                                            <div className=' flex gap-2'>

                                                                <div className='flex flex-col gap-2'>
                                                                    <p className='font-semibold'>From</p>
                                                                    <input className='w-full h-11 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='Length'
                                                                        onChange={(e) => { setLength(e.target.value) }}
                                                                    ></input>

                                                                </div>

                                                                <div className='flex gap-3'>
                                                                    <div className='flex flex-col gap-2'>
                                                                        <p className='font-semibold'>to</p>
                                                                        <div className='flex gap-2'>
                                                                            <input className='w-full h-11 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='Length'
                                                                                onChange={(e) => { setLength(e.target.value) }}
                                                                            ></input>
                                                                            <p className='font-semibold'>Hour Per Week</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        )
                                                    }

                                                </div>

                                            </div>


                                        </div>
                                    )
                                }
                            </div>
                        </div> */}

                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">Application Deadline Date</p>
                                <DatePicker
                                    className={`cursor-pointer px-2 border-[1px] border-gray-300  text-black w-full h-11 rounded-md 
                                    ${appDeadLineValidator && 'border-[1px] border-red-700'}`}
                                    placeholderText="Select a date"
                                    selected={applicationDeadlineDate}
                                    onChange={handleDateChange}
                                    dateFormat="MM/dd/yyyy" // Specify the date format as needed
                                />
                                <p className='text-red-700'>{appDeadLineMessage}</p>
                            </div>
                        </div>

                        {/* <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">Job Apply Type</p>
                                <Select
                                    onChange={handleJobApplyType}
                                    className='border-none'
                                    options={JobApplyTypeOption}
                                    styles={customStyles}
                                    placeholder='Select Job Apply Type'
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
                        </div> */}

                        {/* <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">External URL for Apply Job</p>
                                <input className='w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='External URL for Apply Job'
                                    onChange={(e) => { setExternalURLforApplyJob(e.target.value) }}
                                ></input>
                            </div>
                        </div> */}

                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Job Apply Email</p>
                                <input className='w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='Job Apply Email'
                                    onChange={(e) => { setJobApplyEmail(e.target.value) }}
                                    value={jobApplyEmail}
                                ></input>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Phone Number</p>
                                <input
                                    value={phoneNumber}
                                    type='text'
                                    onChange={handleChangePhoneNumber}
                                    className={`input money w-full h-12 rounded px-3 outline-green-700 
                                    outline-[0.5px] bg-[#F5F5F5] 
                                    ${phoneNumberValidator && 'border-[1px] border-red-700'}`}

                                    placeholder='Phone Number'>
                                </input>
                                <p className='text-red-700'>{phoneNumberMessage}</p>
                            </div>
                        </div>

                        <div className='flex   gap-3'>

                            <div className='w-full flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Min. Salary</p>
                                <input
                                    value={minSalary}
                                    type='text'
                                    onChange={handleChangeMinSalary}
                                    className={`w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]
                                    ${minSalaryValidator && 'border-[1px] border-red-700'}`}

                                    placeholder='Min. Salary'>
                                </input>
                                <p className='text-red-700'>{minSalaryMessage}</p>
                            </div>
                            <div className='w-full flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Max. Salary
                                </p>
                                <input
                                    value={maxSalary}
                                    type='text'
                                    onChange={handleChangeMaxSalary}
                                    className={`w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]                  
                                    ${maxSalaryValidator && 'border-[1px] border-red-700'}`}
                                    placeholder=' Max. Salary'></input>
                                <p className='text-red-700'>{maxSalaryMessage}</p>
                            </div>

                            <div className='w-full flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Rate
                                </p>

                                <Select
                                    value={rate ? rateOption.find((opt) => opt.value === rate) : null}

                                    onChange={handleRate}
                                    className={`${rateValidator && 'rounded-md border-[1px] border-red-700'}  `}
                                    options={rateOption}
                                    styles={customStyles}
                                    isClearable
                                    placeholder='Select'
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'transparent',
                                            primary: 'green',
                                        },
                                    })}
                                />
                                <p className='text-red-700'>{rateMessage}</p>
                            </div>



                        </div>

                        {/* <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Max. Salary
                                </p>
                                <input
                                    type='number'
                                    onChange={(e) => { setMaxSalary(e.target.value) }}
                                    className='w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder=' Max. Salary'></input>
                            </div>
                        </div> */}


                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Career Level
                                </p>
                                <Select
                                    value={careerLevel ? CareerLevelOption.find((opt) => opt.value === careerLevel) : null}
                                    onChange={handleChangeCareerLevel}
                                    className={`${careerLevelValidator && 'rounded-md border-[1px] border-red-700'}  `}
                                    options={CareerLevelOption}
                                    styles={customStyles}
                                    placeholder='Select Career Level'
                                    isClearable
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'transparent',
                                            primary: 'green',
                                        },
                                    })}
                                />
                                <p className='text-red-700'>{careerLevelMessage}</p>
                            </div>
                        </div>


                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3 '>
                            <p className="font-semibold">
                                Experience
                            </p>
                            <Select
                                value={Experience ? ExperienceOption.find((opt) => opt.value === Experience) : null}
                                onChange={handleExperience}
                                className={`${ExperienceValidator && 'rounded-md border-[1px] border-red-700'}  `}
                                options={ExperienceOption}
                                styles={customStyles}
                                isClearable
                                placeholder='Select Experience'
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'transparent',
                                        primary: 'green',
                                    },
                                })}
                            />
                            <p className='text-red-700'>{ExperienceMessage}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3 '>
                            <p className="font-semibold">Type</p>

                            <Select
                                value={type ? jobtypeOption.find((opt) => opt.value === type) : null}

                                onChange={handleChangeType}
                                className={`${TypeValidator && 'rounded-md border-[1px] border-red-700'}  `}
                                options={jobtypeOption}
                                styles={customStyles}
                                isClearable
                                placeholder='Select Type'
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'transparent',
                                        primary: 'green',
                                    },
                                })}
                            />
                            <p className='text-red-700'>{TypeMessage}</p>
                            {
                                type === "Internship" || type === "Contract" ||
                                    type === "Temporary"
                                    ?
                                    <div className='w-full  flex gap-3'>

                                        <div className='w-full flex flex-col gap-2'>
                                            <p className="font-semibold">
                                                Length</p>
                                            <input className='w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='Length'
                                                onChange={(e) => { setLength(e.target.value) }}
                                            ></input>
                                            <p className='text-red-700'>{lengthMessage}</p>
                                        </div>


                                        <div className='w-full flex flex-col gap-2'>
                                            <p className="font-semibold">
                                                Periods</p>
                                            <Select
                                                onChange={handleChangePeriods}
                                                className='border-none'
                                                options={PeriodsOption}
                                                styles={customStyles}

                                                isClearable
                                                placeholder='Select Periods'
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'transparent',
                                                        primary: 'green',
                                                    },
                                                })}
                                            />
                                            <p className='text-red-700'>{periodsMessage}</p>
                                        </div>
                                    </div>
                                    : ""
                            }

                            {
                                type === 'Part Time' && (
                                    <div className='flex gap-2'>

                                        <div className=' flex flex-col gap-2'>
                                            <p className='font-semibold'>Expected hours</p>

                                            <div className='flex gap-2'>
                                                <div className=' flex flex-col gap-2'>
                                                    <p className='font-semibold'>Show by</p>
                                                    <Select
                                                        onChange={handleExpectedHour}
                                                        className={`${expectedHourValidator && 'rounded-md border-[1px] border-red-700'}  `}
                                                        options={partTimeOption}
                                                        styles={customStyles}

                                                        isClearable
                                                        placeholder='Select Hours'
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            colors: {
                                                                ...theme.colors,
                                                                primary25: 'transparent',
                                                                primary: 'green',
                                                            },
                                                        })}
                                                    />
                                                    <p className='text-red-700'>{expectedHourMessage}</p>
                                                </div>
                                                {
                                                    expectedHour === 'Fixed Hour' && (
                                                        <div className=' flex gap-2'>
                                                            <div className=' flex flex-col gap-2'>
                                                                <p className='font-semibold'>Fixed at</p>
                                                                <div className='flex gap-3'>
                                                                    <div className='w-44 flex flex-col gap-1'>
                                                                        <input className={` h-11 rounded px-3 outline-green-700 outline-[0.5px] 
                                                                    bg-[#F5F5F5] ${fixedAtValidator && ' border-[1px] border-red-700'}`}
                                                                            onChange={(e) => { setFixedAt(e.target.value) }}
                                                                        ></input>
                                                                        <p className='overflow-wrap-normal text-red-700'>{fixedAtMessage}</p>

                                                                    </div>

                                                                    <p className='font-semibold'>Hour Per Week</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                }

                                                {
                                                    expectedHour === 'Range' && (
                                                        <div className=' flex gap-2'>

                                                            <div className='w-48 flex flex-col gap-2'>
                                                                <p className='font-semibold'>From</p>
                                                                <input className={` h-11 rounded px-3 outline-green-700 outline-[0.5px]
                                                                 bg-[#F5F5F5] ${rangeFromValidator && ' border-[1px] border-red-700'}`}
                                                                    onChange={(e) => { setRangeFrom(e.target.value) }}
                                                                ></input>
                                                                <p className='text-red-700'>{rangeFromMessage}</p>

                                                            </div>

                                                            <div className='flex gap-3'>
                                                                <div className='flex flex-col gap-2'>
                                                                    <p className='font-semibold'>to</p>
                                                                    <div className=' flex gap-2'>
                                                                        <div className='w-48 flex flex-col gap-2'>
                                                                            <input className={`h-11 rounded px-3 outline-green-700 outline-[0.5px]
                                                                         bg-[#F5F5F5] ${rangeToValidator && ' border-[1px] border-red-700'}`}
                                                                                onChange={(e) => { setRangeTo(e.target.value) }}
                                                                            ></input>
                                                                            <p className=' text-red-700'>{rangeToMessage}</p>

                                                                        </div>

                                                                        <p className='mt-3 font-semibold'>Hour Per Week</p>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    )
                                                }

                                                {
                                                    expectedHour === 'Maximum' && (
                                                        <div className=' flex gap-4'>
                                                            <div className=' flex flex-col gap-2'>
                                                                <p className='font-semibold'>Not More Than</p>
                                                                <div className='flex gap-3'>
                                                                    <input className={`w-full h-11 rounded px-3 outline-green-700 outline-[0.5px]
                                                                     bg-[#F5F5F5] ${maxNotMoreThanValidator && 'border-[1px] border-red-700'}`}
                                                                        onChange={(e) => { setMaxNotMoreThan(e.target.value) }}
                                                                    ></input>
                                                                    <p className='font-semibold'>Hour Per Week</p>
                                                                </div>
                                                                <p className='text-red-700'>{maxNotMoreThanMessage}</p>
                                                            </div>

                                                        </div>
                                                    )
                                                }

                                                {
                                                    expectedHour === 'Minimum' && (
                                                        <div className=' flex gap-2'>
                                                            <div className=' flex flex-col gap-2'>
                                                                <p className='font-semibold'>Not Less Than</p>
                                                                <div className='flex gap-3'>
                                                                    <input className={`w-full h-11 rounded px-3 outline-green-700 outline-[0.5px]
                                                                     bg-[#F5F5F5] ${minNotLessThanValidator && 'rounded-md border-[1px] border-red-700'}`}
                                                                        onChange={(e) => { setMinNotLessThan(e.target.value) }}
                                                                    ></input>
                                                                    <p className='font-semibold'>Hour Per Week</p>
                                                                </div>
                                                                <p className='text-red-700'>{minNotLessThanMessage}</p>
                                                            </div>

                                                        </div>
                                                    )
                                                }

                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* <div className='flex flex-col border-gray-300 border-b-[1px] gap-12 px-8 py-8'>


                    <div className='flex flex-col gap-6'>
                        <p className='font-semibold text-xl'>Media</p>
                        <div className='flex flex-col gap-3 '>
                            <p className="font-semibold">Photos</p>
                            <button className='w-32 h-12 font-semibold before:text-black hover:bg-green-700 hover:text-white border-[1px] rounded border-green-700'>Browse</button>
                        </div>
                    </div>


                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3 '>
                            <p className="font-semibold">Introduction Video URL</p>
                            <input className='w-full h-12 rounded px-3 outline-green-700 outline-[0.5px] bg-[#F5F5F5]' placeholder='Introduction Video URL'></input>
                        </div>
                    </div>

                </div> */}

                <div className='flex flex-col border-gray-300 border-b-[1px] gap-5 px-8 py-8'>


                    <div className='flex flex-col gap-6'>
                        <p className='font-semibold text-xl'>Location</p>
                    </div>


                    <div className='flex flex-col gap-3 '>
                        <p className="font-semibold">Country</p>
                        <Select
                            value={country ? countryOption.find((opt) => opt.value === country) : null}
                            onChange={handleChangeCountry}
                            className={`${countryValidator && 'rounded-md border-[1px] border-red-700'}  `}
                            options={countryOption}
                            styles={customStyles}

                            isClearable
                            placeholder='Select Country'
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'transparent',
                                    primary: 'green',
                                },
                            })}
                        />
                        <p className='text-red-700'>{countryMessage}</p>


                    </div>

                    <div className='flex flex-col gap-3 '>
                        <p className="font-semibold">City</p>
                        <Select
                            value={city ? cityOption.find((opt) => opt.value === city) : null}

                            onChange={handleChangeCity}
                            className={`${cityValidator && 'rounded-md border-[1px] border-red-700'}  `}
                            options={cityOption}
                            styles={customStyles}

                            isClearable
                            placeholder='Select City'
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'transparent',
                                    primary: 'green',
                                },
                            })}
                            components={{
                                NoOptionsMessage: () => (
                                    <div style={{ padding: 10 }}>Please select country first</div>
                                ),
                            }}
                        />

                        <p className='text-red-700'>{cityMessage}</p>
                    </div>

                    <div className='flex flex-col gap-3 '>
                        <p className="font-semibold">Address</p>
                        <input className={`w-full h-12 rounded px-3 outline-green-700 
                            outline-[0.5px] bg-[#F5F5F5] 
                            ${addressValidator && 'border-[1px] border-red-700'}`} placeholder='Maps Location'
                            onChange={(e) => { setAddress(e.target.value) }}
                            value={address}
                        ></input>

                        <p className='text-red-700'>{addressMessage}</p>


                    </div>

                    <div className='flex flex-col gap-3 '>
                        <p className="font-semibold">Zip Code</p>
                        <input className={`w-full h-12 rounded px-3 outline-green-700 
                            outline-[0.5px] bg-[#F5F5F5] 
                            ${zipCodeValidator && 'border-[1px] border-red-700'}`} placeholder='zip code'
                            onChange={(e) => { setZipCode(e.target.value) }}
                            value={zipCode}
                        ></input>

                        <p className='text-red-700'>{zipCodeMessages}</p>


                    </div>
                </div>
            </div>

            {

                showError
                    ?
                    <div>
                        {!jobTitle || !jobDescription || !category || phoneNumberValidator
                            || phoneNumberValidator || minSalaryValidator || maxSalaryValidator
                            || zipCodeTypeValidator ?
                            <div className='bg-[#fcd9db] rounded-md p-4 border-[1px] border-[#feb8ba]'>

                                <div className='flex gap-2  items-center '>
                                    <InfoIcon className='text-[#d93a40]' />
                                    <h1 className='font-semibold'>There are items above that need your attention to continue.</h1>

                                </div>

                                <div className='pl-9'>
                                    {!jobTitle && (<div><li>Job Title</li></div>)}
                                    {jobDescription === '<p><br></p>' && (<div><li>Job Description</li></div>)}
                                    {!category && (<div><li>Category</li></div>)}
                                    {/* {!applicationDeadlineDate && (<div><li>Application Deadline Date</li></div>)} */}
                                    {phoneNumberValidator && (<div><li>Phone Number</li></div>)}
                                    {minSalaryValidator ? <div><li>Min. Salary</li></div> : null}
                                    {maxSalaryValidator ? <div><li>Max. Salary</li></div> : null}
                                    {/* {!minSalary || minSalaryValidator ? <div><li>Min. Salary</li></div> : null}
{!maxSalary || maxSalaryValidator ? <div><li>Max. Salary</li></div> : null}
{!rate && (<div><li>Rate</li></div>)}
{!Experience && (<div><li>Experience</li></div>)}
{!industry && (<div><li>Industry</li></div>)}
{!careerLevel && (<div><li>Career Level</li></div>)}
{!type && (<div><li>Type</li></div>)}
{!country && (<div><li>Country</li></div>)}
{!address && (<div><li>Address</li></div>)}
{!zipCode || zipCodeTypeValidator ? <div><li>Zip Code</li></div> : null} */}
                                    {zipCodeTypeValidator ? <div><li>Zip Code</li></div> : null}

                                    {
                                        type === 'Contract' || type === 'Internship'
                                            || type === 'Temporary' ?
                                            <div>
                                                {!length || lengthValidator ?
                                                    <div><li>Length</li></div>
                                                    : ""
                                                }
                                                {!periods && (<div><li>Periods</li></div>)}
                                            </div>
                                            : ""
                                    }


                                    {
                                        type === 'Part Time' ?
                                            <div>
                                                {!expectedHour && (<div><li>Expected Hour</li></div>)}

                                                {
                                                    expectedHour === 'Fixed Hour' ?
                                                        <div>
                                                            {!fixedAt || fixedAtTypeValidator ? <div><li>Fixed At</li></div>

                                                                : ""}

                                                        </div>
                                                        : ""
                                                }

                                                {
                                                    expectedHour === 'Range' ?
                                                        <div>
                                                            {!rangeFrom || rangeFromTypeValidator ? <div><li>From</li></div> : ""}
                                                            {!rangeTo || rangeToTypeValidator ? <div><li>To</li></div> : ""}

                                                        </div>
                                                        : ""
                                                }

                                                {
                                                    expectedHour === 'Maximum' ?
                                                        <div>
                                                            {!maxNotMoreThan || maxNotMoreThanTypeValidator ? <div><li>Not More Than</li></div> : ""}
                                                        </div>
                                                        : ""
                                                }

                                                {
                                                    expectedHour === 'Minimum' ?
                                                        <div>
                                                            {!minNotLessThan || minNotLessThanTypeValidator ? <div><li>Not Less Than</li></div> : ""}
                                                        </div>
                                                        : ""
                                                }

                                            </div>
                                            : ""
                                    }
                                </div>

                            </div>
                            : null

                        }
                    </div>

                    : ""

            }


            <button
                onClick={EmployerPostData}
                className='text-white hover:text-[#14A077] font-bold rounded hover:bg-white bg-[#14A077] w-44 px-2 py-3'>Save & Preview</button>

        </div>
    )
}

export default EmployeerSubmitJob