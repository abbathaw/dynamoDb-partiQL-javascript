const {createFakeMovies} = require('../utils/fake-data-generator')

const { AWS } = require('../aws-config');
const docClient = new AWS.DynamoDB.DocumentClient();

async function uploadBatchMoviesData() {
    const allMovies = createFakeMovies(500);
    console.time("DocumentAPI Insert Batch Duration")
    let num = 0;
    const items = [];
    for (const movie of allMovies) {
        items.push({
            PutRequest: {
              Item: {
                year: movie['year'],
                title: movie['title'],
                info: movie['info']
              }
            }
        });
    }

    for (let i = 0; i < items.length; i += 25) {
        const upperLimit = Math.min(i + 25, items.length);
        const batch = items.slice(i, upperLimit);
        const params = {
            RequestItems: {
                'Movies': batch
            }
        };

        try {
            const response = await docClient.batchWrite(params).promise();
            console.log("Batch update response", response)
            num+= batch.length
            console.log(`Added a batch of ${batch.length} movies. Total movies uploaded so far ${num}.`)
        } catch(err) {
            console.log("Unable to add movie. Error JSON:", JSON.stringify(err, null, 2))
        }
    }
    console.log(`Added ${num} movies to the table`)
    console.timeEnd("DocumentAPI Insert Batch Duration")
}

uploadBatchMoviesData()