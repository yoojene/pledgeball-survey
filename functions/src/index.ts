import { initializeApp } from "firebase/app";
import * as functions from "firebase-functions";
import {
  getFirestore,
  collection,
  query,
  where,
  getCount,
} from "firebase/firestore/lite";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pledgeball-org.firebaseapp.com",
  databaseURL: "https://pledgeball-org.firebaseio.com",
  projectId: "pledgeball-org",
  storageBucket: "pledgeball-org.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getAnswerCounts = functions
  .region("europe-west2")
  .https.onRequest(async (req, res) => {
    functions.logger.info("Starting survey answer count aggregation", {
      structuredData: true,
    });

    const questionsList = ["question-1", "question-2", "question-3"];
    const answersTotalCount: any = [];

    const answerColl = collection(db, "survey-answers");

    for (let x = 0; x < questionsList.length; x++) {
      for (let y = 1; y <= 5; y++) {
        const qry = query(
          answerColl,
          where("questionId", "==", questionsList[x]),
          where("value", "==", y)
        );

        const snap = await getCount(qry);
        const id = questionsList[x];

        answersTotalCount.push({
          questionNo: `${id}`,
          answerValue: y,
          questionCount: snap.data().count,
        });
      }
    }

    if (req.method === "OPTIONS") {
      // Send response to OPTIONS requests
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Max-Age", "3600");
      res.status(204).send("");
    } else {
      res.set("Access-Control-Allow-Origin", "*");
      res.send(answersTotalCount);
    }
  });
