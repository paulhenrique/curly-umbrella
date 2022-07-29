import React, { useEffect, useState } from "react";

const getLocationsByText = async (text, osmAPIAddress) => {
  const data = await fetch(osmAPIAddress.replace("{search}", text));
  const dataJson = await data.json();
  return dataJson;
};

const useOSMSearch = (config) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState();
  const fireGetLocationsByText = async (text) => {
    try {
      setLoading(true);
      const locations = await getLocationsByText(text, config?.osmAPIAddress);
      setOptions(locations);
    } catch (e) {
      console.error("Erro ao tentar buscar os dados da aplicação", e);
    } finally {
      setLoading(false);
    }
  };

  return {
    fireGetLocationsByText,
    options,
  };
};

export default useOSMSearch;
