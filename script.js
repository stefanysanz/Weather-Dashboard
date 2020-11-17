const Main = () => {
  console.log("main");

  let location = getCurrentLocation();

  let city = document.getElementById("city");
  let state = document.getElementById("state");
  let searchBtn = document.getElementById("search-btn");

  let current = document.getElementById("forecast-data-current");
  let currentRows = createForecastRows();
  current.appendChild(currentRows.rows);

  let fiveDay = document.getElementById("forecast-data-5-day");
  let fiveDayRows = [];
  for (let i = 0; i < 5; i++) {
    let rows = createForecastRows();
    fiveDay.appendChild(rows.rows);
    fiveDayRows.push(rows);
  }

  searchBtn.onclick = (e) => {
    // Get current weather
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "," + state.value + "&units=imperial&appid=66f427550a65f6b2e1c0322728193766")
      .then(res => {
        console.log(JSON.stringify(res))
        let currentWeather = res.data.weather[0];
        currentRows.data["Main"].data.innerHTML = currentWeather.main;
        currentRows.data["Description"].data.innerHTML = currentWeather.description;
        currentRows.data["Feels Like"].data.innerHTML = res.data.main.feels_like + " &#176;F";
        currentRows.data["Temp"].data.innerHTML = res.data.main.temp + " &#176;F";
        currentRows.data["Temp (Min)"].data.innerHTML = res.data.main.temp_min + " &#176;F";
        currentRows.data["Temp (Max)"].data.innerHTML = res.data.main.temp_max + " &#176;F";
        currentRows.data["Pressure"].data.innerHTML = res.data.main.pressure + " hPa";
        currentRows.data["Humidity"].data.innerHTML = res.data.main.humidity + " %";
        currentRows.data["Visibility"].data.innerHTML = res.data.visibility + " ft";
        currentRows.data["Wind Speed"].data.innerHTML = res.data.wind.speed + " mph";
        currentRows.data["Wind Degrees"].data.innerHTML = res.data.wind.deg + "&#176;";
      });
    // Get five day forecast
    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "," + state.value + "&units=imperial&appid=66f427550a65f6b2e1c0322728193766")
      .then(res => {
        console.log(JSON.stringify(res))
        for (let i = 0; i < 5; i++) {
          let row = fiveDayRows[i];
          let item = res.data.list[i];
          row.data["Main"].data.innerHTML = item.weather[0].main;
          row.data["Description"].data.innerHTML = item.weather[0].description;
          row.data["Feels Like"].data.innerHTML = item.main.feels_like + " &#176;F";
          row.data["Temp"].data.innerHTML = item.main.temp + " &#176;F";
          row.data["Temp (Min)"].data.innerHTML = item.main.temp_min + " &#176;F";
          row.data["Temp (Max)"].data.innerHTML = item.main.temp_max + " &#176;F";
          row.data["Pressure"].data.innerHTML = item.main.pressure + " hPa";
          row.data["Humidity"].data.innerHTML = item.main.humidity + " %";
          row.data["Visibility"].data.innerHTML = item.visibility + " ft";
          row.data["Wind Speed"].data.innerHTML = item.wind.speed + " mph";
          row.data["Wind Degrees"].data.innerHTML = item.wind.deg + "&#176;";
        }
      });
  }

}
window.onload = Main;

const getCurrentLocation = () => {
  axios.get("https://ipinfo.io")
    .then(res => {
      return res;
    });
}

const kelvinToF = (k) => {
  return Math.ceil(k * 9 / 5 - 459.67);
}

const createForecastRows = () => {
  let rows = document.createElement("div");
  rows.className = "forecast-rows";
  let rowNames = [
    "Main",
    "Description",
    "Temp",
    "Feels Like",
    "Temp (Min)",
    "Temp (Max)",
    "Pressure",
    "Humidity",
    "Visibility",
    "Wind Speed",
    "Wind Degrees",
  ];
  let data = {};
  for (let i = 0; i < rowNames.length; i++) {
    let name = rowNames[i];
    let row = createForecastRow(name);
    rows.appendChild(row.row);
    data[name] = row;
  }

  return {
    rows: rows,
    data: data,
  };
}

const createForecastRow = (name) => {
  let row = document.createElement("div");
  row.className = "forecast-row";

  let label = document.createElement("div");
  label.className = "forecast-row-label left";
  label.innerHTML = name + ":";
  row.appendChild(label);

  let data = document.createElement("div");
  data.className = "forecast-row-data right";
  row.appendChild(data);

  return {
    row: row,
    data: data,
  };
}