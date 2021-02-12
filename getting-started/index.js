const { AWS } = require('../aws-config')
const { createMoviesTable } = require('./create-table');
const { uploadMoviesData } = require('./upload-data');

const dynamoDB = new AWS.DynamoDB();

const checkIfTableExists = async () => {
    try {
        const table = await dynamoDB.describeTable({TableName: 'Movies'}).promise();
        return true;
    } catch(e) {
        if (e.code === "ResourceNotFoundException") {
            return false;
        } else {
            throw new Error("An error occured while checking for table")
        }
    }
}

const setupTableAndData = async() => {
    try {
     const isTableExist =  await checkIfTableExists();
     if (isTableExist) {
        console.log(`A table called 'Movies' already exists.`)
     } else {
        console.log(`Creating Table called 'Movies'`)
        await createMoviesTable();
        await sleep(10000); // a small delay to wait for the table to be ready on dynamoDb side
        console.log(`Table called 'Movies' created. Uploading sample data. This will take a few minutes.`)
        await uploadMoviesData();
        console.log('Done');
     }
    } catch(e) {
        console.log("Something wrong happened", e)
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 

setupTableAndData();