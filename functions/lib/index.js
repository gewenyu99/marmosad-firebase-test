"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    let whitecardsCount = 0;
    let blackcardsCount = 0;
    marmoDB.query('SELECT COUNT(*) FROM whitecards').then((rows) => {
        whitecardsCount = rows[0]["COUNT(*)"];
    }).then(() => {
        marmoDB.query('SELECT COUNT(*) FROM blackcards').then(rows => {
            blackcardsCount = rows[0]["COUNT(*)"];
            f();
        });
    }).catch(reason => {
        console.log("I done goofed");
    });
    let rsObject = [];
    function f() {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i = 1; i <= whitecardsCount; i++) {
                yield marmoDB.query('SELECT * FROM whitecards WHERE id = ' + i).then(rows => {
                    console.log(rows[0]);
                    rsObject.push(rows[0]);
                    return;
                });
            }
            response.status(200).send(rsObject);
        });
    }
});
//# sourceMappingURL=index.js.map