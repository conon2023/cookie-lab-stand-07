"use strict";

const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", ];

const container = document.getElementById("container");
const storeTable = document.getElementById("storeTable");
const newStoreForm = document.getElementById("newStoreForm");

// empty array to push new stores into when created
const allStores = [];



// function randomNum(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);

function randomNum(min, max){
  const x = Math.floor(Math.random()*(max - min + 1) + min);
  return x;
};

function CookieLabStand(name,minCustPerHour,maxCustPerHour,avgCookiesPerCust){
  this.name= name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour= maxCustPerHour;
  this.avgCookiesPerCust= avgCookiesPerCust;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
  this.calculateCustomerEachHour();
  this.calculateCookiesEachHour();
  this.pushStore();
  this.render();
  
};

// Prototype Method for Populating CustomerEachHourArray
CookieLabStand.prototype.calculateCustomerEachHour = function(){
  for(let i = 0; i < hours.length; i++){
  const y = randomNum(this.minCustPerHour, this.maxCustPerHour);
  this.customersEachHour.push(y);
  // console.log(i) this is to calculatecustomereachhour`)
}
};

CookieLabStand.prototype.calculateCookiesEachHour = function(){
  for(let i =0;i< hours.length; i++){
      const z = Math.ceil(this.avgCookiesPerCust * this.customersEachHour[i]);
      this.cookiesEachHour.push(z)
      this.totalDailyCookies += z;
  }
};


//Protopye method for pushing a new intance of CookieLabStand into the all stores array as it is created.//

CookieLabStand.prototype.pushStore = function(){
  allStores.push(this);
  // console.log(allStores)
};


// prototype method used to render new instance of a store into the table
// steps
// invokes the calcCustomersEachHour / calcCookiesEachHour methods
// creates the table row and first table header cell with content
// create a for loop that loops through for every hour, creates a table data cell and sets the content to the cookies sold for that hour, appends each table data cell to the table row
// create a table header cell to display totalDailyCookies append to table row
// append the table row to the table

  CookieLabStand.prototype.render = function () {
    this.calculateCustomerEachHour();
    this.calculateCookiesEachHour();
  
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
  }

// create a function to render the hour row at the top of the table
// create the table row and table header cells
// loop through hours, create a table header cell, set content to hours[i] append to the table row
// create a table header, set the content to store totals, append to table row, append table row to storeTable
//invoke the hours row

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

  hoursRow()

  //Creates a New Instance of CookieLabStand

  const seattle = new CookieLabStand("Seattle",23,65,6.3);
  const dubai = new CookieLabStand("dubai", 3, 24, 1.2);
  const paris = new CookieLabStand("paris", 11, 38, 3.7);
  const lima = new CookieLabStand("lima", 20, 38, 2.3);
  const tokyo = new CookieLabStand("tokyo", 2, 16, 4.6);


  //  Creates the hourlyTotals 
  function hourlyTotals() {
  const tr = document.createElement("tr")
  const th = document.createElement("th");
  th.textContent = "Hourly Totals";
  tr.appendChild(th);


   for (let i = 0; i < hours.length; i++) {
      const th = document.createElement("th");
      let hoursAdded = 0;
      for (let j = 0; j < allStores.length; j++) {
      const hourAmount = allStores[j].cookiesEachHour[i];
      hoursAdded += hourAmount;
      }
      th.textContent = hoursAdded;
      tr.appendChild(th);
  }
  
  let totalTotals = 0;
  for (let i = 0; i < allStores.length; i++) {
      totalTotals += allStores[i].totalDailyCookies;
  }
  const totalsCell = document.createElement("th");
  totalsCell.textContent = totalTotals;
  tr.appendChild(totalsCell);

  storeTable.appendChild(tr);
}
hourlyTotals();

newStoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  storeTable.innerHTML = "";
  hoursRow();

  for (let i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }

  const storeNameInput = event.target.name.value;
  const minCustInput = event.target.minCust.value;
  const maxCustInput = event.target.maxCust.value;
  const avgCookiesInput = event.target.avgCookies.value;

  const store = new CookieLabStand(storeNameInput, minCustInput, maxCustInput, avgCookiesInput);

  hourlyTotals();
  newStoreForm.reset();
});