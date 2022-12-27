import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { cloudy, locationIcon, rainy, storm, sun, fog } from "./assets";
import moment from 'moment';

function App() {

  // for checking the the required data has beeb fetched
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false)
  const [weatherData, setWeatherData] = useState({});
  const [image, setImage] = useState(cloudy)


  const apiKey = "583c505bcb358ffe125aa91533dc2cf7";

  //console.log("Weather Data -- ", weatherData);

  const getData = async () => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=59.33&lon=18.07&appid=${apiKey}`)
      .then((res) => {
        setWeatherData(res.data);
        addImage(res.data.weather[0].main, setImage)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message);
        setNoData(true)
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData();

  }, []);


  return (
    <main className="App" data-testid="weatherData">
      <>

        <header data-testid="textHeader" aria-label={`Stockholm weather App`}>
          <h1>Stockholm Weather</h1>
        </header>

        {!loading ? !noData ? (
          <article className="container" aria-label={`weather information`}>
            <img src={image} alt="cloudy" className="app-img" />
            <section className="weather-info">
              {/* Degree */}
              <div className="degree">
                {/* Convert from kelvin to celcius */}
                <h1>{Math.round(weatherData.main.temp - 273.15)}</h1>
                <span>&#8451;</span>
              </div>

              {/* Weather metrics */}
              <div className="metrics">
                <p>
                  Pressure : {weatherData.main.pressure} hPa
                </p>
                <p>
                  Humidity : {weatherData.main.humidity}%
                </p>
                <p>
                  {/* Convert from m/s to km/hr */}
                  Wind : {(weatherData.wind.speed * 3.60).toFixed(2)} Km/hr
                </p>
              </div>
            </section>
            <section className="location-info">
              <div className="location">
                <img src={locationIcon} alt="location" />
                <h2 data-testid="weatherLocation">{weatherData.name}</h2>
              </div>
              <div >
                <h3>{moment().format('dddd')} {moment().format('HH:mm')}</h3>
                <h3>{weatherData.weather[0].main}</h3>
              </div>
            </section>
          </article>
        ) : <div data-testid="noDataText">Couldn't get data</div> : (
          <section>
            <ScaleLoader data-testid="loader" color="#FFF" size={150} aria-label={`Loading`}/>
          </section>
        )}

      </>
    </main>
  );
}

export default App;

const addImage = (data, setImage) => {
  data = data.toLowerCase()
  if (data.includes("rain")) {
    setImage(rainy)
  } else if (data.includes("sun")) {
    setImage(sun)
  } else if (data.includes("storm")) {
    setImage(storm)
  } else if (data.includes("fog") | data.includes("mist")) {
    setImage(fog)
  } else {
    setImage(cloudy)
  }
}
