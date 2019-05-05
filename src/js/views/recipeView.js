import {elements} from "./base";

export const clearRecipePage = () => {elements.recipePage.innerHTML='';};

export const renderRecipe = recipe => {
    console.log(recipe);
    const markup = ``;



    elements.recipePage.insertAdjacentHTML('afterbegin',markup);
};