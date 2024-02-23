import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ServerError from '../Component/Error Pages/ServerError'
import './Login.css'
import CloseIcon from '@mui/icons-material/Close';
import CandidadateSignUp from '../Component/CandidateSignUp'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EmployeerSignUp from '../Component/EmployeerSignUp';
import EmployerLogin from "../EmployerLogin";


export default function Login({ setLogin, employerLogin,setEmployerLogin }) {

    let [userData, setUserData] = useState('')
    let navigate = useNavigate()
    let [showMessage, setShowMessage] = useState(false)


    // -----------------------------------
    const [errorMessageCandidate, setErrorMessage] = useState('');
    const [successMessageCandidate, setSuccesssMessage] = useState(false);
    let [candidateEmailMessage, setCandidateEmailMessage] = useState('')
    let [candidatePasswordMessage, setCandidatePasswordMessage] = useState('')

    let [candidateEmail, setCandidateEmail] = useState('')
    let [candidatePassword, setCandidatePassword] = useState('')

    let [emailValidator, setEmailValidator] = useState(false)
    let [passwordValidator, setPasswordValidator] = useState(false)

    async function CandidateLogin() {
        setPasswordValidator(false)
        setEmailValidator(false)
        setErrorMessage('')
        setCandidateEmailMessage('')
        setCandidatePasswordMessage('')

        const validateEmailCandidate = (input) => {

            const emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
            return emailRegex.test(input);
        };


        if (candidateEmail === "" && candidatePassword === "") {
            setErrorMessage('Please fill all input field')
        }

        else if (candidateEmail === "") {
            setEmailValidator(true)
            setCandidateEmailMessage("Please fill email field")
        }

        else if (!validateEmailCandidate(candidateEmail)) {
            setEmailValidator(true)
            setCandidateEmailMessage('Please enter a valid email')
        }


        else if (candidatePassword === "") {
            setPasswordValidator(true)
            setCandidatePasswordMessage("Please fill password field")
        }

        else if (candidatePassword.length < 7) {
            setPasswordValidator(true)
            setCandidatePasswordMessage("Password lenght should be greater than 7.")
        }

        else {

            try {
                const postData = await fetch('http://localhost:4500/api/candidate/login', {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: candidateEmail, password: candidatePassword })
                })

                const response = await postData.json()
                console.log(response)
                if (response.message === 'Login Successfull') {
                    setSuccesssMessage(true)
                    setErrorMessage("Sign In Sucessful, Redirecting...")
                    localStorage.setItem("token", response.token)
                    setTimeout(() => {
                        navigate('/candidate')
                    }, 3000)

                }
                else {
                    setShowMessage(true)
                    setErrorMessage(response.message)
                }
            } catch (err) {
                console.log("Server Can't respond")
            }
        }

    }


    // -----------------Employer-------------------------

    let [showState, setShowState] = useState('loginOption')
    

    useEffect(()=>{

        if (employerLogin ==='EmployerLogin') {
            setShowState('EmployerLogin')
            
        }
        else if(employerLogin ===false){
            setShowState('loginOption')
        }

    },[])
  console.log(showState)
    return (
        <>

            <div className=" fixed w-full bg-gray-800 bg-opacity-75 h-screen items-center top-0 left-0 z-10 flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">


                {/* Candidate Login */}
                {
                    showState === 'candidateLogin' &&
                    (<div className=" bg-white w-[35%] px-8  rounded-lg py-10">
                        <div className="w-full  ">
                            <div className="">

                                <div className=" flex items-center justify-between">
                                    <KeyboardBackspaceIcon className="cursor-pointer"
                                        onClick={() => { setShowState('loginOption') }} />
                                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                        Candidate Sign In
                                    </h2>

                                    <CloseIcon className="hover:cursor-pointer"
                                        onClick={() => setLogin(false)}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 sm:mx-auto sm:w-full ">
                                <div className="space-y-6">

                                    {
                                        errorMessageCandidate !== "" ?
                                            <div className={`flex items-center p-4  rounded-md ${successMessageCandidate ? 'bg-[#cdf4fc]' : 'bg-red-200'}`}>
                                                <p className={` ${successMessageCandidate ? 'text-black' : 'text-red-700'}`}>{errorMessageCandidate}</p>
                                            </div>
                                            : ""
                                    }


                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-normal leading-6 text-gray-900">
                                            Email*
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className={`px-3 h-12 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm 
                                                  placeholder:text-gray-400 
                                                 outline-[#14a077]  sm:text-sm sm:leading-6  ${emailValidator && 'border-b-red-600'}`}
                                                onChange={(e) => { setCandidateEmail(e.target.value) }}
                                            />
                                            <p className="mt-1 text-red-600">{candidateEmailMessage}</p>

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
                                                className={`px-3 h-12 block w-full rounded-md border-2 py-1.5
                                                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                                  placeholder:text-gray-400 outline-[#14a077]  
                                                  sm:text-sm sm:leading-6 ${passwordValidator && 'border-b-red-600'}`}
                                                onChange={(e) => { setCandidatePassword(e.target.value) }}
                                            />
                                            <p className="mt-1 text-red-600">{candidatePasswordMessage}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            className="flex w-full h-12 items-center justify-center rounded-md bg-[#14A077] px-3 py-1.5 text-medium font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={CandidateLogin}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </div>

                                {/* <a href className="">
                                            Do you have an account?{' '}
                                                <p className="text-[#14A077] font-semibold">Register</p>
                                            </a> */}

                                <div className="flex items-center justify-center gap-2 mt-10 text-center text-sm text-gray-500"
                                    onClick={() => setShowState('signUp')}>
                                    Do you have an Candidate account?{' '}
                                    <p className="text-[#14A077] font-semibold cursor-pointer">Register Now</p>
                                </div>
                            </div>



                        </div>
                    </div>)
                }

                {/* Employer Login */}

                {
                    showState === 'EmployerLogin' &&
                    (<EmployerLogin setLogin={setLogin} setShowState={setShowState} employerLogin={employerLogin} setEmployerLogin={setEmployerLogin}/>)
                }


                {/* Employer SignUp */}
                {
                    showState === 'EmployerSignUp' &&
                    (<EmployeerSignUp setLogin={setLogin} setShowState={setShowState} />)
                }


                {/* Login Option*/}
                {
                    showState === 'loginOption' &&
                    (<>

                        <div className="login-form-open bg-white w-[35%] px-8  rounded-lg py-10">
                            <div className="w-full ">

                                <div className="flex justify-end ">
                                    <CloseIcon className="hover:cursor-pointer"
                                        onClick={() => setLogin(false)}
                                    />
                                </div>

                                <div className="mt-3  flex flex-col gap-10 items-center justify-center ">
                                    <h1 className="text-2xl font-semibold">Choose Sign In Option</h1>
                                    <div className="flex flex-col gap-4  w-full ">
                                        <button className="hover:bg-green-800 bg-[#14a077] rounded-md h-16 text-xl text-white font-semibold"
                                            onClick={() => { setShowState('candidateLogin') }}
                                        >Login As Candidate</button>

                                        <button className="hover:bg-green-800 bg-[#14a077] rounded-md h-16 text-xl text-white font-semibold"
                                            onClick={() => { setShowState('EmployerLogin') }}
                                        >Login As Employer</button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </>)
                }


                {/* Candidate Sign Up*/}
                {showState === 'signUp' && (<CandidadateSignUp setShowState={setShowState} setLogin={setLogin} />)}

            </div>
        </>
    )
}
