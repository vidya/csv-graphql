const fs = require("fs");
const fastcsv = require("fast-csv");

const CSV_FILE_PATH = './data/nba_2017_att_val.csv'


const csvToGQL =  {
        "TEAM": "TEAM",
        "GMS": "GMS",
        "TOTAL": "TOTAL",
        "AVG": "AVG",
        "PCT": "PCT",
        "VALUE_MILLIONS": "VALUE_MILLIONS",
    }

const csvReadPromise = function(resolve, reject) {
    let readableStreamInput = fs.createReadStream(CSV_FILE_PATH);

    readableStreamInput.on('error', (err) => {
        console.log(`ERROR on readableStreamInput: ${err}`);
        reject(err)
    })

    return new Promise((resolve, reject) => {
        let csvData = []

        fastcsv
            .fromStream(readableStreamInput, {headers: true})
            .on('data', data => {
                let outRow = {}
                Object.keys(data).forEach(current_key => {
                    outRow[csvToGQL[current_key]] = data[current_key]
                });

                csvData.push(outRow);
            })
            .on('end', () => resolve(csvData))
    })
    .then(
        csvData => resolve(csvData),
        err => reject(err)
    )
}

module.exports = {
    csvReadPromise,
};

