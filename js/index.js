import { getData, createCard, removeCard, selectProduct, getProducts } from "./functions.js";

const loaderDiv = document.querySelector(".loaderDiv");
const cards = document.querySelector(".contentCards .cards");
const category = document.querySelector("#category");
const chartCount=document.querySelector(".chartCount");



document.addEventListener("DOMContentLoaded", () => {
    getData(`https://cars-pagination.onrender.com/products`)
        .then(data => {
            if (data.length > 0) {
                loaderDiv.style.display = "none";
            }
            for (let i = 0; i < 12; i++) {
                let card = createCard(data[i]);
                cards.innerHTML += card
            }

            let products=getProducts();
            chartCount.style.cssText="width: 25px; height: 25px;"
            chartCount.innerHTML=products.length;


            

            category.addEventListener("change", (e) => {
                let categoryValue = e.target.value;
                console.log(categoryValue);
                if (categoryValue == 'популярен') {
                    removeCard();
                    for (let i = 0; i < 12; i++) {
                        let card = createCard(data[i]);
                        cards.innerHTML += card
                    }
                    return;
                }

                removeCard();

                function createCardForCategory() {
                    let selectCategoryData = data.filter(item => {
                        return item.category == categoryValue;
                    })
                    for (let i = 0; i < 12; i++) {
                        let card = createCard(selectCategoryData[i]);
                        cards.innerHTML += card
                    }
                    return;
                };

                createCardForCategory();

                selectProduct();
            })

            const beginPrice = document.querySelector("#beginPrice");
            const maxPrice = document.querySelector("#maxPrice")
            maxPrice.addEventListener("input", (e) => {
                let endPrice = e.target.value;
                let startPrice = beginPrice.value;
                if (startPrice == 0 || endPrice == 0 || startPrice == '' || startPrice == undefined || endPrice == "" || endPrice == undefined) {
                    removeCard();
                    for (let i = 0; i < 12; i++) {
                        let card = createCard(data[i]);
                        cards.innerHTML += card;
                    }
                    return;
                }

                let selectPriceData = data.filter(item => {
                    return item.newPrice >= startPrice && item.newPrice <= endPrice
                })
                removeCard();

                for (let i = 0; i < selectPriceData.length; i++) {
                    let card = createCard(selectPriceData[i]);
                    cards.innerHTML += card;
                }
                selectProduct();

            })

            selectProduct();


        })
        .catch(err => {
            console.log(err);
        })
})