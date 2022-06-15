
async function create() {
   
    let promise = await fetch("./data.json");
    let data = await promise.json();
    console.log(data.items[0]);

    for(let i=0; i<data.items.length;i++){
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
        <button class="btn btn-primary">Add to cart</button>
        
    </div>
</div>`

productCover.innerHTML += product;
    }//End of for loop


}
create();
let page = document.querySelector(".cartPage");
cartBtn.addEventListener("click", () => {
    page.classList.toggle('showCart');
})
