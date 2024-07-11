import { getData, createDetailes, getProducts, showToast } from "./functions.js";

const loaderDiv = document.querySelector(".loaderDiv");
const aboutProduct = document.querySelector(".aboutProduct");
const chartCount = document.querySelector(".chartCount");

const chartLink = document.querySelector(".chartLink");
chartLink.addEventListener("click", () => {
    window.location.assign(`https://5-oy-imtihon-five.vercel.app/pages/chart.html`);
})

document.addEventListener("DOMContentLoaded", () => {
    let url = window.location.href;
    let id = url.split("id=")[1];

    getData(`https://cars-pagination.onrender.com/products/${id}`).then(data => {
        if (data) {
            loaderDiv.style.display = "none";
        }

        {
            let products = getProducts();
            chartCount.style.cssText = "width: 25px; height: 25px;"
            chartCount.innerHTML = products.length;

        }


        let detailes = createDetailes(data);
        aboutProduct.innerHTML = detailes;

        const button = document.querySelector("button");

        button && button.addEventListener('click', () => {
            console.log(data.name);
            let products = getProducts();
            const chartLink = document.querySelector(".chartLink");

            const isExist = products.find(product => product.name === data.name);

            if (isExist) {
                isExist.count++;
            } else {
                data.count = 1;
                products.push(data);
            }

            localStorage.setItem("products", JSON.stringify(products));
            showToast();
            chartCount.style.cssText = "width: 25px; height: 25px;"
            chartCount.innerHTML = products.length;
        });




    })
        .catch(err => { console.log(err) })

})