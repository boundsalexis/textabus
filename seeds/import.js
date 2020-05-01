const fs = require("fs");
const fastcsv = require("fast-csv");

const db = require("../db")

const routeStream = fs.createReadStream('routes.txt');
const tripsStream = fs.createReadStream('trips.txt');
const stopsStream = fs.createReadStream('stops.txt');
const stopTimesStream = fs.createReadStream('stop_times.txt');
var csvData = [];


fastcsv.parseStream(routeStream)
    .on('error', error => console.error(error))
    .on('data', row => {
        // console.log(`ROW=${JSON.stringify(row)}`)
        csvData.push(row)
 console.log(csvData)
    })
    .on('end', rowCount => {
        // console.log(`Parsed ${rowCount} rows`)
 
        csvData.shift();
        const query =
        "INSERT INTO routes (route_id, agency_id, route_short_name, route_long_name, route_desc, route_type, route_url, route_color, route_text_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  
  csvData.forEach(row =>{
      db.query(query, row, (err,res)=> {
          if(err){
              console.log(err.stack);
              }
          else {
              console.log(res)
          }
      
      })
  })
    });
// console.log(csvData);
