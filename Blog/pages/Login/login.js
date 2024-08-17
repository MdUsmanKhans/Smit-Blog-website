// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

// Handle form submission
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Sign in user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data:', userData);

            // Redirect based on role
            if (userData.role === 'admin') {
                window.location.replace('/pages/admin/admin.html');
            } else {
                window.location.replace('/pages/index/index.html');
            }
        } else {
            console.log('No user data found');
        }

    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in: ' + error.message);
    }
});

