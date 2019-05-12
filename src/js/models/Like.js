export default class Like {

    constructor(){
        this.liked = [];
    }

    addItem(id,title,author,img){
        const like = { id, title, author, img };
        this.liked.push(like);

        //persist data in local storage
        this.persistData();
        return like;
    }

    deleteItem(id){
        const index = this.liked.findIndex(el=>el.id===id);
        this.liked.splice(index,1);
        //persist data in local storage
        this.persistData();
    }

    isLiked(id){
        return this.liked.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.liked.length;
    }

    persistData(){
        localStorage.setItem('likes',JSON.stringify(this.liked));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));

        //restore likes from the local storage
        if(storage) this.liked = storage;
    }
}