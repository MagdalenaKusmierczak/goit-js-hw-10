//Function that creates HTTP calling to endpoint name and returns table of countries with filtration of data.

const countries = 'https://restcountries.com/v3.1/name/';

const filter = '?fields=population,capital,languages,name,flags';

const fetchCountries = name => {
  fetch(countries + name + filter).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
export { fetchCountries };
