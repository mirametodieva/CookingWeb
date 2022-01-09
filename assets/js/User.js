class User {
    constructor(name, age, address, profilePicture) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.profilePicture = profilePicture;
        this.favourite = [];
        this.cooked = [];
    }


    addFavourite(recipe) {
        let idx = this.favourite.indexOf(recipe);
        if (idx === -1) {
            this.favourite.push(recipe);
        } else {
            this.favourite.splice(idx, 1);
        }
    }

    isFavourite(recipe) {
        let idx = this.favourite.indexOf(recipe);
        return idx === -1 ? false : true;
    }
    cook(recipe) {
        let idx = this.cooked.indexOf(recipe);
        if (idx === -1) {
            this.cooked.push(recipe);
        } else {
            recipe.numberofCooked++;
        }
    }
}