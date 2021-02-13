const {createFakeMovies} = require('../utils/fake-data-generator')
const { stringify } = require('../utils/stringify')

const { AWS } = require('../aws-config');
const dynamoDB = new AWS.DynamoDB();

async function uploadBatchWithPartiQL() {
    const allMovies = createFakeMovies(500);
    console.time("PartiQL Insert Batch Duration")
    let num = 0;
    const statements = [];
    for (const movie of allMovies) {
        const item = stringify(movie);
        statements.push({"Statement": `INSERT INTO Movies VALUE ${item}`})
    }

    for (let i = 0; i < statements.length; i += 25) {
        const upperLimit = Math.min(i + 25, statements.length);
        const batch = statements.slice(i, upperLimit);
        try {
            const response = await dynamoDB.batchExecuteStatement({Statements: batch}).promise();
            console.log("Batch update response", JSON.stringify(response, null, 2))
            num+= batch.length
            console.log(`Added a batch of ${batch.length} movies. Total movies uploaded so far ${num}.`)
        } catch(err) {
            console.log("Unable to add movie. Error JSON:", JSON.stringify(err, null, 2))
        }
    }
    console.log(`Added ${num} movies to the table`)
    console.timeEnd("PartiQL Insert Batch Duration")
}

uploadBatchWithPartiQL()