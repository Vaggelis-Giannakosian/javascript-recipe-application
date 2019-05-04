// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

/**Global state of the app
 * -Search Obj
 * - Current recipe Obj
 * - Shopping list obj
 * - Like recipes
 */
const state = {};

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
    //4) search for recipes
    await state.search.getSearchResults();
    //5 render the results on the UI
    searchView.renderResults(state.search.result);
};

elements.searchForm.addEventListener('submit', e => {
       e.preventDefault();
        controlSearch();
   });







