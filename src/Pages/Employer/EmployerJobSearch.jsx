import React from 'react'
import Navbar3 from '../../component/Navbar/Navbar3'
import JobSearch from '../../component/Job/JobSearch'
import Footer from '../../component/footer/Footer'
import { useEffect, useState } from 'react'
import ServerError from '../../component/Error/ServerError'

function EmployeerJobSearch() {
  let token = localStorage.getItem('token')
  let [serverError, setServerError] = useState(false)

  useEffect(() => {
    async function getEmployerData() {
      try {
        const getData = await fetch('http://localhost:4500/employeer/dashboard', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        const response = await getData.json()
        if (response.message === 'Internal Server Error' || response.message === 'Invalid token') {
          setServerError(true)

        }
        console.log("this is from employeer job search", response)

      }
      catch (err) {
        setServerError(true)
      }
    }
    getEmployerData()
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
            <Navbar3 />
            <JobSearch />
            <Footer />
          </div>
      }

    </div>
  )
}

export default EmployeerJobSearch