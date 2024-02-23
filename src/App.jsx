import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../src/Pages/Jobs/HomePage'
import HomeJobSearch from '../src/Pages/Jobs/HomeJobSearch';
import SingleJobDescription from '../src/Pages/Jobs/SingleJobDescription';
import EmployerDashBoard from './Pages/Employer/EmployerDashboard';
import EmployerHomePage from './Pages/Employer/EmployerHomePage';
import EmployerSingleJob from './Pages/Employer/EmployerSingleJob';
import EmployeerJobSearch from './Pages/Employer/EmployerJobSearch';
import CandidateHomePage from './Pages/Candidate/CandidateHomePage';
import CandidateJobSearch from './Pages/Candidate/CandidateJobSearch';
import CandidateSingleJob from './Pages/Candidate/CandidateSingleJob';
import CandidateDashboard from './Pages/Candidate/CandidateDashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Job Search */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/jobSearchHome" element={<HomeJobSearch />} />
          <Route exact path="/job/:employeerId/:getSingleJObId" element={<SingleJobDescription />} />

          {/* Employer */}
          <Route exact path="/EmployeerDashboard" element={<EmployerDashBoard />} />
          <Route exact path="/employeer" element={<EmployerHomePage />} />
          <Route exact path="/employeer/job/:employeerId/:getSingleJObId" element={<EmployerSingleJob />} />
          <Route exact path="/employer/jobSearch" element={<EmployeerJobSearch />} />

          {/* Candidate */}
          <Route exact path="/candidate" element={<CandidateHomePage />} />
          <Route exact path="/candidate/jobSearch" element={<CandidateJobSearch />} />
          <Route exact path="/candidate/job/:employeerId/:getSingleJObId" element={<CandidateSingleJob />} />
          <Route exact path="/candidate/dashboard" element={<CandidateDashboard />} />

        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
