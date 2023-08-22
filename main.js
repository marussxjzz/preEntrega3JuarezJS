document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Square Up", price: 25990 },
        { id: 2, name: "The Album", price: 35640 },
        { id: 3, name: "Born Pink", price: 34990 }
    ];
    

    const cart = [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total span");
    const checkoutButton = document.querySelector(".checkout");
    let idx = 0;

    function updateCartWithLocalStorage() {
        for(let i = 0; i < localStorage.length; i++) {
            cart.push(JSON.parse(localStorage.getItem(i)))
        }
        updateCart()
    }
    
    if (localStorage.length > 0) updateCartWithLocalStorage()

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(button.getAttribute("data-product-id"));
            const selectedProduct = products.find(product => product.id === productId);
            cart.push(selectedProduct);
            localStorage.setItem(idx++, JSON.stringify(selectedProduct))
            updateCart();
        });
    });

    checkoutButton.addEventListener("click", function () {
        alert("Gracias por su compra!");
        cart.length = 0; 
        updateCart();
        localStorage.clear()
    });

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement("li");
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }
});
