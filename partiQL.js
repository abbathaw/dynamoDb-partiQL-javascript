var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
});

const dynamoDB = new AWS.DynamoDB();

const table = "Movies";

const year = 2014;
const title = "22 Jump Street";


async function queryWithPartiQL() {
    try {
        const results = await dynamoDB.executeStatement({Statement: 'SELECT * FROM Movies WHERE "year" = ? and "title" = ? ', Parameters: [{N: year.toString()}, {S: title}]}).promise();
        const convertedResult = AWS.DynamoDB.Converter.unmarshall(results.Items[0]);
        console.log("data", JSON.stringify(convertedResult, null, 2))
    } catch(err) {
        console.error("Unable to read item", JSON.stringify(err, null, 2));
    }
}

// insert data

async function insertWithPartiQL() {
    try {

        const item = `{
            'year': 2021,
            'title': 'The Big New Movie 223566',
            'info': {
                'plot': 'Nothing happens at all.',
                'rating': 0
            }
        }`
        await dynamoDB.executeStatement({Statement: `INSERT INTO Movies VALUE ${item}`}).promise();
        console.log("data inserted successfully")
    } catch(err) {
        console.error("Unable to read item", JSON.stringify(err, null, 2));
    }
}

// Uncomment below functions to run (uncomment only the one you want to use)

// queryWithPartiQL().then(()=> console.log("Done with PartiQL Select"))
// insertWithPartiQL().then(()=> console.log("Done with PartiQL insert"))