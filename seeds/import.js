const fs = require("fs");
const fastcsv = require("fast-csv");

const db = require("../db")

const routeStream = fs.createReadStream('routes.txt');
const tripsStream = fs.createReadStream('trips.txt');
const stopsStream = fs.createReadStream('stops.txt');
const stopTimesStream = fs.createReadStream('stop_times.txt');
var csvData = [];


fastcsv.parseStream(stopTimesStream)
    .on('error', error => console.error(error))
    .on('data', row => {
        console.log(`ROW=${JSON.stringify(row)}`)
        csvData.push(row)
 
    })
    .on('end', rowCount => {
        // console.log(`Parsed ${rowCount} rows`)
 
        csvData.shift();
       
    });
