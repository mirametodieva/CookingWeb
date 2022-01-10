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
    console.log(user.recipes);
    let createButton = document.getElementById("create");
    let ingredientsBox = document.getElementById("ingredients");
    let sortByBox = document.getElementById("sortBy");


    document.getElementById("submit").addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("user");
        user = addUserProfile();
    })

    function loadRecipes() {
        if (JSON.parse(localStorage.getItem("user")).recipes.length > 0)
            return user.recipes;
        else {
            let recipes = [];
            for (let i = 0; i < recepiesData.length; i++) {
                let rec = recepiesData[i];
                let newRec = new Recipe(
                    rec.title,
                    rec.href,
                    rec.ingredients,
                    rec.thumbnail,
                    1
                );
                addRecipes(recipes, newRec);
            }
            let user = JSON.parse(localStorage.getItem("user"));
            user.recipes = recipes;
            localStorage.setItem("user", JSON.stringify(user));
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
                printRecipes(recipes, allRecipesPage);
                break;
            case "favouriteRecepies":
                homePage.style.display = "none";
                favPage.style.display = "flex";
                createRecipePage.style.display = "none";
                myProfilePage.style.display = "none";
                errorPage.style.display = "none";
                printRecipes(user.favourite, favouriteRecepiesPage);
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
                showCookedPecipe(user.cooked, myProfileTable);
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
        let user;
        let name = document.getElementById("name");
        let age = document.getElementById("age");
        let address = document.getElementById("address");
        let profileImg = document.getElementById("profileImg");
        let profilePicture = document.getElementById("profilePicture");
        let img = document.createElement("img");

        if (localStorage.getItem("user")) {

            let newUser = JSON.parse(localStorage.getItem("user"));
            user = new User(newUser.name, newUser.age, newUser.address, newUser.profilePicture,
                newUser.favourite, newUser.cooked, newUser.recipes);
            img.src = user.profilePicture == "" ? img.src = "assets/woman.png" : user.profilePicture;
        } else {
            user = new User(name.value, age.value, address.value, profileImg.value, [], [], []);
            img.src = profileImg.value == 0 ? img.src = "assets/woman.png" : profileImg.value;
            localStorage.setItem("user", JSON.stringify(user));
            showCookedPecipe(user.cooked, myProfileTable);
        }
        img.alt = "profile-img";
        profilePicture.innerHTML = "";
        profilePicture.appendChild(img);
        name.value = "";
        age.value = "";
        address.value = "";
        profileImg.value = "";

        return user;
    }

    function addRecipes(recipes, recepie) {
        if (recepie instanceof Recipe) {
            if (recipes.indexOf(recepie) === -1) {
                recipes.push(recepie);
            }
        }
    }

    function printRecipes(recipes, container) {
        container.innerHTML = "";
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];

            let div = document.createElement("div");
            div.classList.add("card");

            let a = document.createElement("a");
            a.href = recipe.href;
            a.target = "_blank";
            let img = document.createElement("img");
            img.src = recipe.thumbnail;
            img.alt = "Снимка"
            a.appendChild(img);

            let divContent = document.createElement("div");
            let h2 = document.createElement("h2");
            h2.innerHTML = recipe.title;
            let p = document.createElement("p");
            p.innerHTML = recipe.ingredients;

            let span = document.createElement("span");
            let buttonAdd = document.createElement("button");
            if (recipe.isFav) {
                buttonAdd.innerHTML = "<img src=\"https://img.icons8.com/ios-filled/20/ff0000/like--v1.png\"/>Премахни от любими";
            } else {
                buttonAdd.innerHTML = "<img src=\"https://img.icons8.com/ios/20/000000/like--v1.png\"/> Добави в любими";
            }
            buttonAdd.addEventListener("click", function() {
                user.addFavourite(recipe, user.favourite);
                hashChange();
            })
            let buttonCook = document.createElement("button");
            buttonCook.innerHTML = "Сготви";
            buttonCook.addEventListener("click", function() {
                user.cook(recipe, user.cooked);
                hashChange();
            })

            span.append(buttonAdd, buttonCook);

            divContent.append(h2, p, span);
            div.append(a, divContent);
            container.append(div);
        }
    }

    function showCookedPecipe(cooked, table) {
        table.innerHTML = "";
        for (let i = 0; i < cooked.length; i++) {
            let cook = cooked[i];
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let img = document.createElement("img");
            img.src = cook.thumbnail;
            img.alt = "picture";
            td1.appendChild(img);
            let td2 = document.createElement("td");
            td2.innerHTML = cook.numberofCooked;

            tr.append(td1, td2);
            table.appendChild(tr);
        }
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
            printRecipes(filt, allRecipesPage);
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
        printRecipes(filteredByIngrediens, allRecipesPage);
    }

    sortByBox.addEventListener("click", function(e) {
        recipes.sort((e1, e2) => e1.title.toLowerCase().localeCompare(e2.title.toLowerCase()))
        printRecipes(recipes, allRecipesPage);
    });

})();