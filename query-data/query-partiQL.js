const { AWS } = require('../aws-config')

const dynamoDB = new AWS.DynamoDB();

async function queryWithPartiQL({year, title}) {
    try {
        console.time("PartiQL Query Duration")
        const results = await dynamoDB.executeStatement(
            {
                Statement: `SELECT * FROM Movies WHERE "year" = ${year} and "title" = '${title}' ` 
            }).promise();
        const convertedResult = AWS.DynamoDB.Converter.unmarshall(results.Items[0]);
        console.log("Query results", JSON.stringify(convertedResult, null, 2))
        console.timeEnd("PartiQL Query Duration")
    } catch(err) {
        console.error("Unable to read item", JSON.stringify(err, null, 2));
    }
}

queryWithPartiQL({year: 2010, title: 'Shutter Island'});
