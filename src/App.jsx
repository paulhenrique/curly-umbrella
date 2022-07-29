import React, { useState } from "react";
import SearchAutocompleteOSM from "./components/SearchAutocompleteOSM";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <>
      <SearchAutocompleteOSM
        onSelectLocation={setSelectedLocation}
        config={{
          debouncedTime: 1000,
          osmAPIAddress:
            "https://nominatim.openstreetmap.org/search.php?q=${search}&format=jsonv2&countrycodes=br&viewbox=-54.2467112,-29.4298578,-48.2110548,-25.6511194&bounded=1",
          inputProps: {},
        }}
      />
      <pre>{JSON.stringify(selectedLocation, null, 2)}</pre>
    </>
  );
};

export default App;
