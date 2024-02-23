import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import ServerError from '../Component/Error Pages/ServerError'
import '../../css/Login.css'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import CandidateLogin from "./CandidateLogin";
import EmployerLogin from "./EmployerLogin";
import CandidateSignUp from "../SignUp/CandidateSignUp";
import EmployeerSignUp from "../SignUp/EmployerSignUp";
import LoginOption from "./LoginOption";

export default function Login({ setLogin, employerLogin, setEmployerLogin }) {

    // -----------------Employer-------------------------

    let [showState, setShowState] = useState('loginOption')

    useEffect(() => {

        if (employerLogin === 'EmployerLogin') {
            setShowState('EmployerLogin')

        }
        else if (employerLogin === false) {
            setShowState('loginOption')
        }

    }, [])
    return (
        <>

            <div className=" fixed w-full bg-gray-800 bg-opacity-75 h-screen items-center top-0 left-0 z-10 flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">


                {/* Candidate Login */}
                {
                    showState === 'candidateLogin' &&
                    (
                        <CandidateLogin setLogin={setLogin} setShowState={setShowState}/>
                    )
                }

                {/* Employer Login */}

                {
                    showState === 'EmployerLogin' &&
                    (<EmployerLogin setLogin={setLogin} setShowState={setShowState} employerLogin={employerLogin} setEmployerLogin={setEmployerLogin} />)
                }


                {/* Employer SignUp */}
                {
                    showState === 'EmployerSignUp' &&
                    (<EmployeerSignUp setLogin={setLogin} setShowState={setShowState} />)
                }


                {/* Login Option*/}
                {
                    showState === 'loginOption' &&
                    (
                        <LoginOption setLogin={setLogin} setShowState={setShowState}/>
                    )
                }


                {/* Candidate Sign Up*/}
                {showState === 'signUp' && (<CandidateSignUp setShowState={setShowState} setLogin={setLogin} />)}

            </div>
        </>
    )
}
