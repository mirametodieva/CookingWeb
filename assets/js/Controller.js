(function() {

    const allRecipesPage = document.getElementById("allRecipes");
    const homePage = document.getElementById("home");
    const favPage = document.getElementById("favPage");
    const favouriteRecepiesPage = document.getElementById("favouriteRecepies");
    const createRecipePage = document.getElementById("createRecipe");
    const myProfilePage = document.getElementById("myProfile");
    const errorPage = document.getElementById("errorPage");
    const myProfileTable = document.getElementById("myProfileTable");
    let user = addUserProfile();
    let recipes = loadRecipes();
    let createButton = document.getElementById("create");
    let ingredientsBox = document.getElementById("ingredients");
    let sortByBox = document.getElementById("sortBy");


    document.getElementById("submit").addEventListener("click", function(e) {
        e.preventDefault();
        user.removeUser();
        user = addUserProfile();
    })

    function loadRecipes() {
        if (user.getUser().recipes.length > 0)
            return user.recipes;
        else {
            let recipes = [];
            for (let i = 0; i < recepiesData.length; i++) {
                let rec = recepiesData[i];
                let newRec = new Recipe(
                    rec.id,
                    rec.title,
                    rec.href,
                    rec.ingredients,
                    rec.thumbnail,
                    1
                );
                addRecipes(recipes, newRec);
            }
            let user1 = user.getUser();
            user1.recipes = recipes;
            user.setUser(user1);
            return recipes;
        }
    }

    let hashChange = function() {
        let hash = location.hash.slice(1);

        switch (hash) {
            case "":
                homePage.style.display = "flex";
                favPage.style.display = "none";
                createRecipePage.style.display = "none";
                myProfilePage.style.display = "none";
                errorPage.style.display = "none";
                break;
            case "allRecipes":
                homePage.style.display = "flex";
                favPage.style.display = "none";
                createRecipePage.style.display = "none";
                myProfilePage.style.display = "none";
                errorPage.style.display = "none";
                printRecipes(allRecipesPage, user.recipes);
                break;
            case "favouriteRecepies":
                homePage.style.display = "none";
                favPage.style.display = "flex";
                createRecipePage.style.display = "none";
                myProfilePage.style.display = "none";
                errorPage.style.display = "none";
                printRecipes(favouriteRecepiesPage, user.favourite);
                break;
            case "createRecipe":
                homePage.style.display = "none";
                favPage.style.display = "none";
                createRecipePage.style.display = "flex";
                myProfilePage.style.display = "none";
                errorPage.style.display = "none";
                break;
            case "myProfile":
                homePage.style.display = "none";
                favPage.style.display = "none";
                createRecipePage.style.display = "none";
                myProfilePage.style.display = "flex";
                errorPage.style.display = "none";
                showCookedRecipe(user.cooked, myProfileTable);
                break;
            default:
                homePage.style.display = "none";
                favPage.style.display = "none";
                createRecipePage.style.display = "none";
                myProfilePage.style.display = "none";
                errorPage.style.display = "flex";
                break;
        }
    }

    window.addEventListener("load", hashChange);
    window.addEventListener("hashchange", hashChange);


    function addUserProfile() {
        let user1 = new User();
        let name = document.getElementById("name");
        let age = document.getElementById("age");
        let address = document.getElementById("address");
        let profileImg = document.getElementById("profileImg");
        let profilePicture = document.getElementById("profilePicture");
        let img = document.createElement("img");

        if (user1.getUser()) {
            let newUser = user1.getUser();
            user1 = new User(newUser.name, newUser.age, newUser.address, newUser.profilePicture,
                newUser.favourite, newUser.cooked, newUser.recipes);
            img.src = user1.profilePicture == "" ? img.src = "assets/woman.png" : user1.profilePicture;
        } else {
            user1 = new User(name.value, age.value, address.value, profileImg.value, [], [], []);
            img.src = profileImg.value == 0 ? img.src = "assets/woman.png" : profileImg.value;
            user1.setUser(user1);
            showCookedRecipe(user1.cooked, myProfileTable);
        }
        img.alt = "profile-img";
        profilePicture.innerHTML = "";
        profilePicture.appendChild(img);
        name.value = "";
        age.value = "";
        address.value = "";
        profileImg.value = "";

        return user1;
    }

    function addRecipes(recipes, recepie) {
        if (recepie instanceof Recipe) {
            if (recipes.indexOf(recepie) === -1) {
                recipes.push(recepie);
            }
        }
    }

    let template = document.getElementById("card-template").innerHTML;
    let card = Handlebars.compile(template);

    function printRecipes(container, allRecipes) {

        container.innerHTML = card({ allRecipes });

        let favButtons = document.getElementsByClassName("favButton");
        let cookButtons = document.getElementsByClassName("cookButton");

        for (let i = 0; i < favButtons.length; i++) {
            let favButton = favButtons[i];
            let recepie = allRecipes[i];
            favButton.addEventListener("click", function() {
                user.addFavourite(recepie);
                printRecipes(container, allRecipes);
            })
            let cookButton = cookButtons[i];
            cookButton.addEventListener("click", function() {
                user.cook(recepie);
            })
        }
    }

    let templateCooked = document.getElementById("cooked-template").innerHTML;
    let tableCooked = Handlebars.compile(templateCooked);

    function showCookedRecipe(cooked, table) {
        table.innerHTML = tableCooked({ cooked });
    }

    function createRecipe(recipes) {
        let title = document.getElementById("title");
        let ingredients = document.getElementById("ingredients");
        let href = document.getElementById("href");
        let thumbnail = document.getElementById("thumbnail");

        if (title.value.length > 0 && ingredients.value.length > 0 && href.value.length > 0 && thumbnail.value.length > 0) {
            let myRec = new Recipe(title.value, ingredients.value, href.value, thumbnail.value);
            recipes.unshift(myRec);
            title.value = "";
            ingredients.value = "";
            href.value = "";
            thumbnail.value = "";
        } else {
            alert("Please, fill all the boxes!");
        }
    }

    createButton.addEventListener("click", function(e) {
        e.preventDefault();
        createRecipe(recipes);
    });

    let searchBox = document.getElementById("search");
    searchBox.addEventListener("keyup", function(e) {
        let text = e.target.value;
        let filt = search(text, recipes);
        if (filt.length)
            printRecipes(allRecipesPage, filt);
    })

    function search(text, recipes) {
        if (typeof(text) === "string" && text.trim().length > 0) {
            let filtered = recipes.filter(e => e.title.toLowerCase().includes(text.toLowerCase()));
            return filtered;
        }
    }


    function fillIngredientsOptions(recipes) {
        const ingredients = new Set();
        let allingre = recipes.map(e => e.ingredients.trim().split(","));
        for (let i = 0; i < allingre.length; i++) {
            for (let j = 0; j < allingre[i].length; j++) {
                ingredients.add(allingre[i][j]);
            }
        }

        ingredients.forEach(i => {
            let option = document.createElement("option");
            option.innerText = i;
            ingredientsBox.appendChild(option);
        });
    }

    fillIngredientsOptions(recipes);
    ingredientsBox.addEventListener("change", function(e) {
        filterByIngredients(recipes, e.target.value);
    });

    function filterByIngredients(recipes, value) {
        let filteredByIngrediens = recipes.filter(e => e.ingredients.includes(value));
        printRecipes(allRecipesPage, filteredByIngrediens);
    }

    sortByBox.addEventListener("click", function() {
        recipes.sort((e1, e2) => e1.title.toLowerCase().localeCompare(e2.title.toLowerCase()))
        printRecipes(allRecipesPage, recipes);
    });

})();