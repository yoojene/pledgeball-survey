import { initializeApp } from "firebase/app";
import * as functions from "firebase-functions";
// Importing Firestore Lite methods.
import {
  getFirestore,
  collection,
  query,
  where,
  getCount,
} from "firebase/firestore/lite";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXxGN2ipPe7dOUBhoB-38SUpLWPncv0M",
  authDomain: "pledgeball-org.firebaseapp.com",
  databaseURL: "https://pledgeball-org.firebaseio.com",
  projectId: "pledgeball-org",
  storageBucket: "pledgeball-org.appspot.com",
  messagingSenderId: "274541014837",
  appId: "1:274541014837:web:456740adb9be4d928fa67c",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getAnswerCounts = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Starting count aggregation", { structuredData: true });

  const questionsList = ["question-1", "question-2", "question-3"];
  let answersTotalCount: any = [];

  const answerColl = collection(db, "survey-answers");

  for (let x = 0; x < questionsList.length; x++) {
    for (let y = 1; y <=5; y++) {
      const qry = query(
        answerColl,
        where("questionId", "==", questionsList[x]),
        where("value", "==", y)
      );

      const snap = await getCount(qry);

      console.log("count : " + snap.data().count);
      
      const id = questionsList[x];
      console.log(id);

      answersTotalCount.push({[`${id}`]: snap.data().count });
    }
  }

  // const qry = query(
  //   answerColl,
  //   where("questionId", "==", "question-1"),
  //   where("value", "==", 1)
  // );

  // const snap = await getCount(qry);

  // console.log("count : " + snap.data().count);
  // answersTotalCount.push({ "question-one": snap.data().count });

  console.log(answersTotalCount)
  res.send(answersTotalCount);
});
