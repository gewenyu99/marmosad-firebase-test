"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const mysql = require("mysql");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
class Database {
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
exports.helloWorld = functions.https.onRequest((request, response) => {
    let marmoDB = new Database({
        host: "35.203.14.127",
        user: "root",
        password: "marmoExtraSad3",
        database: "cah"
    });
    marmoDB.query('SELECT COUNT(*) FROM whitecards').then((rows) => {
        console.log(rows[0]["COUNT(*)"]);
        response.status(200).send(rows[0]["COUNT(*)"]);
    }).catch(reason => {
        response.send("nvm I failed");
    });
});
//# sourceMappingURL=index.js.map