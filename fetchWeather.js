const apiURL = "http://api.weatherapi.com/v1/current.json?key=bfaf6f3581b14ed88fc233827231009&q=";
//http://api.weatherapi.com/v1/current.json?key=bfaf6f3581b14ed88fc233827231009&q=67601&aqi=no
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const tempSwitch = document.querySelector(".FCswitch")
/* searchKey can either be a zip code or City, State*/

async function checkWeather(City){
    const response = await fetch(apiURL + City + "&aqi=no");
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".FCswitch").innerHTML = Math.round(data.current.temp_f) + " F";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_mph + " mph " + data.current.wind_dir;
}

searchButton.addEventListener("click", ()=>{
    //create a new Weather object, then assign all the attributes
    //using .this
    checkWeather(searchBox.value)
})

tempSwitch.addEventListener("click", ()=>{
    //For now, use a conversion formula to convert the temperature into 
    //The Opposite temperature
    text = document.querySelector(".FCswitch").innerHTML
    let matches = text.match(/(\d+)/);
    let conversion = 0;
    if(text.includes("F")){
        conversion = (5/9) * (Number(matches[0]) - 32)
        console.log("conversion: " + conversion)
        document.querySelector(".FCswitch").innerHTML = String(Math.round(conversion)) + " C";
    }
    else if(text.includes("C")){
        conversion = (9/5 * Number(matches[0]) + 32)
        document.querySelector(".FCswitch").innerHTML = String(Math.round(conversion)) + " F";
    }
})
class Weather{
    constructor(){
        this.name = ""
        this.temperatureC = 0;
        this.temperatureF = 0;
        this.humidity = 0;
        this.wind = 0;
        this.windDirection = ""
        this.tempButton;
    }

}
