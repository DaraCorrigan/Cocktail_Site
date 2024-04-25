// SEARCH BAR ENTER BUTTON //
const searchForm = document.getElementById("search-form");

function performSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search-input").value.trim();
    console.log("Searching for:", searchTerm);
}

searchForm.addEventListener("submit", performSearch);

// CLEAR SEARCH BAR ON REFRESH
            const searchInput = document.getElementById("search-input");
            
            window.addEventListener("load", function() {
                searchInput.value = "";
            });

// API //
window.addEventListener("load", function () {
  var searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", searchApi);
});

function searchApi() {
  var searchInput = document.querySelector("#search-input").value;
  console.log(searchInput);

  // api link is www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
  var apiLink =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchInput; 
    
  console.log(apiLink);
  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var drinks = data.drinks;
      console.log(drinks);
      var outputDiv = document.querySelector("#output");
      while (outputDiv.firstChild) {
        outputDiv.removeChild(outputDiv.firstChild);
      }
      for (var i = 0; i < drinks.length; i++) {
        var drink = drinks[i];
        var drinkName = drink.strDrink;
        var drinkImage = drink.strDrinkThumb;
        var drinkId = drink.idDrink;
        var drinkInstructions = drink.strInstructions;
        var drinkIngredients = [];

        // get the ingredients and measurements and concatenate them
        for (var j = 1; j <= 15; j++) {
          var ingredient = drink["strIngredient" + j];
          var measure = drink["strMeasure" + j];
          if (ingredient) {
            drinkIngredients.push(measure + " " + ingredient);
          }
        }
        var drinkDiv = document.createElement("div");
        var drinkNameElement = document.createElement("h2");
        drinkNameElement.textContent = drinkName;
        var drinkImageElement = document.createElement("img");
        drinkImageElement.src = drinkImage;
        drinkImageElement.alt = drinkName;
        var drinkInstructionsElement = document.createElement("p");
        drinkInstructionsElement.textContent = drinkInstructions;
        drinkDiv.appendChild(drinkNameElement);
        drinkDiv.appendChild(drinkImageElement);
        drinkIngredients.forEach(function (ingredient) {
          var drinkIngredientElement = document.createElement("p");
          drinkIngredientElement.textContent = ingredient;
          drinkDiv.appendChild(drinkIngredientElement);
          drinkNameElement.classList.add("drinkName");
          drinkIngredientElement.classList.add("drinkIngredients");
          drinkInstructionsElement.classList.add("drinkInstructions");
          drinkDiv.classList.add("drinkDiv");

        });
        drinkDiv.appendChild(drinkInstructionsElement);
        outputDiv.appendChild(drinkDiv);
      }
    });
}
