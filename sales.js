"use strict";

const hours = [
  "6am", "7am", "8am", "9am", "10am", "11am",
  "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"
];

const container = document.getElementById("container");
const storeTable = document.getElementById("storeTable");
const newStoreForm = document.getElementById("newStoreForm");

const allStores = [];

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function CookieLabStand(name, minCustPerHour, maxCustPerHour, avgCookiesPerCust) {
  this.name = name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
  this.calculateCustomerEachHour();
  this.calculateCookiesEachHour();
  this.pushStore();
  this.render();
}

CookieLabStand.prototype.calculateCustomerEachHour = function() {
  for (let i = 0; i < hours.length; i++) {
    const customers = randomNum(this.minCustPerHour, this.maxCustPerHour);
    this.customersEachHour.push(customers);
  }
};

CookieLabStand.prototype.calculateCookiesEachHour = function() {
  for (let i = 0; i < hours.length; i++) {
    const cookies = Math.ceil(this.avgCookiesPerCust * this.customersEachHour[i]);
    this.cookiesEachHour.push(cookies);
    this.totalDailyCookies += cookies;
  }
};

CookieLabStand.prototype.pushStore = function() {
  allStores.push(this);
};

CookieLabStand.prototype.render = function() {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = this.name;
  tr.appendChild(th);

  for (let i = 0; i < hours.length; i++) {
    const td = document.createElement("td");
    td.textContent = this.cookiesEachHour[i];
    tr.appendChild(td);
  }

  const storeTotal = document.createElement("th");
  storeTotal.textContent = this.totalDailyCookies;
  tr.appendChild(storeTotal);

  storeTable.appendChild(tr);
};

function hoursRow() {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = "Store Location";
  tr.appendChild(th);

  for (let i = 0; i < hours.length; i++) {
    const th = document.createElement("th");
    th.textContent = hours[i];
    tr.appendChild(th);
  }

  const storeTotalsHeaderCell = document.createElement("th");
  storeTotalsHeaderCell.textContent = "Store Totals";
  tr.appendChild(storeTotalsHeaderCell);
  storeTable.appendChild(tr);
}

function renderStoreTable() {
  storeTable.innerHTML = "";
  hoursRow();

  for (let i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }

  hourlyTotals();
}

function hourlyTotals() {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = "Hourly Totals";
  tr.appendChild(th);

  let total = 0;
  for (let i = 0; i < hours.length; i++) {
    let hourTotal = 0;
    for (let j = 0; j < allStores.length; j++) {
      hourTotal += allStores[j].cookiesEachHour[i];
    }

    total += hourTotal;

    const td = document.createElement("td");
    td.textContent = hourTotal;
    tr.appendChild(td);
  }

  const totalCell = document.createElement("th");
  totalCell.textContent = total;
  tr.appendChild(totalCell);

  storeTable.appendChild(tr);
}

newStoreForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const minCustPerHour = parseInt(event.target.minCustPerHour.value);
  const maxCustPerHour = parseInt(event.target.maxCustPerHour.value);
  const avgCookiesPerCust = parseFloat(event.target.avgCookiesPerCust.value);

  new CookieLabStand(name, minCustPerHour, maxCustPerHour, avgCookiesPerCust);

  event.target.reset();
});

hoursRow();

const seattle = new CookieLabStand("Seattle", 23, 65, 6.3);
const dubai = new CookieLabStand("Dubai", 3, 24, 1.2);
const paris = new CookieLabStand("Paris", 11, 38, 3.7);
const lima = new CookieLabStand("Lima", 20, 38, 2.3);
const tokyo = new CookieLabStand("Tokyo", 2, 16, 4.6);

renderStoreTable();