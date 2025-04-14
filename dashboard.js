// dashboard.js

// 🔥 Firebase config (replace with your actual config)
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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 🔒 Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("user-name").textContent = `Welcome, ${user.displayName}`;
    document.getElementById("user-pic").src = user.photoURL || "default.jpg";
    loadFunddrives(user.uid);
  } else {
    window.location.href = "index.html"; // Redirect to login if not signed in
  }
});

// 🚪 Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut();
});

// 📂 Load funddrives from Firestore
function loadFunddrives(uid) {
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; // Clear any previous data

  db.collection("funddrives").where("owner", "==", uid).get()
    .then(snapshot => {
      if (snapshot.empty) {
        container.innerHTML = "<p>No funddrives yet. Create one!</p>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const card = document.createElement("div");
        card.className = "funddrive-card";
        card.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <p><strong>Target:</strong> KES ${data.target}</p>
          <p><strong>Method:</strong> ${data.method.toUpperCase()} - ${data.number}</p>
          <button onclick="triggerSTKPush('${data.method}', '${data.number}', '${data.title}')">Donate via M-Pesa</button>
        `;
        container.appendChild(card);
      });
    });
}

// ➕ Show form
document.getElementById("create-btn").addEventListener("click", () => {
  document.getElementById("form-section").style.display = "block";
});

// ✅ Submit new funddrive
document.getElementById("funddrive-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;

  const fundData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    target: parseFloat(document.getElementById("target").value),
    method: document.getElementById("method").
