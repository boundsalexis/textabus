const fs = require("fs");
const fastcsv = require("fast-csv");

const stream = fs.createReadStream('routes.txt');

fastcsv.parseStream(stream)
    .on('error', error => console.error(error))
    .on('data', row => console.log(`ROW=${JSON.stringify(row)}`))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));