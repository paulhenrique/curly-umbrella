import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { useDebounce } from "./useDebounce";
import useOSMSearch from "./useOSMSearch";

const SearchAutocompleteOSM = ({ config = {}, debug, onSelectLocation }) => {
  const { debouncedTime = 0, inputProps } = config;
  const { fireGetLocationsByText, options, loading } = useOSMSearch(config);

  const [value, setValue] = useState("");
  const debouncedChange = useDebounce(
    () => fireGetLocationsByText(value),
    debouncedTime
  );

  const handleChange = (text) => {
    setValue(text);
    debouncedChange();
  };

  return (
    <span data-testid="SearchAutocompleteOSM">
      {debug && <pre>{JSON.stringify(options, null, 2)}</pre>}
      <Autocomplete
        style={{ flex: "1" }}
        freeSolo
        disableClearable
        onChange={(_e, value) => onSelectLocation(value)}
        options={options || []}
        getOptionLabel={(option) => option.display_name}
        getOptionSelected={(option, selectedValue) =>
          option.osm_id === selectedValue.osm_id
        }
        renderInput={(params) => (
          <TextField
            {...params}
            data-testid="searchAutocompleteTextField"
            id="searchAutocompleteTextField"
            label="Procurar por"
            placeholder="Digite para encontrar um texto"
            InputProps={{ ...params.InputProps, type: "search" }}
            {...inputProps}
          />
        )}
        onInputChange={(_data, inputValue) => {
          handleChange(inputValue);
        }}
      />
    </span>
  );
};

SearchAutocompleteOSM.defaultProps = {
  onChange: (value) =>
    console.log(
      "Not implemented - defaultProp onChange in autocomplete",
      value
    ),
};

export default SearchAutocompleteOSM;
