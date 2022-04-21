// Import the functions the web needs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBl_8yOGYdDZsQ5z95IpdOCUP13cf8HeLE",
    authDomain: "capstone-9b049.firebaseapp.com",
    projectId: "capstone-9b049",
    storageBucket: "capstone-9b049.appspot.com",
    messagingSenderId: "949517506285",
    appId: "1:949517506285:web:6ad08bd84cb1dd6daa1ee4",
    measurementId: "G-YXJKRCCDCN"
};

// Initialize Firebase and functions
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const projectStorage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

/*functions********************************************************************************/
function googleSignin() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            console.log(token)
            console.log(user)
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error.code)
        console.log(error.message)
    });
}

function googleSignout() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Signout Succesfull')
    }).catch((error) => {
        // An error happened.
        console.log('Signout Failed')
    });
}

//export the functions
export {app, googleSignin, googleSignout, auth, db, projectStorage}
