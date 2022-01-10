class Recipe {
    constructor(title, href, ingredients, thumbnail, numberofCooked, isFav = false) {
        this.title = title;
        this.href = href;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
        this.numberofCooked = numberofCooked;
        this.isFav = isFav;
    }

}