const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const { csvReadPromise } = require('../csv/csv_data_server');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type CSVRow {
        TEAM: String,
        GMS: Int,
         
        TOTAL: Int, 
        PCT: Float, 
        
        VALUE_MILLIONS: Float, 
    }
    
    type Query {
        csv_data: [CSVRow],
    }
`);

// The root provides a resolver function for each API endpoint
const root = {
    csv_data: async () => {
        let results = []

        await csvReadPromise(
            csvData => {
                console.log('csvData length: ', csvData.length);

                results = csvData

                return results
            },
            err => { throw new Error(`--> reject(): error: ${err}`) }
        )

        return results
    },
};


module.exports = {
    graphqlHTTP,
    root,
    schema,
};

