function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    /*const name = splo[0];
    const lastname = splo[1];
    const phone = splo[2];
    const mail = splo[3];*/
    const admin = splo[5];
    //const mynam = thisiswhat(`${name}â${lastname}â${phone}â${mail}â${admin}`)
    //sessionStorage.clear();

    /*(async () => {
        await openOrdersDatabase();
        await clearOrder();
        await openArticleDatabase();
        await clearArticle();
    });*/

    return admin == "GIFV" ? true : false

};


async function clearArticlea() {
    const transacti = articldb.transaction(["ArticleStore"], "readwrite");
    const objectAr = transacti.objectStore("ArticleStore");

    const clearRequest = objectAr.clear();
    let answer;

    clearRequest.onsuccess = (event) => {
        answer = "cleared"
    };

    clearRequest.onerror = (event) => {
        answer = event.target.error;
    };

};


const imas = [];

function previewImagef(event) {
    if (imas.length < 5) {
        const imagePreview = document.getElementById(`imagePreview${imas.length + 1}`);
        imagePreview.innerHTML = '';

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', 'removeImageCreate(event)');
                img.setAttribute('id', `todeleId${imas.length + 1}`);
                imagePreview.appendChild(img);
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        };
    }
};

async function previewImage() {
    if (imas.length < 5) {

        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];

        if (!file) {
            alert("Aucune image n'a été selectionné!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async function (event) {
            const base64Data = event.target.result.split(',')[1];
            await sendBase64ToServer(base64Data, file.name);
        };
        reader.readAsDataURL(file);
    } else if (imas.length > 4) {
        document.getElementById('limitimag').style.display = "none";
    }
}

async function sendBase64ToServer(base64Data, fileName) {

    const imagePreview = document.getElementById(`imagePreview${imas.length + 1}`);
    imagePreview.innerHTML = '';

    const response = await fetch(apiUrlfine + "boutique/uploadImage", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ima: base64Data, nam: fileName }),
    });

    if (response.ok) {
        const url = await response.json();
        imas.push(url);
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = url.ima;
            img.style.height = '300px';
            img.style.width = '200px';
            img.setAttribute('onclick', 'removeImageCreate(event)');
            img.setAttribute('id', `todeleId${imas.length + 1}`);
            imagePreview.appendChild(img);
            imagePreview.appendChild(img);
        }, 2500);

        // Use the signed URL to upload the image to Google Cloud Storage (not shown here)
    } else {
        console.error('Error getting signed URL:', response.statusText);
    }

    //previewImagef(evenct)

}

function removeImageCreate(event) {
    const clickedElementId = event.target.id;
    if (clickedElementId.startsWith('todeleId')) {
        const imageNumber = parseInt(clickedElementId.replace('todeleId', '')) - 1;
        if (imageNumber >= 0 && imageNumber) {
            imas.splice(imageNumber, 1);


            // Clear the image previews
            const imagePreviews = document.querySelectorAll('[id^="imagePreview"]');
            imagePreviews.forEach((preview) => {
                preview.innerHTML = '';
            });

            // Update the remaining image previews
            imas.forEach((ed, index) => {
                const imagePreview = document.getElementById(`imagePreview${index + 1}`);
                const img = document.createElement('img');
                img.src = ed.ima;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', 'removeImageCreate(event)');
                img.setAttribute('id', `todeleId${index + 1}`);
                imagePreview.appendChild(img);
            });
        }
    }
}

const sendRequest = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

const sendRequestnotoa = async (method, endpoint, data = null) => {
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
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

function ClearImage() {
    imas.forEach((ef, da) => {
        const imagePreview = document.getElementById(`imagePreview${da + 1}`);
        imagePreview.innerHTML = '';
    });
    imas.length = 0;
}

function AddArticleTest() {
    document.getElementById("ajouteencou").innerText = "En cours"
    const product = {
                    "addarticle": "Chemise Noble à manches court",
                    "quantity": 1,
                    "addgenre": "Homme",
                    "addtransage": "17-55",
                    "addprix": 5,
                    "addreduction": 4,
                    "addoccasion": "promo",
                    "addfour": "Noble",
                    "adddispo": "En stock (1articles)",
                    "addnouveaute": "NOUVEAU",
                    "addcoul": "#f0cdc4,#05208f,#f0cdc4,#05208f,05208f",
                    "addtail": "XL,X,M,L,XS",
                    "addmateri": "Coton",
                    "addmarque": "Noble",
                    "addtype": "ACCOUTREMENT",
                    "addtypepro": "Chemise",
                    "addphone": "0546174263",
                    "addexpe": "Non",
                    "notes": "Une chemise très belle",
                    "image": [
                        { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/7b3c83ed-2b5b-435d-a9ea-4657597df12echemisenobeb.jpeg" },
                        { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/302167f5-923a-42c3-9867-d2912bc18a5dchemisenobea.jpeg" },
                        { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/896a78e3-fb91-4bba-8804-164b6f2baef2chemisenobeb.jpeg" },
                        { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/c491b541-15aa-4278-bbd3-8347f8def372chemisenobea.jpeg" },
                        { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/f3d90db3-fe78-4b47-8827-627691092ae0chemisenobeb.jpeg" }
                    ]
    }


    const createItem = async () => {
        try {
            await sendRequestnotoa('POST', 'boutique', product);
            FetchArticle();

        } catch (error) {
            console.error('Error creating product:', error.message);
        }
    };

    createItem();

}

function AddArticle() {
    try {
        const addarticle = document.getElementById('addarticle').value;
        const addquant = document.getElementById('addquant').value;
        const addgenre = document.getElementById('addgenre').value;
        const addtransage = document.getElementById('addtransage').value;
        const addprix = document.getElementById('addprix').value;
        const addreduction = document.getElementById('addreduction').value;
        const addoccasion = document.getElementById('addoccasion').value;

        const addfour = document.getElementById('addfour').value;
        const adddispo = document.getElementById('adddispo').value;
        const addnouveaute = document.getElementById('addnouveaute').value;

        const addcoul = document.getElementById('addcoul').value;
        const addtail = document.getElementById('addtail').value;
        const addmateri = document.getElementById('addmateri').value;
        const addmarque = document.getElementById('addmarque').value;

        const addtype = document.getElementById('addtype').value;
        const addtypepro = document.getElementById('addtypepro').value;
        const addphone = document.getElementById('addphone').value;
        const addexpe = document.getElementById('addexpe').value;
        const notes = document.getElementById('notes').value;

        if (addarticle && addgenre && addtransage && addprix && addfour && adddispo && addcoul && addtail && addmateri && addmarque && addtype && addtypepro && addphone && addexpe && notes && imas.length > 4) {
            const product = {
                addarticle: addarticle,
                quantity: parseInt(addquant),
                addgenre: addgenre,
                addtransage: addtransage,
                addprix: parseInt(addprix),
                addreduction: parseInt(addreduction),
                addoccasion: addoccasion,
                addfour: addfour,
                adddispo: adddispo,
                addnouveaute: addnouveaute,
                addcoul: addcoul,
                addtail: addtail,
                addmateri: addmateri,
                addmarque: addmarque,
                addtype: addtype,
                addtypepro: addtypepro,
                addphone: addphone,
                addexpe: addexpe,
                notes: notes,
                owner: "matasa",
                image: imas
            };
            document.getElementById("ajouteencou").innerText = "En cours"

            const createItem = async () => {
                try {
                    await sendRequestnotoa('POST', 'boutique', product);
                    FetchArticle();
                } catch (error) {
                    console.error('Error creating product:', error.message);
                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }
}


//addtoPanier
function addtoPanier(data) {
    const transaction = panierdb.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const addRequest = objectStore.add(data);

    addRequest.onsuccess = () => {
        getallDataa();
    };

    addRequest.onerror = () => {
        console.log("addtoPanier func in currentdb 292");
    };

    transaction.onerror = () => {
        document.getElementById('modalcoma').style.display = "block";
        document.getElementById('modalcoma').setAttribute("aria-hidden", "false");
        document.getElementById('messages').innerText = "Exist déjà dans le panier!";

        setTimeout(() => {
            document.getElementById('modalcoma').style.display = "none";
            document.getElementById('modalcoma').setAttribute("aria-hidden", "true");
        }, 2500);
    };

}



function getPanierSend(tocompl) {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    objectStore.openCursor().onsuccess = async (event) => {
        const cursor = event.target.result;
        if (cursor) {
            tocompl.articles.push({
                arti_id: cursor.value._id,
                quantcho: cursor.value.quantcho,
                image: cursor.value.imago,
                color: cursor.value.color,
                size: cursor.value.size,
                prix: cursor.value.prix
            });
            cursor.continue();
        } else {

            const sendReque = async (method, endpoint, data = null) => {
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
                    return { id: "erro", er: "erro" };
                }

                return { id: responseData.done, er: responseData.done };
            };


            try {
                const response = await sendReque('POST', 'orders/matasa', tocompl);
                if (response.er == "done" && response.id == "done") {
                    TotalAll("clear", "");
                    window.location.href = "client"
                    load.classList.remove("load28")
                    load.classList.add("tohi")
                    tohia.classList.remove("tohi");
                } else if (response.er !== "done" && response.id !== "done") {
                    load.classList.remove("load28")
                    load.classList.add("tohi")
                    tohia.classList.remove("tohi");
                    errer.classList.add("rejected");
                    document.getElementById('nointer').innerText = "Erreur incconnu, Veuillez re-essayer plus tard";

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 3500);
                };

            } catch (e) {
                setTimeout(() => {
                    load.classList.remove("load28")
                    load.classList.add("tohi")
                    tohia.classList.remove("tohi");
                    errer.classList.add("rejected");
                    document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                }, 1500);

                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 4500);

            }

        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };
};

function getallCheckou() {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else if (data.length > 0) {
            const checkouId = document.getElementById('checkoutpanier');
            checkouId.innerHTML = '';

            data.forEach(pani => {
                const checkouTBODY =
                    `
                        <tr>                       
                            <td class="product-name">
                                <a href="#">${pani.addarticle}</a>
                            </td>
                            <td class="product-total">
                                <span class="subtotal-amount">${pani.prix * pani.quantcho} F.CFA</span>
                            </td>
                        </tr>  
                    `;

                checkouId.innerHTML += checkouTBODY;

            });

            const pantotalid = document.getElementById('toteauxche');
            pantotalid.innerHTML = '';

            let totalPricea = 0;

            for (const pri of data) {
                const adda = pri.prix * pri.quantcho;
                totalPricea += adda;
            };

            const pantotalhtml = `
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Sous-total</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">${totalPricea} F.CFA</span>
                                    </td>
                                </tr> 
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Expédition</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">1000 F</span>
                                    </td>
                                </tr> 
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Total Géneral</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">${totalPricea + 1000} F.CFA</span>
                                    </td>
                                </tr> 
                        `;
            pantotalid.innerHTML += pantotalhtml;

        } else {
            document.getElementById('coverfor').classList.add("preloader-area");

        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};





function getDasboard() {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            data.forEach(pani => {
                const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";

                const panierTBODY =
                    `
                        <tr onclick="optionCancileView(${pani._id})" style="cursor: pointer !important;" onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'"  data-bs-toggle="modal" data-bs-target="#optionCancile">
                            <td class="product-thumbnail">
                                <a>
                                    <img src="${pani.image1}" alt="item">
                                </a>
                            </td>
                            <td class="product-name">
                                <a>${pani.articleName}</a>
                                <ul>
                                    <li>Color: <span>${pani.color}</span></li>
                                    <li>Size: <span>${pani.size}</span></li>
                                    <li>Material: <span>${pani.material}</span></li>
                                </ul>
                            </td>
                            <td class="product-price">
                                <span class="unit-amount">${pani.newPrice} F</span>
                            </td>
                            <td class="product-quantity">
                                   <div class="input-counter">
                                      <input type="text" min="1" value="${pani.quantity}">
                                   </div>
                            </td>
                            <td class="product-subtotal">
                                <span class="subtotal-amount">${pani.newPrice * pani.quantity} F.CFA</span>
                            </td>
                            <td class="product-subtotal">
                                <a class="remove${deliveryStatus === 'livré' ? 'c' : deliveryStatus === 'en attente' ? 'a' : deliveryStatus === 'en cours' ? 'b' : 'd'}">
                                   <i class="bx bx-failed">${deliveryStatus}</i>
                                </a>
                            </td>
                        </tr>
                        
                    `;

                tbodyId.innerHTML += panierTBODY;

            });

            const pantotalid = document.getElementById('toteaux');
            pantotalid.innerHTML = '';

            let totalPricea = 0; // Initialize to 1 so that the first multiplication works

            for (const pri of data) {
                const adda = pri.newPrice * pri.quantity;
                totalPricea += adda;
            };

            const pantotalhtml = `
                            <li>Sous-total <span>${totalPricea} F</span></li>
                            <li>Livraison <span>1000 F</span></li>
                            <li>Total <span>${totalPricea + 1000} F.CFA</span></li>
                            `;
            pantotalid.innerHTML += pantotalhtml;




            const pannierNumber2 = document.getElementById('paniernumber2');
            pannierNumber2.innerHTML = '';
            const panniernumHTML2 = `
                                <i class="bx bx-shopping-bag"></i>
                                <span>${data.length}</span>
                            `;
            pannierNumber2.innerHTML += panniernumHTML2;

            const pannierNumber3 = document.getElementById('paniernumber3');
            pannierNumber3.innerHTML = '';
            const panniernumHTML3 = `
                                <i class="bx bx-shopping-bag"></i>
                                <span>${data.length}</span>
                            `;
            pannierNumber3.innerHTML += panniernumHTML3;
        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};


function TotalAll(who, data) {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(() => {
                if (who === "post") {
                    addtoPanier(data);
                } else if (who === "all") {
                    getallData();
                } else if (who === "all1") {
                    getallDataa();
                } else if (who === "all2") {
                    getallCheckou();
                } else if (who === "action") {
                    getselectDataById(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "dasboard" && getAdmin()) {
                    getDasboard()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "put") {
                    updateData(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "del") {
                    deleteData(data)
                } else if (who === "clear") {
                    clearData()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "sendOrder") {
                    getPanierSend(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else {
                    reject(new Error("Invalid operation"));
                }
            })
            .catch(error => reject(error));
    });
};
