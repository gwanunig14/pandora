// fetch.js
// fetches and formats marta data

const fetch = require("node-fetch");

function getMartaData() {
  fetch(
    "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus"
  )
    .then(res => res.json())
    .then(json => formatData(json));
}

function formatData(data) {
  formatedData = data.map(datum => {
    return {
      route: datum["ROUTE"],
      lat: datum["LATITUDE"],
      lon: datum["LONGITUDE"],
      timepoint: datum["TIMEPOINT"]
    };
  });
  console.log(formatedData);
}

getMartaData();
