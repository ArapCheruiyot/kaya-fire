// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyDlaiCiuvrn5gKzdnP9oei22r4SRZHjuG0",
  authDomain: "starry-compiler-443015-t5.firebaseapp.com",
  databaseURL: "https://starry-compiler-443015-t5-default-rtdb.firebaseio.com",
  projectId: "starry-compiler-443015-t5",
  storageBucket: "starry-compiler-443015-t5.firebasestorage.app",
  messagingSenderId: "990024267481",
  appId: "1:990024267481:web:79aacd7ae7e84ebf5c70c8",
  measurementId: "G-XRMKTBJ8XV"
};

// Initialize Firebase only if it hasn't been initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
