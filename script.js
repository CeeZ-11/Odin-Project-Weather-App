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

displayWeather();
