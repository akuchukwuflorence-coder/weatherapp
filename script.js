// get elements by id
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

const locationName = document.getElementById("location");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const uvIndex = document.getElementById("uvIndex");
const weatherIcon = document.getElementById("weatherIcon");
const forecast = document.getElementById("forecast");

// Attend to Events in html with a place holder
searchBtn.addEventListener("click", function () {
  const city = cityInput.value.trim();

  if (city === "") {
    message.textContent = "Please enter a city name.";
    weatherCard.style.display = "none";
    return;
  }

  // fetch city coordinates using the Geocoding API
  getWeather(city);
});
async function getWeather(city) {
  try {
    message.textContent = "Loading...";

  // First API: get latitude and longitude of the city
    const geoUrl = 
  `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();
    if (!geoData.results) {
        throw new error("City not found.");
      }

      const place = geoData.results[0];
      const latitude = place.latitude;
      const longitude = place.longitude;

      locationName.textContent = `${place.name}, ${place.country}`;

      // Second API: get live weather data
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`
      +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index`
      + 
      `&timezone=auto`;
      
      const weatherResponse = await
      fetch(weatherUrl);
      const weatherData = await
      weatherResponse.json();
      
      console.log(weatherData);
      message.textContent = "Weather loaded successfully!";
  } catch (error) { 
      message.textContent = error.message;
    }
}

      const current = data.current;

      temperature.textContent = Math.round(current.temperature_2m) + "℃";
      feelsLike.textContent = Math.round(current.apparent_temperature) + "℃";
      humidity.textContent = current.relative_humidity_2m + "%";
      wind.textContent = current.wind_speed_10m + " km/h";
      
      const weatherText = getWeatherDescription(current.weather_code);
      condition.textContent = weatherText;
      weatherIcon.textContent = getWeatherIcon(current.weather_code);
      uvIndex.textContent = getUvLevel(current.uv_index);
      displayForecast(data.daily);

function displayForecast(daily) {
  forecast.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const date = new Date(daily.time[i]);
    const dayName = i === 0
    ? "Today"
    : date.toLocaleDateString("en-US", { weekday: "long"});

    const maxTemp = Math.round(daily.temperature_2m_max[i]);
    const minTemp = Math.round(daily.temperature_2m_min[i]);
    const code = daily.weather_code[i];

    forecast.innerHTML += `
    <div class="forecast-row">
    <span class="day">${dayName}</span>
    <span class="small-icon">${getweatherIcon(code)}</span>
    <span class="temp">${maxTemp}
    °<br><small>${minTemp}°</small></span>
    </div
    `;
  }
}

// Function to explain weather code
function getWeatherDescription(code) {
  if (code === 0) {
    return "Sunny";
  } else if (code === 1 || code === 2 || code === 3) {
    return "Partly cloudy";
  } else if (code === 45 || code === 48) {
    return "Foggy";
  } else if (code >= 51 && code <= 67) {
    return "Rainy";
  } else if (code >= 71 && code <= 77) {
    return "Snowy";
  } else if (code >= 80 && code <= 82) {
    return "Rain showers";
  } else if (code >= 95) {
    return "Thunderstorm";
  } else {
    return "Cloudy";
  }
}

function getWeatherIcon(code) {
  if (code === 0) { return"☀️";
  } else if (code === 1 || code === 2 || code === 3) {
    return "⛅";
  } else if (code === 45 || code === 48) {
    return "🌁";
  } else if (code >= 51 && code <= 67) {
    return "🌧️";
  } else if (code >= 71 && code <= 77) {
    return "☃️";
  } else if (code >= 80 && code <= 82) {
    return "⛈️";
  } else if (code >= 95) {
    return "⛈️";
  } else {
    return "☁️";
  }
}

function getUvLevel(value) {
  if (value < 3) {
    return "Low";
  } else if (value < 6) {
    return "Moderate";
  } else if (value < 8) {
    return "High";
  } else {
    return "Very High";
  }
}

getWeather("Lagos");

