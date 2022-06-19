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


//Add to cart button
addToCart.forEach((e) => {
    e.addEventListener('click', () => {
        let idNum = parseInt(e.id);
         singleCartItem(data,idNum);   
        //  console.log(data.items[idNum]);
        addCartAsLocal(data.items[idNum]);
        e.disabled = true;
        e.textContent = 'Added';
        cartTotal();
        showNotification(); 

    })

})


}
create();

let cart = [];
let cartCover = document.querySelector('.cartContent');

function singleProduct(data,i){
    let product = "";
    product = `<div class="product col-lg-6">
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
        <button class="minus" onClick='minus(event)'>-</button>
        <input type="number" disabled value="${1}">
        <button class="plus" onClick='plus(event)'>+</button>
        <button class="remove" onClick='remove(event)'>Remove</button>
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
    }
    items.textContent = wholeCartLocal.length;
    discount.textContent = TDiscount;
    total.textContent = TPrice;
}

//Not Finished
function popup(){

}

let page = document.querySelector(".cartPage");
let close = document.querySelector('.closeCart');
let main = document.querySelector('main');


function plus(event){
    let input = event.target.parentNode.children[1];
    input.value = parseInt(input.value) +1;
    let price = {};
    price = event.target.parentNode.parentNode.children[2].children[1].textContent;
    price = {price:parseInt(price)};
    addCartAsLocal(price);
    cartTotal();
}

function minus(event){
    let input = event.target.parentNode.children[1];

    if(input.value != 1){
        input.value = parseInt(input.value) -1;

        price = event.target.parentNode.parentNode.children[2].children[1].textContent;
        price = parseInt(price);
        let cartData = JSON.parse( localStorage.getItem('cart') );

        for(let i=cartData.length-1;i>=0;i--){
            if (cartData[i].price == price ) {
        //remove break
                cartData.pop(i);
                break;
            }
        }
        localStorage.setItem('cart',JSON.stringify( cartData) );
    cartTotal();
    }

}

function remove(event){

   let price = event.target.parentNode.parentNode.children[2].children[1].textContent;
    price = parseInt(price);
    let cartData = JSON.parse( localStorage.getItem('cart') );
let cart = [];

    for(let i=0;i<cartData.length;i++){
        if (cartData[i].price != price ) {
            cart = [...cart,cartData[i]];
        }
    }
    localStorage.setItem('cart',JSON.stringify( cart ) );
     event.target.parentNode.parentNode.parentNode.remove();
cartTotal();
if(cart != ''){
    btnEnable(price);
}
setTimeout(() => {
    if(cart == ''){
        window.location.reload();
    }
},1000)

}

function btnEnable(price){

    let data = JSON.parse( localStorage.getItem('data') );
    let id_ = '';


for(let i=0; i<data.length;i++){
if(data[i].price == price){
    id_ = data[i].id;
    id_ = id_-1;
    break;
  }

 }
 let cartBtn = document.querySelectorAll('.cart');

 cartBtn.forEach((btn) => {
   if(btn.id == id_){
        btn.disabled = false;
   }
 })
}

cartBtn.addEventListener("click", () => {
    page.classList.add('showCart');
})

main.addEventListener("click", () => {
    // gsap.fromTo('.page',{x:0},{x:-100,duration: 1});
     page.classList.remove('showCart');
})


close.addEventListener("click", () => {
    page.classList.remove('showCart');
})

function showNotification(text){    
    Push.create('Added to cart',{
        icon:'./mk.png',
        timeout: 2000,
    });
}
let container_ = document.querySelector('.container');

sign.addEventListener('click', () => {
    container_.classList.add('showContainer');

})


let close_ = document.querySelector('.closeX');
close_.addEventListener('click', () => {
    console.log(container_);
    container_.classList.remove('showContainer');
})

let buyBtn = document.querySelector('.btn-large');
let cardBuy = document.querySelector('.card');

buyBtn.addEventListener('click', () => {
    cardBuy.classList.add('showCard');
    setTimeout(() => {
        window.location.reload();
    },1000);
})