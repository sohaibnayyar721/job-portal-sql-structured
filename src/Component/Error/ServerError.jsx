import ErrorLogo from '../../assets/pictures/ErrorLogo.jpg'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function ServerError() {

  const locations = useLocation()
  const navigate = useNavigate()

 function handleHomePage() {

    if (locations.pathname.includes('candidate')) {
        navigate(`/candidate`)
    }
    else if (locations.pathname.includes('employeer')) {
        navigate(`/employeer`)
    }
    else {
        navigate(`/`)
    }
}

  return (
    <>
      <main className=" font-plus-jakarta grid h-full place-items-center bg-white py-24 px-6  sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
          <img src={ErrorLogo}></img>
          <div className='flex flex-col items-center gap-3'>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Server Cannot Respond </h1>
            <p className="mt-6 text-xl font-semibold leading-7 text-gray-600">Something Went Wrong</p>
            <div className="mt-5 flex items-center justify-center gap-x-6">
              <button
                onClick={handleHomePage}
                className="rounded-md bg-[#14A077] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </button>
            </div>

            {/* <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a> */}
          </div>
        </div>
      </main>
    </>
  )
}
