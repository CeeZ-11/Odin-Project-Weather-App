const getCurrentLocation = async () => {
  const apiKey = "159234c99fb545ada50544206108bb6b";
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      mode: "cors",
    });
    const data = await response.json();

    const cityName = data.city;
    const latitude = data.latitude;
    const longitude = data.longitude;

    return { cityName, latitude, longitude };
  } catch (e) {
    console.log(e);
  }
};

const getWeatherData = async (latitude, longitude) => {
  const apiKey = "WKF2HYP55LTVJTKM3F2Q6NBF9";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&include=current&key=${apiKey}`;

  try {
    const response = await fetch(url, {
      mode: "cors",
    });
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

const displayCurrentLocationWeather = async () => {
  const currentLoc = await getCurrentLocation();
  const { cityName, latitude, longitude } = currentLoc;
  const data = await getWeatherData(latitude, longitude);
  const cityData = JSON.stringify(data);

  try {
    if (cityData) {
      console.log("Current Location City Name: " + cityName);
      displayData(cityName, data);
    }
  } catch (e) {
    console.log(e);
  }
};

const displayWeather = async (inputData) => {
  const data = await getWeatherData(inputData.lat, inputData.lng);
  const cityData = JSON.stringify(data);

  try {
    if (cityData) {
      console.log("Input Location City Name: " + inputData.name);
      console.log("City Data: " + cityData);
      displayData(inputData.name, data);
    }
  } catch (e) {
    console.log(e);
  }
};

const displayData = (name, data) => {
  const cityName = document.querySelector("#cityName");
  const weatherDescription = document.querySelector("#weatherDescription");
  const temperature = document.querySelector("#temperature");
  const humidity = document.querySelector("#humidity");
  const windSpeed = document.querySelector("#windSpeed");

  try {
    const weather = data.days[0];

    cityName.textContent = name;
    weatherDescription.textContent = weather.description;
    temperature.textContent = `${weather.temp}°C`;
    humidity.textContent = `${weather.humidity}%`;
    windSpeed.textContent = `${weather.windspeed} km/h`;

    console.log(`Weather Description: ${weather.description}`);
    console.log(`Temperature: ${weather.temp}°C`);
    console.log(`Humidity: ${weather.humidity}%`);
    console.log(`Wind Speed: ${weather.windspeed} km/h`);
  } catch (e) {
    console.log(e);
  }
};

const validateQuery = async () => {
  const query = document.querySelector("#cityInput");
  const city = query.value.trim();
  const username = "ceez11";
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = `${proxy}http://api.geonames.org/searchJSON?name_startsWith=${city}&maxRows=10&cities=cities15000&username=${username}`;

  try {
    if (city) {
      const response = await fetch(url, {
        mode: "cors",
      });
      console.log(response);
      const data = await response.json();

      if (data.geonames && data.geonames.length > 0) {
        console.log("Valid city: ", data.geonames[0].name);
        alert(`${city} is a valid city.`);

        const inputData = data.geonames[0];

        displayWeather(inputData);
      } else {
        console.log("Invalid city.");
        alert(`${city} is not a valid city. Please try again.`);
      }
      query.value = "";
    }
  } catch (e) {
    console.log(e);
  }
};

const button = document.querySelector("#submit");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  validateQuery();
});

window.onload = async () => {
  await displayCurrentLocationWeather();
};
