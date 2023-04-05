// firebase/services.js - figure out how to collect data stored in the cloud

import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "./config";

let db;
if (app) {
  db = getFirestore(app);
}

const addCustomer = async (customerData) => {
  if (!db) {
    console.error("Error: Firebase app is not initialized.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "customers"), customerData);
    console.log("Customer added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding customer: ", error);
  }
};

export { addCustomer };