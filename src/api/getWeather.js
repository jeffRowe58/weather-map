// get weather
import {WEATHER_KEY} from "../components/map/key";
import '../components/map/Map'


export async function getWeather (center) {

    const openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + center.lat + "&lon=" + center.lng + "&units=imperial&exclude=hourly,minutely&appid=" + WEATHER_KEY
    const response = await fetch(`${openWeatherAPI}`);
    const data = await response.json();

    const weather = {
        high: data.daily[0].temp.max,
        low: data.daily[0].temp.min,
        condition: data.daily[0].weather[0].description
    }
    return weather;
}

