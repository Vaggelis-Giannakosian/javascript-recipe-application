// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List.js';
import Like from './models/Like.js';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView.js';
import * as listView from './views/listView.js';

import {elements,renderLoader,removeLoader,elementStrings} from './views/base';

/**Global state of the app
 * -Search Obj
 * - Current recipe Obj
 * - Shopping list obj
 * - Like recipes
 */
const state = {};

//search controller
const controlSearch = async () => {
    //1) get query from the view
    const query = searchView.getInput();
    //2)
    if(query){
        state.search = new Search(query);
    }
    //3) prepare the view for the results
    searchView.clearInput();
    searchView.clearSearchList();
    renderLoader(elements.searchResults);
    //4) search for recipes
    try{
        await state.search.getSearchResults();
        //5 render the results on the UI
        removeLoader();
        searchView.renderResults(state.search.result);
    }catch (e) {
        removeLoader();
        console.log(e);
    }
};

elements.searchForm.addEventListener('submit', e => {
       e.preventDefault();
        controlSearch();
   });

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest(`.btn-inline`);
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearSearchList();
        searchView.renderResults(state.search.result,goToPage);
    }
});


//RECIPE CONTROLLER
const controlRecipe = async () => {
    //get the Id from the url
   const recipeId = window.location.hash.replace('#','');
   //prepare the ui for changes
    recipeView.clearRecipePage();
   if(recipeId){
       renderLoader(elements.recipePage);

       //highlight selected
       if(state.search)searchView.highlightSelected(recipeId);

       //create new recipe obj
       state.recipe = new Recipe(recipeId);
       try{
           //get recipe data and parse ingredients
           await state.recipe.getRecipe();
           state.recipe.parseIngredients();
           // calculate servings and time
           state.recipe.calcServings();
           state.recipe.calcTime();
           //render the recipe
           removeLoader();
           recipeView.renderRecipe(state.recipe);
       }catch (e) {
           removeLoader();
           console.log(e);
       }
   }



};

//RECIPE CONTROLLER
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

//handling recipe  clicks
elements.recipePage.addEventListener('click',e => {
    let type;
    if(e.target.matches('.btn-decrease,.btn-decrease *')){
        //decrease button is clicked
        if(state.recipe.servings>1){
            state.recipe.updateServings('dec');
            recipeView.updateIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-increase,.btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateIngredients(state.recipe);
    }else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *')){
        controlList();
    }else if(e.target.matches('.recipe__love , .recipe__love *')){
        controlLike();
    }

});

//Shopping List Controller

const controlList = () => {
    //create new list if there is none yet
    if(!state.list)state.list = new List();

    //add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el=> {
       const item = state.list.addNewItem(el.count,el.unit,el.ingredient);
        listView.renderItem(item);
    });
 };

//Handle delete and update list item events
elements.shoppingList.addEventListener('click',e=>{
    const id =  e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete,.shopping__delete *')) {
        //delete item from list
        state.list.deleteItem(id);
        //update the UI
        listView.deleteItem(id);
        //handle the count update
    }else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }
});

//Like Controller
const controlLike = () => {
   if(!state.likes) state.likes = new Like();
   const currentId = state.recipe.id;
   //not liked recipe
   if(!state.likes.isLiked(currentId)){
       //add like to state obj
       const like = state.likes.addItem(state.recipe.id, state.recipe.title, state.recipe.author, state.recipe.img);
       //toggle like button

       //add like to UI list
       console.log(state.likes);
       //liked recipe
   }else {
       //remove like from state obj

       //toggle like button

       //remove like from UI list
       state.likes.deleteItem(currentId);
       console.log(state.likes);
   }

};