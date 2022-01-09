class Recipes {
    constructor() {
        this.recipes = [];
    }

    addRecipes(recepie) {
        if (recepie instanceof Recipe) {
            if (this.recipes.indexOf(recepie) === -1) {
                this.recipes.push(recepie);
            }
        }
    }

    createRecipe() {
        let title = document.getElementById("title");
        let ingredients = document.getElementById("ingredients");
        let href = document.getElementById("href");
        let thumbnail = document.getElementById("thumbnail");

        let myRec = new Recipe(title, ingredients, href, thumbnail);
        this.recipes.unshift(myRec);
    }
}