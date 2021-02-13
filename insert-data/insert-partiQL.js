const { AWS } = require('../aws-config')

const dynamoDB = new AWS.DynamoDB();

async function insertWithPartiQL(movie) {
    try {
        console.time("PartiQL Insert Duration")
        const item = stringify(movie);
        await dynamoDB.executeStatement({Statement: `INSERT INTO Movies VALUE ${item}`}).promise();
        console.log(`New Movie with title of '${movie.title}' inserted successfully`)
        console.timeEnd("PartiQL Insert Duration")
    } catch(err) {
        console.error("Unable to write item", JSON.stringify(err, null, 2));
    }
}

const movieDetails = {
    "year": 2020,
    "title": `The Big New Movie: ${Math.random().toString(36).slice(-6)}`,
    "info":{
        "plot": "Nothing happens at all.",
        "rating": 0
    }
}

insertWithPartiQL(movieDetails);


// Crude implementation of a custom object stringifier which uses single quotes instead of double quotes
// Credit to the code for this from this article by Juan Dalmasso titled `Creating your own simplified implementation of JSON.stringify()`
// https://levelup.gitconnected.com/creating-your-own-simplified-implementation-of-json-stringify-ed8e50b9144a
function stringify(value) {
    const lastKey = Object.keys(value).pop();
    let objString = '';
    if (typeof value === 'object') {
        objString += '{';
        for (const key in value) {
            objString += `'${key}':${stringify(value[key])}`;
            if (key !== lastKey) {
                objString += ',';
            }
        }
        objString += '}';
    } else if (typeof value === 'string') {
        objString += `'${value}'`;
    } else if (typeof value === 'number') {
        objString += `${value}`;
    }
    return objString;
}