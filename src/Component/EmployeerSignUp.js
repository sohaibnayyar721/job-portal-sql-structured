import React from 'react'
import { useEffect, useState } from "react"
import { Form, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import CandidadateSignUp from '../Component/CandidateSignUp'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function EmployeerSignUp({ setLogin, setShowState }) {

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [employerConfirmPassword, setEmployerConfirmPassword] = useState('')
  let [companyName, setCompanyName] = useState('')
  let [linkedInUrl, setLinkedInUrl] = useState('')


  const [companyLogo, setCompanyLogo] = useState(null);

  const handleCompanyLogoChange = (event) => {
    setCompanyLogo(event.target.files[0]);
  };


  let [successMessage, setSuccessMessage] = useState(false)
  const [errorMessageEmployer, setErrorMessage] = useState('');
  let [employerEmailMessage, setEmployerEmailMessage] = useState('')
  let [employerPasswordMessage, setEmployerPasswordMessage] = useState('')
  let [employerConfirmPasswordMessage, setEmployerConfirmPasswordMessage] = useState('')
  let [companyNameMessage, setCompanyNameMessage] = useState('')
  let [linkedInUrlMessage, setLinkedInUrlMessage] = useState('')


  let [emailValidator, setEmailValidator] = useState(false)
  let [passwordValidator, setPasswordValidator] = useState(false)
  let [ConfirmPasswordValidator, setConfirmPasswordValidator] = useState(false)
  let [companyNameValidator, setCompanyNameValidator] = useState(false)
  let [linkedInUrlValidator, setLinkedInUrlValidator] = useState(false)

  const formData = new FormData()

  

  async function SignUp() {

    setEmailValidator(false)
    setPasswordValidator(false)
    setConfirmPasswordValidator(false)
    setCompanyNameValidator(false)
    setLinkedInUrlValidator(false)

    setErrorMessage('')
    setEmployerEmailMessage('')
    setEmployerPasswordMessage('')
    setEmployerConfirmPasswordMessage('')
    setCompanyNameMessage('')
    setSuccessMessage(false)
    setLinkedInUrlMessage('')

    const validateEmailEmployer = (input) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      return emailRegex.test(input);
    };

    if (email === "" && password === "" && employerConfirmPassword && !companyLogo ) {
      setErrorMessage('Please fill all input field')
    }

    else if (!companyName) {
      setCompanyNameValidator(true)
      setCompanyNameMessage("Please fill Company Name field")
      setErrorMessage("Please fill Company Name field")
    }

    else if (!companyLogo) {
      // setLinkedInUrlValidator(true)
      // setLinkedInUrlMessage("Please fill Linked Url field")
      setErrorMessage("Please add company logo")
    }

    else if (!linkedInUrl) {
      setLinkedInUrlValidator(true)
      setLinkedInUrlMessage("Please fill Linked Url field")
      setErrorMessage("Please fill Linked Url field")
    }

    else if (email === "") {
      setEmailValidator(true)
      setEmployerEmailMessage("Please fill email field")
      setErrorMessage("Please fill email field")
    }

    else if (!validateEmailEmployer(email)) {
      setEmailValidator(true)
      setEmployerEmailMessage('Please enter a valid email')
      setErrorMessage("Please enter a valid email")
    }

    else if (!password) {
      setPasswordValidator(true)
      setEmployerPasswordMessage("Please fill password field")
      setErrorMessage("Please fill password field")
    }

    else if (password.length <= 7) {
      setPasswordValidator(true)
      setEmployerPasswordMessage("Password Length should be greater than 7")
      setErrorMessage("Password Length should be greater than 7")
    }

    else if (!employerConfirmPassword) {
      setConfirmPasswordValidator(true)
      setEmployerConfirmPasswordMessage("Please enter confirm password")
      setErrorMessage("Please enter confirm password")
    }

    else if (employerConfirmPassword !== password) {
      setConfirmPasswordValidator(true)
      setEmployerConfirmPasswordMessage("Password do not match")
      setErrorMessage("Password do not match")
    }


    else {

      try {

        formData.append('companyName', companyName)
        formData.append('LinkedInUrl', linkedInUrl)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('companyLogo', companyLogo)

        const postData = await fetch('http://localhost:4500/api/employeer/SignUp', {

          method: "POST",
          // headers: {
          //   "Content-Type": "application/json"
          // },
          body: formData
          // JSON.stringify(
          //   {
          //     email: email,
          //     password: password,
          //   })
        })

        const response = await postData.json()
        console.log(response)
        // setServerResponse(response.message)
        if (response.message === 'user created successfully!!!') {
          setErrorMessage("SignUp Successfull, Redirecting to Login page...")
          setSuccessMessage(true)
          setTimeout(() => {
            setShowState('EmployerLogin')
          }, 3000)
          // alert('user created successfully')
          // navigate('/login')
        } else {
          setErrorMessage(response.message)

        }
      } catch (err) {
        console.log("Server Can't respond")
      }
    }

  }

  console.log(formData)

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
      <div className="bg-white w-[35%] px-8 rounded-lg py-10">
        <div className='flex flex-col gap-2 '>
          <div className=" flex items-center justify-between">
            <KeyboardBackspaceIcon className="cursor-pointer"
              onClick={() => { setShowState('EmployerLogin') }}
            />

            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to your account
            </h2>

            <CloseIcon className="hover:cursor-pointer"
              onClick={() => setLogin(false)}
            />
          </div>

          {
            errorMessageEmployer !== "" ?
              <div className={`flex items-center p-4  rounded-md 
                  ${successMessage ? 'bg-[#cdf4fc]' : 'bg-red-200'}
                  `}>
                <p className={`${successMessage ? 'text-black' : 'text-red-700'}`}>{errorMessageEmployer}</p>
              </div>
              : ""
          }
        </div>

        <div className="w-full h-[65vh] overflow-y-scroll ">


          <div className="mt-10 ">
            <div className="space-y-6">

              {/* Company Name */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Company Name*
                </label>
                <div className="mt-2 ">
                  <input
                    id="company name"
                    name="company name"
                    type="text"

                    required
                    className={`h-12 px-3 block w-full rounded-md border-2 py-1.5
                     text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                       focus:ring-indigo-600 sm:text-sm sm:leading-6 
                       ${companyNameValidator && 'border-b-red-600'}`}
                    onChange={(e) => { setCompanyName(e.target.value) }}
                  />

                  <p className="mt-1 text-red-600">{companyNameMessage}</p>
                </div>
              </div>

              <div className="">
                <div className="flex items-center justify-between">
                  <p className="block text-sm font-medium leading-6 text-gray-900">
                    Add Company Logo*
                  </p>
                </div>
                <div className="mt-2">
                  <input  className='' type="file"
                    onChange={handleCompanyLogoChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Linked Url*
                </label>
                <div className="mt-2 ">
                  <input
                    id="Linked Url"
                    name="Linked Url"
                    type="text"

                    required
                    className={`h-12 px-3 block w-full rounded-md border-2 py-1.5
                     text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                       focus:ring-indigo-600 sm:text-sm sm:leading-6 
                       ${linkedInUrlValidator && 'border-b-red-600'}`}
                    onChange={(e) => { setLinkedInUrl(e.target.value) }}
                  />

                  <p className="mt-1 text-red-600">{linkedInUrlMessage}</p>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email*
                </label>
                <div className="mt-2 ">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="email"
                    required
                    className={`h-12 px-3 block w-full rounded-md border-2 py-1.5
                     text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                       focus:ring-indigo-600 sm:text-sm sm:leading-6 
                       ${emailValidator && 'border-b-red-600'}`}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />

                  <p className="mt-1 text-red-600">{employerEmailMessage}</p>
                </div>
              </div>

              {/*  Password*/}
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password*
                </label>
                <div className="mt-2">
                  <div className='relative'>
                    <input
                      id="password"
                      name="password"
                      type={`${showPassword ? 'text' : 'password'}`}
                      required
                      className={`h-12 px-3 block w-full rounded-md border-2 py-1.5 text-gray-900
                     shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 focus:ring-2 
                      focus:ring-inset focus:ring-indigo-600
                       sm:text-sm sm:leading-6 ${passwordValidator && 'border-b-red-600'}`}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                    {
                      showPassword ?
                        <VisibilityIcon onClick={handlePassword} className="absolute top-3 right-3" /> :
                        <VisibilityOffIcon onClick={handlePassword} className="absolute top-3 right-3" />
                    }

                  </div>
                  <p className="mt-1 text-red-600">{employerPasswordMessage}</p>
                </div>
              </div>

              {/*  Confirm Password*/}
              <div>
                <label htmlFor="Confirm Password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password*
                </label>
                <div className="mt-2">
                  <div className='relative'>
                    <input
                      id="Confirm Password"
                      name="Confirm Password"
                      type={`${showConfirmPassword ? 'text' : 'password'}`}
                      required
                      className={`h-12 px-3 block w-full rounded-md border-2
                     py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                      ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                      focus:ring-inset focus:ring-indigo-600 sm:text-sm
                       sm:leading-6 ${ConfirmPasswordValidator && 'border-b-red-600'}`}
                      onChange={(e) => { setEmployerConfirmPassword(e.target.value) }}
                    />
                    {
                      showConfirmPassword ?
                        <VisibilityIcon onClick={handleConfirmPassword} className="absolute top-3 right-3" /> :
                        <VisibilityOffIcon onClick={handleConfirmPassword} className="absolute top-3 right-3" />
                    }
                  </div>
                  <p className="mt-1 text-red-600">{employerConfirmPasswordMessage}</p>
                </div>
              </div>

              <div>
                <button
                  className="items-center h-12 flex w-full justify-center rounded-md bg-[#14A077] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800"
                  onClick={SignUp}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeerSignUp