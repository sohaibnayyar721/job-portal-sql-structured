import { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CandidateDetails({ candidateData, setShowDetails, showDetails }) {
  // console.log(candidateData)
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [designation, setDesignation] = useState('')
  let [skills, setSkills] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')
  let [password, setPassword] = useState('')
  let [experience, setExperience] = useState('')
  let [biography, setBiography] = useState('')
  let [previuosCompany, setPreviuosCompany] = useState('')
  let { employeerId, getSingleJObId } = useParams();


 let skillsArray = candidateData[0]?.skills?.replace(/"/g, '').split(',')

  async function ApplyNow() {

    // Removing the recentlyApplied field from  candidateData
    

    try {
      const postData = await fetch('http://localhost:4500/api/candidate/applyJob', {

        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ candidateData: candidateData, employeerId: employeerId, getSingleJObId: getSingleJObId })
      })

      const response = await postData.json()
      console.log(response)
      if (response.message === 'Success') {
        toast.success("Application submitted", {
          position: toast.POSITION.TOP_CENTER,
        });
        setShowDetails(false)

      }
    } catch (err) {
      console.log("Server Can't respond")
    }
  }


  console.log("this is candidate data", candidateData)
  return (
    <div className="">
      {
        showDetails ?
          candidateData.map((data,index) => {

            return (
              <div key={index} className="fixed top-0 py-12 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">



                <div className="w-full max-w-lg rounded-md">
                  <div className="flex flex-row-reverse rounded-t-md bg-white px-5 py-2">
                    <ToastContainer />

                    <CloseIcon className=""
                      onClick={() => setShowDetails(!showDetails)}
                    />
                  </div>

                  <div
                    className=" bg-white overflow-scroll  px-8 h-[80vh] flex flex-col gap-5 "
                  // style={{ transform: 'translateY(-50%)' }}  
                  >
                    {/* <div className="text-lg">
                      <label className="block text-gray-700  font-semibold mb-2" >
                        Username
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                      />

                    </div> */}

                    <div className="text-lg">
                      <label htmlFor="email" className="block  font-semibold leading-6 text-gray-900">
                        Full Name*
                      </label>
                      <div className="mt-2">
                        <input
                          value={data.fullName}
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => { setName(e.target.value) }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="text-lg">
                      <label htmlFor="email" className="block font-medium leading-6 text-gray-900">
                        Email*
                      </label>
                      <div className="mt-2">
                        <input
                          value={data.email}
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="email"
                          required
                          className="shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => { setEmail(e.target.value) }}
                        />
                      </div>
                    </div>


                    {/* Phone Number */}
                    <div className="text-lg">
                      <label htmlFor="email" className="block font-medium leading-6 text-gray-900">
                        Phone Number*
                      </label>
                      <div className="mt-2">
                        <input
                          value={data.phoneNumber}
                          id="phoneNumber"
                          name="phoneNumber"
                          type="number"
                          required
                          className=" shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => { setPhoneNumber(e.target.value) }}
                        />
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="text-lg">
                      <label htmlFor="email" className="block font-medium leading-6 text-gray-900">
                        Designation*
                      </label>
                      <div className="mt-2">
                        <input
                          value={data.designation}
                          id="Designation"
                          name="Designation"
                          type="text"
                          required
                          className="shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => { setDesignation(e.target.value) }}
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="text-lg">
                      <label htmlFor="email" className="block font-medium leading-6 text-gray-900">
                        Skills*
                      </label>
                      <div className="mt-2 w-full flex flex-wrap gap-3">
       
                      {
                        skillsArray?.map((data,index)=>{
                          return(
                            <div key={index} className=" bg-gray-200 rounded-md text-lg ">
                            <p className="text-black p-2  rounded-b-md">{data}</p>
                          </div>
                          )
                        })
                      }
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="text-lg">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block font-medium leading-6 text-gray-900">
                          Experience*
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          value={data.experience}
                          id="experience"
                          name="experience"
                          type="text"
                          autoComplete="current-password"
                          required
                          className="shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => { setExperience(e.target.value) }}
                        />
                      </div>
                    </div>


                    {/* Biography */}
                    <div className="text-lg">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block font-medium leading-6 text-gray-900">
                          Biography*
                        </label>
                      </div>
                      <div className="mt-2 ">
                        <textarea
                          value={data.biography}
                          id="biography"
                          name="biography"
                          type="text"
                          autoComplete="current-password"
                          required
                          className="shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                          onChange={(e) => { setBiography(e.target.value) }}
                        />
                      </div>
                    </div>

                    {
                      data.previuosCompany && (
                        <div className="text-lg">
                          <label htmlFor="email" className="block font-medium leading-6 text-gray-900">
                            Previous Company*
                          </label>
                          <div className="mt-2">
                            <input
                              value={data.previuosCompany}
                              id="Previous Company"
                              name="Previous Company"
                              type="text"
                              required
                              className="shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              onChange={(e) => { setPreviuosCompany(e.target.value) }}
                            />
                          </div>
                        </div>
                      )
                    }




                  </div>

                  <div className="bg-white px-3 py-3">
                    <button
                      className="flex w-full justify-center rounded-md bg-[#14A077] px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={ApplyNow}
                    >
                      Apply Now
                    </button>
                  </div>


                </div>

              </div>
            )
          })

          : ""
      }


    </div>
  )
}
