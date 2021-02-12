require('dotenv').config()
const AWS = require("aws-sdk");

AWS.config.update({

    region: "us-east-1",

    // For security reasons, do not store AWS Credentials in your files. 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = { AWS };