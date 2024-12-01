const getLocation = async () => {
  try {
    const response = await fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=159234c99fb545ada50544206108bb6b",
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

getLocation();

const getWeatherData = async () => {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bacolod%2520City?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=WKF2HYP55LTVJTKM3F2Q6NBF9&options=beta&contentType=json",
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
