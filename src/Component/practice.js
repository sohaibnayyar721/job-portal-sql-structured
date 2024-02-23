import React from "react"
import ContentLoader from "react-content-loader"

const Practice = (props) => (
    <div className="w-full h-full bg-red-300">
        <ContentLoader
            speed={2}
            width="100%"
            height="100vh"
            viewBox="0 0 476 250"
            backgroundColor="#f5f5f5"
            foregroundColor="#ced1d6"
            {...props}
        >
            
            <rect  y="0" rx="0" width="19%" height="6vh" />
            <rect x="21%" y="0" rx="0" ry="0" width="19%" height="6vh" />
            <rect x="42%" y="0" rx="0" ry="0" width="19%" height="6vh" />

            {/* Second row */}
            <rect x="0%" y="23%" rx="0" ry="0" width="55%" height="100vh" />
            <rect x="56%" y="23%" rx="0" ry="0" width="30%" height="100vh" />



        </ContentLoader>
    </div>

)

export default Practice