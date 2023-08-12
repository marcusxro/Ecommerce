
 const box = document.querySelectorAll(".item") 
 let imgSrc = ''
 let items = 0
let totalPrices = 0

let subtotals = ''
const pageElement = document.querySelector('.page');
let gagas = ''
////each box onclick func
let htmlx = document.createElement("div"); 
htmlx.className = "item-details"; 


const inputNum = document.createElement("input");
inputNum.type = "number";
inputNum.min = 1
inputNum.max = 5
inputNum.value = 1
inputNum.className = "haha";

function repeat() {
  if(inputNum.value >= 5) {
   inputNum.value = 5
  } 
}

setInterval(() => {
  repeat()
}, 100);
const menuEl = document.querySelector('.menu')
let click = ''

menuEl.addEventListener("click", () => {
  click++
  gsap.to('.second', {display: "flex", height: "80px", width: "100%", backgroundColor: "white", overflow: "hidden"})
  gsap.to('.middle-parts', {visibility: "visible", width: "100%", display: "flex", alignItems: "center",
justifyItems: "space-around"})
gsap.to('.rights', {display: "block", width: "auto"})
  if(click >= 2) {
    click = 0
    gsap.to('.second', {height: "0px", display: "none"})
    gsap.to('.middle-parts', {display: "none"})
  }
})
box.forEach(boxs => {

    boxs.addEventListener("click", (e) => {
      gsap.to(".textTitle", 1, {color: "black"})
      gsap.to(".types", 1, {color: "black"})
      gsap.to(".prices", 1, {color: "black"})
      gsap.to(".descEl", 1, {color: "black"})

      const infoCon = document.createElement('div')
      infoCon.className = "infoCon"
      pageElement.innerHTML = ""
      infoCon.innerHTML = ""
      htmlx.innerHTML = ""
        const target = e.currentTarget;
        const imgElement = target.querySelector('img');

        if (imgElement) {
            imgSrc = imgElement.src;
            localStorage.setItem('imgSrc', imgSrc);
        }
        const backs = document.createElement("div")
        backs.className = "back"
        backs.innerHTML = '<ion-icon name="arrow-back-circle-outline"></ion-icon>'; 
        htmlx.appendChild(backs);
        const text = target.querySelector('.texts').textContent;
        const type = target.querySelector('.type').textContent;
        const price = target.querySelector('.price').textContent;
        const desc = target.querySelector('.desc').textContent;

        // Clear previous content inside htmlx div
        const imgCon = document.createElement('div')
        imgCon.className = "imgCon"
        const img = document.createElement("img");
        img.src = imgSrc;
        imgCon.appendChild(img)
        htmlx.appendChild(imgCon);

        
        backs.onclick = () => {
          document.querySelector(".page").style.visibility = "hidden"
        }
 

        const textElement = document.createElement("p");
        textElement.textContent = text;
        textElement.className = "textTitle"
        infoCon.appendChild(textElement);

        const typeElement = document.createElement("p");
        typeElement.textContent = type;
        typeElement.className = "types";
        infoCon.appendChild(typeElement);

        const priceElement = document.createElement("p");
        priceElement.textContent = price;
        priceElement.className = "prices"
        infoCon.appendChild(priceElement);

        const descElement = document.createElement("p");
        descElement.textContent = desc;
        descElement.className = "descEl"
        infoCon.appendChild(descElement);


        const buttons = document.createElement("button");
        buttons.className = "btn";


        buttons.addEventListener("click", () => {
          show()
        })

        const btnCon = document.createElement("div")
        btnCon.className = "btnCon"

        buttons.textContent = "Add to Cart";

        btnCon.appendChild(buttons);
        btnCon.appendChild(inputNum);
        infoCon.appendChild(btnCon);

        const productCon = document.createElement('div')
        productCon.className = "productCon"

        productCon.appendChild(htmlx)
        productCon.appendChild(infoCon)

        pageElement.appendChild(productCon);
        document.querySelector(".page").style.visibility = "visible";
    });
});
const cartBtn = document.querySelectorAll(".cart")
for(z = 0; z < cartBtn.length; z++) {
  cartBtn[z].addEventListener("click", () => {
    document.querySelector(".pageEl").style.visibility = "visible"
  })
}

const backBtnn = document.querySelector(".back")

backBtnn.addEventListener("click", () => {
  document.querySelector(".pageEl").style.visibility = "hidden"
})

const total = document.querySelector(".total-items")


const ship = document.querySelector('.fee').textContent
const shipRemovedSign = parseInt(ship.replace("₱", ""))

function show() {
  document.querySelector('.sample').style.display = "none"
  items++;
  total.innerHTML = `You have ${items} items in your cart`;

  const inputElement = pageElement.querySelector('.haha').value;
  const quanElement = `Quantity: ${inputElement}`;
  
  const textsElement = pageElement.querySelector('.textTitle').textContent;
  const quantity = pageElement.querySelector(".haha").value;
  const pricesElement = pageElement.querySelector('.prices').textContent;
  const type = document.querySelector('.type').textContent;
  const removeSign = pricesElement.replace("₱", "").replace(",", ""); 
  const price = parseInt(removeSign); 
  const totals = parseInt(quantity) * price;
  totalPrices += totals;

  addToCart(textsElement, totals, quanElement, imgSrc, type);
  totalPrice(totals);

  const addedSign = addCommasToNumber(shipRemovedSign + totalPrices)

  subtotal(addedSign)
  document.querySelector(".totalsNum").innerHTML = `₱${addedSign}`
}


function addToCart(texts, total, quantity, imgSrc, type) {
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");

  const infoTab = document.createElement('div')
  infoTab.className = "infoTab"


  const textsElement = document.createElement("div");
  textsElement.className = "title"
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

  const itemType = document.createElement('div')
  itemType.textContent = type
  itemType.className = "itemType"



  imgCon.appendChild(imgs);
  cartItem.appendChild(imgCon);
  infoTab.appendChild(textsElement)
  infoTab.appendChild(itemType);
  infoTab.appendChild(totalElement);
  infoTab.appendChild(quantityElement);
  infoTab.appendChild(remove);
  cartItem.appendChild(infoTab)

  const cartedUl = document.querySelector(".carts ul");
  cartedUl.appendChild(cartItem, totalPrices);
  remove.onclick = () => { removeCartItem(cartItem, total); };

  removeAll(cartedUl)
}

////shows the added items   
function removes() {
  document.querySelector(".page").style.visibility = "hidden";
}

let totalz = 0; 

let normalPriceVar = 0
function totalPrice(price) {

  const totalEl = document.querySelector(".total-price");
  const parsed = parseInt(price);
  const priceEl = document.querySelector(".prices").textContent
  const removedz = priceEl.replace("₱", "").replace(",", "")

  totalz += parsed;
  
  // Convert the totalz to a formatted string
  const formattedTotal = addCommasToNumber(totalz);
  totalEl.innerHTML = `₱${formattedTotal}`;

}

let subtotalz = 0;



let totalsss = 0
let newTotal = 0
///removes item
function removeCartItem(cartItem, price) {
  items--; 
  const totalPriceEl = document.querySelector(".total-price");
  const currentTotal = parseInt(totalPriceEl.textContent.replace("₱", "").replace(",", ""));
  const itemTotal = parseInt(price);
  
  newTotal = currentTotal - itemTotal;
  
  cartItem.remove();

  const total = document.querySelector(".totalsNum");
  document.querySelector('.total-items').innerHTML = `You have ${items} items in your cart`;
  
  const formattedTotal = addCommasToNumber(newTotal); 
  
  const shipRemovedSign = 0;
  
  totalsss = newTotal + shipRemovedSign;
  if(cartItem.remove()) {
    calculatez(totalsss)
  }
  const formattedTotals = addCommasToNumber(totalsss); 


  
  if (newTotal === 0) {
  
    // Add an event listener to the button
    backBtnn.addEventListener("click", function() {
      window.location.href = "index.html"; // Redirect when the button is clicked
    });
  }

  if (parseInt(formattedTotals.replace(/\D/g, "")) === 200) {
    total.innerHTML = "₱0"; 
  }
  document.querySelector(".totalsNum").innerHTML = `₱${formattedTotals}`;
  totalPriceEl.innerHTML = `₱${formattedTotal}`;
  
  if (parseInt(formattedTotals.replace(/\D/g, "")) === 200) {
    total.innerHTML = "₱0"; 
  }
}


 
function subtotal(finalTotal) {
  subtotalz += parseInt(finalTotal);
  document.querySelector(".totalsNum").innerHTML = `₱${subtotalz}`;

}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const confirmBtn = document.querySelector('.confirm')

gsap.registerPlugin(ScrollTrigger);
gsap.to('.bottom', {
  scrollTrigger: {
    trigger: '.bottom', // The element that triggers the animation
    start: 'top center', // Animation starts when the trigger hits the center of the viewport
    end: 'bottom center', // Animation ends when the trigger's bottom hits the center of the viewport
    scrub: true, // Allows smooth scrubbing effect during scroll
    onEnter: () => {

    menuEl.addEventListener("click", () => {
      gsap.to(".second", 1, {backgroundColor: "black"})
      gsap.to(".rights", 1, {color: "white"})
    })
    confirmBtn.addEventListener("click", () => {
      gsap.to(".checkoutDiv", 1, {backgroundColor: "black"})
      gsap.to("textarea", 1, {border: "1px solid white"})
      gsap.to("h1", 1, {color: "white"})
      gsap.to("button", 1, {border: "1px solid white"})
      gsap.to(".totalItems", 1, {color: "white"})
      gsap.to(".removeBtns", 1, {color: "white"})
    })
      
      box.forEach(boxs => {
        boxs.addEventListener("click", () => {
          gsap.to(".textTitle", 1, {color: "white"})
          gsap.to(".types", 1, {color: "white"})
          gsap.to(".prices", 1, {color: "white"})
          gsap.to(".descEl", 1, {color: "white"})
          gsap.to(".back", 1, {color: "white"})

          gsap.to(".btn", 1, {border: "1px solid white"})
        })
      })
      gsap.to("body", 1, {backgroundColor: "black"})
    //navbar
      gsap.to(".first", 1, {backgroundColor: "black", mixBlendMode: "difference"})
      gsap.to(".logo-one", 1, {color: "white"})
      gsap.to("a", 1, {color: "white"})
      gsap.to(".right", 1, {color: "white"})
      gsap.to(".lines", 1, {backgroundColor: "white"})
      gsap.to(".second", 1, {backgroundColor: "black"})
   

      //product items
      gsap.to(".texts", 1, {color: "white"})
      gsap.to(".type", 1, {color: "white"})
      gsap.to(".price", 1, {color: "white"})

      //order page
      gsap.to(".pageEl", 1, {backgroundColor: "black"})
      gsap.to(".back", 1, {color: "white"})
      gsap.to(".page", 1, {backgroundColor: "black"})

      //order text
      gsap.to(".textTitle", 1, {color: "white"})
      gsap.to(".types", 1, {color: "white"})
      gsap.to(".prices", 1, {color: "white"})
      gsap.to(".descEl", 1, {color: "white"})

      //checkOut

      gsap.to(".checkoutDiv", 1, {backgroundColor: "black"})
      gsap.to("textarea", 1, {border: "1px solid white"})
      gsap.to("h1", 1, {color: "white"})
      gsap.to("button", 1, {border: "1px solid white"})
      gsap.to(".totalItems", 1, {color: "white"})
      gsap.to(".removeBtns", 1, {color: "white"})
    },
    onLeaveBack: () => {
      box.forEach(boxs => {
        boxs.addEventListener("click", () => {
          gsap.to(".textTitle", 1, {color: "black"})
          gsap.to(".types", 1, {color: "black"})
          gsap.to(".prices", 1, {color: "black"})
          gsap.to(".descEl", 1, {color: "black"})
          gsap.to(".back", 1, {color: "black"})

          gsap.to(".btn", 1, {border: "1px solid white"})
        })
      })
      menuEl.addEventListener("click", () => {
        gsap.to(".second", 1, {backgroundColor: "white"})
        gsap.to(".rights", 1, {color: "black"})
      })
      gsap.to("body", 1, {backgroundColor: "white"})
      gsap.to(".first", 1, {backgroundColor: "white"})

      //navbar
      gsap.to("a", 1, {color: "black"})
      gsap.to(".logo-one", 1, {color: "black"})
      gsap.to(".right", 1, {color: "black"})
      gsap.to(".lines", 1, {backgroundColor: "black"})
      gsap.to(".second", 1, {backgroundColor: "white"})

      //product items
      gsap.to(".texts", 1, {color: "black"})
      gsap.to(".type", 1, {color: "black"})
      gsap.to(".price", 1, {color: "black"})

    //order page
     gsap.to(".pageEl", 1, {backgroundColor: "white"})
     gsap.to(".back", 1, {color: "black"})
     gsap.to(".page", 1, {backgroundColor: "white"})
     
      //order text
      gsap.to(".textTitle", 1, {color: "black"})
      gsap.to(".types", 1, {color: "black"})
      gsap.to(".prices", 1, {color: "black"})
      gsap.to(".descEl", 1, {color: "black"})

      //checkout 
      gsap.to(".checkoutDiv", 1, {backgroundColor: "white"})
      gsap.to("textarea", 1, {border: "1px solid black"})
      gsap.to("h1", 1, {color: "black"})
      gsap.to("button", 1, {border: "1px solid black"})
      gsap.to(".totalItems", 1, {color: "black"})
      gsap.to(".removeBtns", 1, {color: "black"})
    }
  },
});


function calculatez(price) {
  return price
}
function normalPrice(price) {
  return price
}
function removeAll(container) {
  confirmBtn.onclick = () => {
    const pricez = `$${addCommasToNumber(calculatez(totalsss))}`

    const removeBtns = document.createElement('div')
    removeBtns.innerHTML = '<ion-icon name="arrow-back-circle-outline"></ion-icon>'
    removeBtns.className = "removeBtns"

    const totalItems = document.createElement('p')
    const prizeInside = document.querySelector('.totalsNum').textContent
     totalItems.textContent = `you have ${items} items that costs ${prizeInside}`

    totalItems.className = "totalItems"

    const checkoutDiv = document.createElement('div')
    checkoutDiv.className = "checkoutDiv"
    removeBtns.onclick = () => {
      gsap.to(checkoutDiv, {visibility: "hidden"})
    }

    const address = document.createElement('textarea')
    address.className = "addressIn"
    address.placeholder = "enter your address to proceed"

    const infoDiv = document.createElement('div')
    infoDiv.className = "infoDiv"
    const checkoutBtn = document.createElement('button')
    checkoutBtn.textContent = "checkout"


 
    checkoutBtn.onclick = () => {
      if(!address.value) {
        alert("please type your address")
      } else {
        newTotal = 0
        container.remove()
        document.querySelector('.total-price').textContent = "₱0"
        document.querySelector('.total-items').textContent = `you've got no items in your cart`
        totalItems.textContent =  ''
        address.value = ''
        document.querySelector('.totalsNum').textContent =  `₱${newTotal}`
        const greet = document.createElement('h1')
        greet.innerHTML = 'THANK YOU FOR YOUR PURCHASE <ion-icon class="checkIcon" name="checkmark-circle-outline"></ion-icon> '
        checkoutDiv.appendChild(greet)
        if(newTotal === 0) {
          backBtnn.addEventListener("click", function() {
            window.location.href = "index.html"; // Redirect when the button is clicked
          })
  
      }  
      }
  }

    checkoutDiv.appendChild(checkoutBtn)

      infoDiv.appendChild(totalItems)
      checkoutDiv.appendChild(infoDiv)
      checkoutDiv.appendChild(address)
      checkoutDiv.appendChild(removeBtns)
    document.querySelector('.pageEl').appendChild(checkoutDiv)

    
    
  }
  
}