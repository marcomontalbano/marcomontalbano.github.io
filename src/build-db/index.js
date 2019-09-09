require('dotenv').config();

const fs = require('fs');

const utilities = require('./utilities');

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const encoding = 'utf8';

(async function run() {
    const json = await utilities.ghRunQuery(fs.readFileSync(`${__dirname}/db.graphql`, encoding));

    if (json.message) {
        // eslint-disable-next-line no-console
        console.error('error:', json.message);
        return;
    }

    if (json.errors) {
        // eslint-disable-next-line no-console
        console.error('error:', json.errors[0].message);
        return;
    }

    const db = await utilities.sanitize(json);
    const dbAsString = JSON.stringify(db, undefined, isProduction ? undefined : 2);

    fs.writeFileSync(`${__dirname}/../../db.json`, dbAsString, encoding);
}());
