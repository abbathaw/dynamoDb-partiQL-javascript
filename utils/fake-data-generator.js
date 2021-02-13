const faker = require('faker');

function createFakeMovies(num){
    return Array.from({length: num}).map(()=> {
        return {
            "year": randomYear(),
            "title": `${faker.commerce.productName()} - ${Math.random().toString(36).slice(-6)}`,
            "info":{
                "plot": faker.commerce.productDescription(),
                "rating": 0
            }
        }
    })
}

function randomYear(min=1980, max=2021) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { createFakeMovies }