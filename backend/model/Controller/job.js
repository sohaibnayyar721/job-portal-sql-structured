
const { EmployerModel, EmployerJobModel } = require('../model/EmployerData')
const connect = require('../index')

//  Get All Jobs
const getAllJobs = async (req, res) => {
    try {

        let connection = await createConnection()
        let query = ' SELECT employer.companyLogo, employer.companyName, jobs.jobTitle, jobs.date, jobs.location, jobs.minSalary, jobs.maxSalary, jobs.jobType, jobs.category, jobs.employerID, jobs.jobID   from jobs JOIN employer where jobs.employerID = employer.employerID  '

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
            allJobs: employers
            , categories: totalCategory,
            title: totalTitle,
            jobByLocation: specificCountryCounts
        })


    }
    catch (err) {
        console.log(err)
        res.json({ error: err })
    }
}

// Get filter Jobs
const filterJobs = async (req, res) => {
    try {
        let { jobTitle, listLocation, category, jobTypes, minSalaray, maxSalaray,
            industry, careerLevel, experience } = req.body
        let obj = {

            jobTitle: { $regex: `^${jobTitle}` },
            // jobTitle:{ $regex: jobTitle},
            location: listLocation,
            category: category,
            type: jobTypes, industry: industry,
            careerLevel: careerLevel,
            Experience: experience,
            minSalary: { $gte: parseInt(minSalaray) },
            maxSalary: { $lte: parseInt(maxSalaray) },
        }

        for (let i in obj) {
            if (obj[i] === "") {
                delete obj[i]
            }
        }

        const connection = await createConnection()
        let query = 'SELECT employer.companyLogo, employer.companyName, jobs.* FROM jobs JOIN employer ON jobs.employerID = employer.employerID WHERE jobs.employerID = ? AND employer.employerID = ? AND jobs.jobID = ?'

        let [rows] = await connection.query(query,[employeerId,employeerId,singleJobId])

        // const employers = await EmployerJobModel.find(obj);
        // console.log("This is employers", employers)
        // res.json({ FindData: employers })
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

        let [rows] = await connection.query(query,[employeerId,employeerId,singleJobId])
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