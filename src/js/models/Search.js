import axios from 'axios';
import {apikey} from '../config.js';
export default class Search{

    constructor(query){
    this.query = query;
    }

    async getSearchResults(){
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${apikey}&q=${this.query}`);
            this.result = res.data.recipes;
        }catch (e) {
            alert(e);
        }

    }

}





