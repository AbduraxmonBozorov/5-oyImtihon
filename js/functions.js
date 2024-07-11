async function getData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
};

function createCard(obj) {
    return `
        <div class="card" data-id="${obj.id}">
            <div class="card-img">
                <img src="${obj.image}" alt="">
                <div class="netNalichi">
                    <img src="./imgs/close.svg" alt="">
                    <span>Нет в наличии</span>
                </div>
                <div class="podarok">
                    <img src="./imgs/podarok.svg" alt="podarok.svg">
                    <span>Подарок</span>
                </div>
                <div class="sale">sale</div>
            </div>
            <div class="card-body">
                <div class="starsAndComments">
                    <div class="stars">
                        <img src="./imgs/startActive.svg" alt="startActive.svg" class="activeStar">
                        <img src="./imgs/startActive.svg" alt="startActive.svg" class="activeStar">
                        <img src="./imgs/startActive.svg" alt="startActive.svg" class="activeStar">
                        <img src="./imgs/star.svg" alt="star.svg" class="starDisable">
                        <img src="./imgs/star.svg" alt="star.svg" class="starDisable">
                    </div>
                    <div class="comments">
                        <p>(<span class="commentsCount">12</span>) <span
                                class="commentsText">отзывов</span></p>
                    </div>
                </div>
                <p class="aboutProduct">
                    ${obj.name}
                </p>
                <div class="porductPrice">
                    <strong class="newPrice">${obj.newPrice} ₽</strong> <del class="oldPrice">${obj.oldPrice / 100}₽</del>
                </div>
            </div>

        </div>
    `
}

function removeCard() {
    let card = document.querySelectorAll(".contentCards .card");
    card.forEach(item => {
        item.remove();
    })
};

function selectProduct() {
    let card = document.querySelectorAll(".cards .card");
    card.length > 0 && card.forEach(item => {
        item.addEventListener("click", (event) => {
            let id = item.getAttribute("data-id");
            window.location.assign(`http://127.0.0.1:5500/pages/detailes.html?id=${id}`);
        })
    })
};

function createDetailes(obj) {
    return `
        <div class="productInfo">
                <div class="productImg">
                    <img src="${obj.image}" alt="">
                </div>
                <div class="productText">
                    <h1>${obj.name}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam asperiores sunt provident molestias quibusdam fuga.</p>
                    <pre>
Lorem, ipsum dolor.
dolor sit amet consectetur adipisicing
                    </pre>
                    <p class="priceText">Цена</p>
                    <div class="amoutPrice">
                        <strong>${obj.newPrice}</strong>
                        <del>${obj.oldPrice}</del>
                    </div>
                    <button>Корзинка</button>
                </div>
            </div>
    `;
};

function getProducts() {
    let products = [];
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
    }

    return products;
};

function showToast() {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}




export { getData, createCard, removeCard, selectProduct, createDetailes, getProducts, showToast };