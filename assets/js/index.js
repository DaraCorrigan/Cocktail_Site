// ON LOAD
window.addEventListener("load", function () {
   // Clear search bar on refresh
   document.querySelector("#search-input").value = "";
   // Text search
   document.querySelector("#search-button").addEventListener("click", searchApi);
   document.querySelector("#search-form").addEventListener("submit", (evt) => evt.preventDefault());
   // Random search
   document.querySelector("#random-button").addEventListener("click", randomApi);
});

/**
 * Search the API for a cocktail using the search input
 */
function searchApi() {
   clearOutputDiv();

   document.querySelector('#results-counter').classList.remove('hide');

   // api link is www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${document.querySelector("#search-input").value.trim()}`)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("No drinks found");
         }
      })
      .then(function (data) {
         const drinks = data.drinks;

         if (!drinks) {
            document.querySelector('#results-counter-number').textContent = '0';
         } else {
            document.querySelector('#results-counter-number').textContent = drinks.length;
            outputDataToDiv(drinks);
         }
      }).catch(error, () => {
         throw new Error(error);
      });
}

/**
 * Get a random cocktail from the API
 */
function randomApi() {
   clearOutputDiv();

   const counter = document.querySelector('#results-counter');
   if (!counter.classList.contains('hide')) {
      counter.classList.add('hide');
      document.querySelector('#results-counter-number').textContent = '0';
   }

   fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("No drinks found");
         }
      })
      .then(function (data) {
         outputDataToDiv(data.drinks);
      }).catch(error, () => {
         throw new Error(error);
      });
}

/**
 * Clear the output div
 */
function clearOutputDiv() {
   document.querySelector("#output").querySelectorAll("*").forEach(n => n.remove());
}

/**
 * Takes the data from the API and outputs it to the div
 * @param {Array} data The drinks array data from the API
 */
function outputDataToDiv(data) {
   const outputDiv = document.querySelector("#output");

   data.forEach(function (drink) {
      const drinkName = drink.strDrink;
      const drinkImage = drink.strDrinkThumb;
      // const drinkId = drink.idDrink;
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
      drinkDiv.classList.add("drinkDiv");

      const drinkNameElement = document.createElement("h2");
      drinkNameElement.textContent = drinkName;
      drinkNameElement.classList.add("drinkName");
      drinkDiv.appendChild(drinkNameElement);

      const drinkImageElement = document.createElement("img");
      drinkImageElement.src = drinkImage;
      drinkImageElement.alt = drinkName;
      drinkDiv.appendChild(drinkImageElement);

      const drinkIngredientsDiv = document.createElement("div");
      const drinkIngredientsHeader = document.createElement("h3");
      drinkIngredientsHeader.textContent = "Ingredients";
      drinkIngredientsHeader.classList.add("drinkIngredientsHeader");
      drinkIngredientsDiv.appendChild(drinkIngredientsHeader);

      drinkIngredients.forEach(function (ingredient) {
         const drinkIngredientElement = document.createElement("p");
         drinkIngredientElement.textContent = ingredient;
         drinkIngredientElement.classList.add("drinkIngredients");
         drinkIngredientsDiv.appendChild(drinkIngredientElement);
      });

      drinkDiv.appendChild(drinkIngredientsDiv);

      const drinkInstructionsDiv = document.createElement("div");
      const drinkInstructionsHeader = document.createElement("h3");
      drinkInstructionsHeader.textContent = "Instructions";
      drinkInstructionsHeader.classList.add("drinkInstructionsHeader");
      drinkInstructionsDiv.appendChild(drinkInstructionsHeader);

      const drinkInstructionsElement = document.createElement("p");
      drinkInstructionsElement.classList.add("drinkInstructions");
      drinkInstructionsElement.textContent = drinkInstructions;
      drinkInstructionsDiv.appendChild(drinkInstructionsElement);

      drinkDiv.appendChild(drinkInstructionsDiv);
      outputDiv.appendChild(drinkDiv);
   });
}