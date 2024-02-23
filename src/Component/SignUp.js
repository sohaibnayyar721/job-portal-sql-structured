import { useEffect, useState } from "react"

export default function SignUp() {

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [designation, setDesignation] = useState('')
  let [skills,setSkills] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')
  let [password, setPassword] = useState('')
  let [experience, setExperience] = useState('')
  let [biography, setBiography] = useState('')
  let [previuosCompany, setPreviuosCompany] = useState('')
  

  async function SignUp() {
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkEmail = emailPattern.test(email)

    if(!name || !email || !previuosCompany || !password || !biography || !confirmPassword || !phoneNumber || !designation || !skills || !experience){
      alert("Please fill all input fields")
    }

    else if (confirmPassword !== password) {
      alert("Password not match")
    }

    else if(!checkEmail){
      alert("Invalid Email")
    }

    else if(password.length<7){
      alert("password lenght is greater than 7")
    }

    else {
      try {
        const postData = await fetch('http://localhost:4500/api/candidate/SignUp', {

          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(
            { name: name, 
              email: email, 
              password: password ,
              designation:designation,
              skills:skills,
              phoneNumber:phoneNumber,
              experience:experience,
              biography:biography,
              previuosCompany:previuosCompany,

            })
        })

        const response = await postData.json()
        console.log(response)
        if (response) {
          alert(response.message)
        }

        // const response = await getFeaturedJob.json()
        // setGetFeaturedJobData(response.jobsData)
      } catch (err) {
        console.log("Server Can't respond")
      }
    }

  }

  return (
    <>
      <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-[50%]">
          <div className="space-y-6">

            {/* Name */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name*
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setName(e.target.value) }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email*
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="email"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number*
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Designation*
              </label>
              <div className="mt-2">
                <input
                  id="Designation"
                  name="Designation"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setDesignation(e.target.value) }}
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Skills*
              </label>
              <div className="mt-2">
                <input
                  id="Skills"
                  name="Skills"
                  type="text"
                  autoComplete="email"
                  required
                  className="block  h-52 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setSkills(e.target.value) }}
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Experience*
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setExperience(e.target.value) }}
                />
              </div>
            </div>

            {/* Biography */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Biography*
                </label>
              </div>
              <div className="mt-2 ">
                <input
                  id="biography"
                  name="biography"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="block h-52 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setBiography(e.target.value) }}
                />
              </div>
            </div>

            {/*  Previous Company */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Previous Company*
              </label>
              <div className="mt-2">
                <input
                  id="Previous Company"
                  name="Previous Company"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setPreviuosCompany(e.target.value) }}
                />
              </div>
            </div>

            {/*  Password*/}
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
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>
            </div>

            {/*  Confirm Password*/}
            <div>
              <label htmlFor="Confirm Password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password*
              </label>
              <div className="mt-2">
                <input
                  id="Confirm Password"
                  name="Confirm Password"
                  type="password"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-[#14A077] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
    </>
  )
}
