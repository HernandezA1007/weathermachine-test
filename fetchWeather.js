const apiURL = "http://api.weatherapi.com/v1/current.json?key=bfaf6f3581b14ed88fc233827231009&q=";
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
/* searchKey can either be a zip code or City, State*/

async function checkWeather(City){
    const response = await fetch(apiURL + City + "&aqi=no");
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + " C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + " Humids (idk what humidity is measured in)";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " Kph " + data.current.wind_dir;
}

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})

class Weather{
    constructor(){
        this.name = ""
        this.temperatureC = 0;
        this.temperatureF = 0;
        this.humidity = 0;
        this.wind = 0;
        this.windDirection = ""
    }

}
