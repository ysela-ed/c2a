import { useQuery } from "react-query";
import { getWeather, getGeoLocation } from "../../api/weatherApi";

const useWeather = ({ city = "", units = "metric" }) => {
  console.log(units);
  const { data, isLoading, isError } = useQuery(
    ["weather", city, units],
    () =>
      getWeather({
        city,
        units,
      }),
    { enabled: !!city }
  );

  return {
    data,
    isLoading: isLoading,
    isError: isError,
  };
};

const useGeoLocation = (city) => {
  const { data, isLoading, isError } = useQuery(
    ["geoLocation", city],
    () => getGeoLocation(city),
    //temporarily return first value until selecting one of a few locations is possible
    { enabled: !!city, select: (data) => data[0] }
  );
  return { data, isLoading, isError };
};
export { useWeather };
