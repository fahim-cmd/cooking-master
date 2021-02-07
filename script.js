document.getElementById("searchBtn").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;
    const inputValue = parseInt(searchInput);
    document.getElementById("searchInput").value = "";
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
        .then(res => res.json())
        .then(data => searchMeals(data.meals))
        .catch(err =>{
            document.getElementById("meals").innerHTML = `
                <p id="errorId" class="error"> 404. ${err.message}</p>                                            
            `; 
            document.getElementById("mealInfo").style.display = "none";        
        })
})

const searchMeals = meals => {    
    const mealsDiv = document.getElementById("meals");
    meals.forEach(meal => {
        
        const mealList = document.createElement('div');
        mealList.className = "mealsStyle"
        const mealInfo = ` 
            <div onClick="showMealDetails('${meal.strMeal}')" class="mealStyle">
                <div class="card" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>           
                    </div>
                </div>
            </div>        
       `;
        mealList.innerHTML = mealInfo;
        mealsDiv.appendChild(mealList)   

        document.getElementById("errorId").innerHTML = "";
        document.getElementById("mealInfo").style.display = "block"
    });
}
const showMealDetails = mealName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    fetch(url)
    .then(res => res.json())
    .then(data => mealInformation(data.meals[0]))   
}

const mealInformation = info => {
    const mealInfo = document.getElementById("mealInfo");
    mealInfo.innerHTML = `
        <div class="mealInfoShow">
            <img class="img-fluid w-100" src="${info.strMealThumb}"/>
            <h3>${info.strMeal}</h3>
            <h6>Ingredients</h6>
                <div>
                   <input type="checkbox" checked> ${info.strIngredient1} <br/>
                   <input type="checkbox" checked> ${info.strMeasure1} ${info.strIngredient2} <br/>
                   <input type="checkbox" checked> ${info.strMeasure1} ${info.strIngredient3} <br/>
                   <input type="checkbox" checked> ${info.strMeasure1} ${info.strIngredient4} <br/>
                   <input type="checkbox" checked> ${info.strMeasure1} ${info.strIngredient5} <br/> 
                   <input type="checkbox" checked> ${info.strMeasure1} ${info.strIngredient6} 
                </div>            
        </div>
    `;
}