import { useState } from "react";
import "./Weather.css"


// for api 
const api = {
    key: "52880c7da5c13646a74dbbd77c57ddf8",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
    const [city, setCity] = useState("");
    //for the weather result
    const [weather, setWeather] = useState({}) //store in an object

    //so that after hitting enter the data is fetched
    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    console.log(result)
                    // the search bar gets clear after hitting enter
                    setCity("");
                })
        }
    };

    const getDate = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        //to get the day
        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day}, ${date} ${month} ${year}`
    }

    let className = 'def-bg'

    if (typeof weather.main !== "undefined") {
        switch (weather.weather[0].main) {
            case "Clouds":
                className = "clouds";
                break;
            case "Clear":
                className = "clear";
                break;
            case "Haze":
                className = "haze";
                break;
            case "Mist":
                className = "mist";
                break;
            case "Rain":
                className = "rain";
                break;
            case "Snow":
                className = "snow";
                break;
            case "Fog":
                className = "fog";
                break;
            case "Thunderstorm":
                className = "thunderstorm";
                break;
            case "Drizzle":
                className = "drizzle";
                break;
            case "Dust":
                className = "dust";
                break;
            default:
                break;
        }
    }

    return (
        // <div className={(typeof weather.main != "undefined") ? ((weather.weather[0].main == 'Clouds') ? 'clouds' : 'def')
        //   : 'def-bg'}>
        <div className={className}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="S.E.A.R.C.H."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={search} //for enter key press 
                    />
                </div>
                {/* now to display the weather details  */}

                {(typeof weather.main != "undefined") ? (
                    <div className="details">
                        <div className="result">
                            <div className="city">
                                {weather.name}, {weather.sys?.country}
                            </div>
                            <div className="date">
                                {getDate(new Date())}
                            </div>
                            <div className="weather-details">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°C
                                    {/* alt+(0176) for degree sign  */}
                                </div>
                                <div className="weather-type">
                                    {weather.weather[0].main}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (" ")}
            </main>
        </div >
    );
}

export default Weather;


//: (typeof weather.weather[0].main == "Haze") ? 'haze' : (typeof weather.weather[0].main == "Mist") ? 'mist'