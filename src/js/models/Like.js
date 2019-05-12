export default class Like {

    constructor(){
        this.liked = [];
    }

    addItem(id,title,author,img){
        const like = { id, title, author, img };
        this.liked.push(like);
        return like;
    }

    deleteItem(id){
        const index = this.liked.findIndex(el=>el.id===id);
        this.liked.splice(index,1);
    }

    isLiked(id){
        return this.liked.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.liked.length;
    }
}