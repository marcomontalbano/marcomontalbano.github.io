const fs = require('fs');
const path = require('path');

const utilities = require('./utilities');

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const encoding = 'utf8';

async function buildDb() {
    const json = await utilities.ghRunQuery(fs.readFileSync(`${__dirname}/db.graphql`, encoding));

    if (json.message) {
        throw new Error(json.message);
    }

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return utilities.sanitize(json);
}

function exportDb(outputPath = 'db.json') {
    buildDb().then((db) => {
        const resolvedOutputPath = path.resolve(outputPath);
        const dbAsString = JSON.stringify(db, undefined, isProduction ? undefined : 2);

        fs.writeFileSync(resolvedOutputPath, dbAsString, encoding);

        // eslint-disable-next-line no-console
        console.log(`Built database in ${resolvedOutputPath}`);
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
    });
}

module.exports = {
    exportDb,
};
