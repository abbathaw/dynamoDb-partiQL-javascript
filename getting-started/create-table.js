const { AWS } = require('../aws-config')

const dynamoDB = new AWS.DynamoDB();

async function createMoviesTable() {
    const params = {
        TableName : "Movies",
        KeySchema: [
            { AttributeName: "year", KeyType: "HASH"},
            { AttributeName: "title", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    try {
        const table = await dynamoDB.createTable(params).promise();
    } catch(e) {
        console.log("An error occurred while creating the table", e)
        throw new Error("Failed to create a table")
    }
}

module.exports = { createMoviesTable };