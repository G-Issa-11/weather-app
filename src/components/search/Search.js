import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { API_URI, citiesOptions } from "../../api.js";

const Search = () => {
  const [value, setValue] = useState(null);

  const loadOptions = inputValue => {
    return fetch(
      `${API_URI}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      citiesOptions
    )
      .then(response => response.json())
      .then(response => {
        return {
          options: response.data.map(city => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`
            };
          })
        };
      })
      .catch(err => console.error(err));
  };

  const handleOnChange = searchData => {
    setValue(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Select your city"
      debounceTimeout={600}
      value={value}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
