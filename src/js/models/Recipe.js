import axios from 'axios';
import {apikey} from '../config.js';
export default class Recipe{

    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${apikey}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch (e) {
            console.log(e)
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods *15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients () {
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units = [...unitsShort , 'kg','g'];
        const newIngredients = this.ingredients.map(cur => {
            //1 uniform units
            let ingredient = cur.toLowerCase();
            unitsLong.forEach((unit,i)=>{
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });
            //2 remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            //3 parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => units.includes(el));
            let objIngredient;
            if(unitIndex > -1){
                //there is a unit
                // 4 1/2 cups, arrCount is [4,1/2]
                const arrCount = arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length === 1 ){
                    count = eval(arrIng[0].replace('-','+'));
                }else {
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIngredient = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                };

            }else if(parseInt(arrIng[0],10)){
                //there is no unit but the 1st element is a number
                objIngredient = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            }else if(unitIndex === -1){
                //there is no unit and no number in 1st position
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            return objIngredient;
        });
        this.ingredients = newIngredients;
    }

    updateServings (type) {
        //update servings
     const newServings = type === 'dec' ? this.servings -1 : this.servings+1;

        //update ingredients
        this.ingredients.forEach(current => {
            current.count *= ( newServings / this.servings );
        });

        this.servings =  newServings;
    }

}
