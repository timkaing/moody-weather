import React, { Component } from 'react';
import './App.css';



class App extends Component {

  constructor() {
    super()
    this.state = {set: false}
  }

  promptWeather() {
    const weather = this.state.weatherData;
    var mood = prompt("it is " + weather.main.temp.toFixed(0) + "° F in " + weather.name + " - " + weather.weather[0].description + ". \nWhat mood are you in?");
    
    if (mood != null) {
        this.refs.bigMood.innerText = mood;
        // document.getElementById("bigMood").innerHTML = mood;
    } 
}

  showLocation(position) {
    const lat = position.coords.latitude;
    console.log(lat)
    const long = position.coords.longitude;
    console.log(long)
    // ! Get your own API key !
    const apikey = 'feded9e21dad46c3bd1d4b1890d50ff4'
    // Form an API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apikey}`
    // Get data from the API with fetch
  
    fetch(url).then(res => {
      // Handle the response stream as JSON
      return res.json()
    }).then((json) => { 
      console.log(json)
      // var mood = prompt("it is " + json.main.temp.toFixed(0) + "° F in " + json.name + " - " + json.weather[0].description + ". \nWhat mood are you in?");
      // if (mood != null){
      //   this.refs.bigMood.innerText = mood;
      //   // document.getElementById("bigMood").innerHTML = mood;
      // }
      // console.log(json.weather[0])
      // console.log(json.main)
      // const { main, description, icon } = json.weather[0]
      // const { temp, pressure, humidity, temp_min, temp_max } = json.main
      // console.log('The Weather is ' + temp + ' Fahrenheit')
      // console.log(main)
      // If the request was successful assign the data to component state
      this.setState({ weatherData: json, set: true})
      // ! This needs better error checking here or at renderWeather() 
      // It's possible to get a valid JSON response that is not weather 
      // data, for example when a bad zip code entered.
    }).catch((err) => {
      // If there is no data 
      // this.setState({ weatherData: null }) // Clear the weather data we don't have any to display
      // Print an error to the console. 
      console.log('-- Error fetching --')
      console.log(err.message)
      // You may want to display an error to the screen here. 
    })
  }

  getWeather() {
      if (navigator.geolocation && !this.state.set) {
        console.log(this.state)
        navigator.geolocation.getCurrentPosition(this.showLocation.bind(this));
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
  }

  render() {
    if (!this.state.set){
      this.getWeather()
      // this.promptWeather()

      return (
        <div className="App">
          <div className="WeatherB">
            <p></p>
            <p></p>
          </div>
          <div className="Mood">
            <p id="bigMood" ref="bigMood"></p>
          </div>
        </div>
      );
    }
    else {
      this.promptWeather()
      const weather = this.state.weatherData;
      return (
        <div className="App">
          <div className="Weather">
            <p>{weather.name} - {weather.main.temp.toFixed(0)} F</p>
            <p>expect {weather.weather[0].description}</p>
          </div>
          <div className="Mood">
            <p id="bigMood" ref="bigMood"></p>
          </div>
        </div>
      );
    }
    
  }
}

export default App;