var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
});

const table = "Movies";

const year = 2014;
const title = "22 Jump Street";


const documentClient = new AWS.DynamoDB.DocumentClient();

//get Item
async function getWithDocumentClient() {
    const params = {
        TableName: table,
        Key:{
            "year": year,
            "title": title
        }
    };
    

    try {
        const results = await documentClient.get(params).promise();
        console.log("data", JSON.stringify(results, null, 2))
    } catch(err) {
        console.error("Unable to read item", err);
    }
};

// query data
async function queryWithDocumentClient() {
    const params = {
        TableName: table,
        KeyConditionExpression: '#movieYear= :year AND title= :title',
        ExpressionAttributeNames: {
            '#movieYear': 'year'
        },
        ExpressionAttributeValues:{
            ":year": year,
            ":title": title
        }
    };
    

    try {
        const results = await documentClient.query(params).promise();
        console.log("data", JSON.stringify(results, null, 2))
    } catch(err) {
        console.error("Unable to read item", err);
    }
};

// insert data
async function insertWithDocumentClient() {
    const params = {
        TableName: table,
        Item:{
            "year": 2020,
            "title": "The Big New Movie",
            "info":{
                "plot": "Nothing happens at all.",
                "rating": 0
            }
        }
    };
    

    try {
        await documentClient.put(params).promise();
        console.log("data inserted successfully")
    } catch(err) {
        console.error("Unable to insert item", err);
    }
};


// Uncomment below functions to run (uncomment only the one you want to use)

// getWithDocumentClient().then(()=> console.log("Done with DocumentClient get"))
// queryWithDocumentClient().then(()=> console.log("Done with DocumentClient query"))
// insertWithDocumentClient().then(()=> console.log("Done with DocumentClient insert"))