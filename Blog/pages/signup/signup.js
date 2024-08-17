// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsHROBzSHddPzwHA26bnQuPx69V1gSe3w",
    authDomain: "fir-components-82995.firebaseapp.com",
    projectId: "fir-components-82995",
    storageBucket: "fir-components-82995.appspot.com",
    messagingSenderId: "1032388309402",
    appId: "1:1032388309402:web:a1b51526ffbfb395d3ca23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = 'user';

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user profile in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            username: username,
            email: email,
            role: role,
            createdAt: new Date()
        });

        alert('Account created successfully!');
        // Redirect or perform other actions after successful signup
        window.location.replace("/pages/Login/login.html");
    } catch (error) {
        console.error('Error creating account:', error);
        alert('Error creating account: ' + error.message);
    }
});

