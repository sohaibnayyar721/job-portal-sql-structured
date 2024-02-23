import React from 'react'

function Loader() {
    return (

        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white  z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-l-2 border-b-2  border-green-500"></div>
        </div>
    )
}

export default Loader