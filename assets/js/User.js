class User {
    constructor(name, age, address, profilePicture, favourite, cooked, recipes) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.profilePicture = profilePicture;
        this.favourite = favourite;
        this.cooked = cooked;
        this.recipes = recipes;
    }


    addFavourite(recipe, favourite) {
        let idx = favourite.indexOf(recipe);
        if (idx === -1) {
            favourite.push(recipe);
            recipe.isFav = true;
        } else {
            favourite.splice(idx, 1);
            recipe.isFav = false;
        }
        let user = JSON.parse(localStorage.getItem("user"));
        user.favourite = favourite;
        localStorage.setItem("user", JSON.stringify(user));
    }

    isFavourite(recipe, favourite) {
        let idx = favourite.indexOf(recipe);
        return idx != -1;
    }

    cook(recipe, cooked) {
        let idx = cooked.indexOf(recipe);
        if (idx === -1) {
            cooked.push(recipe);
        } else {
            recipe.numberofCooked++;
        }
        let user = JSON.parse(localStorage.getItem("user"));
        user.cooked = cooked;
        localStorage.setItem("user", JSON.stringify(user));
    }
}