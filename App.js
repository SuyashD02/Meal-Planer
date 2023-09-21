
const mealApi ='https://content.newtonschool.co/v1/pr/64995a40e889f331d43f70ae/categories';
const recipeApi ='https://content.newtonschool.co/v1/pr/64996337e889f331d43f70ba/recipes';

const weight = document.querySelector(".weight");
const height = document.querySelector(".hight");
const Age = document.querySelector(".age");
const Gender = document.getElementById("gender");
const Activity =document.querySelector(".activity");
let bmr;
let finalBmr;
let breakfast;
let lunch;
let dinner;


function cagender(){
if(Gender.value ==='Male'){
   bmr = menBmr();
}else if(Gender.value ==='Female'){
   bmr= womenBmr();
}
if(bmr){
    activityBmr();
}
getMealAPIResponse();
}
function womenBmr() {
    
    const weightValue = parseFloat(weight.value);
    const heightValue = parseFloat(height.value);
    const ageValue = parseFloat(Age.value);

    if (!isNaN(weightValue) && !isNaN(heightValue) && !isNaN(ageValue)) {
        return 655.1 + (9.563 * weightValue) + (1.850 * heightValue) - (4.676 * ageValue);
       
    } else {
        console.log("Invalid input. Please enter valid numbers.");
    }
    
}
function menBmr() {
    
    const weightValue = parseFloat(weight.value);
    const heightValue = parseFloat(height.value);
    const ageValue = parseFloat(Age.value);

    if (!isNaN(weightValue) && !isNaN(heightValue) && !isNaN(ageValue)) {
        return 66.47 + (13.75 * weightValue) + (5.003 * heightValue) - (6.755 *ageValue);
    } else {
        console.log("Invalid input. Please enter valid numbers.");
    }
}

function activityBmr() {
    if (activity.value === 'Light') {
        finalBmr = bmr * 1.375;
    } else if (activity.value === 'Moderate') {
        finalBmr = bmr * 1.55;
    } else if (activity.value === 'Active') {
        finalBmr = bmr * 1.725;
    }
    console.log(finalBmr);
}

function getMealAPIResponse() {
  fetch(mealApi)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => {
    mealData = data; // Remove .json() here
    console.log("mealapi=" + mealData);

    mealData.forEach(item => {
      console.log(item); 
      var min = item['min'];
      var max = item['max'];
      console.log("min = " + min);
      console.log("max = " + max);
      if (finalBmr < max && finalBmr > min) {
        breakfast = item['breakfast'];
        lunch = item['lunch'];
        dinner = item['dinner'];
        console.log(lunch);
        console.log(dinner);
        console.log(breakfast);
        processBreakfast();
        processLunch();
        processDinner();
        return;
      }
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}
let lunchname;
let lunchphoto;
function processLunch() {
    lunchname = lunch.title;
    lunchphoto = lunch.image;
    document.querySelector('.lunchName').innerHTML = lunchname;
  document.querySelector('.lunchImg').src =lunchphoto;
  document.querySelector('.lhCalories').innerHTML = finalBmr/3;

}
let breakfastname;
let breakfastphoto;
function processBreakfast() {
  breakfastname = breakfast.title;
  breakfastphoto = breakfast.image;
  document.querySelector('.breakFastName').innerHTML =breakfastname;
  document.querySelector('.breakFastfImg').src =breakfastphoto;
  document.querySelector('.bfCalories').innerHTML = finalBmr/3;
}
let dinnerName;
let dinnerphoto;
function processDinner() {
  dinnerName = dinner.title;
  dinnerphoto = dinner.image;
  document.querySelector('.dinnerName').innerHTML =dinnerName;
  document.querySelector('.dinnerImg').src =dinnerphoto;
  document.querySelector('.dCalories').innerHTML = finalBmr/3;
}
 
//const lunchBox = document.querySelector(".lunchname");
//document.getElementById('lunchname').innerHTML = lunchname;

//lunchBox.innerHTML = lunchname;
//console.log(lunchname);


let lunchIngredient;
    let lunchStep;
    let breakfastIngredient;
    let breakfastStep;
    let dinnerIngredient;
    let dinnerStep;
    let recipeData = null;

async function getRecipe(){
await fetch(recipeApi)
.then(response2=> response2.json())
.then(data2=> {
  recipeData = data2;
});
}

async function getBreakFastRecipe() {
  if(recipeData == null) { await getRecipe();}
  recipeData.forEach(recipeItem => {
    console.log("breakfastname "+breakfastname);
    if (breakfastname == recipeItem.title){
      console.log("item name"+recipeItem.title);
      breakfastIngredient= recipeItem.ingredients;
      breakfastStep  = recipeItem.steps;

      const bfulList =document.getElementById("recipeList");
      const bflistItem = document.createElement("li");
      bflistItem.textContent = breakfastIngredient;
      bfulList.appendChild(bflistItem);

      const bfulStep =document.getElementById("recipeStep");
      const bflistStep = document.createElement("li");
      bflistStep.textContent = breakfastStep;
      bfulStep.appendChild(bflistStep);
    }
  });
}

function getLunchRecipe() {
  if(recipeData == null) { getRecipe();}
  
  recipeData.forEach(recipeItem => {
    console.log("lunchname "+lunchname);
    if (lunchname == recipeItem.title){
      lunchIngredient= recipeItem.ingredients;
      lunchStep  = recipeItem.steps;

      const lhulList =document.getElementById("recipeList");
      const lhlistItem = document.createElement("li");
      lhlistItem.textContent = lunchIngredient;
      lhulList.appendChild(lhlistItem);

      const lhulStep =document.getElementById("recipeStep");
      const lhlistStep = document.createElement("li");
      lhlistStep.textContent = lunchStep;
      lhulStep.appendChild(lhlistStep);
      return;
      }
  });

}

function getDinnerRecipe() {

}
/*
 recipeData.forEach(recipeItem => {
    console.log("breakfastname "+breakfastname);
    if (breakfastname == recipeItem.title){
      console.log("item name"+recipeItem.title);
      breakfastIngredient= recipeItem.ingredients;
      breakfastStep  = recipeItem.steps;

      const bfulList =document.getElementById("recipeList");
      const bflistItem = document.createElement("li");
      bflistItem.textContent = breakfastIngredient;
      bfulList.appendChild(bflistItem);

      const bfulStep =document.getElementById("recipeStep");
      const bflistStep = document.createElement("li");
      bflistStep.textContent = breakfastStep;
      bfulStep.appendChild(bflistStep);
      break;
    }else if (lunchname == recipeItem.title){
      lunchIngredient= recipeItem.ingredients;
      lunchStep  = recipeItem.steps;

      const lhulList =document.getElementById("recipeList");
      const lhlistItem = document.createElement("li");
      lhlistItem.textContent = lunchIngredient;
      lhulList.appendChild(lhlistItem);

      const lhulStep =document.getElementById("recipeStep");
      const lhlistStep = document.createElement("li");
      lhlistStep.textContent = lunchStep;
      lhulStep.appendChild(lhlistStep);
      return;
    }else if (dinnerName == recipeItem.title){
      dinnerIngredient= recipeItem.ingredients;
      dinnerStep  = recipeItem.steps;

      const dnulList =document.getElementById("recipeList");
      const dnlistItem = document.createElement("li");
      dnlistItem.textContent = dinnerIngredient;
      dnulList.appendChild(dnlistItem);

      const dnulStep =document.getElementById("recipeStep");
      const dnlistStep = document.createElement("li");
      dnlistStep.textContent = dinnerStep;
      dnulStep.appendChild(dnlistStep);
      return;
    }
    //console.log(data2);
 
})
}
*/
























/*fetch(mealApi)
  .then(response => response.json())
  .then(data => {

    const dataList = document.querySelector(".cardContent");
    data.filter((food)=>{
        const Fimg = document.querySelector(".bfImg");
        const Ftitle = document.querySelector(".bfTitle");
        const FCal = document.querySelector(".bfCalories");
        
        const imgUrl=food.breakfast.image;
        Fimg.src=imgUrl;
        dataList.appendChild(Fimg)
        const title=food.breakfast.title;
        Fimg.src=title;
        dataList.appendChild(title)
    })
    //data.forEach(food => {
      //const ListItem = document.createElement('li');
      //ListItem.textContent = `${food.breakfast}`;
     // console.log(ListItem); 
      // Corrected property access
      //dataList.appendChild(ListItem);

    //});
  })
  .catch(error => {
    console.log("error", error);
  });*/
  
  
  
  
  
  /*async function generateMealPlan(dailyCalories) {
    try {
      // Calculate daily calorie requirement here
      
      // Make a request to the Newton Food API
      const response = await fetch(mealApi);
      const data = await response.json();
      
      // Filter meals based on calorie categories
      const mealPlan = {
        breakfast: data.filter(meal => meal.bmr >= 500 && meal.bmr <= 1000),
        lunch: data.filter(meal => meal.bmr >= 1001 && meal.bmr <= 2000),
        dinner: data.filter(meal => meal.bmr >= 2001 && meal.bmr <= 3000),
      };
      
      // Populate the meal-plan section
      const mealPlanSection = document.getElementById('meal-plan');
      // Use DOM manipulation to display the meal plan
      
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  }


*/
