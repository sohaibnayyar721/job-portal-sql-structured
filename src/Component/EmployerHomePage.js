import React from 'react'
import Navbar3 from '../Component/navbar3'
import Content from '../Component/content'
import Footer from '../Component/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Employer from '../Component/EmployeerDashboard'

function EmployerHomePage() {

  return (

    <div>
      {/* <ToastContainer /> */}
      <Navbar3 />
      <Content />
      <Footer />
    </div>
  )
}

export default EmployerHomePage