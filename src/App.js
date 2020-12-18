import React from "react";

import "./App.css";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";
import Aqi  from "./app_component/aqi.component";
import Formaqi from "./app_component/aqi_form.component";


//weather-api === api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
//air-quality-api == https://api.weatherbit.io/v2.0/current/airquality?lat=35.7721&lon=-78.63861&key=5ef44099497849ecad913ef23d44f6c7

const API_key = "ca9d6c36a1a9359a8f3d71714931414b";

const aqi_api_key ="5ef44099497849ecad913ef23d44f6c7";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp_max: undefined,
      temp_min: undefined,
      celsius: undefined,
      description: "",
      error: false,
      lat:"",
      lon:"",
      aqi:undefined,
      o3:undefined,
      so2:undefined,
      no2:undefined,
      co:undefined,
      pm25:undefined,
      pm10:undefined,
      level_of_aqi:""
    };
     
     this.levels ={
    l1:'Good' ,
    l2:'Moderate ',
    l3:'Unhealthy for Sensitive Groups' ,
    l4:'Unhealthy' ,
    l5:'Very Unhealthy',
    l6:'Hazardous'
     };

    this.weatherIcon = {
      Thunderstrom: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calCelsius(temp) {
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  get_level(level_of_aqi ,aqi){
    switch(true){
      case aqi >= 0 && aqi <=50:
      this.setState({
        level_of_aqi:this.levels.l1
      });
      break;
      case aqi >= 51 && aqi <=100:
        this.setState({
          level_of_aqi:this.levels.l2
        });
        break;
        case aqi >= 101 && aqi <=150:
          this.setState({
            level_of_aqi:this.levels.l3
          });
          break;
          case aqi >= 151 && aqi <=200:
            this.setState({
              level_of_aqi:this.levels.l4
            });
            break;
            case aqi >= 201 && aqi <=300:
              this.setState({
                level_of_aqi:this.levels.l5
              });
              break;
              case aqi >= 301:
                this.setState({
                  level_of_aqi:this.levels.l6
                });
                break;
                default :
                this.setState({
                  level_of_aqi:this.levels.l1
               });
    }
  }


  get_WeatherIcon(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({
          icon: this.weatherIcon.Thunderstrom
        });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({
          icon: this.weatherIcon.Drizzle
        });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({
          icon: this.weatherIcon.Rain
        });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({
          icon: this.weatherIcon.Snow
        });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({
          icon: this.weatherIcon.Atmosphere
        });
        break;
      case rangeId === 800:
        this.setState({
          icon: this.weatherIcon.Clear
        });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({
          icon: this.weatherIcon.Clouds
        });
        break;
      default:
        this.setState({
          icon: this.weatherIcon.Clear
        });
    }
  }


  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json(); //convert all the data into json format

      console.log(response);

      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        latitude:response.coord.lat,
        longitude:response.coord.lon
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({
        error: true
      });
    }

  };

getAQI =async(x) =>{
x.preventDefault();
const lati = x.target.elements.latitude.value;
const long = x.target.elements.longitude.value;

if(lati && long)
{
  const aqi_api_call = await fetch(`https://api.weatherbit.io/v2.0/current/airquality?lat=${lati}&lon=${long}&key=${aqi_api_key}`);
  const response = await aqi_api_call.json();
  console.log(response);

  this.setState({
    Air_Quality_Index: response.data[0].aqi,
    o3:response.data[0].o3,
    so2:response.data[0].so2,
    no2:response.data[0].no2,
    co:response.data[0].co,
    pm25:response.data[0].pm25,
    pm10:response.data[0].pm10
  });
  this.get_level(this.levels, response.data[0].aqi);
  }else {
  this.setState({
    error: true
  });
}
};



  render() {
    return ( 
      <div className = "App" >
      <
      Form loadweather = {
        this.getWeather
      }
      error = {
        this.state.error
      }
      / > 
      < Weather city = {
        this.state.city
      }
      country = {
        this.state.country
      }
      temp_celsius = {
        this.state.celsius
      }
      temp_max = {
        this.state.temp_max
      }
      temp_min = {
        this.state.temp_min
      }
      description = {
        this.state.description
      }
      latitude = {
        this.state.latitude
      }
      longitude = {
        this.state.longitude
      }
      weatherIcon = {
        this.state.icon
      }
      /> 
       <
       Formaqi loadaqi = {
        this.getAQI
      }
      error = {
        this.state.error
      }
      / > 
      <Aqi AQI={
        this.state.Air_Quality_Index
      }
      so2={
        this.state.so2
      }
      o3={
        this.state.o3
      }
      co={
        this.state.co
      }
      no2={
        this.state.no2
      }
      pm25={
        this.state.pm25
      }
      pm10={
        this.state.pm10
      }
      levels={
        this.state.level_of_aqi
      }
      />
      < /div >
    );
  }
}

export default App;