export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipePage: document.querySelector('.recipe'),
    recipeIngredients: document.querySelector('.recipe__ingredients'),
    addToListButton: document.querySelector('.recipe__btn'),
    shoppingList: document.querySelector('.shopping__list'),
};

export const elementStrings = {
    loader: 'loader',
};

export const renderLoader = parent => {
    const loader = `
            <div class="${elementStrings.loader}">
                <svg>
                    <use href="img/icons.svg#icon-cw"></use>
                </svg>
            </div>
    `;
        parent.insertAdjacentHTML('afterbegin',loader);
};

export const removeLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
        if(loader) loader.parentElement.removeChild(loader);
};