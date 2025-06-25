const API_KEY = 'YOUR_API_KEY'; // Get from https://openweathermap.org/api

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const card = document.getElementById('weatherCard');

  if (!city) {
    card.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    card.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    card.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}
