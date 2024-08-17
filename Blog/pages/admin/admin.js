// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsHROBzSHddPzwHA26bnQuPx69V1gSe3w",
    authDomain: "fir-components-82995.firebaseapp.com",
    databaseURL: "https://fir-components-82995-default-rtdb.firebaseio.com",
    projectId: "fir-components-82995",
    storageBucket: "fir-components-82995.appspot.com",
    messagingSenderId: "1032388309402",
    appId: "1:1032388309402:web:a1b51526ffbfb395d3ca23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    // Upload image to Firebase Storage
    const storageRef = ref(storage, 'products/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed:', error);
        },
        async () => {
            // Handle successful uploads on complete
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Save product details to Firestore
            try {
                await addDoc(collection(db, 'products'), {
                    name: name,
                    description: description,
                    imageUrl: downloadURL,
                    createdAt: serverTimestamp()
                });
                alert('P0st uploaded successfully!');
                document.getElementById('uploadForm').reset();
            } catch (error) {
                console.error('Error adding post:', error);
            }
        }
    );
});