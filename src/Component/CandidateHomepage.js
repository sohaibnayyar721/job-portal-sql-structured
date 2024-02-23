
import logo from '../Assets/logo.png'
import CategoryLogo from '../Assets/categoryLogo.png'
import ArrowDown from '../Assets/ArrowDown.png'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import GridViewIcon from '@mui/icons-material/GridView';
import { useEffect, } from 'react';
import './navbar.css'
import { useNavigate } from 'react-router-dom';
import Content from './content';
import CandidateDashboard from './CandidateDashboard';
import Navbar2 from './navbar2';
import Footer from './footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CandidateHomePage() {
    const alertShown = localStorage.getItem('alertShown');
    useEffect(() => {
        if (!alertShown) {
            
            toast.success("Successfully Login!", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }, [])
    return (

        <div >
            <ToastContainer />
            <Navbar2 />
            <Content />
            <Footer />
        </div>

    )

}

export default CandidateHomePage