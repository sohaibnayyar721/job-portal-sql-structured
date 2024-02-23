import React from 'react'
import ContentLoader from "react-content-loader"

function loader(props) {
    return (


        // <div className=" bg-red-300 m-0 p-0">
        // <ContentLoader
        //     speed={2}
        //     width="100%"
        //     height="100vh"
        //     viewBox="0 0 476 240"
        //     backgroundColor="#f5f5f5"
        //     foregroundColor="#ced1d6"
        //     {...props}
        // >

        //     <rect x="0"  y="0" rx="0" width="19%" height="6vh" />
        //     <rect x="21%" y="0" rx="0" ry="0" width="19%" height="6vh" />
        //     <rect x="42%" y="0" rx="0" ry="0" width="19%" height="6vh" />

        //     {/* Second row */}
        //     <rect x="0%" y="23%" rx="0" ry="0" width="55%" height="100vh" />
        //     <rect x="56%" y="23%" rx="0" ry="0" width="30%" height="100vh" />



        // </ContentLoader>
        //  </div>
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white  z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-l-2 border-b-2  border-green-500"></div>
        </div>
    )
}

export default loader