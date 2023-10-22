const productContainer = document.getElementById("productContainer");
const productContainer2 = document.getElementById("productContainer2");
const total = document.getElementById("total"); // Get the "total" element

let selectedProductIds = []; // Use an array to store the IDs of selected products

fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
        let cardRow; // To group cards into rows
        data.forEach((product, index) => {
            // Create a card element for each product
            const card = createProductCard(product);

            if (index % 4 === 0) {
                // Create a new row for every fourth card
                cardRow = document.createElement("div");
                cardRow.classList.add("row");
            }

            // Add the card to the current row
            cardRow.appendChild(card);

            // If this is the fourth card or the last card, add the row to the container
            if (index % 4 === 3 || index === data.length - 1) {
                productContainer.appendChild(cardRow);
            }
        });
    });

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("col-md-3");

    card.innerHTML = `
        <div class="card mt-3">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text1">${product.description}</p>
                <p class="card-text2">Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})" id="add_to_cart" class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    `;

    return card;
}

// Function to add a product to the cart
let count_element = document.getElementById("count");
let count = count_element.textContent;

function addToCart(productId) {
    
    count++;
    count_element.textContent = count;
    
    selectedProductIds.push(productId); // Add the selected product's ID to the array

    // Fetch the product data again (you can use a cached data array for better performance)
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
            // Filter the selected product from the data array
            const selectedProduct = data.find((product) => product.id === productId);

            // Create and display the selected product card in productContainer2
            const selectedCard = createProductCard2(selectedProduct);
            productContainer2.appendChild(selectedCard);

            // Call the function to calculate and display the total price
            calculateTotal();
        });
}

// Function to create a product card for the cart
function createProductCard2(product) {
    const card = document.createElement("div");
    card.classList.add("col-12");

    card.innerHTML = `
        <div class="card mt-3 mb-3">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text2">Price: $${product.price}</p>
            </div>
        </div>
    `;

    return card;
}

// Function to calculate and display the total price
function calculateTotal() {
    // Fetch the product data again (you can use a cached data array for better performance)
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
            let totalPrice = 0;

            // Iterate through the selected products and calculate the total price
            for (const productId of selectedProductIds) {
                const selectedProduct = data.find((product) => product.id === productId);
                if (selectedProduct) {
                    totalPrice += selectedProduct.price;
                }
            }

            // Create a paragraph element to display the total price
            const price = document.createElement("p");
            price.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

            // Clear the "total" element and add the new total price
            total.innerHTML = "";
            total.appendChild(price);
        });
}

// Example usage:
calculateTotal(); // Call this function initially to calculate and display the total price


