// Global app controller
import axios from 'axios';



async function getSearchResults(query){
    try{
        const apikey = '2ec09e810b36264ea8925d913c1a2ac8';
        const result =await axios(`https://www.food2fork.com/api/search?key=${apikey}&q=${query}`);
        const recipes = result.data.recipes;
        console.log(recipes);
    }catch (e) {
        alert(e);
    }
}


// getSearchResults('burger');


async function getRecipe(id){
    try{
        const apikey = '2ec09e810b36264ea8925d913c1a2ac8';
        const recipe =await axios(`https://www.food2fork.com/api/get?key=${apikey}&rId=${id}`);
        console.log(recipe);
    }catch (e) {
        alert(e)
    }
}

// getRecipe(16553);