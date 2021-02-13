const { AWS } = require('../aws-config')
const sampleData = require('../sample-data/moviedata.json')

const docClient = new AWS.DynamoDB.DocumentClient();

async function uploadMoviesData() {
    const allMovies = sampleData;
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
            await docClient.batchWrite(params).promise();
            num+= batch.length
            console.log(`Added a batch of ${batch.length} movies. Total movies uploaded so far ${num}.`)
        } catch(err) {
            console.log("Unable to add movie. Error JSON:", JSON.stringify(err, null, 2))
        }
    }
    console.log(`Added ${num} movies to the table`)
}


module.exports = { uploadMoviesData };