// SEARCH BAR ENTER BUTTON //
const searchForm = document.getElementById("search-form");

function performSearch(event) {
  event.preventDefault();
  const searchTerm = document.getElementById("search-input").value.trim();
  console.log("Searching for:", searchTerm);
}

searchForm.addEventListener("submit", performSearch);

// CLEAR SEARCH BAR ON REFRESH //
const searchInput = document.getElementById("search-input");

window.addEventListener("load", function () {
  searchInput.value = "";
});

// API //
window.addEventListener("load", function () {
  const searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", searchApi);
});

function searchApi() {
  const searchInput = document.querySelector("#search-input").value;
  console.log(searchInput);

  // api link is www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
  const apiLink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;

  console.log(apiLink);
  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const drinks = data.drinks;
      console.log(drinks);
      const outputDiv = document.querySelector("#output");
      while (outputDiv.firstChild) {
        outputDiv.removeChild(outputDiv.firstChild);
      }

      drinks.forEach(function (drink) {
        const drinkName = drink.strDrink;
        const drinkImage = drink.strDrinkThumb;
        const drinkId = drink.idDrink;
        const drinkInstructions = drink.strInstructions;
        const drinkIngredients = [];

        console.log(drink);

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