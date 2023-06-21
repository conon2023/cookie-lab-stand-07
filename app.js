"use strict";
// Constructor function for CookieLabStand
function CookieLabStand(storename, minCustPerHour, maxCustPerHour, avgCookiesPerHour) {
  this.storename = storename;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerHour = avgCookiesPerHour;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
}

// Prototype methods for CookieLabStand
CookieLabStand.prototype.calcCustomersEachHour = function() {
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour));
  }
};

CookieLabStand.prototype.calcCookiesEachHour = function() {
  for (let i = 0; i < hours.length; i++) {
    const oneHour = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerHour);
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

CookieLabStand.prototype.render = function() {
  const article = document.createElement("article");
  const h3 = document.createElement("h3");
  h3.textContent = this.storename;
  article.appendChild(h3);
  const ul = document.createElement("ul");
  for (let i = 0; i < hours.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${hours[i]}: ${this.cookiesEachHour[i]} cookies | ${this.customersEachHour[i]} customers`;
    ul.appendChild(li);
  }
  article.appendChild(ul);
  container.appendChild(article);
};

// Example usage:
const seattle = new CookieLabStand('Seattle', 23, 65, 6.3);
seattle.calcCustomersEachHour();
seattle.calcCookiesEachHour();
seattle.render();

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}