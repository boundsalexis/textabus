const fs = require("fs");
const fastcsv = require("fast-csv");

const routeStream = fs.createReadStream('routes.txt');
const tripsStream = fs.createReadStream('trips.txt');
let csvData = [];
fastcsv.parseStream(routeStream)
    .on('error', error => console.error(error))
    .on('data', row => {
        // console.log(`ROW=${JSON.stringify(row)}`)
        csvData.push(row)
 
    })
    .on('end', rowCount => {
        // console.log(`Parsed ${rowCount} rows`)
 
        csvData.shift();
       
    });
