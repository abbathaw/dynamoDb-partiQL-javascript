const { AWS } = require('../aws-config')

const documentClient = new AWS.DynamoDB.DocumentClient();

async function insertWithDocumentClient(movie) {
    console.time("Document Client Insert Duration")
    const params = {
        TableName: "Movies",
        Item: movie
    };

    try {
        await documentClient.put(params).promise();
        console.log(`New Movie with title of '${movie.title}' inserted successfully`)
        console.timeEnd("Document Client Insert Duration")
    } catch(err) {
        console.error("Unable to insert item", err);
    }
};

const movieDetails = {
    year: 2020,
    title: `The Big New Movie: ${Math.random().toString(36).slice(-6)}`,
    info:{
        plot: "Nothing happens at all.",
        rating: 0
    }
}

insertWithDocumentClient(movieDetails);