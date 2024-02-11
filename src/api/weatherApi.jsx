const API_KEY = "83c6be0e447ec2f7d2bbfd0f64d4795a";

const getWeather = async ({ city, units }) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network error!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //to be updated with some sort of display
    console.error(error);
  }
};

const getGeoLocation = async (city) => {
  if (!city) return;
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network error!");
    }
    const data = await response.json();
    return data; // temporary until selecting one of a few locations is possible
  } catch (error) {
    //to be updated with some sort of display
    console.error(error);
  }
};
export { getWeather, getGeoLocation };
