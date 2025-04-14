// auth.js

const auth = firebase.auth();

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('User signed in:', user);

      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error during Google Sign-In:", error.message);
      alert("Error during sign-in: " + error.message);
    });
}
