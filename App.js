
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
    lunchname = lunch["title"];
    lunchphoto = lunch["image"];
}

function processBreakfast() {

}

function processDinner() {

}

//fetch(mealApi)
//.then(response=> response.json())
//.then(data=> console.log(data))


//fetch(recipeApi)
//.then(response2=> response2.json())
//.then(data2=> console.log(data2))
























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


