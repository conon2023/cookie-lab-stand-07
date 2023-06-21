"use strict";
console.log("I hope you work buddy");

const container = document.getElementById("container");
const storeTable = document.getElementById("storeTable");

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Constructor function for CookieLabStand
function CookieLabStand(
  storeName,
  minCustPerHour,
  maxCustPerHour,
  avgCookiesPerHour
) {
  this.storeName = storeName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerHour = avgCookiesPerHour;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
  this.calcCustomersEachHour();
  this.calcCookiesEachHour();
  this.render();
}

// Prototype methods for CookieLabStand
CookieLabStand.prototype.calcCustomersEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(
      randomNum(this.minCustPerHour, this.maxCustPerHour)
    );
  }
};

CookieLabStand.prototype.calcCookiesEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    const oneHour = Math.ceil(
      this.customersEachHour[i] * this.avgCookiesPerHour
    );
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

CookieLabStand.prototype.render = function () {
  // const article = document.createElement("article");
  // container.appendChild(article);

  // const h3 = document.createElement("h3");
  // h3.textContent = this.storeName; // look at this later i.e storename
  // article.appendChild(h3);

  // const table = document.createElement("table");
  // storeTable.appendChild(table);

  const tr = document.createElement("tr");
  storeTable.appendChild(tr);

  const th = document.createElement("th");
  th.textContent = this.storeName;
  tr.appendChild(th);

  // // create a th to display the totals and append to the tr
  // const storeTotal = document.createElement("th");
  // storeTotal.textContent = this.totalDailyCookies;
  // tr.appendChild(storeTotal);
  console.log(this.cookiesEachHour)
  // loop through cookiesEachHour - create a td for each index and append to tr
  for (let i = 0; i < hours.length; i++) {
    const td = document.createElement("td");
    td.textContent = this.cookiesEachHour[i];
    tr.appendChild(td);
  }

  // create a th to display the totals and append to the tr
  const storeTotal = document.createElement("th");
  storeTotal.textContent = this.totalDailyCookies;
  tr.appendChild(storeTotal);

  // append the tr to the table - storeTable
  storeTable.appendChild(tr);
};

// test constructor works
const seattle = new CookieLabStand("seattle", 23, 65, 6.3);
const dubai = new CookieLabStand("dubai", 3, 24, 1.2);
const paris = new CookieLabStand("paris", 11, 38, 3.7);
const lima = new CookieLabStand("lima", 20, 38, 2.3);
const tokyo = new CookieLabStand("tokyo", 2, 16, 4.6);
const totals = new CookieLabStand("totals", 59, 181, 18.1);
console.log(seattle);
