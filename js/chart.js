import { getProducts, createTr } from "./functions.js";

const tbody = document.querySelector("tbody");
const chartCount = document.querySelector(".chartCount");
const totalCost = document.querySelector(".totalCost span");
const closeTable = document.querySelector(".closeTable");
const table = document.querySelector("table");



document.addEventListener("DOMContentLoaded", () => {
    let products = getProducts();
    // console.log(products);
    chartCount.style.cssText = "width: 25px; height: 25px;"
    chartCount.innerHTML = products.length;

    products.forEach(element => {
        // console.log(element);
        let tr = createTr(element);
        tbody.innerHTML += tr;
    });

    function totalCost1() {
        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            let count = products[i].count;
            let price = products[i].newPrice;
            totalPrice = totalPrice + ((count * 1) * (price * 1));
        }
        totalCost.innerHTML = `${totalPrice}₽`;
    }

    totalCost1();

    closeTable.addEventListener("click", () => {
        table.style.display = "none";
    })


    let deleteItem = document.querySelectorAll(".delete");
    deleteItem.forEach(item => {
        item.addEventListener("click", () => {
            let removeProduct = confirm("Haqiqatdan ham o'chirmoqchimisiz?");

            if (removeProduct) {
                let deleteId = item.parentElement.getAttribute("data-id")
                item.parentElement.remove();
                console.log(deleteId);
                products = products.filter(item => {
                    return item.id != deleteId
                })
                localStorage.setItem("products", products);
            }

            totalCost1();
        })
    })

    let minus=document.querySelector(".minus");
    let plus=document.querySelector('plus');

    minus && minus.addEventListener("click", ()=>{
        let count=document.querySelector(".count")
        count*=1
        count++;

    })


})