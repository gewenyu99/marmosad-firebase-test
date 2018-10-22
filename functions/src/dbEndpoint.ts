import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {Deck, Meta, Card} from './dbInterface';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);
const marmosadCards = db.collection("marmosad-cards");

export const getDeck = functions.https.onRequest((request, response) => {
    const requestedDeck = 'room-309';
    const deck = {
        name: requestedDeck,
        whiteCardCount: -1,
        blackCardCount: -1,
        whiteCards: [] as Card[],
        blackCards: [] as Card[]
    } as Deck;
    marmosadCards.doc(requestedDeck).collection('black-cards').doc('meta').get().then((doc) => {
        const meta = doc.data() as Meta;
        deck.blackCardCount = meta.count;
        console.log(deck);
        return
    }).then(async () => {
        await marmosadCards.doc(requestedDeck).collection('white-cards').doc('meta').get().then((doc) => {
            const meta = doc.data() as Meta;
            deck.whiteCardCount = meta.count;
            console.log(deck);
        });
        return
    }).then(async () => {
        await marmosadCards.doc(requestedDeck).collection('black-cards').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                if (!isNaN(doc.data().cardId)) {
                    deck.blackCards.push({
                        id: doc.data().cardId as number,
                        body: doc.data().body as string
                    } as Card)
                }
            });
            return
        })
    }).then(async () => {
        await marmosadCards.doc(requestedDeck).collection('white-cards').get().then(async (snapshot) => {
            await snapshot.forEach((doc) => {
                if (!isNaN(doc.data().cardId)) {
                    deck.whiteCards.push({
                        id: doc.data().cardId as number,
                        body: doc.data().body as string
                    } as Card)
                }
            });
        })
    }).then(() => {
        response.send(deck)
    }).catch((err) => {
        response.status(500).send("oops, we can't get the count we needed")
    });
});