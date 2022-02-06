'use strict';

const btnGetValue = document.querySelector('.btnSearch');
const countryCard = document.querySelector('.mainCountry');
const borderCountries = document.querySelector('.borderCountries');
const inputBar = document.querySelector('#findercountry');
const inputBtn = document.querySelector('.btnSearch');

////////////////////////MAIN COUNTRY//////////////////////
//loading loads asyncroniously
const countryFinder = async function (country) {
  const getJson = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const getData = await getJson.json();
  createCountryData(getData);
  console.log(getData);

  getData[0].borders.forEach((country) => {
    const lower = country.toLowerCase();
    funcCountry(lower);
  });
};

const createCountryData = function (getData) {
  //getting data from json file dynamically
  const flag = getData[0].flags.png;
  const countryName = getData[0].name.common;
  const continents = getData[0].continents[0];
  const capital = getData[0].capital[0];
  const population = +(getData[0].population / 1000000).toFixed(1);
  const lang = Object.values(getData[0].languages)[0];
  const currencies = Object.values(getData[0].currencies)[0].name;
  const currenciesSymbol = Object.values(getData[0].currencies)[0].symbol;

  // loading html dynamically
  const html = `
      <div class="country">
          <div class="flag">
              <img class="flagIn" src="${flag}"  alt="country Flag" />
          </div>
          <div class="info">
              <div class="Name"><span class="bold"> Name:</span> ${countryName}</div>
              <div class="region"><span class="bold"> Region:</span> ${continents}</div>
              <div class="capital"><span class="bold">Capital City:</span> ${capital}</div>
              <div class="population"><span class="bold">Population:</span> ${population} M</div>
              <div class="language"><span class="bold"> Language:</span> ${lang}</div>
              <div class="currencies"><span class="bold"> Currencies:</span> ${currencies} (${currenciesSymbol})</div>
          </div>
      </div>
      `;
  countryCard.insertAdjacentHTML('beforeend', html);
};

//////////////////Borders////////////////////////

//getting data for all borders
const funcCountry = async function (border) {
  const ömer = await fetch(
    `https://restcountries.com/v2/alpha?codes=${border}`
  );
  const faruk = await ömer.json();
  // console.log(faruk);
  createBorderData(faruk);
};

const createBorderData = function (getData) {
  //getting borders data from json file dynamically
  console.log(getData[0].currencies[0].symbol);

  const flag = getData[0].flags.png;
  const countryName = getData[0].name;
  const continents = getData[0].region;
  const capital = getData[0].capital;
  const population = +(getData[0].population / 1000000).toFixed(1);
  const lang = getData[0].languages[0].name;
  const currencies = getData[0].currencies[0].name;
  const currenciesSymbol = getData[0].currencies[0].symbol;

  // loading borders  html dynamically
  const html = `
      <div class="country">
          <div class="flag">
              <img class="flagIn" src="${flag}"  alt="country Flag" />
          </div>
          <div class="info">
              <div class="Name"><span class="bold"> Name:</span> ${countryName}</div>
              <div class="region"><span class="bold"> Region:</span> ${continents}</div>
              <div class="capital"><span class="bold">Capital City:</span> ${capital}</div>
              <div class="population"><span class="bold">Population:</span> ${population} M</div>
              <div class="language"><span class="bold"> Language:</span> ${lang}</div>
              <div class="currencies"><span class="bold"> Currencies:</span> ${currencies} (${currenciesSymbol})</div>
          </div>
      </div>
      `;
  borderCountries.insertAdjacentHTML('beforeend', html);
};

//search bar
inputBtn.addEventListener('click', function (e) {
  e.preventDefault();
  clearInterval();
  const search = inputBar.value.toLowerCase();
  console.log(search);
  countryFinder(search);
});
