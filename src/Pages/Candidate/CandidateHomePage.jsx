
import { useEffect, useState } from 'react';
import '../../css/navbar.css'
import Content from '../../component/Content/Content';
import Navbar2 from '../../component/Navbar/Navbar2';
import Footer from '../../component/footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../../component/Error/ServerError';

function CandidateHomePage() {
    const alertShown = localStorage.getItem('alertShown');
    let token = localStorage.getItem('token')
    let [serverError, setServerError] = useState(false)

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
        if (!alertShown) {
            toast.success("Successfully Login!", {
                position: "top-center"
            });
        }

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
                    <div >
                        <ToastContainer />
                        <Navbar2 />
                        <Content />
                        <Footer />
                    </div>
            }
        </div>


    )

}

export default CandidateHomePage