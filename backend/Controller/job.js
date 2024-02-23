
const { EmployerModel, EmployerJobModel } = require('../model/EmployerData')
const { createConnection } = require('../sqlConnection')

//  Get All Jobs
const getAllJobs = async (req, res) => {
    try {

        let connection = await createConnection()
        let query = ' SELECT employer.companyLogo, employer.companyName, jobs.jobTitle, jobs.date, jobs.location, jobs.minSalary, jobs.maxSalary, jobs.jobType, jobs.category, jobs.employerID, jobs.jobID from jobs JOIN employer where jobs.employerID = employer.employerID  '

        let [employers] = await connection.query(query)

        const totalCategory = []
        const countCategory = {};

        const totalTitle = []
        const countTitle = {};

        const totalLocation = []
        const countLocation = {};

        employers.forEach(element => {
            countTitle[element.jobTitle] = (countTitle[element.jobTitle] || 0) + 1;
            countCategory[element.category] = (countCategory[element.category] || 0) + 1;
            countLocation[element.location] = (countLocation[element.location] || 0) + 1;

        });

        const specificCountryCounts = {
            Turkey: countLocation['Turkey'] || 0,
            Pakistan: countLocation['Pakistan'] || 0,
            Bangladesh: countLocation['Bangladesh'] || 0,
            SaudiArabia: countLocation['Saudi Arabia'] || 0,
            Malaysia: countLocation['Malaysia'] || 0,
            Egypt: countLocation['Egypt'] || 0,
            Indonesia: countLocation['Indonesia'] || 0,
            Morocco: countLocation['Morocco'] || 0,

        }

        totalCategory.push(countCategory)
        totalTitle.push(countTitle)
        totalLocation.push(specificCountryCounts)

        res.json({
            allJobs: employers,
            categories: totalCategory,
            title: totalTitle,
            jobByLocation: specificCountryCounts
        })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Get filter Jobs
const filterJobs = async (req, res) => {
    try {
        let { jobTitle, listLocation, category, jobTypes, minSalaray, maxSalaray,
            industry, careerLevel, experience } = req.body

        let query = 'SELECT employer.companyLogo, employer.companyName, jobs.jobTitle, jobs.date, jobs.location, jobs.minSalary, jobs.maxSalary, jobs.jobType, jobs.category, jobs.employerID, jobs.jobID FROM jobs JOIN employer ON jobs.employerID = employer.employerID WHERE 1=1 ';

        if (jobTitle) {
            query += `AND jobs.jobTitle LIKE '${jobTitle}%'`;
        }
        
        if (category) {
            query += ` AND jobs.category = '${category}'`;
        }
        
        if (jobTypes) {
            query += ` AND jobs.jobType = '${jobTypes}'`;
        }
        
        if (experience) {
            query += ` AND jobs.Experience = '${experience}'`;
        }
        
        if (listLocation) {
            query += ` AND jobs.location = '${listLocation}'`;
        }
        
        if (minSalaray) {
            query += ` AND jobs.minSalary >= ${minSalaray}`;
        }
        
        if (maxSalaray) {
            query += ` AND jobs.maxSalary <= ${maxSalaray}`;
        }
        
        const connection = await createConnection()

        let [rows] = await connection.query(query)
        res.json({ FindData: rows })

    } catch (err) {
        res.json({ error: err })
    }
}

// Get Single Jobs

const singleJobs = async (req, res) => {
    let employeerId = req.params.employeerId
    let singleJobId = req.params.singleJobId

    try {

        const connection = await createConnection()
        let query = 'SELECT employer.companyLogo, employer.companyName, jobs.* FROM jobs JOIN employer ON jobs.employerID = employer.employerID WHERE jobs.employerID = ? AND employer.employerID = ? AND jobs.jobID = ?'

        let [rows] = await connection.query(query, [employeerId, employeerId, singleJobId])
        // if (!getJob) {
        //     return res.status(404).json({ message: "Can't found Data" })
        // }
        res.status(200).json({ getJobs: rows })
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ error: err })
    }
}

module.exports = { getAllJobs, filterJobs, singleJobs }