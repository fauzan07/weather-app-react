import React, {useState} from 'react';
import './App.css';

const api = {
  key : "d0c4ea76926c0692d5a5490265698c56",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const datebuilder = (d) => {

    let months = ["january", "February", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

}

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'App warm' : 'App') : 'App'}>
     <main>
       <h1 className="title">Weather Applicaton</h1>
       <div className="search-box">
       <input type="text" className="search-bar" placeholder="search..." 
              onChange={event => setQuery(event.target.value)} 
              value={query} 
              onKeyPress={search}/>
       </div>

       {(typeof weather.main != "undefined") ? (
        <div>

       <div className="location-box">
         <div className="location">{weather.name}, {weather.sys.country}</div>
         <div className="date">{datebuilder(new Date())}</div>
       </div>

       <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
       </div>

       </div>
        ) : (<h2 className="getstarted">Get started by searching a City</h2>)}
     </main>
    </div>
  );
}

export default App;
