import logo from './logo.svg';
import './App.css';
import Navbar from './Component/navbar';
import Content from './Component/content';
import Footer from './Component/footer';
import EmployeerDashboard from './Component/EmployeerDashboard';
import Practice from './Component/practice';
import JobDescription from './Component/jobDescription';
import EmployeerSignUp from './Component/EmployeerSignUp';
import CandidateSignUp from './Component/CandidateSignUp';
import Login from './Component/Login'
import FormJobs from './Component/JobsForm'
import { BrowserRouter, Routes, Route, Switch, useRoutes, } from "react-router-dom";
import CandidateDashboard from './Component/CandidateDashboard';
import CandidateDetails from './Component/CandidateDetails';
import { useState } from 'react';
import Navbar2 from './Component/navbar2';
import HomePage from './Component/HomePage';
import CandidateHomePage from './Component/CandidateHomepage';
// import AboutUs from './Component/aboutUs/AboutUs';
import Employeer from './Component/EmployerHomePage'
import JobSearchHome from './Component/JobSearchHome';
import JobSearchCandidate from './Component/JobSearchCandidate';
import Loader from './Component/loader'
import EmployerSingleJob from './Component/EmployerSingleJob';
import CandidateSingleJob from './Component/CandidateSingleJob';
import SingleJob from './Component/SingleJob';
import EmployeerJobSearch from './Component/EmployeerJobSearch';


function App() {

  // Get Data From "Login.js" and send data to "CandidateDetails.js" After Successfull Login to 
  // Show Candidate data to "CandidateDetails.js"

  let [candidateData, setCandidateData] = useState('')
  function userData(data) {
    setCandidateData(data)
    console.log(data)
  }

  // Get Employer Id From "jobDescription.js" and send it to "CandidateDetails.js"
  // to send Employer ID to api
  let [employerId, setEmployerId] = useState('')
  function employerID(data) {
    setEmployerId(data)
    console.log("EmployerId", data)
  }

  return (
    <div className='overflow-hidden'>
      <BrowserRouter>
        <Routes>

          {/* Job Search */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/jobSearchHome" element={<JobSearchHome />} />
          <Route exact path="/job/:employeerId/:getSingleJObId" element={<SingleJob />} />


          {/* Employer Routes */}
          <Route exact path="/EmployeerDashboard" element={<EmployeerDashboard />} />
          <Route exact path="/employeer" element={<Employeer />} />
          <Route exact path="/employeer/job/:employeerId/:getSingleJObId" element={<EmployerSingleJob />} />
          <Route exact path="/employer/jobSearch" element={<EmployeerJobSearch />} />



          {/* Research Stuff */}
          <Route exact path="/practice" element={<Practice />} />
          <Route exact path="/loader" element={<Loader />} />


          {/* Candidate Routes */}
          <Route exact path="/candidate/job/:employeerId/:getSingleJObId" element={<CandidateSingleJob />} />

          <Route exact path="/candidate/jobSearch" element={<JobSearchCandidate />} />
          <Route exact path="/candidate/signUp" element={<CandidateSignUp />} />
          <Route exact path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route exact path="/candidate" element={<CandidateHomePage />} />
          <Route exact path="/candidateDetails" element={<CandidateDetails
            employerId={employerId}
            candidateData={candidateData} />} />

        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
      {/* <Content />
      <CandidateDashboard />
      <JobDescription /> */}
      {/* <CandidateDashboard /> */}

    </div>
  );
}

export default App;
