
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Firebase Authentication code from: 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCzHRi3MGfkAsL3tvNDMWiTTD_XMOAT334",
//   authDomain: "project-des-419202.firebaseapp.com",
//   projectId: "project-des-419202",
//   storageBucket: "project-des-419202.appspot.com",
//   messagingSenderId: "493577868172",
//   appId: "1:493577868172:web:bd891f3443a8b3541b3ca9",
//   measurementId: "G-2LEBD5GGQF"
// };

// // Initialize Firebase - represents all firebase connection
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export const auth = getAuth(app);

// const provider = new GoogleAuthProvider()

// // signin with Google function
// export const signInWithGoogle = () => {
//     console.log("signing in ...")

//     signInWithPopup(auth, provider)
//         .then((result) => {
//         const name = result.user.displayName;
//         const email = result.user.email;
//         const profilePic = result.user.photoURL;

//         localStorage.setItem("name", name)
//         localStorage.setItem("email", email)
//         localStorage.setItem("profilePic", profilePic)
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// // function to sign out (with firebase authentication)
// const handleSignOut = async () => {
//     try {
//          // clear storage (avoids keeping user data...)
//          localStorage.clear()
//          // additionally, sign out with FIREBASE
//          await auth.signOut()
//          console.log("Successfully signed out")
//     } catch (error) {
//          console.log("Error signing out:", error)
// }}
//     }