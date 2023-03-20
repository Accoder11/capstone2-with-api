var nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if(this.window.pageYOffset > 200) {
        nav.classList.add('bg-black', 'shadow');
    } else {
        nav.classList.remove('bg-black', 'shadow');
    }
  });


// API MANIPULATION

const errorText = document.querySelector('#error-text')
const random = document.querySelector('.random')
const submit = document.querySelector('.search')
const input = document.querySelector('.meal-input')
const mealList = document.querySelector('#list')
const favList = document.querySelector('#fav-list')
const categoryList = document.querySelector('.categoryList')
const categories = document.querySelector('.categories')


submit.addEventListener('click' , function(){
if(input.value.length === 0){
errorText.innerHTML = 'Input can not be Empty !!!';
mealList.innerHTML='';
return;
}
getMealList();

});

function getMealList(){
let searchInputTxt = input.value.trim();
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
.then(response => response.json())
.then(data => {
let html = "";

if(data.meals){
data.meals.forEach(meal => { 


html += `            
<div class = "meal-item" data-id = "${meal.idMeal}">                          
<div class = "meal-img">
    <img src = "${meal.strMealThumb}" alt = "food">
</div>
<div class = "meal-name">
    <h3>${meal.strMeal}</h3> 
    <button class="add" onclick="addList(${meal.idMeal})">
    ADD To Favourite Meals
    </button>
    <p id="inst">${meal.strInstructions}</p>
</div>
</div>
`;
});

errorText.innerHTML = '';
mealList.classList.remove('notFound');
} else{
errorText.innerHTML = '';
html = "Sorry, we didn't find any meal!";
mealList.classList.add('notFound');
}

mealList.innerHTML = html;
});
}


// Most Search Food/Recipes

random.addEventListener('click' , function(e){

e.preventDefault();
mealList.innerHTML = '';
input.value ='';
errorText.innerHTML = '';
for(let i = 0 ; i < 9; i++ ){

fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
.then(response => response.json())
.then(data => {
let html = '';
console.log(data.meals);
if(data.meals){
data.meals.forEach(meal => { 
html +=  `  <div class = "meal-item" data-id = "${meal.idMeal}">                          
          <div class = "meal-img">
              <img src = "${meal.strMealThumb}" alt = "food">
          </div>
          <div class = "meal-name" id="back">
              <h3>${meal.strMeal}</h3>
              <button class="add" onclick="addList(${meal.idMeal})">
              ADD To Favourite Meals
              </button>
              <p id="inst">${meal.strInstructions}</p>
          </div>
      </div>
`;           

});

}
mealList.innerHTML += html;
});
}

});




// now favourite list button starts here

function addList(meal){

console.log(meal);

// here this meal is the id of the meal

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
.then(res => res.json())
.then(data => {
console.log(data);
let html = ''; 
data.meals.forEach(meal => {
html +=  ` <li class="list-item" id="${meal.idMeal}">
  <div class = "meal-item" data-id = "${meal.idMeal}">                          
      <div class = "meal-img">
          <img src = "${meal.strMealThumb}" alt = "food" class="fav-img">
      </div>
      <div class = "meal-name" id="back">
          <h3>${meal.strMeal}</h3>
          <button class="delete" onclick="deleteList(${meal.idMeal})">
          Delete 
          </button>
          <p id="inst">${meal.strInstructions}</p>
      </div>
  </div>
  </li>
`;     
favList.innerHTML +=  html ;     
});
});
}

// DELETE Saved Recipe
function deleteList(meal){ 
let delList = document.getElementById(`${meal}`);
favList.removeChild(delList);
}


// Categories

categories.addEventListener('click' , function(e){

e.preventDefault();
mealList.innerHTML = '';
input.value ='';
errorText.innerHTML = '';
      
fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
.then(response => response.json())
.then(data => {
    let html = '';
          console.log(data.categories);
          if(data.categories){
            data.categories.forEach(meal => { 
                  html +=  `<div class = "meal-item2" data-id = "${meal.idCategory}">                          
                                  <div class = "meal-img">
                                      <img src = "${meal.strCategoryThumb}" alt = "categories" class="cat-img">
                                  </div>
                                  <div class = "meal-name text-center" id="back">
                                      <h3>${meal.strCategory}</h3>
                                  </div>
                                  <div class = "para text-center" id="desc">
                                      <p>${meal.strCategoryDescription}</p>
                                  </div>
                             </div>
                  `;           

                  });
          }

          categoryList.innerHTML += html;
  });
  
});



chicken.addEventListener('click', function(e) {
  e.preventDefault();
  mealList.innerHTML = '';
  input.value = '';
  errorText.innerHTML = '';
  getCategory('Chicken');
});

function getCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = '';
      console.log(data.meals);
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="categories">
            </div>
            <div class="meal-name" id="back">
              <h3>${meal.strMeal}</h3>
              <p id="desc">${meal.strInstructions}</p>
            </div>
          </div>`;
        });
      }
      mealList.innerHTML += html;
    });
}


beef.addEventListener('click', function(e) {
  e.preventDefault();
  mealList.innerHTML = '';
  input.value = '';
  errorText.innerHTML = '';
  getCategory('Beef');
});

function getCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = '';
      console.log(data.meals);
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="categories">
            </div>
            <div class="meal-name" id="back">
              <h3>${meal.strMeal}</h3>
              <p id="desc">${meal.strInstructions}</p>
            </div>
          </div>`;
        });
      }
      mealList.innerHTML += html;
    });
}


// Pork

pork.addEventListener('click', function(e) {
  e.preventDefault();
  mealList.innerHTML = '';
  input.value = '';
  errorText.innerHTML = '';
  getCategory('Pork');
});

function getCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = '';
      console.log(data.meals);
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="categories">
            </div>
            <div class="meal-name" id="back">
              <h3>${meal.strMeal}</h3>
              <p id="desc">${meal.strInstructions}</p>
            </div>
          </div>`;
        });
      }
      mealList.innerHTML += html;
    });
}


// Fish

fish.addEventListener('click', function(e) {
  e.preventDefault();
  mealList.innerHTML = '';
  input.value = '';
  errorText.innerHTML = '';
  getCategory('Seafood');
});

function getCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = '';
      console.log(data.meals);
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="categories">
            </div>
            <div class="meal-name" id="back">
              <h3>${meal.strMeal}</h3>
              <p id="desc">${meal.strInstructions}</p>
            </div>
          </div>`;
        });
      }
      mealList.innerHTML += html;
    });
}


// Vegetables

vegetables.addEventListener('click', function(e) {
  e.preventDefault();
  mealList.innerHTML = '';
  input.value = '';
  errorText.innerHTML = '';
  getCategory('Vegetarian');
});

function getCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = '';
      console.log(data.meals);
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="categories">
            </div>
            <div class="meal-name" id="back">
              <h3>${meal.strMeal}</h3>
              <p id="desc">${meal.strInstructions}</p>
            </div>
          </div>`;
        });
      }
      mealList.innerHTML += html;
    });
}

// Desserts

desserts.addEventListener('click', function(e) {
  e.preventDefault();
  mealList.innerHTML = '';
  input.value = '';
  errorText.innerHTML = '';
  getCategory('Dessert');
});

function getCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = '';
      console.log(data.meals);
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="categories">
            </div>
            <div class="meal-name" id="back">
              <h3>${meal.strMeal}</h3>
              <p id="desc">${meal.strInstructions}</p>
            </div>
          </div>`;
        });
      }
      mealList.innerHTML += html;
    });
}
