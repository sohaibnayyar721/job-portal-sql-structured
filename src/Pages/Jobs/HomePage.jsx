import React, { useState } from 'react'
import Content from '../../component/Content/Content'
import Navbar1 from '../../component/Navbar/Navbar1'
import Footer from '../../component/footer/Footer'
function HomePage() {

    return (
        <div>
            <Navbar1 />
            <Content />
            <Footer />
        </div>
    )
}

export default HomePage