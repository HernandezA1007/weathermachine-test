const fetch = require('node-fetch');


const API_KEY = "03ee7347933d49ac83945128231409";
// API_URL OR API_KEY? http://api.weatherapi.com/v1/current.json?key=03ee7347933d49ac83945128231409&q=
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

exports.handler = async function (event, context) {
    const city = event.queryStringParameters.city;
    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "City is required as a query parameter." })
        };
    }

    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}$q=${city}`);
        const data = await response.json();

        // Check if the API returned an error
        if (data.error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: data.error.message })
            };
        }


        return {
            statusCode: 200,
            body: JSON.stringify({ data })
        };
    } catch (error) {
        return { 
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch weather data" })
        };
    }
};
