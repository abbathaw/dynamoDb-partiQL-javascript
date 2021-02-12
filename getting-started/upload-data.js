const { AWS } = require('../aws-config')
const sampleData = require('../sample-data/moviedata.json')

const docClient = new AWS.DynamoDB.DocumentClient();

async function uploadMoviesData() {
    const allMovies = sampleData;
    let num = 0;
    for (const movie of allMovies) {
        const params = {
            TableName: "Movies",
            Item: {
                "year":  movie.year,
                "title": movie.title,
                "info":  movie.info
            }
        };
        try {
            await docClient.put(params).promise();
            console.log(`Added ${movie.title}`)
            num++;
        } catch(err) {
            console.log("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2))
        }
    };
    console.log(`Added ${num} movies to the table`)
}


module.exports = { uploadMoviesData };