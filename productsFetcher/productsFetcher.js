function addArticles(data) {
    const transaction = articldb.transaction(["ArticleStore"], "readwrite");
    const objectStore = transaction.objectStore("ArticleStore");

    data.map(article => {
        objectStore.add(article);

    });
    recentProduct(data)
}


const sendRequestnot = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        return null
    }

    return responseData;
};

function clearArticle(items) {
    const transacti = articldb.transaction(["ArticleStore"], "readwrite");
    const objectAr = transacti.objectStore("ArticleStore");

    const clearRequest = objectAr.clear();
    clearRequest.onsuccess = () => {
        addArticles(items)
    };

    clearRequest.onerror = (event) => {
        console.log(event.target.error);
    };

    //TotalAll("clear", {});
}
const Reloada = () => {
    window.location.reload();
}


async function DataLoad() {
    try {
        const items = await sendRequestnot('GET', 'boutique/matasa');
        if (!items) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            const productHTML = `
            <div class="container">
                <div class="section-title">
                    <span style="color: red !important">Vérifiez que vous avez access a l'internet</span>
                </div>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <img src="assets/img/error-404.png" alt="Internet Error">
                </div>
                <br>
                <br>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
                </div>
    
            </div>
    `;
            productContainer.innerHTML += productHTML;
            const loaderRemove = document.getElementById('loaderRemove');
            loaderRemove.innerHTML = "";
            loaderRemove.style.display = "none";
        } else {
            await openArticleDatabase()
            clearArticle(items)
            //populaProduct(items);
        }


    } catch (e) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        const productHTML = `
        <div class="container">
            <div class="section-title">
                <span style="color: red !important" id="isemptyorintern">Vérifiez que vous avez access a l'internet</span>
            </div>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <img src="assets/img/error-404.png" alt="Internet Error">
            </div>
            <br>
            <br>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
            </div>

        </div>
`;
        productContainer.innerHTML += productHTML;
        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    };

};

DataLoad();


function getallArticles() {
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            pannierCotent.push(cursor.value);
            cursor.continue();
        } else {




        }
    }
}
