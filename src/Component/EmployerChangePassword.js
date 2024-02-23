import React from 'react'
import Loader from './loader';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function EmployerChangePassword({employerID}) {

    let [showPassOld, setShowPassOld] = useState(false)
    let [showPassNew, setShowPassNew] = useState(false)
    let [showPassReType, setShowReType] = useState(false)

    let [isLoading, setIsLoading] = useState(false)
    let [oldPassword, setOldPassword] = useState({
        value: "",
        message: "",
        validator: false
    })

    let [newPassword, setNewPassword] = useState({
        value: "",
        message: "",
        validator: false
    })

    let [retypePassword, setRetypePassword] = useState({
        value: "",
        message: "",
        validator: false
    })

    async function ChangePassword() {

        setOldPassword({ ...oldPassword, message: "", validator: false })
        setNewPassword({ ...newPassword, message: "", validator: false })
        setRetypePassword({ ...retypePassword, message: "", validator: false })


        if (!oldPassword.value) {
            setOldPassword({ ...oldPassword, message: "Please Enter Old Password", validator: true })
        }

        else if (oldPassword.value.length < 8) {
            setOldPassword({ ...oldPassword, message: "Password lenght must be greater than 7", validator: true })

        }

        else if (!newPassword.value) {
            setNewPassword({ ...newPassword, message: "Please Enter New Password", validator: true })
        }

        else if (newPassword.value.length < 8) {
            setNewPassword({ ...newPassword, message: "Password lenght must be greater than 7", validator: true })

        }

        else if (!retypePassword.value) {
            setRetypePassword({ ...retypePassword, message: "Please Enter Retype Password", validator: true })
        }

        else if (newPassword.value !== retypePassword.value) {
            setRetypePassword({ ...retypePassword, message: "Password Not Match", validator: true })
        }

        else {
            setIsLoading(true)
            try {
                let changePassword = await fetch('http://localhost:4500/employeer/changePassword', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        employeerId: employerID,
                        oldPassword: oldPassword.value,
                        newPassword: newPassword.value
                    })
                })

                let response = await changePassword.json()

                if (!changePassword.ok) {

                    toast.error(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                else {
                    setIsLoading(false)
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='w-full'>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='flex flex-col gap-8 w-full bg-[#eeeeee99] h-[88vh] overflow-y-scroll px-12 py-6'>
                        <div className='border-l-[5px] border-green-700 px-3 '>
                            <p className='text-black font-bold text-xl'>Change Password</p>
                        </div>
                        <div className='flex flex-col gap-4 rounded-md px-3 py-4 bg-white'>

                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Old password</p>
                                <div className=' w-[40%] flex flex-col gap-1 relative'>
                                    <input
                                        name="oldPassword"
                                        value={oldPassword.value}
                                        type={`${showPassOld ? 'text' : 'password'}`}
                                        onChange={(e) => { setOldPassword({ ...oldPassword, value: e.target.value }) }}
                                        className={`input money w-full h-12 rounded px-3 outline-green-700 
                                                            outline-[0.5px] bg-[#F5F5F5] 
                                                            ${oldPassword.validator && 'border-[1px] border-red-700'}`}

                                        placeholder='Enter Old Password'>
                                    </input>
                                    {
                                        showPassOld ?
                                            <VisibilityIcon onClick={() => { setShowPassOld(!showPassOld) }} className="absolute top-3 right-3" /> :
                                            <VisibilityOffIcon onClick={() => { setShowPassOld(!showPassOld) }} className="absolute top-3 right-3" />
                                    }
                                    <p className='text-red-700'>{oldPassword.message}</p>
                                </div>


                            </div>

                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    New Password</p>
                                <div className='w-[40%] flex flex-col gap-1 relative'>
                                    <input
                                        name="newPassword"
                                        value={newPassword.value}
                                        type={`${showPassNew ? 'text' : 'password'}`}
                                        onChange={(e) => { setNewPassword({ ...newPassword, value: e.target.value }) }}
                                        className={`input money w-full h-12 rounded px-3 outline-green-700 
                                                            outline-[0.5px] bg-[#F5F5F5] 
                                                            ${newPassword.validator && 'border-[1px] border-red-700'}`}

                                        placeholder='Enter New Password'>
                                    </input>
                                    {
                                        showPassNew ?
                                            <VisibilityIcon onClick={() => { setShowPassNew(!showPassNew) }} className="absolute top-3 right-3" /> :
                                            <VisibilityOffIcon onClick={() => { setShowPassNew(!showPassNew) }} className="absolute top-3 right-3" />
                                    }
                                </div>
                                <p className='text-red-700'>{newPassword.message}</p>

                            </div>

                            <div className='flex flex-col gap-3 '>
                                <p className="font-semibold">
                                    Retype Password</p>
                                <div className='w-[40%] flex flex-col gap-1 relative'>
                                    <input
                                        name="retypePassword"
                                        value={retypePassword.value}
                                        type={`${showPassReType ? 'text' : 'password'}`}

                                        onChange={(e) => { setRetypePassword({ ...retypePassword, value: e.target.value }) }}
                                        className={`input money w-full h-12 rounded px-3 outline-green-700 
                                                            outline-[0.5px] bg-[#F5F5F5] 
                                                            ${retypePassword.validator && 'border-[1px] border-red-700'}`}


                                        placeholder='Enter Retype Password'>
                                    </input>
                                    {
                                        showPassReType ?
                                            <VisibilityIcon onClick={() => { setShowReType(!showPassReType) }} className="absolute top-3 right-3" /> :
                                            <VisibilityOffIcon onClick={() => { setShowReType(!showPassReType) }} className="absolute top-3 right-3" />
                                    }
                                    <p className='text-red-700'>{retypePassword.message}</p>

                                </div>
                            </div>

                            <button className='w-60 text-white text-base font-semibold py-3 px-8 rounded-md bg-[#14a077]'
                                onClick={ChangePassword}
                            >Change Password</button>

                        </div>
                    </div>
            }
        </div>
    )
}

export default EmployerChangePassword