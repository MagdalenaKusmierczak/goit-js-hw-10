//Frontend of application for searching country data using part of name or full name.
//
//Style import
import './css/styles.css';
//
//Funtion import
import { fetchCountries } from './fetchCountries';
//
//Libraries import
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
//
//Notifications settings
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '40px',
  opacity: 1,
});
//
//Base elements
const DEBOUNCE_DELAY = 300;
//
//Selectors
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
//
//Event listener on input in search-box handled with debounce
searchBox.addEventListener('input', debounce(searchingInput, DEBOUNCE_DELAY));
//
//Searching countries function
function searchingInput(event) {
  event.preventDefault();
  if (event.target.value.trim()) {
    fetchCountries(event.target.value.trim())
      .then(countries => {
        if (countries.length > 10) {
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length <= 10) {
          countryInfo.innerHTML = '';
          getCountriesNames(countries);
        } else {
          countryList.innerHTML = '';
          getCountrieInfo(countries);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        console.log(error);
      });
  } else {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
}
//
//Showing list of countries names with flags
function getCountriesNames(countries) {
  const countryElement = countries
    .map(country => {
      return `<li  box-shadow: 10px 1px 8px 1px rgba(189, 189, 189, 0.97);'>
         <p class="list-item"><span>
          <img width="30px" height="30px"  src="${country.flags.svg}">
                    </span> ${country.name.official}</p>
          </li>`;
    })
    .join('');
  countryList.innerHTML = countryElement;
}
//Showing full country info
function getCountrieInfo(countries) {
  const countriesInfo = countries
    .map(country => {
      return `<h1 style = ' box-shadow: 10px 1px 8px 1px rgba(189, 189, 189, 0.97);' class="country_name">
      <span>
          <img width="60px" height="40px"  src="${country.flags.svg}">
                    </span> ${country.name.official}
                  </h1>
    <p class="country_data"> <span class="country_data--title">Capital: </span> ${
      country.capital
    }</p>
    <p class="country_data"> <span class="country_data--title">Population: </span> ${
      country.population
    } </p>
    <p class="country_data"> <span class="country_data--title">Languages: </span> ${Object.values(
      country.languages
    )}</p>`;
    })
    .join('');
  countryInfo.innerHTML = countriesInfo;
}
