import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';

function EmployerLogin({ setLogin, setShowState,setEmployerLogin, employerLogin }) {

    const [errorMessageEmployeer, setErrorMessageEmployeer] = useState('');
    let [employeerEmailMessage, setEmployeerEmailMessage] = useState('')
    let [employeerPasswordMessage, setEmployeerPasswordMessage] = useState('')
    const [successMessage, setSuccesssMessage] = useState(false);
    let [employeerEmail, setEmployeerEmail] = useState('')
    let [employeerPassword, setEmployeerPassword] = useState('')


    let [emailValidatorEmployer, setEmailValidatorEmployer] = useState(false)
    let [passwordValidatorEmployer, setPasswordValidatorEmployer] = useState(false)
    let [showMessage, setShowMessage] = useState(false)
    let navigate = useNavigate()

    async function EmployeerLogin() {


        setEmailValidatorEmployer(false)
        setPasswordValidatorEmployer(false)
        setErrorMessageEmployeer('')
        setEmployeerEmailMessage('')
        setEmployeerPasswordMessage('')

        const validateEmailEmployer = (input) => {

            const emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
            return emailRegex.test(input);
        };

        if (employeerEmail === "" && employeerPassword === "") {
            setErrorMessageEmployeer('Please fill all input field')
        }

        else if (employeerEmail === "") {
            setEmailValidatorEmployer(true)
            setEmployeerEmailMessage("Please fill email field")
        }

        else if (!validateEmailEmployer(employeerEmail)) {
            setEmailValidatorEmployer(true)
            setEmployeerEmailMessage('Please enter a valid email')
        }

        else if (employeerPassword === "") {

            setPasswordValidatorEmployer(true)
            setEmployeerPasswordMessage("Please fill password field")

        }

        else if (employeerPassword.length <= 7) {
            setPasswordValidatorEmployer(true)
            setEmployeerPasswordMessage("Password length should be greater than 7")
        }


        else {

            try {
                const postData = await fetch('http://localhost:4500/api/employeer/login', {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: employeerEmail, password: employeerPassword })
                })

                const response = await postData.json()
                if (response.message === 'Login Successfull') {
                    setSuccesssMessage(true)
                    setErrorMessageEmployeer("Sign In Sucessful, Redirecting...")
                    localStorage.setItem("token", response.token)
                    setTimeout(() => {
                        navigate('/EmployeerDashboard')
                    }, 3000)


                }
                else {
                    setShowMessage(true)
                    setErrorMessageEmployeer(response.message)

                }
            } catch (err) {
                console.log(err)
                console.log("Server Can't respond")
            }
        }
    }

 
    function handleClose() {
        setEmployerLogin(false)
        // setShowState('EmployerLogin', () => {
        // This callback will be executed after setShowState is completed
        setLogin(false);
        // });

    }
    return (
        // <div className=" fixed w-full bg-gray-800 bg-opacity-75 h-screen items-center top-0 left-0 z-10 flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" bg-white w-[35%] px-8  rounded-lg py-10">
                <div className="w-full  ">
                    <div className="">

                        <div className=" flex items-center justify-between">
                            <KeyboardBackspaceIcon className="cursor-pointer"
                                onClick={() => { setShowState('loginOption') }} />

                            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Employer Sign In
                            </h2>

                            <CloseIcon className="hover:cursor-pointer"
                                onClick={handleClose}
                            />
                        </div>
                    </div>
                    <div className="mt-6 sm:mx-auto sm:w-full  ">

                        <div className="space-y-6">
                            {
                                errorMessageEmployeer !== "" ?
                                    <div className={`flex items-center p-4  rounded-md  ${successMessage ? 'bg-[#cdf4fc]' : 'bg-red-200'} `}>
                                        <p className={` ${successMessage ? 'text-black' : 'text-red-700'}`}>{errorMessageEmployeer}</p>
                                    </div>
                                    : ""
                            }
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email*
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className={`px-3 h-12 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  outline-[#14a077]  sm:text-sm sm:leading-6
                                                ${emailValidatorEmployer && 'border-b-red-600'}`}
                                        onChange={(e) => { setEmployeerEmail(e.target.value) }}
                                    />
                                    <p className="mt-1 text-red-600">{employeerEmailMessage}</p>
                                </div>
                            </div>


                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password*
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className={`px-3 h-12 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                                 ring-gray-300 placeholder:text-gray-400 
                                                  outline-[#14a077]  sm:text-sm sm:leading-6
                                                  ${passwordValidatorEmployer && 'border-b-red-600'}`}
                                        onChange={(e) => { setEmployeerPassword(e.target.value) }}
                                    />
                                    {employeerPasswordMessage && <p className="mt-1 text-red-600">{employeerPasswordMessage}</p>}

                                </div>
                            </div>

                            <div>
                                <button
                                    className="flex h-12 items-center w-full justify-center rounded-md bg-[#14A077] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800"
                                    onClick={EmployeerLogin}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>


                        <div className="mt-10 gap-1 flex items-center justify-center">
                            <p className="text-center text-sm text-gray-500">
                                Do you have an Employer account?{' '}
                            </p>
                            <p onClick={() => { setShowState('EmployerSignUp') }} className="font-semibold leading-6 text-[#14A077] cursor-pointer hover:text-green-800">
                                Register Now
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        // </div>
    )
}

export default EmployerLogin