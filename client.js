const API_KEY = '5b5db650cd471fa8a983a16c32b6ebb9';

/**
 * Find a random recipe given the user's input choices.
 */
function findRecipe() {
    let recipeParameters = generateIngredients();
    console.log(recipeParameters);
    
    // Call helper function to construct API call.
    $.ajax({
      url: "/foo",
      data: {
        q: recipeParameters
      },
      type: "get", //send it through get method
      success: function(response) {
        console.log("Success"); 
        console.log(response); 
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
