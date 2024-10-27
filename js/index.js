// *-------------------------------------------- html element ------------------
// *-------------------------------------------- ------------ ------------------
const myRow = document.querySelector('.cards')
const xml = document.querySelector('.xml')
const searchLink = document.querySelector('#search')
const rowSearch = document.querySelector('.inputs')
const container = document.querySelector('.container')
let nameInput;
let passInput;
let phoneInput;
let ageInput;
let emailInput;
let repassInput;



// *-------------------------------------------- vsribles ------------------
// *-------------------------------------------- -------- ------------------
let nameRegex = /^[A-Za-z]+$/
let emailRegex = /^[A-Za-z]{1}[a-zA-Z0-9]+@[A-Za-z]+\.([A-Za-z]{3,})$/
let phoneRegex = /^(011|012|010)[0-9]{9}$/
let ageRegex = /^([1-9]{1}|[1-9]{1}[0-9]{1})$/
let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/




// ^-------------------------------- sidebar -------------------^ 
// ^-------------------------------- ------- -------------------^ 
let side1 = $(".side1").outerWidth()
console.log(side1);
$('.sidebar').css("left", `${-side1}px`)
$(".side1 ul li").css("top", "100px")

let isOpen = false

function closeSideBar() {
    $('.sidebar').animate({ "left": `${-side1}px` }, 720)
    $(".open").html(' <i class="fa-solid fa-bars fs-1 text-black"></i>')

    $(".side1 ul .li1").animate({ "top": "100px" }, 500)
    $(".side1 ul .li2").animate({ "top": "100px" }, 500)
    $(".side1 ul .li3").animate({ "top": "100px" }, 500)
    $(".side1 ul .li4").animate({ "top": "100px" }, 500)
    $(".side1 ul .li5").animate({ "top": "100px" }, 500)

}

$('.open').on('click', function () {
    if (isOpen === true) {
        closeSideBar()

        isOpen = false
    } else {
        $('.sidebar').animate({ "left": `0px` }, 600)
        $(".open").html('<i class="fa-solid fa-x fs-1 text-black"></i>')

        $(".side1 ul .li1").animate({ "top": "0px" }, 600)
        $(".side1 ul .li2").animate({ "top": "0px" }, 700)
        $(".side1 ul .li3").animate({ "top": "0px" }, 800)
        $(".side1 ul .li4").animate({ "top": "0px" }, 900)
        $(".side1 ul .li5").animate({ "top": "0px" }, 1000)
        isOpen = true

    }

})

// ^--------------------------------- home bage --------------^
// ^--------------------------------- --------- --------------^
// !------------------------------ API function
async function mails() {
    $(".loading").fadeIn(0)
    $("body").css("overflow", "hidden")
    $(".sidebar").css("z-index", "9")
    let response = await fetch("https://themealdb.com/api/json/v1/1/search.php?s=", {
        method: 'GET'
    })
    let date = await response.json()

    let dateOfMeals = date.meals
    console.log(dateOfMeals);
    $(".loading").fadeOut(400)
    $("body").css("overflow", "auto")
    $(".sidebar").css("z-index", "99999")
    displayMeals(dateOfMeals)
}

// !------------------------------ display function 
function displayMeals(arr) {
    container.innerHTML = ""
    container.classList.remove('vh-100')
    xml.classList.add("pt-4")
    for (let i = 0; i < arr.length; i++) {
        let innerCol = `
       <div class="col-md-3 ">
                <div class="inner mt-3 overflow-hidden position-relative" onclick="getIdOfMeal(${arr[i].idMeal})">
                    <img src=${arr[i].strMealThumb} class="w-100 rounded-3" alt="">
                    <div class="layer w-100 position-absolute h-100 rounded-3 d-flex align-items-center"><h2>${arr[i].strMeal}</h2></div>
                </div>
            </div>`

        myRow.innerHTML += innerCol
    }
}




mails()


// *----------------------------- detailes --------------------*
// *----------------------------- -------- --------------------*
// !------------------------------ API function----------
async function getIdOfMeal(mealId) {
    $(".loading").fadeIn(0)
    let response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    let date = await response.json();

    console.log(date);
    $(".loading").fadeOut(400)
    displayDetails(date.meals[0])
}

// !----------------------------- display Details --------
function displayDetails(meal) {

    container.innerHTML = ""
    container.classList.remove('vh-100')
    xml.classList.add("pt-5")
    let cartona = ``
    let x;
    if (meal.strTags !== null) {
        x = meal.strTags.split(",")
    } else {
        x = []
    }
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        cartona += `
        <li class="alert alert-danger p-2  m-2"> ${x[i]}</li>

        `
    }

    let contan = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            contan += `  <li class="alert alert-info p-2  m-2"> ${meal[`strMeasure${i}`] + meal[`strIngredient${i}`]}</li>`

        }
        console.log(meal[`strIngredient${i}`]);


    }
    rowSearch.innerHTML = ""

    myRow.innerHTML = `
     <div class="col-md-4">
                    <div class="iner">
                        <img src="${meal.strMealThumb}" class="w-100 rounded-3 " alt="">
                        <h2 class="text-white">${meal.strMeal}</h2>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="iner text-white">
                        <h2>Instructions</h2>
                        <p>${meal.strInstructions}</p>

                        <h3 class="fw-bold">Area : <span class=" fw-semibold">${meal.strArea}</span></h3>    
                        <h3 class="fw-bold">Category : <span class="fw-semibold">${meal.strCategory}</span></h3>    
                        <h3 class="m-1">Recipes  :</h3>  
                        <ul class="list-unstyled d-flex mb-0 flex-wrap">
                        ${contan}
                        </ul>  
                        <h3 class=" m-1">Tages  : </h3>  
                        <ul class="list-unstyled d-flex mb-0 flex-wrap ">
                            ${cartona}
                        </ul>    

                        <a href="${meal.strSource}" target="_blank" class="btn btn-success mt-2 me-1"> sourse</a>
                        <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger mt-2"> Youtube</a>

                    </div>
                </div>

    `

}

// *^^------------------------------------  search bage ---------------\
// *^^------------------------------------  ----------- ---------------\

// !------------------------------------- search By Name ---------------
searchLink.addEventListener("click", function () {
    closeSideBar()
    container.innerHTML = ""
    container.classList.remove('vh-100')
    myRow.innerHTML = ""
    rowSearch.innerHTML = `

                 <div class="col-md-6  ms-auto inerSearch ">
                    <div class="  pt-4  ">
                        <input type="text" class="form-control " oninput="searchByName(this.value)"  placeholder="Search By Name">
                    </div>
                </div>
                <div class="col-md-6 me-auto  inerSearch">
                    <div class="    pt-4 ">
                        <input type="text" class="form-control" oninput="searchByFrist(this.value)" placeholder="Search By Frist Letter" maxlength="1">
                    </div>
                </div> 
        `
})

async function searchByName(name) {
    $(".loading").fadeIn(0)
    let response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let date = await response.json()
    $(".loading").fadeOut(0)
    console.log(date)
    if (date.meals === null) {
        myRow.innerHTML = ""
    } else {
        myRow.innerHTML = ""

        displayMeals(date.meals)
    }
}

// !------------------------------- search by frist -------------------
async function searchByFrist(letter) {
    if (letter == "") {
        letter = "a"
    }
    // if (letter == " ") {
    //     letter = "2"
    // }
    $(".loading").fadeIn(0)
    let respons = await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let date = await respons.json()
    $(".loading").fadeOut(0)
    console.log(date)
    if (date.meals === null) {

        myRow.innerHTML = ""


    } else {
        myRow.innerHTML = ""

        displayMeals(date.meals)
    }



}

// ^ ---------------------------- category bage ----------------------------
// ^ ---------------------------- ------------- ----------------------------
// !------------------------------ event function
$('#Categories').on('click', function () {

    closeSideBar()
    container.innerHTML = ""
    container.classList.remove('vh-100')
    rowSearch.innerHTML = ""
    categoryMeals()

})
// !------------------------------ API function
async function categoryMeals() {
    $(".loading").fadeIn(0)
    let response = await fetch(`https://themealdb.com/api/json/v1/1/categories.php`)
    let date = await response.json();
    let dateOfCategory = date.categories
    console.log(dateOfCategory)
    $(".loading").fadeOut(400)
    displayCategory(dateOfCategory)


}

// !------------------------------ API of all function
async function allCategores(name) {
    $(".loading").fadeIn(0)
    let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    let date = await response.json();
    $(".loading").fadeOut(400)
    let dateOfCategory = date.meals
    myRow.innerHTML = ''
    displayMeals(dateOfCategory)
    console.log(dateOfCategory);



}

// !------------------------------ display function
function displayCategory(arr) {
    xml.classList.add("pt-5")
    let cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
       <div class="col-md-3">
                    <div class="inercategory position-relative overflow-hidden " onclick="allCategores('${arr[i].strCategory}')" >
                        <img src="${arr[i].strCategoryThumb}" class="w-100 " alt="">
                        <div class="layercategory position-absolute w-100 h-100 rounded-3 text-center ">
                            <h2>${arr[i].strCategory}</h2>
                            <p>${arr[i].strCategoryDescription.split(' ').slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
                </div>

       `
        myRow.innerHTML = cartona
    }
}

// ^ ---------------------------- area bage ----------------------------
// ^ ---------------------------- ------------- ----------------------------
// !------------------------------ event function
$('#Area').on('click', function () {

    rowSearch.innerHTML = ""
    container.innerHTML = ""
    container.classList.remove('vh-100')
    closeSideBar()
    getApiArea()

})
// !------------------------------ API function
async function getApiArea() {
    $(".loading").fadeIn(0)
    let respons = await fetch(`https://themealdb.com/api/json/v1/1/list.php?a=list`)
    let date = await respons.json()

    let dateOfArea = date.meals
    console.log(dateOfArea);
    $(".loading").fadeOut(400)
    displayArea(dateOfArea)

}
// !------------------------------ display function
function displayArea(arr) {
    let cartona = ""
    xml.classList.add('pt-5')
    for (let i = 0; i < arr.length; i++) {
        cartona += `
         <div class="col-md-3">
                    <div class="inerArea position-relative overflow-hidden  text-white text-center" onclick="getallApiArea('${arr[i].strArea}')">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                    </div>
                </div>
        `
        myRow.innerHTML = cartona
    }
}
// !------------------------------ API of All function
async function getallApiArea(name) {
    $(".loading").fadeIn(0)
    let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${name}`)
    let date = await response.json()

    let dateOfAllArea = date.meals
    console.log(dateOfAllArea);
    $(".loading").fadeOut(400)
    myRow.innerHTML = ""
    container.innerHTML = ""
    container.classList.remove('vh-100')
    displayMeals(dateOfAllArea);


}








// ^ ---------------------------- ingredintes bage ----------------------------
// ^ ---------------------------- ------------- ----------------------------
// !------------------------------ event function
$("#Ingredients").on('click', function () {
    rowSearch.innerHTML = ""
    container.innerHTML = ""
    container.classList.remove('vh-100')
    closeSideBar()
    getApiOFItedredite()
})

// !------------------------------ API function
async function getApiOFItedredite() {
    $(".loading").fadeIn(0)
    let response = await fetch('https://themealdb.com/api/json/v1/1/list.php?i=list')
    let date = await response.json()

    let dateOdIntegredinte = date.meals
    $(".loading").fadeOut(400)
    console.log(dateOdIntegredinte.slice(0, 20));
    displayIngredinte(dateOdIntegredinte.slice(0, 20))


}

// !------------------------------ display function
function displayIngredinte(arr) {
    let cartona = ''
    xml.classList.add('pt-5', 'pb-5')
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                    <div class="inerArea position-relative overflow-hidden  text-white text-center" onclick="getallApiIngredinte('${arr[i].strIngredient}')">
                       <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p> ${arr[i].strDescription.split(' ').slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        `

    }
    myRow.innerHTML = cartona
}

// !------------------------------ API of All function
async function getallApiIngredinte(name) {
    $(".loading").fadeIn(0)
    let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    let date = await response.json()

    let dateOfAllIntegarte = date.meals
    $(".loading").fadeOut(400)
    console.log(dateOfAllIntegarte);
    myRow.innerHTML = ''
    displayMeals(dateOfAllIntegarte)
}

// ^ ---------------------------- contact bage --------------------------
// ^ ---------------------------- ------------ --------------------------

$('#Contact').on('click', function () {
    closeSideBar()
    rowSearch.innerHTML = ""
    myRow.innerHTML = ""
    container.classList.add('vh-100')
    displayContact()
})

function displayContact() {
    container.innerHTML = `
                <div class="row g-4 p-5">
                <div class="col-md-6 ps-md-5">
                    <div class="innerContact ps-md-5">
                        <input  type="text"id="nameInput" class="mx-auto form-control w-100"  placeholder="Enter Your Name">
                        <p class="eror text-center alert mt-3 w-100 d-none alert-danger p-3">Special characters and numbers not allowed</p>
                        </div>
                </div>
                <div class="col-md-6 pe-md-5">
                    <div class="innerContact pe-md-5 ">
                        <input  type="email" id="emailInput" class="mx-auto form-control"   placeholder="Enter Your Email">
                  
                        <p class="eror text-center alert mt-3 w-100 d-none alert-danger p-3">Email not valid *exemple@yyy.zzz</p>
                        </div>
                </div>
                <div class="col-md-6 ps-md-5">
                    <div class="innerContact ps-md-5 ">
                        <input  type="text" id="phoneInput" class="mx-auto form-control"   placeholder="Enter Your Phone">
                        <p class="eror text-center alert mt-3 w-100 d-none alert-danger p-3">Enter valid Phone Number</p>
                        </div>
                </div>
                <div class="col-md-6 pe-md-5">
                    <div class="innerContact pe-md-5 ">
                        <input  type="number" id="ageInput" class="mx-auto form-control"  placeholder="Enter Your Age">
                        <p class="eror text-center alert mt-3 w-100 d-none alert-danger p-3">Enter valid age</p>
                        </div>
                </div>
                <div class="col-md-6 ps-md-5">
                    <div class="innerContact  ps-md-5">
                        <input  type="password" id="passInput" class="mx-auto form-control"   placeholder="Enter Your Password">   
                        <p class="eror text-center alert mt-3 w-100 d-none alert-danger p-3">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                        </div>
                </div>
                <div class="col-md-6 pe-md-5">
                    <div class="innerContact  pe-md-5">
                        <input  type="password" id="repassInput" class="mx-auto form-control"  placeholder="Repassword">   
                        <p class="eror text-center alert mt-3 w-100 d-none alert-danger p-3">Enter valid repassword</p>
                        </div>
                </div>
                <div class="col-md-12 px-md-5">
                    <div class="innerContact d-flex justify-content-center px-md-5">
                        <button class="btn btn-danger err" disabled>Submit</button>
                    </div>
                </div>

            </div>

    `

}


$(".container").delegate("input", "input", function () {

    if ($(this).attr('id') === $(`input[id="nameInput"]`).attr('id')) {
        nameRegex.test($('input[id="nameInput"]').val()) ? $(this).next().addClass('d-none') : $(this).next().removeClass('d-none')
    }


    if ($(this).attr('id') === $(`input[id="emailInput"]`).attr('id')) {
        emailRegex.test($('input[id="emailInput"]').val()) ? $(this).next().addClass('d-none') : $(this).next().removeClass('d-none')

    }

    if ($(this).attr("id") === $('input[id="phoneInput"]').attr("id")) {
        phoneRegex.test($('input[id="phoneInput"]').val()) ? $(this).next().addClass('d-none') : $(this).next().removeClass('d-none')

    }
    if ($(this).attr('id') === $('input[id="ageInput"]').attr("id")) {
        ageRegex.test($('input[id="ageInput"]').val()) ? $(this).next().addClass('d-none') : $(this).next().removeClass('d-none')

    }

    if ($(this).attr("id") === $('input[id="passInput"]').attr("id")) {
        passRegex.test($('input[id="passInput"]').val()) ? $(this).next().addClass('d-none') : $(this).next().removeClass("d-none")
    }


    testRegex() ? $('.container button.err').removeAttr('disabled') : $('.container button.err').prop("disabled", true)

    if ($('input[placeholder="Enter Your Password"]').val() === $('input[placeholder="Repassword"]').val()) {
        $('input[placeholder="Repassword"]').next().addClass('d-none')


    } else {
        $('input[placeholder="Repassword"]').next().removeClass('d-none')
    }

})

function testRegex() {

    if (nameRegex.test($('input[id="nameInput"]').val()) &&

        emailRegex.test($('input[id="emailInput"]').val()) &&

        phoneRegex.test($('input[id="phoneInput"]').val()) &&

        ageRegex.test($('input[id="ageInput"]').val()) &&

        passRegex.test($('input[id="passInput"]').val()) &&

        $('input[placeholder="Enter Your Password"]').val() == $('input[placeholder="Repassword"]').val()) {

        return true
    }

}









