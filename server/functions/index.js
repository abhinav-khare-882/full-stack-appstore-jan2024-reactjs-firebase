const admin = require("firebase-admin");
const functions = require("firebase-functions");
// const {error} = require("firebase-functions/logger");
// const {error} = require("firebase-functions/logger");

// const cors = require("cors")({origin: true});
const cors = require("cors")({origin: "http://localhost:3000"});

// initialize the admin
admin.initializeApp();
// initialize the db instance
const db = admin.firestore();

// function to validate the user jwt token
exports.validateUserJWTToken = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    // get the authorization header from the request
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({error: "Unauthorized - Missing token"});
    }
    if (req.method === "OPTIONS") {
      return res.status(204).send();
    }
    // Extract the actual token value (remove 'Bearer ')
    const token = authorizationHeader.split("Bearer ")[1];

    try {
      let userData;
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (!decodedToken) {
        return res.status(403).json({error: "Forbidden - Invalid token"});
      }
      if (decodedToken) {
        const docRef = await db.collection("users").doc(decodedToken.uid);
        const doc = await docRef.get();

        if (!doc.exists) {
          const userRef = await db.collection("users").doc(decodedToken.uid);
          userData = decodedToken;
          userData.role = "member";
          await userRef.set(userData);
          return res.status(200).json({success: true, user: userData});
        } else {
          return res.status(200).json({success: true, user: doc.data()});
        }
      }
    } catch (error) {
      console.error("error on validating: ", error);
      return res.status(403).json({error: error.message, status: "unAZ"});
    }
  });
});

// functions to save the app data on the cloud
exports.createNewApp = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body;
      const docRef = db.collection("apps").doc(req.body._id);
      await docRef.set(data);

      // retrieve the data from the cloud
      const appDetail = await docRef.get();
      res.status(200).json({_id: docRef.id, data: appDetail.data()});
    } catch (error) {
      console.error("error on validating: ", error);
      return res.status(403).json({error: error.message, status: "unAZ"});
    }
  });
});

// function to get all apps from the cloud
exports.getAllApps = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const app = [];
      // use onsnapshot to listen for realtime changes
      const unsubscribe = db
          .collection("apps")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            app.length = 0;

            snapshot.forEach((doc) => {
              app.push(doc.data());
            });

            res.json(app);
          });
      res.on("finish", unsubscribe);
    } catch (error) {
      // console.error("error on validating: ", error);
      return res.status(403).json({error: error.message, status: "unAZ"});
    }
  });
});

// function to delete an app from the cloud
exports.deleteAnApp = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const {id} = req.query;
      if (!id) {
        return res.status(400).json({error: "App ID is missing"});
      }
      await db.collection("apps").doc(id).delete();
      return res.status(200).json({message: "app deleted"});
    } catch (error) {
      console.error("error on validating: ", error);
      return res.status(500).json({error: error.message, status: "unAZ"});
    }
  });
});


// functions to retrieve the user from the cloud
exports.getAllUsers = functions.https.onRequest(async (req, res)=>{
  cors(req, res, async ()=>{
    try {
      const snapShot = await db.collection("users").get();
      const users = [];
      snapShot.forEach((doc)=>{
        users.push(doc.data());
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error("error on validating: ", error);
      return res.status(402).json({error: error.message, status: "unAZ"});
    }
  });
});

// function to update the users role
exports.updateTheUsersRole = functions.https.onRequest(async (req, res)=>{
  cors(req, res, async ()=>{
    try {
      const {_id, ...data} = req.body;
      await db.collection("users").doc(_id).update(data);
      return req.status(200).json({message: "User updated"});
    } catch (error) {
      console.error("error on validating: ", error);
      return res.status(402).json({error: error.message, status: "unAZ"});
    }
  });
});
