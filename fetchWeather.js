const apiURL = "http://api.weatherapi.com/v1/current.json?key=bfaf6f3581b14ed88fc233827231009&q=";
//http://api.weatherapi.com/v1/current.json?key=bfaf6f3581b14ed88fc233827231009&q=67601&aqi=no
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const tempSwitch = document.querySelector(".FCswitch")
const showButton = document.querySelector(".show-er")
/* searchKey can either be a zip code or City, State*/

/*This tile list is the main list for all of the locatuon tiles.
locations should be added to and taken away from this directly*/
let TileList = [];

//This function will take in a location to search for.
 //It will go the the API and return the information, distilling it
//into the corresponding categories in a temporary Weather object, then 
//add that object to the TileList
async function checkWeather(City){
    let tempLocation = new Weather();
    const response = await fetch(apiURL + City + "&aqi=no");
    var data = await response.json();

    //The name of the location
    tempLocation.name = data.location.name;
    //The region (In the US, this is the state)
    tempLocation.region = data.location.region;
    //Tce country
    tempLocation.country = data.location.country;
    //The Latitude of this Location
    tempLocation.lat = data.location.lat;
    //the Longitude of this Location
    tempLocation.lon = data.location.lon;
    //The Time Zone ID
    tempLocation.tz_id = data.location.tz_id;
    //THe Local time in seconds epoch
    tempLocation.epochTime = data.location.localtime_epoch;
    //the local time in dateTime format(YYYY/MM/DD HH:MM)
    tempLocation.localTime = data.location.localtime;
    //The time that the weather for this location was last updated, in seconds epoch
    tempLocation.lastUpdatedEpoch = data.current.last_updated_epoch
    //the time th eweather for this location was last updated, in dateTime (YYYY/MM/DD HH:MM)
    tempLocation.lastUpdatedLocalTime = data.current.last_updated
    //The current temperature, in degrees celsius
    tempLocation.temperatureC = data.current.temp_c
    //the current temperature, in degrees fahrenheit
    tempLocation.temperatureF = data.current.temp_f
    //the current day status. 1 = yes, 0 = no
    tempLocation.isDay = data.current.is_day
    //the conditions for this location. this is a descriptive text 
    // may be able to return just about anything
    tempLocation.condition = data.current.condition.text
    //the condition code. also unpredictable. 
    tempLocation.conditionCode = data.current.condition.code
    //the current average wind speed, in miles per hour
    tempLocation.windMPH = data.current.wind_mph
    //the current average wind speed, in kilometers per hour
    tempLocation.windKPH = data.current.wind_kph
    //the degree direction that the wind is blowing
    tempLocation.windDegree = data.current.wind_degree
    //the cardinal direction associated with the wind direction
    tempLocation.windDirection = data.current.wind_dir
    //the atmoshperic pressure, in millibars
    tempLocation.pressureMb = data.current.pressure_mb
    //the current atmospheric pressure, in inches of mercury
    tempLocation.pressureIn = data.current.pressure_in
    //the precipitation, in millimeters
    tempLocation.precipMm = data.current.precip_mm
    //the presipitation, in inches
    tempLocation.precipIn = data.current.precip_in
    //the humidity, in percent
    tempLocation.humidity = data.current.humidity
    //the current clody status?
    tempLocation.cloud = data.current.cloud
    //what temperature it feels like, in degrees celsius
    tempLocation.feelsLikeC = data.current.feelslike_c
    //what temperature it feels like, in degrees fahrenheit
    tempLocation.feelsLikeF = data.current.feelslike_f
    //the current visibility, in kilometers
    tempLocation.visibilityKM = data.current.vis_km
    //the current visibility, in miles
    tempLocation.visibilityMi = data.current.vis_mi
    //the UV index, on a scale of 1-10
    tempLocation.UV = data.current.uv
    //the current wind gust speed, in kilometers per hour
    tempLocation.gustKph = data.current.gust_kph
    //the current wind gust speed, in miles per hour
    tempLocation.gustMph = data.current.gust_mph    


    //Having collected all of this information, return it.
    TileList.push(tempLocation)
}

//this is a temporary measure. clicking this should display all the currently 
//queued locations
showButton.addEventListener("click", ()=>{
    displayList();
})
/*This event listener will add a location to the tile list as soon as it can,
 adding the locations data.*/
searchButton.addEventListener("click", ()=>{
    //create a new Weather object, then assign all the attributes
    checkWeather(searchBox.value)
})


/*
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
*/


function displayList(){
    const queue = document.getElementById("queue");
    console.log("type of TileLise Entry 1: " + typeof(TileList[0]))
    console.log(TileList.length);
    for(let i = 0; i < TileList.length; i++){
        //create a new <div> element with class "LocationTile" and put it in the "Queue" HTML element
        const newTile =document.createElement("div");
        //add the "LocationTile" Class to it. 
        newTile.classList.add("LocationTile");
        for (attribute in TileList[i]){
            const newAttribute = document.createElement("p");
            //'attribute' is the name of the attribute, TileList[i][attribute] is the value of it
            text = attribute + " : " + TileList[i][attribute];
            newNode = document.createTextNode(text);
            //add the 'attribute' class to it
            newAttribute.classList.add("attribute");
            newAttribute.appendChild(newNode)
            newTile.appendChild(newAttribute)
        }
        
        queue.appendChild(newTile);
    }
}
class Weather{
    constructor(){
        this.name = "";
        this.region = "";
        this.country = "";
        this.lat = 0.0;
        this.lon = 0.0;
        this.tz_id = "";
        this.epochTime = 0;
        this.localTime = "";
        this.lastUpdatedEpoch = 0;
        this.lastUpdatedLocalTime = "";
        this.temperatureC = 0;
        this.temperatureF = 0;
        this.isDay = 0;
        // look at this to show a related weather Icon
        this.condition = "";
        this.conditionCode = 0;
        this.windMPH = 0;
        this.windKPH = 0;
        this.windDegree = 0;
        this.windDirection = '';
        this.wind = 0;
        this.windDirection = "";
        this.tempButton;
        this.pressureMb = 0;
        this.pressureIn = 0;
        this.precipMm = 0;
        this.precipIn = 0;
        this.humidity = 0;
        this.cloud = 0;
        this.feelsLikeC = 0;
        this.feelsLikeF= 0;
        this.visibilityKM = 0;
        this.visibilityMi = 0;
        this.UV = 0;
        this.gustMph = 0;
        this.gustKph = 0;
    }
    /**
     * {"location":{
     *     "name":"Hays",
     *     "region":"Kansas",
     *     "country":"USA",
     *     "lat":38.88,
     *     "lon":-99.32,
     *     "tz_id":"America/Chicago",
     *     "localtime_epoch":1696188977,
     *     "localtime":"2023-10-01 14:36"
     * }
     * "current":{
     *     "last_updated_epoch":1696188600,
     *     "last_updated":"2023-10-01 14:30",
     *     "temp_c":30.0,
     *     "temp_f":86.0,
     *     "is_day":1,
     *     "condition":{
     *         "text":"Sunny",
     *         "icon":"//cdn.weatherapi.com/weather/64x64/day/113.png",
     *         "code":1000
     *     },
     *     "wind_mph":26.6,
     *     "wind_kph":42.8,
     *     "wind_degree":180,
     *     "wind_dir":"S",
     *     "pressure_mb":1018.0,
     *     "pressure_in":30.07,
     *     "precip_mm":0.0,
     *     "precip_in":0.0,
     *     "humidity":36,
     *     "cloud":0,
     *     "feelslike_c":28.8,
     *     "feelslike_f":83.8,
     *     "vis_km":16.0,
     *     "vis_miles":9.0,
     *     "uv":8.0,
     *     "gust_mph":26.0,
     *     "gust_kph":41.8}}
     */

}
