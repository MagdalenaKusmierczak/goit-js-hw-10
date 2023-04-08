const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`
  ).then(res => {
    return res.json();
  });
};
export { fetchCountries };
