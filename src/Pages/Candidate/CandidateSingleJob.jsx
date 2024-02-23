import React from 'react'
import Navbar2 from '../../component/Navbar/Navbar2'
import JobDescription from '../../component/Job/JobDescription'
import Footer from '../../component/footer/Footer'
import { useState, useEffect } from 'react'
import ServerError from '../../component/Error/ServerError'
function CandidateSingleJob() {
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
            if (response.message === "Invalid token") {
                setServerError(true)
            }

        } catch (err) {
            setServerError(true)
            console.log("Server Can't respond")
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
                        <JobDescription />
                        <Footer />
                    </div>
            }
        </div>

    )
}

export default CandidateSingleJob