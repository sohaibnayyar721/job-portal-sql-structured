const candidateModel = require('../model/CandidateData')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const { EmployerModel, EmployerJobModel } = require('../model/EmployerData')
const nodemailer = require('nodemailer')
const { insertFunction, findFunction } = require('../sql_Qeury')
const sqlConnection = require('../sqlConnection')
const mySql2 = require('mysql2/promise')

// Candidate Authentication
const candidateAuthentication = async (req, res, next) => {

    let header = req.headers['authorization']
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, 'secretkey', async (err, data) => {

            if (err) {
                return res.status(404).json({ message: "Invalid token" });
            } else {
                req.id = data
                next();
            }
        })


    } else {
        res.sendStatus(403).json({message: "Undefined Headers"})
    }
}

// Candidate Dashboard
const candidateDashboard = async (req, res) => {
    let id = req.id
    try {
        let connection = await sqlConnection()
        let [findCandidate] = await connection.query('SELECT * FROM `candidate` WHERE `candidateID` = ?', [id])

        if (findCandidate.length === 0) {
            return res.json({ message: "invalid user" })
        }

        res.json({
            message: 'Successful log in',
            authenticated: true,
            findCandidate: findCandidate,

        });

    } catch (err) {
        console.log(err)
    }

}

// Candidate Login

const candidateLogin = async (req, res) => {
    let { email, password } = req.body

    try {

        const connection = await sqlConnection()

        let [rows] = await connection.query('SELECT * FROM `candidate` where `email` = ?', [email])

        if (rows.length === 0) {
            return res.json({ message: "The provided login credentials are incorrect. Please use your email and password to log in" })
        }

        let matchPassword = await bcrypt.compare(password, rows[0].password)

        if (!matchPassword) {
            return res.json({ message: "The provided login credentials are incorrect. Please use your email and password to log in" })
        }

        let token = jwt.sign(rows[0].candidateID, 'secretkey')

        res.status(200).json({ token: token, message: "Login Successfull" })

    } catch (err) {
        console.log(err)
    }
}

// Candidate Sign Up
cloudinary.config({
    cloud_name: 'ds8i8guuh',
    api_key: '376944176752133',
    api_secret: '0dBjGIiqRFgwI5VLP6VGN6g2YxI',
});

const candidateSignUp = async (req, res) => {
    const { name, email, password, designation, skills, phoneNumber, experience, biography, previuosCompany } = req.body

    let skillsString = '';

    for (let i = 0; i < skills.length; i++) {
        if (skills[i] !== '[' && skills[i] !== ']') {
            skillsString += skills[i];
        }
    }

    try {

        let connection = await sqlConnection()

        const [rows] = await connection.query('SELECT * FROM `candidate` WHERE `email` = ?', [email]);
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
                const values = [email, name, hashpassword, phoneNumber, biography, experience, previuosCompany, designation, imageUrl, skillsString]

                connection.query('INSERT INTO candidate(email, fullName, password, phoneNumber, biography, experience, previousCompany, designation, resume, skills) VALUES (?)', [values], (err, result) => {
                    if (err) {
                        return res.json({ message: "error while inserting data" })
                    }
                })
            }

        ).end(req.file.buffer);
        res.json({ message: "user created successfully!!!" })
        // ---------------End------------------

    } catch (err) {
        console.log(err)
    }
}


// _____________________Candidate signup END__________________________



// Send Email Function
let emailsend = async (name, email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: "465",
        secure: true,
        // service: "gmail",
        auth: {
            user: process.env.user,
            pass: process.env.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailoption = {
        from: "sohaibsobbi.444@gmail.com",
        to: email,
        subject: "Successfull apply",
        text: `${name} your email is successfully sent.`
    }

    transporter.sendMail(mailoption, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('email sent ', info.response)
        }
    })
}

// Candidate Apply Job
const candidateApplyJob = async (req, res) => {
    const { candidateData, employeerId, getSingleJObId } = req.body

    let candidateID = req.body.candidateData[0].candidateID

    try {
        const connection = await sqlConnection()
        let query = 'INSERT INTO applicants(jobID,candidateID,employerID) VALUES (?)'
        const values = [getSingleJObId, candidateID, employeerId]
        connection.query(query, [values], (err, result) => {
            if (err) {
                console.log(err)
            }
        })

        // emailsend(candidateData[0].fullName, candidateData[0].email)
        res.json({ message: "Success" })
    }

    catch (err) {
        console.log(err)
        // console.log("Server cannot respond")
        res.json({ message: "Server cannot respond" })
    }
}


module.exports = { candidateAuthentication, candidateDashboard, candidateLogin, candidateSignUp, candidateApplyJob }