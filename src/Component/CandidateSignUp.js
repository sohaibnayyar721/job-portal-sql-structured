import { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Category } from "@mui/icons-material";

export default function SignUp({ setLogin, setShowState }) {

  let navigate = useNavigate()

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [designation, setDesignation] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')
  let [password, setPassword] = useState('')
  let [experience, setExperience] = useState('')
  let [biography, setBiography] = useState('')
  let [previuosCompany, setPreviuosCompany] = useState('')
  let [currentEmpStatus, setCurrentEmpStatus] = useState('')


  let [successMessage, setSuccessMessage] = useState(false)
  const [errorMessageEmployer, setErrorMessage] = useState('');

  let [nameMessage, setNameMessage] = useState('')
  let [EmailMessage, setEmployerEmailMessage] = useState('')
  let [phoneNumberMessage, setPhoneNumberMessage] = useState('')
  let [designationMessage, setDesignationMessage] = useState('')
  let [skillsMessage, setSkillsMessage] = useState('')
  let [experienceMessage, setExperienceMessage] = useState('')
  let [biographyMessage, setBiographyMessage] = useState('')
  let [prevCompMessage, setPrevCompMessage] = useState('')
  let [passwordMessage, setPasswordMessage] = useState('')
  let [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState('')
  let [currentEmpStatusMessage, setCurrentEmpStatusMessage] = useState('')


  let [nameValidator, setNameValidator] = useState(false)
  let [emailValidator, setEmailValidator] = useState(false)
  let [phoneNumberValidator, setPhoneNumberValidator] = useState(false)
  let [designationValidator, setDesignationValidator] = useState(false)
  let [skillsValidator, setSkillsValidator] = useState(false)
  let [experienceValidator, setExperienceValidator] = useState(false)
  let [biographyValidator, setBiographyValidator] = useState(false)
  let [prevCompValidator, setPrevCompValidator] = useState(false)
  let [passwordValidator, setPasswordValidator] = useState(false)
  let [ConfirmPasswordValidator, setConfirmPasswordValidator] = useState(false)
  let [currentEmpStatusValidator, setCurrentEmpStatusValidator] = useState(false)


  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function signUp() {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('experience', experience);
    formData.append('biography', biography);
    formData.append('previuosCompany', previuosCompany);
    formData.append('email', email);
    formData.append('designation', designation);
    formData.append('skills', JSON.stringify(skillsArray));

    setErrorMessage('')
    setNameMessage('')
    setEmployerEmailMessage('')
    setPhoneNumberMessage('')
    setDesignationMessage('')
    setSkillsMessage('')
    setExperienceMessage('')
    setBiographyMessage('')
    setPrevCompMessage('')
    setPasswordMessage('')
    setConfirmPasswordMessage('')
    setCurrentEmpStatusMessage('')

    setCurrentEmpStatusValidator(false)
    setNameValidator(false)
    setEmailValidator(false)
    setPhoneNumberValidator(false)
    setDesignationValidator(false)
    setSkillsValidator(false)
    setExperienceValidator(false)
    setBiographyValidator(false)
    setPrevCompValidator(false)
    setPasswordValidator(false)
    setConfirmPasswordValidator(false)

    const validateEmail = (input) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      return emailRegex.test(input);
    };
    const numberRegex = /^\d+$/;

    if (name === "" && designation === "" && email === ""
      && phoneNumber === "" && confirmPassword === "" && password === ""
      && experience === "" && biography === "" && previuosCompany === ""
    ) {
      setErrorMessage('Please fill all input field')
    }


    else if (!name) {
      setNameValidator(true)
      setNameMessage('Please add name ')
      setErrorMessage('Please add name ')
    }

    else if (!email) {
      setEmailValidator(true)
      setEmployerEmailMessage('Please fill email field')
      setErrorMessage('Please fill email field ')
    }

    else if (!validateEmail(email)) {
      setEmailValidator(true)
      setEmployerEmailMessage('Please enter a valid email')
      setErrorMessage('Please enter a valid email')
    }

    else if (!phoneNumber) {
      setPhoneNumberValidator(true)
      setPhoneNumberMessage('Please enter phone number')
      setErrorMessage('Please enter phone number ')
    }

   
    else if (!phoneNumber.startsWith('03')) {
      setPhoneNumberValidator(true)
      setPhoneNumberMessage('Phone number starts from "03" ')
      setErrorMessage('Phone number starts from "03" ')
    }

    else if (phoneNumber.length > 11) {
      setPhoneNumberValidator(true)
      setPhoneNumberMessage('Phone number length cannot greater than 11 ')
      setErrorMessage('Phone number length cannot greater than 11 ')
    }

    else if (phoneNumber.length < 11) {
      setPhoneNumberValidator(true)
      setPhoneNumberMessage('Phone number length should be 11 ')
      setErrorMessage('Phone number length should be 11')
    }

    else if(!designation){
      setDesignationValidator(true)
      setDesignationMessage('Please Enter Designation')
      setErrorMessage('Please Enter Designation')
    }

    else if (!currentEmpStatus) {
      setCurrentEmpStatusMessage('Please Enter Current Status')
      setErrorMessage('Please Enter Current Status')
      setCurrentEmpStatusValidator(true)
    }

    else if (currentEmpStatus === 'Employed' && !previuosCompany) {

      setPrevCompMessage('Please Enter Previous Company')
      setErrorMessage('Please Enter Previous Company')
      setPrevCompValidator(true)


    }

    else if (skillsArray.length === 0) {

      setSkillsValidator(true)
      setSkillsMessage('Please add skills ')
      setErrorMessage('Please add skills')
    }

    else if (!experience) {
      setExperienceValidator(true)
      setExperienceMessage('Please add Experience ')
      setErrorMessage('Please add Experience')
    }

    else if (!biography) {
      setBiographyValidator(true)
      setBiographyMessage('Please add biography ')
      setErrorMessage('Please add biography ')
    }


    else if (!password) {
      setPasswordValidator(true)
      setPasswordMessage("Please fill password field")
      setErrorMessage('Please fill password field')
    }

    else if (password.length <= 7) {
      setPasswordValidator(true)
      setPasswordMessage("Password length should be greater than 7")
      setErrorMessage("Password length should be greater than 7")
    }
    else if (!confirmPassword) {
      setConfirmPasswordValidator(true)
      setConfirmPasswordMessage("Please enter confirm password.")
      setErrorMessage("Please enter confirm password.")
    }

    else if (confirmPassword !== password) {
      setConfirmPasswordValidator(true)
      setConfirmPasswordMessage("Password do not match")
      setErrorMessage("Password do not match")
    }


    else if (!file) return setErrorMessage('no file choosen');

    else {
      try {
        const postData = await fetch('http://localhost:4500/api/candidate/SignUp', {
          method: "POST",
          body: formData
        })

        const response = await postData.json()
        console.log(response)
        if (response.message === 'user created successfully!!!') {
          setErrorMessage("SignUp Successfull, Redirecting to Login page...")
          setSuccessMessage(true)
          setTimeout(() => {
            setShowState('candidateLogin')
          }, 3000)

        }
        else {
          setErrorMessage(response.message)
          setSuccessMessage(false)
        }

      } catch (err) {
        console.log("Server Can't respond")

      }
    }

  }

  // Skills

  let [skills, setSkills] = useState('')
  let [skillsArray, setSkillsArray] = useState([])

  function addSkills() {
    setSkillsArray([...skillsArray, skills])
  }

  function deleteSkills(indexValue) {
    let NewSkillsArray = [...skillsArray]
    NewSkillsArray.splice(indexValue, 1)
    setSkillsArray(NewSkillsArray)
  }


  // React Select
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
      // border: categoryValidator ? '1px solid red' : (genderValidator ? '1px solid yellow' : provided.border),
    }),
    indicatorSeparator: () => ({ display: "none" }),

  };

  const currentEmpStatusOption = [
    { value: "Employed", label: "Employed" },
    { value: "Unemployed", label: "Unemployed" }

  ]

  const handleCurrentEmpStatus = (selectedOption, { action }) => {
    if (action === "clear") {
      setCurrentEmpStatus("");
      setPreviuosCompany('')
    }
    else {
      setCurrentEmpStatus(selectedOption.value);
      if (selectedOption.value !== "cancel") {
        setPreviuosCompany('')
      }

    }
  }

  let [showPassword, setShowPassword] = useState(false)
  function handlePassword() {
    setShowPassword(!showPassword)
  }

  let [showConfirmPassword, setShowConfirmPassword] = useState(false)
  function handleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword)
  }
  return (
    <>
      <div className="flex flex-col bg-white w-[35%] h-[95vh] py-6 rounded-md">
        <div className=" flex items-center justify-between md:px-5">

          <KeyboardBackspaceIcon className="cursor-pointer"
            onClick={() => { setShowState('candidateLogin') }} />

          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In to your account
          </h2>

          <CloseIcon className="hover:cursor-pointer"
            onClick={() => setLogin(false)}
          />

        </div>

        {
          errorMessageEmployer !== "" ?
            <div className={`m-3 flex items-center p-4 rounded-md  ${successMessage ? 'bg-[#cdf4fc]' : 'bg-red-200'}`}>
              <p className={`${successMessage ? 'text-black' : 'text-red-700'}`}>{errorMessageEmployer}</p>
            </div>
            : ""
        }

        <div className="px-5 mt-5 overflow-y-scroll">

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name*
            </label>
            <div className="mt-2">
              <input
                placeholder="Enter Full Name"
                id="name"
                name="name"
                type="text"
                required
                className={`px-3 h-12 block w-full rounded-md border-2 py-1.5
                 text-gray-900 shadow-sm ring-1 ring-inset
                 ${nameValidator && 'border-b-red-600'}
                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                onChange={(e) => { setName(e.target.value) }}
              />

              <p className="mt-1 text-red-600">{nameMessage}</p>
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email*
            </label>
            <div className="mt-2">
              <input
                // onClick={() => { setIsValidEmail(false) }}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                placeholder="Enter Email"
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className={`
                   border-2 outline-none px-3 h-12 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 
                    ${emailValidator && 'border-b-red-600'}
                    sm:text-sm sm:leading-6`}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <p className="mt-1 text-red-600">{EmailMessage}</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number*
            </label>
            <div className="mt-2">
              <input
                // onClick={() => { setIsValidNumber(true) }}
                placeholder="Enter Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                className={` px-3 h-12 block w-full rounded-md border-2
                 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                  focus:ring-inset focus:ring-indigo-600 sm:text-sm 
                  sm:leading-6 ${phoneNumberValidator && 'border-b-red-600'}`}
                onChange={(e) => { setPhoneNumber(e.target.value) }}
              // maxLength={11}
              />
              <p className="mt-1 text-red-600">{phoneNumberMessage}</p>
            </div>
          </div>

          {/* Designation */}
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Designation*
            </label>
            <div className="mt-2">
              <input
                placeholder="Enter Designation"
                id="Previous Company"
                name="Previous Company"
                type="text"
                required
                className={`h-12 px-3 block w-full rounded-md border-2 py-1.5
                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6
                   ${designationValidator && 'border-b-red-600'}`}
                onChange={(e) => { setDesignation(e.target.value) }}
              />
              <p className="mt-1 text-red-600">{designationMessage}</p>
            </div>

          </div>

          {/* Current Candidate Status */}
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Candidate Current Status*
            </label>
            <div className="mt-2">
              <Select
                onChange={handleCurrentEmpStatus}
                className={`${currentEmpStatusValidator && 'rounded-md border-[1px] border-red-700'}  `}
                options={currentEmpStatusOption}
                styles={customStyles}
                placeholder='Select Candidate Current Status'
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

              <p className="mt-1 text-red-600">{currentEmpStatusMessage}</p>
            </div>
          </div>

          {
            currentEmpStatus === "Employed" ?

              <div>
                < div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Previous Company*
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Enter  Previous Company"
                      id="Previous Company"
                      name="Previous Company"
                      type="text"
                      required
                      className={`h-12 px-3 block w-full rounded-md border-2 py-1.5
                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6
                   ${prevCompValidator && 'border-b-red-600'}`}
                      onChange={(e) => { setPreviuosCompany(e.target.value) }}
                    />
                    <p className="mt-1 text-red-600">{prevCompMessage}</p>
                  </div>
                </div>
              </div>
              : ""


          }


          {/* Skills */}
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Skills*
            </label>
            <div className="mt-2 flex gap-2">
              <input
                placeholder="Enter Skills"
                id="Skills"
                name="Skills"
                type="text"
                autoComplete="email"
                required
                className={`px-3 block  h-12 w-full rounded-md border-2 py-1.5
                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6
                    ${skillsValidator && 'border-b-red-600'}`}
                onChange={(e) => { setSkills(e.target.value) }}
              />

              <button onClick={() => addSkills(skills)} className="rounded-md w-20 text-white h-12 bg-[#14a077]">Add</button>
            </div>
            <p className="mt-1 text-red-600">{skillsMessage}</p>

            <div className="mt-3 w-full flex flex-wrap gap-3">
              {
                skillsArray.map((skills, index) => {
                  return (
                    <div key={index} className="flex bg-gray-200 rounded-md text-lg ">
                      {/* <div key={index} className="bg-pink-300 flex justify-end  "> */}
                      <p className="text-black text-[14px] ml-2 py-1 rounded-b-md">{skills}</p>

                      <CloseIcon className="scale-75" onClick={() => deleteSkills(index)} />
                      {/* </div> */}
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* Experience */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Experience*
              </label>
            </div>
            <div className="mt-2">
              <input
                placeholder="Enter Experience"
                id="experience"
                name="experience"
                type="text"
                autoComplete="current-password"
                required
                className={`h-12 px-3 block w-full rounded-md border-0 py-1.5
                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6
                   ${experienceValidator && 'border-b-red-600'} `}
                onChange={(e) => { setExperience(e.target.value) }}
              />

              <p className="mt-1 text-red-600">{experienceMessage}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Add Resume*
              </label>
            </div>
            <div className="mt-2">
              <input type="file" onChange={handleFileChange} />
              {/* <button onClick={handleUpload}>Upload File</button> */}
            </div>
          </div>

          {/* Biography */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Biography*
              </label>
            </div>
            <div className="mt-2 ">
              <textarea
                placeholder="Enter Biography"
                id="biography"
                name="biography"
                type="text"
                autoComplete="current-password"
                required
                className={`px-3 block h-52 w-full rounded-md border-2
                 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-2
                   focus:ring-inset focus:ring-indigo-600 sm:text-sm
                    sm:leading-6 ${biographyValidator && 'border-b-red-600'}`}
                onChange={(e) => { setBiography(e.target.value) }}
              />
              <p className="mt-1 text-red-600">{biographyMessage}</p>
            </div>
          </div>



          {/*  Password*/}
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password*
            </label>
            <div className="mt-2">
              <div className="relative">
                <input
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type={`${showPassword ? 'text' : 'password'}`}
                  required
                  className={`h-12 px-3 block w-full rounded-md border-2 
                py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                focus:ring-inset focus:ring-indigo-600 sm:text-sm 
                sm:leading-6 ${passwordValidator && 'border-b-red-600'}`}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
                {
                  showPassword ?
                    <VisibilityIcon onClick={handlePassword} className="absolute top-3 right-3" /> :
                    <VisibilityOffIcon onClick={handlePassword} className="absolute top-3 right-3" />
                }
              </div>
              <p className="mt-1 text-red-600">{passwordMessage}</p>
            </div>
          </div>

          {/*  Confirm Password*/}
          <div className="mt-4">
            <label htmlFor="Confirm Password" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password*
            </label>
            <div className="mt-2">
              <div className="relative">
                <input
                  placeholder="Enter Password"
                  id="Confirm Password"
                  name="Confirm Password"
                  type={`${showConfirmPassword ? 'text' : 'password'}`}
                  required
                  className={`h-12 px-3 block w-full rounded-md border-2 py-1.5
                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6
                   ${ConfirmPasswordValidator && 'border-b-red-600'}`}
                  onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
                {
                  showConfirmPassword ?
                    <VisibilityIcon onClick={handleConfirmPassword} className="absolute top-3 right-3" /> :
                    <VisibilityOffIcon onClick={handleConfirmPassword} className="absolute top-3 right-3" />
                }
              </div>
              <p className="mt-1 text-red-600">{ConfirmPasswordMessage}</p>
            </div>
            <button
              className="h-12 items-center mt-5 flex w-full justify-center rounded-md bg-[#14A077] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={signUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
