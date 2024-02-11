import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useWeather } from "./weatherQueries";

const UNIT_CONSTANTS = {
  metric: {
    symbol: "°C",
    displayName: "Celsius",
    name: "metric",
    windUnit: "meter/sec",
  },
  imperial: {
    symbol: "°F",
    displayName: "Fahrenheit",
    name: "imperial",
    windUnit: "miles/hour",
  },
};

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [selectedUnits, setSelectedUnits] = useState("metric");
  const debouncedCity = useDebounce(city, 500);

  const { data, isLoading, isError } = useWeather({
    city: debouncedCity,
    units: selectedUnits,
  });
  const unitsSymbol = UNIT_CONSTANTS[selectedUnits].symbol;
  const temperature = `${data?.main.temp}${unitsSymbol}`;
  const humidity = `${data?.main.humidity}%`;
  const windSpeed = `${data?.wind.speed}${UNIT_CONSTANTS[selectedUnits].windUnit}`;

  const handleCityChange = (val) => {
    setCity(val);
  };

  const toggleUnits = () => {
    setSelectedUnits((prevUnits) =>
      UNIT_CONSTANTS[prevUnits].name === "metric"
        ? UNIT_CONSTANTS.imperial.name
        : UNIT_CONSTANTS.metric.name
    );
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        placeholder="Enter city name..."
        onChange={(e) => handleCityChange(e.target.value)}
      />
      <div>
        <label>Units:</label>
        <button onClick={toggleUnits}>
          {UNIT_CONSTANTS[selectedUnits].symbol}
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Houston, we have a problem. Network error detected!</p>}
      {data && (
        <>
          <h2>{data.name}</h2>
          <div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
              <p>{data.weather[0].description}</p>
            </div>
            <div>
              <p>{temperature}</p>
              <p>{humidity}</p>
              <p>{windSpeed}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { WeatherSearch };
