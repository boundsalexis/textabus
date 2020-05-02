// Dependencies required for reading and parsisng csv
const fs = require("fs");
const fastcsv = require("fast-csv");

// Connects to our DB
const db = require("../db")

// Define streams for SFMTA files
const routeStream = fs.createReadStream('routes.txt');
const tripsStream = fs.createReadStream('trips.txt');
const stopsStream = fs.createReadStream('stops.txt');
const stopTimesStream = fs.createReadStream('stop_times.txt');

// Creating array to iterate through each file
// Order DOES matter, to avoid foreign key errors
const importFiles = [routeStream, tripsStream, stopsStream, stopTimesStream];

// Creating array to hold each row of the CSV
var csvData = [];

// Do to each file
importFiles.forEach(file => {
    //console.log(file.path)
    // Use fastcsv to parse through csv
    fastcsv.parseStream(file)
        // Handle errors
        .on('error', error => console.error(error))
        // Handle the Data
        .on('data', row => 
            // Check to ensure the file is being parsed correctly
            // console.log(`ROW=${JSON.stringify(row)}`) 
            csvData.push(row)
        )
        //Handle the end of the data
        .on('end', rowCount => {
            // console.log(`Parsed ${rowCount} rows`)
            let query;
            // Removes first Row table heads
            csvData.shift();

            // Create querys based on the collumn heads, the values are irrelevant, simply place holders
            const routeQuery =
            "INSERT INTO routes (route_id, agency_id, route_short_name, route_long_name, route_desc, route_type, route_url, route_color, route_text_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
            const tripQuery =
            "INSERT INTO trips (route_id, service_id, trip_id, trip_headsign, direction_id, block_id, shape_id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
            const stopQuery =
            "INSERT INTO stops (stop_id, stop_code, stop_name, stop_desc, stop_lat, stop_lon, zone_id, stop_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
            const stopTimeQuery =
            "INSERT INTO stop_times (trip_id, arrival_time, departure_time, stop_id, stop_sequence, stop_headsign, pickup_type, drop_off_type, shape_dist_traveled) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
            
            // switch to relevant query depending on what file we are on 
            if (file.path==="routes.txt"){
                query= routeQuery;
            }else if(file.path ==="trips.txt"){
                query= tripQuery;
            }else if(file.path === "stops.txt"){
                query= stopQuery;
            }else if (file.path === "stop_times.txt"){
                query=stopTimeQuery;
            }
            // go through each row
            csvData.forEach(row => {
                // Insert each row into DB
                db.query(query, row, (err, res) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log(res)
                    }

                })
            })
        });
})
