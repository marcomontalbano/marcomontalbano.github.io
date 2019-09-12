const fs = require('fs');

const utilities = require('./utilities');

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const encoding = 'utf8';

async function buildDb(outputPath) {
    const json = await utilities.ghRunQuery(fs.readFileSync(`${__dirname}/db.graphql`, encoding));

    if (json.message) {
        throw new Error(json.message);
    }

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    const db = await utilities.sanitize(json);
    const dbAsString = JSON.stringify(db, undefined, isProduction ? undefined : 2);

    fs.writeFileSync(outputPath, dbAsString, encoding);
}

module.exports = buildDb;
