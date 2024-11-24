let title = document.getElementById("title")
let price = document.getElementById("price")
let ads = document.getElementById("ads")
let taxes = document.getElementById("taxes")
let total = document.getElementById("total")
let count = document.getElementById("count")
let discount = document.getElementById("discount")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = 'create'
let tmp;

// (1) get total

function getTotal(){
    if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result
    total.style.background = 'green'
    }else{
        total.style.background = '#770000'
        total.innerHTML = ''
    }
}


// (2)  create product

let dataProj;
if(localStorage.product != null){
    dataProj = JSON.parse(localStorage.product)
}else{
    dataProj = []
}

submit.onclick = function(){
    savedData = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != ''&& price.value != ''&& category.value != ''&& savedData.count <= 1000){
        if(mood === 'create'){
            if(savedData.count > 1){
                for(let i = 0; i < savedData.count; i++){
                    dataProj.push(savedData)
                }
            }else{
                dataProj.push(savedData)
            }
        }else{
            dataProj[ tmp ] = savedData
            mood = 'create'
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
        clearData()
    }
    

    localStorage.setItem("product" , JSON.stringify(dataProj))
  
    showData()
}




//  (3)  clear data

function clearData(){
    title.value = ''
    price.value = ''
    ads.value = ''
    taxes.value = ''
    total.innerHTML = ''
    discount.value = ''
    count.value = ''
    category.value = ''
}






//  (4)  read

function showData(){
    let table = ''
    for(let i = 0 ; i < dataProj.length ; i++){
        table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProj[i].title}</td>
                    <td>${dataProj[i].price}</td>
                    <td>${dataProj[i].taxes}</td>
                    <td>${dataProj[i].ads}</td>
                    <td>${dataProj[i].discount}</td>
                    <td>${dataProj[i].total}</td>
                    <td>${dataProj[i].category}</td>
                    <td><button id="update"  onclick="updateData(${i})" >update</button></td>
                    <td><button   onclick="deleteData(  ${i}  )"   id="delete">delete</button></td>
                </tr> `
    }

    document.getElementById('tbody').innerHTML = table
    let btnDeleteAll = document.getElementById("deleteAll")
    if(dataProj.length > 0){
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()" >Delete All ( ${dataProj.length} )</button>`
    }else{
        btnDeleteAll.innerHTML = ''
    }

    getTotal()
}

showData()





//  (5)  delete

function deleteData(i){
    dataProj.splice(i,1)
    localStorage.product = JSON.stringify(dataProj)
    showData()
}





//  (6)  delete all

function deleteAll(){
    localStorage.clear()
    dataProj.splice(0)
    showData()
}







//  (7)  update

function updateData(i){
    title.value = dataProj[i].title
    price.value = dataProj[i].price
    ads.value = dataProj[i].ads
    taxes.value = dataProj[i].taxes
    discount.value = dataProj[i].discount
    category.value = dataProj[i].category
    getTotal()
    count.style.display = 'none'
    submit.innerHTML = 'Update'
    mood = 'Update'
    tmp = i
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}






//  (8)  search

let searchMood = 'title'
let search = document.getElementById('search')

function getSearchMood(id){
    if(id === 'btnSearchByTitle'){
        searchMood = 'title'
        search.placeholder = 'Search By Title'
    }else{
        searchMood = 'category'
        search.placeholder = 'Search By Category'
    }
    
    search.focus()
    search.value = ''
    showData()
}


function searchData(value){

    let table = ''

    if(searchMood == 'title'){

        for(let i = 0; i < dataProj.length; i++){
            if(dataProj[i].title.includes(value.toLowerCase())){
               
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProj[i].title}</td>
                    <td>${dataProj[i].price}</td>
                    <td>${dataProj[i].taxes}</td>
                    <td>${dataProj[i].ads}</td>
                    <td>${dataProj[i].discount}</td>
                    <td>${dataProj[i].total}</td>
                    <td>${dataProj[i].category}</td>
                    <td><button id="update"  onclick="updateData(${i})" >update</button></td>
                    <td><button   onclick="deleteData(  ${i}  )"   id="delete">delete</button></td>
                </tr> `


            }
        }

    }else{

        for(let i = 0; i < dataProj.length; i++){
            if(dataProj[i].category.includes(value.toLowerCase())){
               
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProj[i].title}</td>
                    <td>${dataProj[i].price}</td>
                    <td>${dataProj[i].taxes}</td>
                    <td>${dataProj[i].ads}</td>
                    <td>${dataProj[i].discount}</td>
                    <td>${dataProj[i].total}</td>
                    <td>${dataProj[i].category}</td>
                    <td><button id="update"  onclick="updateData(${i})" >update</button></td>
                    <td><button   onclick="deleteData(  ${i}  )"   id="delete">delete</button></td>
                </tr> `


            }
        }
    }


    document.getElementById('tbody').innerHTML = table
}