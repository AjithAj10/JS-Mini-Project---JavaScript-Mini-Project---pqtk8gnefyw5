
async function create() {
   
    let promise = await fetch("./data.json");
    let data = await promise.json();

    for(let i=0; i<data.items.length;i++){
        singleProduct(data,i);
    }//End of for loop

    let addToCart = document.querySelectorAll('.cart');

addToCart.forEach((e) => {
    e.addEventListener('click', () => {
        console.log(e.parentNode.parentNode);
    })
    
})
}
create();





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
        <button class="btn btn-primary cart">Add to cart</button>
        
    </div>
</div>`

productCover.innerHTML += product;
}

function singleCartItem(data){
    let strikePrice = data.items.price;
    strikePrice = strikePrice * 1.05;
    let product = "";
    product = `  <div class="cartData">
    <div class="cartimg">
        <img src="${data.items[i].image}" alt="">
    </div>
    <div class="content">
        <h3>${data.items[i].model}</h3>
        <p>${data.items[i].memory}</p>
        <h5><span><strike>${strikePrice} Rs</strike> </span><span>${data.items[i].price} Rs</h5>
    </div>
</div>`
}

let page = document.querySelector(".cartPage");
let close = document.querySelector('.closeCart');

cartBtn.addEventListener("click", () => {
    page.classList.add('showCart');
})

close.addEventListener("click", () => {
    page.classList.remove('showCart');
})