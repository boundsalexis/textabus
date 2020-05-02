const fs = require("fs");
const fastcsv = require("fast-csv");

const db = require("../db")

const routeStream = fs.createReadStream('routes.txt');
const tripsStream = fs.createReadStream('trips.txt');
const stopsStream = fs.createReadStream('stops.txt');
const stopTimesStream = fs.createReadStream('stop_times.txt');
const importFiles = [routeStream, tripsStream, stopsStream, stopTimesStream];
var csvData = [];

importFiles.forEach(file => {
    // console.log("____________________________________________________________________________________________________");
    console.log(file.path);

    fastcsv.parseStream(file)
        .on('error', error => console.error(error))
        .on('data', row => {
            // console.log(`ROW=${JSON.stringify(row)}`)
            csvData.push(row)
       
        })
        .on('end', rowCount => {
            // console.log(`Parsed ${rowCount} rows`)
            let query;
            csvData.shift();
            console.log("____________________________________________________________________________________________________");

            
            const routeQuery =
            "INSERT INTO routes (route_id, agency_id, route_short_name, route_long_name, route_desc, route_type, route_url, route_color, route_text_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
            const tripQuery =
            "INSERT INTO trips (route_id, service_id, trip_id, trip_headsign, direction_id, block_id, shape_id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
            const stopQuery =
            "INSERT INTO stops (stop_id, stop_code, stop_name, stop_desc, stop_lat, stop_lon, zone_id, stop_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
            const stopTimeQuery =
            "INSERT INTO stop_times (trip_id, arrival_time, departure_time, stop_id, stop_sequence, stop_headsign, pickup_type, drop_off_type, shape_dist_traveled) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
            
            if (file.path==="routes.txt"){
                query= routeQuery;
            }else if(file.path ==="trips.txt"){
                query= tripQuery;
            }else if(file.path === "stops.txt"){
                query= stopQuery;
            }else if (file.path === "stop_times.txt"){
                query=stopTimeQuery;
            }

            csvData.forEach(row => {

                db.query(query, row, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("res")
                    }

                })
            })
        });
})
