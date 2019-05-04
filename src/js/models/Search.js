import axios from 'axios';

export default class Search{

    constructor(query){
    this.query = query;
    }

    async getSearchResults(){
        try{
            const apikey = '2ec09e810b36264ea8925d913c1a2ac8';
            const res = await axios(`https://www.food2fork.com/api/search?key=${apikey}&q=${this.query}`);
            this.result = res.data.recipes;
        }catch (e) {
            alert(e);
        }

    }

}


// async function getRecipe(id){
//     try{
//         const apikey = '2ec09e810b36264ea8925d913c1a2ac8';
//         const recipe =await axios(`https://www.food2fork.com/api/get?key=${apikey}&rId=${id}`);
//         console.log(recipe);
//     }catch (e) {
//         alert(e)
//     }
// }
// getRecipe(16553);


