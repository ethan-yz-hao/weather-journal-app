/* Global Variables */
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?`;
const geoURL = `http://api.openweathermap.org/geo/1.0/zip?`;
const apiKey = '188388cac3018bd04ce69ff048bcd813';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// fetch geo data
const getGeoData = async (baseURL, zip, apiKey) => {
    const res = await fetch(`${baseURL}zip=${zip},US&appid=${apiKey}`)
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
}

// fetch weather data
const getWeatherData = async (baseURL, lat, lon, apiKey) => {
    const res = await fetch(`${baseURL}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
}

// post user response
const postUserData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        return await response.json();
    }catch(error) {
        console.log("error", error);
    }
}

// event for generate click
document.getElementById('generate').addEventListener('click', generate);

function generate() {
    const zip = document.getElementById('zip').value;

    getGeoData(geoURL, zip, apiKey)
        .then(
            (geoData) => {
                return getWeatherData(weatherURL, geoData.lat, geoData.lon, apiKey);
            }
        )
        .then(
            (weatherData) => {
                const userRes = document.getElementById('feelings').value;
                return postUserData('/add', {temp: weatherData.main.temp, date: newDate, userRes: userRes})
            }
        )
        .then(
            (data) => {
                console.log(data);
            }
        )
}