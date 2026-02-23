// Sélection des éléments du DOM
const getWeatherBtn = document.getElementById("get-weather-btn");
const citySelect = document.getElementById("city-select");
const weatherIcon = document.getElementById("weather-icon");
const mainTemperature = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationName = document.getElementById("location");
const weatherContainer = document.getElementById("weather-container");

// Hide container at start
weatherContainer.style.display = "none";

// Fonction async pour récupérer les données météo
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Retourne undefined pour signaler l'erreur à showWeather
    return undefined;
  }
}

// Fonction async pour afficher la météo
async function showWeather(city) {
  const data = await getWeather(city);

  // Gestion des erreurs globales (ex: Paris)
  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  // Show container
  weatherContainer.style.display = "block";

  // Affichage des données avec protections (optional chaining et fallback "N/A")
  locationName.textContent = data.name ?? "N/A";
  weatherMain.textContent = data.weather?.[0]?.main ?? "N/A";
  weatherIcon.src = data.weather?.[0]?.icon ?? "";
  mainTemperature.textContent =
    (data.main?.temp ?? "N/A") + (data.main?.temp !== undefined ? " °C" : "");
  feelsLike.textContent =
    (data.main?.feels_like ?? "N/A") +
    (data.main?.feels_like !== undefined ? " °C" : "");
  humidity.textContent =
    (data.main?.humidity ?? "N/A") +
    (data.main?.humidity !== undefined ? " %" : "");
  wind.textContent =
    (data.wind?.speed ?? "N/A") +
    (data.wind?.speed !== undefined ? " m/s" : "");
  windGust.textContent =
    (data.wind?.gust ?? "N/A") + (data.wind?.gust !== undefined ? " m/s" : "");
}

// Événement sur le bouton
getWeatherBtn.addEventListener("click", () => {
  const city = citySelect.value.trim();
  if (!city) return; // Ne rien faire si aucune ville sélectionnée
  showWeather(city);
});
