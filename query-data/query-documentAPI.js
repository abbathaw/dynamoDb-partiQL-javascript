const { AWS } = require('../aws-config')

const documentClient = new AWS.DynamoDB.DocumentClient();

async function queryWithDocumentClient({year, title}) {
    console.time("Document Client Query Duration")
    const params = {
        TableName : "Movies",
        ProjectionExpression:"#yr, title, info",
        KeyConditionExpression: "#yr = :yyyy and title = :title",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy": year,
            ":title": title
        }
    };

    try {
        const results = await documentClient.query(params).promise();
        console.log("data", JSON.stringify(results.Items[0], null, 2))
        console.timeEnd("Document Client Query Duration")
    } catch(err) {
        console.error("Unable to read item", err);
    }
};

queryWithDocumentClient({year: 2010, title: 'Shutter Island'})
