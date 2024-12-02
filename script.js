const getLocation = async () => {
  const apiKey = "159234c99fb545ada50544206108bb6b";
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      mode: "cors",
    });
    const data = await response.json();
    console.log(data);

    const latitude = data.latitude;
    const longitude = data.longitude;

    return { latitude, longitude };
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
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const displayWeather = async () => {
  const location = await getLocation();

  try {
    if (location) {
      const { latitude, longitude } = location;
      const data = await getWeatherData(latitude, longitude);

      console.log(
        "Weather data displayed successfully!" + JSON.stringify(data)
      );
    }
  } catch (e) {
    console.log(e);
  }
};

//displayWeather();

const validateQuery = async () => {
  const query = document.querySelector("#cityInput");
  const city = query.value.trim();
  const username = "ceez11";
  const url = `http://api.geonames.org/searchJSON?name_startsWith=${city}&maxRows=10&cities=cities15000&username=${username}`;

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
