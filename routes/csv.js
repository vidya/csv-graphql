const express = require('express');
const router = express.Router();

const { csvReadPromise } = require('../csv/csv_data_server');


router.get('/', async function(req, res, next) {
    const readPromise = csvReadPromise(
        csvData => {
            console.log('CSVData length: ', csvData.length);

            res.send(csvData);
        },
        err => { throw new Error(`--> reject(): error: ${err}`) }
    )

    await readPromise()
});

module.exports = router;

