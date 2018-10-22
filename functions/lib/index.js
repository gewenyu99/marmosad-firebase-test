"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import functions
const dbEndpoints = require("./dbEndpoint");
exports.getDeck = dbEndpoints.getDeck;
// TODO the below needs to be archived as an example and as a memory, NO ONE should actuallly hope to use any of this garbage :')
// class Database {
//     connection: any;
//
//     constructor(config) {
//         this.connection = mysql.createConnection(config);
//     }
//
//     query(args) {
//         return new Promise((resolve, reject) => {
//             this.connection.query(args, (err, rows) => {
//                 if (err){
//                     reject(err);
//                     return
//                 }
//                 resolve(rows);
//                 return
//             });
//         });
//     }
//
//     close() {
//         return new Promise((resolve, reject) => {
//             this.connection.end(err => {
//                 if (err){
//                     reject(err);
//                     return
//                 }
//                 resolve();
//             });
//         });
//     }
// }
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();
// const settings = {
//     timestampsInSnapshots: true
// };
// db.settings(settings);
// export const clone_marmo_db = functions.https.onRequest((request, response) => {
//     const marmoDB = new Database({
//         host: "35.203.14.127",
//         user: "root",
//         password: "marmoExtraSad3",
//         database: "cah"
//     });
//
//     let whitecardsCount = 0;
//     let blackcardsCount = 0;
//
//     marmoDB.query('SELECT COUNT(*) FROM whitecards').then((rows) => {
//         whitecardsCount = rows[0]["COUNT(*)"];
//         return;
//     }).then(() => {
//         marmoDB.query('SELECT COUNT(*) FROM blackcards').then(
//             rows => {
//                 blackcardsCount = rows[0]["COUNT(*)"];
//                 f().then().catch();
//                 return;
//             }
//         ).then().catch();
//         return
//     }).catch(reason => {
//         console.log("I done goofed");
//     });
//     interface RsObject {
//         whitecards: [any],
//         blackcards: [any]
//     }
//     const rsObject = {} as RsObject;
//     rsObject.whitecards = [null];
//     rsObject.blackcards = [null];
//
//     async function f() {
//         for (let j = 1; j <= blackcardsCount; j++) {
//             await marmoDB.query('SELECT * FROM `blackcards` WHERE `﻿id`=' + j).then(rows => {
//                 console.log(rows[0]);
//                 rsObject.blackcards.push(rows[0]);
//                 db.collection("marmosad-cards").doc("room-309").collection("black-cards").doc(j.toString()).set({
//                     cardId: rows[0][Object.keys(rows[0])[0]],
//                     body: rows[0].body
//                 }).then(()=>{
//                     return
//                 }).catch();
//             });
//         }
//         for (let i = 1; i <= whitecardsCount; i++) {
//             await marmoDB.query('SELECT * FROM whitecards WHERE id = ' + i).then(rows => {
//                 console.log(rows[0]);
//                 rsObject.whitecards.push(rows[0]);
//                 db.collection("marmosad-cards").doc("room-309").collection("white-cards").doc(i.toString()).set({
//                     cardId: rows[0].id,
//                     body: rows[0].body
//                 }).then(()=>{
//                     return
//                 }).catch();
//             });
//         }
//         response.status(200).send(rsObject);
//     }
// });
//# sourceMappingURL=index.js.map