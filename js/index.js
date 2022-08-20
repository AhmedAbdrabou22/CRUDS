let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let cat = document.getElementById("category");
let submit = document.getElementById("submit");
let count = document.getElementById("count");

// دا معمول لو المود انشاء منتج يعمل حاجه لو الكود ابديت يعمل حاجه تانيه 
let mood = "create"
// variable is global to access index in function to another function 
let tmp;


// function get Total
function getTotal() {
    // dont calc any operation if price value empty
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result + " LE";
        total.style.backgroundColor = "#040";
    } else {
        total.innerHTML = " ";
        total.style.backgroundColor = "#870505";
    }
}

// submit get data from inputs store data in object and push  it in array and  store array in local storag
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}
// let newProduct = {};
submit.addEventListener("click", () => {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        cat: cat.value,
    };
    if(mood === 'create'){
        if(count.value > 1){
            for(let i = 0; i < count.value; i++) {
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct[tmp] = newProduct;
        submit.innerHTML = "Create"
        count.style.display = 'block';
    }
    localStorage.setItem("product", JSON.stringify(dataProduct));
    displayContent();
    clearData();
});
//Clear Inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    cat.value = "";
    count.value = "";
    getTotal();
}
function displayContent() {
    let tr = "";
    for (let i = 0; i < dataProduct.length; i++) {
        tr += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].cat}</td>
                        <td><button class="update" onclick = "updateData(${i})">Update</button></td>
                        <td><button class="delete" onclick="itemDelete(${i})">Delete</button></td>
                    </tr>
                `;
    }
    document.getElementById("tbody").innerHTML = tr;
    deletAll();
}
displayContent();

function itemDelete(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    displayContent();
}

function deletAll() {
    if (dataProduct.length > 0) {
        document.getElementById("deletAll").innerHTML = `
            <button onclick="delAllData()"> Delete All (${dataProduct.length}) </button>
        `;
    } else {
        document.getElementById("deletAll").innerHTML = "";
    }
}

function delAllData() {
    localStorage.clear();
    dataProduct.splice(0);
    displayContent();
}

//Search 
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let trs = document.querySelectorAll('tbody tr')
console.log(search);
console.log(trs);

function searchData() {
    let seacValue = search.value.toUpperCase();
    trs.forEach(tr => {
        let searchgoal = tr.children[1].innerHTML.toUpperCase();
        if (!(searchgoal === seacValue)) {
            tr.style.display = "none";
        } else {
            tr.style.display = '';
        }
    });
}

search.addEventListener('keyup', () => {
    searchTitle.addEventListener('click', () => {
        searchData();
    })
});


function searchcat() {
    let seacValue = search.value.toUpperCase();
    trs.forEach(tr => {
        let searchgoal = tr.children[7].innerHTML.toUpperCase();
        if (!(searchgoal === seacValue)) {
            tr.style.display = "none";
        } else {
            tr.style.display = '';
        }
    });
}

search.addEventListener('keyup', () => {
    searchCategory.addEventListener('click', () => {
        searchcat();
    })
});



function updateData(i) {
    title.value = dataProduct[i].title
    price.value = dataProduct[i].price
    taxes.value = dataProduct[i].taxes
    ads.value = dataProduct[i].ads
    discount.value = dataProduct[i].discount
    cat.value = dataProduct[i].cat
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update'
    mood = "update"
    tmp = i;
}
