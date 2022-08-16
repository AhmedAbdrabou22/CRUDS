let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let cat = document.getElementById('category');
let submit = document.getElementById('submit');

// function get Total
function getTotal(){
    // dont calc any operation if price value empty
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result + ' LE';
        total.style.backgroundColor = '#040'
    }else{
        total.innerHTML = ' ';
        total.style.backgroundColor = '#870505';
    }
}

// submit get data from inputs store data in object and push  it in array and  store array in local storag
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}
submit.addEventListener('click',()=>{
    let newProduct = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        cat : cat.value,
    }
    dataProduct.push(newProduct);
    localStorage.setItem('product',JSON.stringify(dataProduct)); 
    displayContent();
})
function displayContent(){
    let tr = ''
    for(let i = 0 ; i < dataProduct.length ; i++){
        tr +=`
            <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].cat}</td>
            <td><button class="upload">Upload</button></td>
            <td><button class="delete">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = tr;
}
displayContent();

let upload  = document.querySelectorAll('.upload');
console.log(upload);
