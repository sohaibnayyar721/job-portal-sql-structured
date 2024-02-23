const express = require('express')
const MongoDbConnect = require('./mongodbConn')
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb')
const { EmployerModel, EmployerJobModel } = require('./model/EmployerData')
const candidateModel = require('./model/CandidateData')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express()
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer')
require('dotenv').config()
const bodyParser = require('body-parser');
const router = require('./Router/router')
const {connect} = require('./sqlConnection')

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(router)


// MongoDbConnect()
connect()


cloudinary.config({
  cloud_name: 'ds8i8guuh',
  api_key: '376944176752133',
  api_secret: '0dBjGIiqRFgwI5VLP6VGN6g2YxI',
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.listen(4500, () => {
  console.log("Server is running!!!")
})



