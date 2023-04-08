//Frontend of application for searching country data using part of name or full name.
//
//Style import
import './css/styles.css';
//
//Funtion import
import { fetchCountries } from './fetchCountries';
//
//Libraries import
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
