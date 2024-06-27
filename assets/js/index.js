/**
 * Contains settings for the search that the user can change e.g. language, filters etc.
 */
class SearchSettings {
   constructor() {
      this.language = null;
   }
}
const searchSettings = new SearchSettings();

// ON LOAD
window.addEventListener("load", function () {
   // Clear search bar on refresh
   document.querySelector("#search-input").value = "";
   // Text search
   document.querySelector("#search-button").addEventListener("click", searchApi);
   document.querySelector("#search-form").addEventListener("submit", (evt) => evt.preventDefault());
   // Random search
   document.querySelector("#random-button").addEventListener("click", randomApi);
   // Get language of the browser and set it as the search language if it is supported
   switch (navigator.language.toUpperCase()) {
      case ('EN'):
         searchSettings.language = 'EN';
         break;
      case ('ES'):
         searchSettings.language = 'ES';
         break;
      case ('FR'):
         searchSettings.language = 'FR';
         break;
      case ('DE'):
         searchSettings.language = 'DE';
         break;
      default:
         searchSettings.language = 'EN';
         break;
   }
});

/**
 * Search the API for a cocktail using the search input
 */
function searchApi() {
   showLoadingIcon();
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
         if (!data.drinks) {
            document.querySelector('#results-counter-number').textContent = '0';
         } else {
            const drinks = data.drinks;
            document.querySelector('#results-counter-number').textContent = drinks.length;
            outputDataToDiv(drinks);
         }
         hideLoadingIcon();
      }).catch(function (error) {
         throw new Error(error);
      });
}

/**
 * Get a random cocktail from the API
 */
function randomApi() {
   showLoadingIcon();
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
         hideLoadingIcon();
      }).catch(function (error) {
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
 * Shows the loading icon and hides the output div
 */
function showLoadingIcon() {
   document.querySelector('#loading-icon').classList.remove('hide');
   document.querySelector('#output').classList.add('hide');
}

/**
 * Hides the loading icon and shows the output div
 */
function hideLoadingIcon() {
   document.querySelector('#loading-icon').classList.add('hide');
   document.querySelector('#output').classList.remove('hide');
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
      let drinkInstructions = searchSettings.language == "EN" ? drink.strInstructions : drink["strInstructions" + searchSettings.language];
      if (!drinkInstructions) {
         drinkInstructions = "No instructions found";
      }
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
      drinkIngredientsDiv.classList.add("drinkSectionDiv");
      const drinkIngredientsHeader = document.createElement("h3");
      drinkIngredientsHeader.textContent = "Ingredients:";
      drinkIngredientsDiv.appendChild(drinkIngredientsHeader);

      const drinkIngredientsList = document.createElement("ul");
      drinkIngredients.forEach(function (ingredient) {
         const drinkIngredientElement = document.createElement("li");
         drinkIngredientElement.textContent = ingredient;
         drinkIngredientsList.appendChild(drinkIngredientElement);
      });
      drinkIngredientsDiv.appendChild(drinkIngredientsList);

      drinkDiv.appendChild(drinkIngredientsDiv);

      const drinkGlassDiv = document.createElement("div");
      drinkGlassDiv.classList.add("drinkSectionDiv");
      const drinkGlassHeader = document.createElement("h3");
      drinkGlassHeader.textContent = "Glass Type:";
      drinkGlassDiv.appendChild(drinkGlassHeader);

      const drinkGlassElement = document.createElement("p");
      drinkGlassElement.textContent = drink["strGlass"];
      drinkGlassDiv.appendChild(drinkGlassElement);

      drinkDiv.appendChild(drinkGlassDiv);

      const drinkInstructionsDiv = document.createElement("div");
      drinkInstructionsDiv.classList.add("drinkSectionDiv");
      const drinkInstructionsHeader = document.createElement("h3");
      drinkInstructionsHeader.textContent = "Instructions:";
      drinkInstructionsDiv.appendChild(drinkInstructionsHeader);

      const drinkInstructionsElement = document.createElement("p");
      drinkInstructionsElement.textContent = drinkInstructions;
      drinkInstructionsDiv.appendChild(drinkInstructionsElement);

      drinkDiv.appendChild(drinkInstructionsDiv);
      outputDiv.appendChild(drinkDiv);
   });
}