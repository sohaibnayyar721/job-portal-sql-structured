import React, { useState } from 'react'
import Content from './content'
import Navbar from './navbar'
import Footer from './footer'
import Navbar2 from './navbar2'
import { useEffect } from 'react'
function HomePage() {

    return (
        <div>
            <Navbar />
            <Content />
            <Footer />
        </div>
    )
}

export default HomePage