
const container = document.querySelector(".cartEl ul")

 const imgSrc = localStorage.getItem('imgSrc');
const total = document.querySelector(".total-items");
const textsElement = localStorage.getItem('textsElement');
 const totals = parseInt(localStorage.getItem('totals'));
const quanElement = localStorage.getItem('quanElement');
const totalPrices = parseInt(localStorage.getItem('totalPrices'));
const conss = document.querySelector('.cons')



addToCart(textsElement, totals, quanElement, imgSrc)
// totalPrice(totalPrices);



// ... (rest of the code remains the same)

// Modify the event listener for the "add to cart" button in order.js

function addToCart(texts, total, quantity, imgSrc) {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
  
    const textsElement = document.createElement("div");
    textsElement.textContent = texts;
  
    const totalElement = document.createElement("div");
    totalElement.textContent = `Total: ₱${total}`;
  
    const quantityElement = document.createElement("div");
    quantityElement.textContent = quantity;
  
    const remove = document.createElement('div');
    remove.textContent = "remove";
    remove.className = "removebtn";
  
    const imgCon = document.createElement("div");
    imgCon.className = "imgCon";
  
    const imgs = document.createElement("img");
    imgs.src = imgSrc;
  
    imgCon.appendChild(imgs);
    cartItem.appendChild(imgCon);
    cartItem.appendChild(textsElement);
    cartItem.appendChild(totalElement);
    cartItem.appendChild(quantityElement);
    cartItem.appendChild(remove);
  
    const cartedUl = document.querySelector(".cartEl ul");
    cartedUl.appendChild(cartItem);
  
    remove.onclick = () => { removeCartItem(cartItem, total, cartedUl); };
  }
  
  
  
 
  
////shows the added items   
function removes() {
    document.querySelector(".page").style.visibility = "hidden";
}

///calculates the total price
function totalPrice(price) {
    const totalEl = document.querySelector(".total-price");
    const resultPrice = addCommasToNumber(price);

    totalEl.innerHTML = `you have the total price of $${resultPrice}`;
}

///removes item
function removeCartItem(cartItem, price, con) {
    totalPrices -= price; // Subtract the price of the removed item

    cartItem.remove();
    con.remove();
    items--;
    total.innerHTML = `You have ${items} items in your cart`;

    const resultPrice = addCommasToNumber(totalPrices);
    document.querySelector('.total-price').innerHTML = `you have the total price of $${resultPrice}`;
}

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


