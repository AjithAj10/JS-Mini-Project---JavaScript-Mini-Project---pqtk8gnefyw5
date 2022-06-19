
let obj = {
    name:/\w{4}/i,
    email:/^\w+@\w+\.\w+/,
    mobile:/^\d{10}$/,
    password:/\w{8}/,
    address:/\w{4}/
}

function validate(form,regx){

   if( regx.test(form.value) ){
    console.log(777);
    form.className = 'success';
   }else{
    form.className = 'error';
   }
}
const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(input,obj[input.name]);
    })
})
let submit = document.querySelector('.sub');

console.log(submit);
submit.addEventListener('click', () => {
    let v = 0;
    inputs.forEach((input) => {
        if(!input.classList.contains('success')){
            v=1;
            alert(input.name +" "+ 'input invalid');
        }
    })
    console.log(v);
if(v == 0){
    container_.classList.remove('showContainer');
    sign.textContent = document.getElementsByName('name')[0].value;
    sign.disabled = true;
}
})
