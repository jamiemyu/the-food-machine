const API_KEY = '5b5db650cd471fa8a983a16c32b6ebb9';

/**
 * Find a random recipe given the user's input choices.
 */
function findRecipe() {
    let recipeParameters = generateIngredients();
    
    // Call helper function to construct API call.
    $.ajax({
      url: "/recipe-id",
      data: { q: recipeParameters },
      type: "get", //send it through get method
      success: function(response) {
        const randInt = Math.floor(Math.random() * response.recipes.length) + 1;
        let recipe = response.recipes[randInt];
        console.log(recipe);
        const rId = recipe.recipe_id;
  
        // Use selected recipe to make second AJAX request for the recipe.
        $.ajax({
            url: "/recipe-details",
            data: { rId: rId },
            type: "get",
            success: function(response) { 
                console.log(response);
                displayRecipeResults(response);
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
      },
      error: function(xhr) {
        console.log(xhr); 
      }
    }); 
    // Retrieve 1 random recipe and parse result object for ingredient list and recipe instructions
}

/**
 * Generate a list of ingredients from input forms.
 */
function generateIngredients() {
    let meat = (Array.from(document.getElementsByName("meatList")).find(r => r.checked).value);
    let vegetable = (Array.from(document.getElementsByName("vegetableList")).find(r => r.checked).value);
    return meat + ',' + vegetable;
}

function displayRecipeResults(response) {
    let recipeTitle = response.recipe.title;
    let ingredientsList = response.recipe.ingredients;
    let imgUrl = response.recipe.image_url;
    let recipeLink = response.recipe.source_url;
    
    // Find search container and hide it.
    let searchDiv = document.getElementById('search');
    searchDiv.style.display = "none";

    // Find results container and display it.
    let resultsDiv = document.getElementById('results');
    resultsDiv.style.display = "block";

    // Find div containers to append ingredients, image, and recipe link.
    let titleDiv = document.getElementById('recipe-title');
    let ingredientsDiv = document.getElementById('ingredients-list');
    let imageDiv = document.getElementById('recipe-img');
    let recipeLinkDiv = document.getElementById('recipe-link');
    
    // Empty divs before appending.
    titleDiv.innerHTML = "";
    ingredientsDiv.innerHTML = ""; 
    imageDiv.innerHTML = ""; 
    recipeLinkDiv.innerHTML = "";
    
    // Append ingredient list, recipe image, and link to full recipe.
    titleDiv.innerHTML += '<h3>' + recipeTitle + '</h3>';
    ingredientsList.forEach(ingredient => {
        ingredientsDiv.innerHTML += ingredient + '<br />';
    });
    imageDiv.innerHTML += '<img src=' + imgUrl + ">";
    recipeLinkDiv.innerHTML += '<a href="' + recipeLink + '" target="_blank">Full Recipe</a>';
}
