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

    removeUser() {
        localStorage.removeItem("user");
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    addFavourite(recipe) {
        let idx = this.favourite.indexOf(recipe);
        if (idx === -1) {
            this.favourite.push(recipe);
            recipe.isFav = true;
        } else {
            this.favourite.splice(idx, 1);
            recipe.isFav = false;
        }
        let user = JSON.parse(localStorage.getItem("user"));
        user.favourite = this.favourite;
        localStorage.setItem("user", JSON.stringify(user));
    }

    cook(recipe) {
        let idx = this.cooked.indexOf(recipe);

        if (idx === -1) {
            this.cooked.push(recipe);
        } else {
            recipe.numberofCooked++;
        }

        let user = JSON.parse(localStorage.getItem("user"));
        user.cooked = this.cooked;
        localStorage.setItem("user", JSON.stringify(user));
    }
}