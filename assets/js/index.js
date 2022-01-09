(function() {

    const allRecipesPage = document.getElementById("allRecipes");
    const homePage = document.getElementById("home");
    const favPage = document.getElementById("favPage");
    const favouriteRecepiesPage = document.getElementById("favouriteRecepies");
    const createRecipePage = document.getElementById("createRecipe");
    const myProfilePage = document.getElementById("myProfile");
    const errorPage = document.getElementById("errorPage");
    const myProfileTable = document.getElementById("myProfileTable");
    const user = addUserProfile();
    let createButton = document.getElementById("create");

    let recipes = [];

    document.getElementById("submit").addEventListener("click", function(e) {
        e.preventDefault();
        addUserProfile();
    })
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
        let name = document.getElementById("name");
        let age = document.getElementById("age");
        let address = document.getElementById("address");
        let profileImg = document.getElementById("profileImg");
        if (profileImg.value == 0) {
            profileImg.value = "assets/woman.png";
        }
        let user = new User(name.value, age.value,
            address.value, profileImg.value);
        let profilePicture = document.getElementById("profilePicture");
        profilePicture.src = document.getElementById("profileImg").value;

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
            if (user.isFavourite(recipe)) {
                buttonAdd.innerHTML = "<img src=\"https://img.icons8.com/ios-filled/20/ff0000/like--v1.png\"/>Премахни от любими";
            } else {
                buttonAdd.innerHTML = "<img src=\"https://img.icons8.com/ios/20/000000/like--v1.png\"/> Добави в любими";
            }
            buttonAdd.addEventListener("click", function() {
                user.addFavourite(recipe);
                hashChange();
            })
            let buttonCook = document.createElement("button");
            buttonCook.innerHTML = "Сготви";
            buttonCook.addEventListener("click", function() {
                user.cook(recipe);
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
        printRecipes(filt, allRecipesPage);
    })

    function search(text, recipes) {
        if (typeof(text) === "string" && text.trim().length > 0) {
            let filtered = [];
            text = text.toLowerCase();
            for (let i = 0; i < recipes.length; i++) {
                let recipe = recipes[i];
                if (recipe.title.toLowerCase().includes(text)) {
                    filtered.push(recipe);
                }
            }
            return filtered;
        }

    }


})();