import * as functions from 'firebase-functions';
import * as mysql from 'mysql';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

class Database {
    connection: any;

    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(args) {
        return new Promise((resolve, reject) => {
            this.connection.query(args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

export const helloWorld = functions.https.onRequest((request, response) => {
    let marmoDB = new Database({
        host: "35.203.14.127",
        user: "root",
        password: "marmoExtraSad3",
        database: "cah"
    });

    let whitecardsCount = 0;
    let blackcardsCount = 0;

    marmoDB.query('SELECT COUNT(*) FROM whitecards').then((rows) => {
        whitecardsCount = rows[0]["COUNT(*)"];
    }).then(() => {
        marmoDB.query('SELECT COUNT(*) FROM blackcards').then(
            rows => {
                blackcardsCount = rows[0]["COUNT(*)"];
                f();
            }
        )
    }).catch(reason => {
        console.log("I done goofed");
    });
    let rsObject = [];

    async function f(){
        for (var i = 1; i <= whitecardsCount; i++) {
            await marmoDB.query('SELECT * FROM whitecards WHERE id = ' + i).then(rows => {
                console.log(rows[0]);
                rsObject.push(rows[0]);
                return;
            });
        }
        response.status(200).send(rsObject);
    }
});

