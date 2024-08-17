import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch and display the product details
async function fetchProductDetails() {
    if (productId) {
        const productDoc = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
            const product = productSnapshot.data();
            const productDetails = `
                <img class="w-full w-full object-cover mb-4" src="${product.imageUrl}" alt="${product.name}">
                <h2 class="text-3xl font-semibold mb-3">${product.name}</h2>
                <p class="text-gray-700 mb-4">${product.description}</p>
            `;
            document.getElementById('productDetails').innerHTML = productDetails;
        } else {
            document.getElementById('productDetails').innerHTML = "<p>Product not found.</p>";
        }
    } else {
        document.getElementById('productDetails').innerHTML = "<p>No product ID provided.</p>";
    }
}

fetchProductDetails();

