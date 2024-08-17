import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

// Function to truncate text to a specific number of characters
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Fetch and display products
async function fetchProducts() {
    const productsCollection = collection(db, 'products');
    const querySnapshot = await getDocs(productsCollection);

    const productList = document.getElementById('productList');
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const productId = doc.id;

        // Truncate the description to show only the first 100 characters
        const truncatedDescription = truncateText(product.description, 100);

        const productCard = `
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <img class="w-full h-56 object-cover mb-4" src="${product.imageUrl}" alt="${product.name}">
                        <h3 class="text-2xl font-semibold mb-3">${product.name}</h3>
                        <p class="text-gray-700 mb-4">${truncatedDescription}</p>
                        <a href="/pages/readmore/read.html?id=${productId}" class="text-blue-600 hover:text-blue-700 font-semibold transition">Read
                            More</a>
                    </div>
                `;
        productList.innerHTML += productCard;
    });
}

fetchProducts();
