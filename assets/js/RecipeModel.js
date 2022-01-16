class Recipe {
    constructor(id, title, href, ingredients, thumbnail, numberofCooked, isFav = false) {
        this.id = id;
        this.title = title;
        this.href = href;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
        this.numberofCooked = numberofCooked;
        this.isFav = isFav;
    }

}