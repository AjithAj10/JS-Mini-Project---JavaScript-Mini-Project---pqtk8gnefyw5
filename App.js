window.onload = function(){
    if(JSON.parse( localStorage.getItem('cart') != null)){
        localStorage.removeItem('cart');
        }
}
async function create() {
   
    let promise = await fetch("./data.json");
    let data = await promise.json();

    for(let i=0; i<data.items.length;i++){
        singleProduct(data,i);
    }//End of for loop

    let addToCart = document.querySelectorAll('.cart');
localStorage.setItem('data',JSON.stringify(data.items));

//  let s = JSON.parse( localStorage.getItem('data') );  // access the whole data
// console.log(s);

//Add to cart button
addToCart.forEach((e) => {
    e.addEventListener('click', () => {
        let idNum = parseInt(e.id);
         singleCartItem(data,idNum);   
        //  console.log(data.items[idNum]);
        addCartAsLocal(data.items[idNum]);
        e.disabled = true;
        cartTotal();
    })
})


}
create();

let cart = [];
let cartCover = document.querySelector('.cartContent');

function singleProduct(data,i){
    let product = "";
    product = `<div class="product">
    <div class="img">
        <img src="${data.items[i].image}" alt="">
    </div>
    <div class="content">
        <h3>${data.items[i].model}</h3>
        <h5>${data.items[i].price} Rs</h5>
        <p>${data.items[i].memory}</p>
        <p>${data.items[i].chipset}</p>
        <button class="btn btn-primary cart" id='${i}'>Add to cart</button>
        
    </div>
</div>`

productCover.innerHTML += product;
}

function singleCartItem(data,i){
    
    let strikePrice = parseInt(data.items[i].price);
    strikePrice = strikePrice * 1.05;
    let product = "";
    product = `  <div class="cartData">
    <div class="cartimg">
        <img src="${data.items[i].image}" alt="">
    </div>
    <div class="content">
        <h3>${data.items[i].model}</h3>
        <p>${data.items[i].memory}</p>
        <h5><span><strike><sup>${strikePrice} Rs</sup></strike> </span><span>${data.items[i].price} Rs</h5>
        <div class="buttons">
        <button class="plus">+</button>
        <input type="number" disabled value="${1}">
        <button class="minus">-</button>
        <button class="remove">Remove</button>
        </div>
    </div>
</div>`

cartCover.innerHTML += product;
}

function addCartAsLocal(data){
    if(JSON.parse( localStorage.getItem('cart') != null)){
    cart = JSON.parse( localStorage.getItem('cart'));
    }
   cart = [...cart,data];
   localStorage.setItem('cart',JSON.stringify( cart) );
}
// let whole = JSON.parse( localStorage.getItem('cart') ); 
function cartTotal(){
    let wholeCartLocal = JSON.parse( localStorage.getItem('cart') ); 
    let TPrice = 0;
    let TDiscount = 0;
    for(let i=0; i<wholeCartLocal.length;i++){
        TPrice += parseInt(wholeCartLocal[i].price);
        TDiscount +=  parseInt(wholeCartLocal[i].price) * 0.05;
            console.log( wholeCartLocal[i].price );
    }
    items.textContent = wholeCartLocal.length;
    discount.textContent = TDiscount;
    total.textContent = TPrice;
}


let page = document.querySelector(".cartPage");
let close = document.querySelector('.closeCart');
let mn = document.querySelector('main');

cartBtn.addEventListener("click", () => {
    page.classList.add('showCart');
})

mn.addEventListener("click", () => {
    page.classList.remove('showCart');
})


close.addEventListener("click", () => {
    page.classList.remove('showCart');
})

