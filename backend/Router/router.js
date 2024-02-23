const express = require('express')
const router = express.Router()
const {getAllJobs, filterJobs, singleJobs} = require('../Controller/job')
const { candidateAuthentication, candidateDashboard, candidateLogin, candidateSignUp, candidateApplyJob, candidateRecentlyApplied } = require('../Controller/candidate')
const  { employerLogin, employerAuthentication, employerDashboard, employerSignUp, employerPostJob, employerApplicants, employerDashboardData, employerShortListCandidate, getShortlistCandidate, employerGetJobs, employerGetSingleJob, employerDeleteJob, employerEditJob, employerChangePassword } = require('../Controller/employer')
const multer = require('multer');


// Jobs Routes

router.get('/getAllData', getAllJobs)
router.get('/job/:employeerId/:singleJobId', singleJobs)

router.post('/job/filter', filterJobs)

// Candidate Routes

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/candidate/dashboard', candidateAuthentication, candidateDashboard)
router.get('/candidate/recentlyApplied', candidateAuthentication, candidateRecentlyApplied)

candidateRecentlyApplied    
router.post('/api/candidate/login', candidateLogin)
router.post('/api/candidate/SignUp', upload.single('pdf') ,candidateSignUp)

router.put('/api/candidate/applyJob', candidateApplyJob)


// Employer Routes

router.get('/employeer/dashboard', employerAuthentication, employerDashboard)
router.get('/employer/applicants', employerAuthentication, employerApplicants)
router.get('/employer/dashboard/data', employerAuthentication, employerDashboardData)
router.get('/employer/shortlistCandidate/data', employerAuthentication, getShortlistCandidate)
router.get('/employer/getAllJob', employerAuthentication, employerGetJobs)
router.get('/employeer/edit/:jobID', employerGetSingleJob)

router.post('/api/employeer/login', employerLogin)
router.post('/api/employeer/SignUp', upload.single('companyLogo'), employerSignUp)
router.post('/employerAddJob',upload.single('image'), employerPostJob)
router.post('/employer/ShortListCandidate', employerShortListCandidate)

router.delete('/employeer/delete/jobs/:jobID',employerDeleteJob)

router.put('/employeer/changePassword', employerChangePassword)
router.put('/employeer/edit/jobs',upload.single('image'), employerEditJob)





module.exports = router