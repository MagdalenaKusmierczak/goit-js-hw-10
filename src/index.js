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
      return `<li  class="list-element">
         <p class="list-item">
          <img class= "list-image"   src="${country.flags.svg}" alt="flag">
                   <span>  ${country.name.official}</span></p>
          </li>`;
    })
    .join('');
  countryList.innerHTML = countryElement;
}
//Showing full country info
function getCountrieInfo(countries) {
  const countriesInfo = countries
    .map(country => {
      return `<h1  class="countryinfo-header">
   
          <img class= "info-image" alt="flag" src="${country.flags.svg}">
                       <span> ${country.name.official}</span>
                  </h1>
    <p class="countryinfo-paragraph"> <span class="countryinfo-span">Capital: </span> ${
      country.capital
    }</p>
    <p class="countryinfo-paragraph"> <span class="countryinfo-span">Population: </span> ${
      country.population
    } </p>
    <p class="countryinfo-paragraph"> <span class="countryinfo-span">Languages: </span> ${Object.values(
      country.languages
    )}</p>`;
    })
    .join('');
  countryInfo.innerHTML = countriesInfo;
}
