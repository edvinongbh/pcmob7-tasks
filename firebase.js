import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD_aBq3jdA46_bXlAvDMjWeNL42cLbMux0",
  authDomain: "pcmob4-ac6b0.firebaseapp.com",
  projectId: "pcmob4-ac6b0",
  storageBucket: "pcmob4-ac6b0.appspot.com",
  messagingSenderId: "667740393656",
  appId: "1:667740393656:web:351a41cf68fe657b80644d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
