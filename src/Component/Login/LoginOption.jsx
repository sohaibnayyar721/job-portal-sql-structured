import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function LoginOption({setLogin, setShowState }) {
    return (
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
    )
}

export default LoginOption