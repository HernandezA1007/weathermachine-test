const searchKey = "Hays, KS";
const apiURL = "http://api.weatherapi.com/v1/current.json?key=bfaf6f3581b14ed88fc233827231009&q=";
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
/* searchKey can either be a zip code or City, State*/

async function checkWeather(City){
    const response = await fetch(apiURL + searchKey + "&aqi=no");
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c);
    document.querySelector(".humidity").innerHTML = data.current.condition.humidity;
    document.querySelector(".wind").innerHTML = data.current.condition.wind_kph;

}

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})
