const { EmployerModel, EmployerJobModel } = require('../model/EmployerData')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
const {createConnection} = require('../sqlConnection')

// Employer Login
const employerLogin = async (req, res) => {
    let { email, password } = req.body

    try {

        const connection = await createConnection()

        let [rows] = await connection.query('SELECT * FROM `employer` where `email` = ?', [email])

        if (rows.length === 0) {
            return res.json({ message: "The provided login credentials are incorrect. Please use your email and password to log in" })
        }

        let matchPassword = await bcrypt.compare(password, rows[0].password)

        if (!matchPassword) {
            return res.json({ message: "The provided login credentials are incorrect. Please use your email and password to log in" })
        }

        let token = jwt.sign(rows[0].employerID, 'secretkey')

        res.status(200).json({ token: token, message: "Login Successfull" })

    } catch (err) {
        res.json({ message: "Internal Server Error" })

    }

}

// Employer Authentication
const employerAuthentication = async (req, res, next) => {

    let header = req.headers['authorization']
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, 'secretkey', async (err, data) => {
            if (err) {
                return res.json({ message: "Invalid token" });
            } else {
                req.id = data
                next();
            }
        })


    } else {

        res.send('forbidden')
    }

}

// Employer Dashboard
const employerDashboard = async (req, res) => {
    let id = req.id
    try {
        let connection = await createConnection()
        let [findEmployer] = await connection.query('SELECT * FROM `employer` WHERE `employerID` = ?', [id])

        if (findEmployer.length === 0) {
            return res.json({ message: "invalid user" })
        }

        res.json({
            message: 'Successful log in',
            authenticated: true,
            employeerData: findEmployer,

        });

    } catch (err) {
        console.log(err)
        res.json({ message: "Internal Server Error" })
    }

}

// Employer Sign Up
cloudinary.config({
    cloud_name: 'ds8i8guuh',
    api_key: '376944176752133',
    api_secret: '0dBjGIiqRFgwI5VLP6VGN6g2YxI',
});

const employerSignUp = async (req, res) => {
    const { email, password, companyName, LinkedInUrl } = req.body
    try {

        let connection = await createConnection()

        const [rows] = await connection.query('SELECT * FROM `employer` WHERE `email` = ?', [email]);
        if (rows.length > 0) {
            return res.json({ message: "user already exists" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const result = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Error while uploading file" });
                }

                const imageUrl = result.secure_url;
                const values = [imageUrl, LinkedInUrl, email, hashpassword, companyName]

                connection.query('INSERT INTO employer(companyLogo, LinkedInUrl, email, password, companyName) VALUES (?)', [values], (err, result) => {
                    if (err) {
                        return res.json({ message: "error while inserting data" })
                    }
                })
            }

        ).end(req.file.buffer);
        res.json({ message: "user created successfully!!!" })
        // ---------------End------------------

    } catch (err) {
        res.json({ message: "Internal Server Error" })
    }
}

// Employer Post Job
const employerPostJob = async (req, res) => {

    try {
        let { employerID, jobTitle, category, location, jobType, minSalary,
            maxSalary, date, JobApplyType, SalaryType, Experience,
            jobDescription, applicationDeadlineDate,
            externalURLforApplyJob, jobApplyEmail,
            gender, tag, industry, qualification, careerLevel,
            friendlyAddress, city, address, phoneNumber, zipCode } = req.body

        const currentDate = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        let connection = await createConnection()
        let query = 'INSERT INTO jobs(jobTitle,jobDescription,category,jobType,address,jobApplyType,externalURLforApplyJob,jobApplyEmail,phoneNumber,SalaryType,minSalary,maxSalary,date,careerLevel,Experience, location, city,zipCode,employerID, applicationDeadlineDate) VALUES(?)'
        let values = [jobTitle, jobDescription, category, jobType, address, JobApplyType, externalURLforApplyJob, jobApplyEmail, phoneNumber, SalaryType, minSalary, maxSalary, formattedDate, careerLevel, Experience, location, city, zipCode, employerID, applicationDeadlineDate]

        let [rows] = await connection.query(query, [values])

        res.json({ message: "Job Posted Successfully" })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Internal Server Error" })
    }
}

// GET Employer's Applicants

const employerApplicants = async (req, res) => {
    let id = req.id
    try {
        let connection = await createConnection()
        const [rows] = await connection.query(`
        SELECT jobs.jobTitle,
        JSON_ARRAYAGG(
        JSON_OBJECT(
            'fullName', candidate.fullName,
            'designation', candidate.designation,
            'resume', candidate.resume,
            'status', applicants.status,
            'candidateID', applicants.candidateID,
            'employerID', applicants.employerID,
            'applicantID', applicants.applicantID

            )
        ) AS candidates_info

        FROM employer 
        JOIN applicants ON employer.employerID = applicants.employerID
        JOIN jobs ON applicants.jobID = jobs.jobID
        JOIN candidate ON applicants.candidateID = candidate.candidateID
        WHERE employer.employerID = ?
        GROUP BY jobs.jobTitle `
            , [id]);


        res.json({ applicants: rows })
    } catch (err) {
        res.status(404).json({ message: "Internal server error" })
    }

}

// GET Employer's dashboard data
const employerDashboardData = async (req, res) => {
    let id = req.id
    try{
        let connection = await createConnection()
        const [rows] = await connection.query(`
        SELECT 
            (SELECT COUNT(*) FROM jobs WHERE employerID = ?) AS total_jobs,
            (SELECT COUNT(*) FROM applicants WHERE employerID = ?) AS total_applicants,
            (SELECT COUNT(*) FROM shortlistcandidate WHERE employerID = ?) AS shortlist_candidate
        `, [id, id, id]);
    
        res.json({ data: rows })
    }catch(err){
        res.status(404).json({message :"Internal Server Error"})
    }

}

// Employer Add Candidate To Shortlist
const employerShortListCandidate = async (req, res) => {
    let id = req.id
    let { employerID, candidateID, applicantID } = req.body
    try {

        let connection = await createConnection()
        let values1 = [employerID, candidateID]
        let values2 = [applicantID]

        const [rows] = await connection.query(`INSERT INTO shortlistcandidate(employerID, candidateID) VALUES (?)`, [values1])
        const [deleteApplicants] = await connection.query(`DELETE FROM applicants WHERE applicantID = ?`, [applicantID])
        res.json({ message: "added to shortlist" })

    } catch (err) {
        res.status(404).json({ message: "Internal Server Error" })
    }
}

// Get Shortlist Candidate

const getShortlistCandidate = async (req, res) => {
    let id = req.id
    try {
        let connection = await createConnection()
        const [rows] = await connection.query(`
        SELECT candidate.candidateID, candidate.fullName, candidate.designation
        FROM employer
        JOIN shortlistcandidate ON employer.employerID = shortlistcandidate.employerID
        JOIN candidate ON candidate.candidateID = shortlistcandidate.candidateID
        WHERE employer.employerID = ?
        `, [id])

        res.json({ shortlistData: rows })


    } catch (err) {
        res.status(404).json({ message: "Internal Server Error" })
    }
}

// Get All Jobs
const employerGetJobs = async (req, res) => {
    let id = req.id
    try {
        let connection = await createConnection()
        const [rows] = await connection.query(`
        SELECT 
        jobs.jobID,
        jobs.jobTitle,
        jobs.city,
        jobs.date,
        jobs.applicationDeadlineDate,
        COUNT(applicants.applicantID) AS totalApplicants
        FROM jobs
        LEFT JOIN employer ON jobs.employerID = employer.employerID
        LEFT JOIN applicants ON jobs.jobID = applicants.jobID
        WHERE employer.employerID = ?
        GROUP BY jobs.jobID, jobs.jobTitle, jobs.city, jobs.applicationDeadlineDate, employer.employerID;
        `, [id])

        // console.log(rows)
        res.json({ jobs: rows })

    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Internal Server Error" })
    }
}

// Get Single Job Data In Edit Page

const employerGetSingleJob = async (req, res) => {
    let { jobID } = req.params
    try {
        let connection = await createConnection()
        let [rows] = await connection.query(`SELECT * FROM jobs WHERE jobs.jobID = ?`, [jobID])
        res.status(200).json({ jobData: rows })
    } catch (err) {
        res.status(404).json({ message: "Internal Server Error" })
    }


}

// Employer Delete Job

const employerDeleteJob = async (req, res) => {
    let { jobID } = req.params
    try {
        let connection = await createConnection()
        let [rows] = await connection.query(`DELETE FROM applicants WHERE jobID = ?`, [jobID]);
        let [deleteResult] = await connection.query(`DELETE FROM jobs WHERE jobID = ?`, [jobID]);

        res.status(200).json({ message: "Job Deleted Successfully" })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Internal server error" })
    }
}

// Employer Edit Job

const employerEditJob = async (req, res) => {
    let { jobID, jobTitle, applicationDeadlineDate, category, location
        , minSalary, maxSalary, jobDescription, JobApplyType, jobType,
        SalaryType, Experience, externalURLforApplyJob, jobApplyEmail,
        careerLevel, city, phoneNumber, address, zipCode } = req.body
    try {
        let connection = await createConnection()
        let [rows] = await connection.query(`
        UPDATE jobs 
        SET jobTitle = ?, jobDescription= ?, category=? , jobType=?, address=?, jobApplyType=?, externalURLforApplyJob=?, jobApplyEmail=?, phoneNumber=?, SalaryType=?, minSalary=?, maxSalary=?, careerLevel=?, Experience=?, location=?, city=?, zipCode=?, applicationDeadlineDate=?  
        WHERE jobID = ? `, [jobTitle, jobDescription, category, jobType, address, JobApplyType, externalURLforApplyJob, jobApplyEmail, phoneNumber, SalaryType, minSalary, maxSalary, careerLevel, Experience, location, city, zipCode, applicationDeadlineDate, jobID]);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "Internal Server" })
        }

        res.status(200).json({ message: "Job updated Successfully" })


    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Internal server error" })
    }
}

const employerChangePassword = async (req, res) => {
    let { employeerId, oldPassword, newPassword } = req.body
    try {
        let connection = await createConnection()
        let [findEmployer] = await connection.query(`SELECT * FROM employer WHERE employerID=?`, [employeerId])

        let matchPassword = await bcrypt.compare(oldPassword, findEmployer[0].password)
        if (!matchPassword) {
            return res.json({ message: "Incorrect old Password" })
        }

        const hashpassword = await bcrypt.hash(newPassword, 10)

        let [rows] = await connection.query(`
        UPDATE employer 
        SET password = ?
        WHERE employerID = ? `, [hashpassword, employeerId]);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "Internal Server" })
        }

        res.status(200).json({ message: "Password updated Successfully" })

    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Internal Server Error" })
    }
}



module.exports = { employerLogin, employerAuthentication, employerDashboard, employerSignUp, employerPostJob, employerApplicants, employerDashboardData, employerShortListCandidate, getShortlistCandidate, employerGetJobs, employerGetSingleJob, employerDeleteJob, employerEditJob, employerChangePassword }