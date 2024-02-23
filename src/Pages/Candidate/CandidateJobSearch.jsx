import React from 'react'
import Navbar2 from '../../component/Navbar/Navbar2'
import JobSearch from '../../component/Job/JobSearch'
import Footer from '../../component/footer/Footer'
import { useState, useEffect } from 'react'
import ServerError from '../../component/Error/ServerError'
function CandidateJobSearch() {
  let [serverError, setServerError] = useState(false)
  let token = localStorage.getItem('token')

  async function getCandidateData() {

    try {
      const getData = await fetch('http://localhost:4500/candidate/dashboard', {

        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const response = await getData.json()
      if (response.message === "Invalid token" || response.message ==="Internal Server Error" ) {
        setServerError(true)
      }
      console.log(response)

    } catch (err) {
      setServerError(true)
    }

  }

  useEffect(() => {
    getCandidateData()
  }, [])
  return (
    <div>
      {
        serverError ?
          <div className='h-[100vh]'>
            <ServerError />
          </div>
          :
          <div>
            <Navbar2 />
            <JobSearch />
            <Footer />
          </div>
      }
    </div>

  )
}

export default CandidateJobSearch