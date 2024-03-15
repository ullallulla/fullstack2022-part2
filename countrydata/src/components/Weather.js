const Weather = ({weather, capital}) => {
    
    const weatherIcon = weather.weather[0].icon
    const weatherIconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>temperature {Math.round(((weather.main.temp - 273.15) + Number.EPSILON) * 100) / 100} Celcius</div>
        <img src={weatherIconURL} width="100" height="100" alt='weather icon' />
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }


export default Weather