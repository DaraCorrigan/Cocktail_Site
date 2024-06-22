// SEARCH BAR ENTER BUTTON //
const searchForm = document.querySelector("#search-form");

function performSearch(event) {
  event.preventDefault();
  const searchTerm = document.querySelector("#search-input").value.trim();
  console.log("Searching for:", searchTerm);
}

searchForm.addEventListener("submit", performSearch);

// ON LOAD
window.addEventListener("load", function () {
  // Clear search bar on refresh
  document.querySelector("#search-input").value = "";
  // Text search
  document.querySelector("#search-button").addEventListener("click", searchApi);
  // Random search
  document.querySelector("#random-button").addEventListener("click", randomApi);
});

/**
 * Search the API for a cocktail using the search input
 */
function searchApi() {
  const searchInput = document.querySelector("#search-input").value;
  console.log(searchInput);

  // api link is www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
  const apiLink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;

  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const drinks = data.drinks;
      const drinkCounter = drinks.length;
      const outputDiv = document.querySelector("#output");

      clearOutputDiv();

      drinks.forEach(function (drink) {
        const drinkName = drink.strDrink;
        const drinkImage = drink.strDrinkThumb;
        const drinkId = drink.idDrink;
        const drinkInstructions = drink.strInstructions;
        const drinkIngredients = [];

        // get the ingredients and measurements and concatenate them
        for (let j = 1; j <= 15; j++) {
          const ingredient = drink["strIngredient" + j];
          const measure = drink["strMeasure" + j];
          if (ingredient) {
            drinkIngredients.push(`${measure} ${ingredient}`);
          }
        }

        const drinkDiv = document.createElement("div");
        const drinkNameElement = document.createElement("h2");
        drinkNameElement.textContent = drinkName;
        const drinkImageElement = document.createElement("img");
        drinkImageElement.src = drinkImage;
        drinkImageElement.alt = drinkName;
        const drinkInstructionsElement = document.createElement("p");
        drinkInstructionsElement.textContent = drinkInstructions;
        drinkDiv.appendChild(drinkNameElement);
        drinkDiv.appendChild(drinkImageElement);
        drinkIngredients.forEach(function (ingredient) {
          const drinkIngredientElement = document.createElement("p");
          drinkIngredientElement.textContent = ingredient;
          drinkDiv.appendChild(drinkIngredientElement);
          drinkNameElement.classList.add("drinkName");
          drinkIngredientElement.classList.add("drinkIngredients");
          drinkInstructionsElement.classList.add("drinkInstructions");
          drinkDiv.classList.add("drinkDiv");
        });
        drinkDiv.appendChild(drinkInstructionsElement);
        outputDiv.appendChild(drinkDiv);
      });
    });
}

/**
 * Get a random cocktail from the API
 */
function randomApi() {
  const apiLink = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const drinks = data.drinks;
      const outputDiv = document.querySelector("#output");

      clearOutputDiv();

      drinks.forEach(function (drink) {
        const drinkName = drink.strDrink;
        const drinkImage = drink.strDrinkThumb;
        const drinkId = drink.idDrink;
        const drinkInstructions = drink.strInstructions;
        const drinkIngredients = [];

        // get the ingredients and measurements and concatenate them
        for (let j = 1; j <= 15; j++) {
          const ingredient = drink["strIngredient" + j];
          const measure = drink["strMeasure" + j];
          if (ingredient) {
            drinkIngredients.push(`${measure} ${ingredient}`);
          }
        }

        const drinkDiv = document.createElement("div");
        const drinkNameElement = document.createElement("h2");
        drinkNameElement.textContent = drinkName;
        const drinkImageElement = document.createElement("img");
        drinkImageElement.src = drinkImage;
        drinkImageElement.alt = drinkName;
        const drinkInstructionsElement = document.createElement("p");
        drinkInstructionsElement.textContent = drinkInstructions;
        drinkDiv.appendChild(drinkNameElement);
        drinkDiv.appendChild(drinkImageElement);
        drinkIngredients.forEach(function (ingredient) {
          const drinkIngredientElement = document.createElement("p");
          drinkIngredientElement.textContent = ingredient;
          drinkDiv.appendChild(drinkIngredientElement);
          drinkNameElement.classList.add("drinkName");
          drinkIngredientElement.classList.add("drinkIngredients");
          drinkInstructionsElement.classList.add("drinkInstructions");
          drinkDiv.classList.add("drinkDiv");
        });
        drinkDiv.appendChild(drinkInstructionsElement);
        outputDiv.appendChild(drinkDiv);
      });
    });
}

/**
 * Clear the output div
 */
function clearOutputDiv() {
  document.querySelector("#output").querySelectorAll("*").forEach(n => n.remove());
}