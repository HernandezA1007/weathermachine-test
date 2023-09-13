const searchKey = "67758";
const apiURL = "http://api.weatherapi.com/v1/current.json?key=bfaf6f3581b14ed88fc233827231009&q=";

async function checkWeather(){
    const response = await fetch(apiURL + searchKey + "&aqi=no");
    var data = await response.json();

    console.log(data);
}

checkWeather();