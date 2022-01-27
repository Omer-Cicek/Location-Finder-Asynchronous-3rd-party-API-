'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+(
        data.population / 1000000
      ).toFixed(1)} M people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(
        data.languages
      )}</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
      </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbour = function (country) {
//   //AJAX Call Country1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(Object.values(data.currencies)[0].name);
//     //Render Country
//     renderCountry(data);
//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     if (neighbour) {
//       //AJAX Call Country1
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//       request2.send();
//       request2.addEventListener('load', function () {
//         const [data2] = JSON.parse(this.responseText);
//         console.log(data2);
//         renderCountry(data2, 'neighbour');
//       });
//     }

//     console.log(...neighbour);
//   });
// };
// getCountryAndNeighbour('Turkey');

//request is a promise

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders;
      console.log(neighbour[0]);
      if (!neighbour) throw new Error('There is no neighbour!');

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}🧿🧿🧿`);
      renderError('Something Went Wrong🧿🧿🧿');
    });
};

let saveSecond = false;

btn.addEventListener('click', function () {
  getCountryData('belgium');
});
