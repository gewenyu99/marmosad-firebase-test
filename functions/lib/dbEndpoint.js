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
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);
const marmosadCards = db.collection("marmosad-cards");
exports.getDeck = functions.https.onRequest((request, response) => {
    const requestedDeck = 'room-309';
    const deck = {
        name: requestedDeck,
        whiteCardCount: -1,
        blackCardCount: -1,
        whiteCards: [],
        blackCards: []
    };
    marmosadCards.doc(requestedDeck).collection('black-cards').doc('meta').get().then((doc) => {
        const meta = doc.data();
        deck.blackCardCount = meta.count;
        console.log(deck);
        return;
    }).then(() => __awaiter(this, void 0, void 0, function* () {
        yield marmosadCards.doc(requestedDeck).collection('white-cards').doc('meta').get().then((doc) => {
            const meta = doc.data();
            deck.whiteCardCount = meta.count;
            console.log(deck);
        });
        return;
    })).then(() => __awaiter(this, void 0, void 0, function* () {
        yield marmosadCards.doc(requestedDeck).collection('black-cards').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                if (!isNaN(doc.data().cardId)) {
                    deck.blackCards.push({
                        id: doc.data().cardId,
                        body: doc.data().body
                    });
                }
            });
            return;
        });
    })).then(() => __awaiter(this, void 0, void 0, function* () {
        yield marmosadCards.doc(requestedDeck).collection('white-cards').get().then((snapshot) => __awaiter(this, void 0, void 0, function* () {
            yield snapshot.forEach((doc) => {
                if (!isNaN(doc.data().cardId)) {
                    deck.whiteCards.push({
                        id: doc.data().cardId,
                        body: doc.data().body
                    });
                }
            });
        }));
    })).then(() => {
        response.send(deck);
    }).catch((err) => {
        response.status(500).send("oops, we can't get the count we needed");
    });
});
//# sourceMappingURL=dbEndpoint.js.map