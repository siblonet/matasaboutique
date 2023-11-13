async function cancelItemById() {
    const ido = document.getElementById('ido').value;
    const proid = document.getElementById('proid').value;
    const arti_id = document.getElementById('arti_id').value;
    const quan = document.getElementById('productQuantity').value;
    const vin_or = Orderdata.find(re => re._id === ido);
    if (vin_or.articles.length > 1) {
        await sendRequestforOrder('DELETE', `orders/oarderar/${ido}/${proid}/${arti_id}/${quan}`);

    } else {
        await sendRequestforOrder('DELETE', `orders/${ido}/${arti_id}/${quan}`);

    }
    window.location.reload()
};

async function optionCancileView(_id, proid, arti_id) {
    await openOrdersDatabase();

    getDasbordById(_id).then(result => {
        const product = result.articles.find(po => po._id == proid);


        if (product && product.arti_id) {
            const splo = product.arti_id.addcoul.split(",") ? product.arti_id.addcoul.split(",") : "#eeeeee";
            const colora = splo[0] == "null" ? "#eeeeee" : splo[0];
            const colorb = splo[1] == "null" ? "#eeeeee" : splo[1];
            const colorc = splo[2] == "null" ? "#eeeeee" : splo[2];
            const colord = splo[3] == "null" ? "#eeeeee" : splo[3];
            const colore = splo[4] == "null" ? "#eeeeee" : splo[4];

            const sploa = product.arti_id.addtail.split(",") ? product.arti_id.addtail.split(",") : "-";
            const qsizea = sploa[0] == "null" ? "-" : sploa[0];
            const qsizeb = sploa[1] == "null" ? "-" : sploa[1];
            const qsizec = sploa[2] == "null" ? "-" : sploa[2];
            const qsized = sploa[3] == "null" ? "-" : sploa[3];
            const qsizee = sploa[4] == "null" ? "-" : sploa[4];

            document.getElementById('optionCancilename').innerText = product.arti_id.addarticle;
            document.getElementById('optionViewNewPrice').innerText = `${product.arti_id.addprix} F.CFA`;
            document.getElementById('rating').innerText = `5 avis`;
            document.getElementById('quickFour').innerText = `${product.arti_id.addfour}`;
            document.getElementById('quickDispo').innerText = `${product.arti_id.adddispo}`;
            document.getElementById('quickType').innerText = `${product.arti_id.addtype}`;
            document.getElementById('productQuantity').value = product.quantcho;

            /*
                   addarticle: addarticle,
                   addquant:,
                   addgenre
                   addtransage
                   addreduction: addreduction,
                   addprix: addprix,
                   addoccasion
                   addfour: addfour,
                   adddispo: adddispo,
                   addnouveaute
                   addcoul: addcoul,
                   addtail: addtail,
                   addmateri: addmateri,
                   addmarque
                   addtype: addtype,
                   addtypepro
                   addphone: addphone,
                   addexpe: addexpe,
                   who: '',
                   notes: notes,
                   image: imas
               */
            const quickCouleuHtml = document.getElementById('quickCouleu');
            const quickTailHtml = document.getElementById('quickTail');
            quickCouleuHtml.innerHTML = '';
            quickTailHtml.innerHTML = '';

            const quickColoHTML = `
                                    <li><a style="background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    <li><a style="background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
                                    `;
            quickCouleuHtml.innerHTML = quickColoHTML;

            const quickSizeHTML = `
                                    <li id="quisizeli0"><a>${qsizea}</a></li>
                                    <li id="quisizeli1"><a>${qsizeb}</a></li>
                                    <li id="quisizeli2"><a>${qsizec}</a></li>
                                    <li id="quisizeli3"><a>${qsized}</a></li>
                                    <li id="quisizeli4"><a>${qsizee}</a></li>
                                    `;
            quickTailHtml.innerHTML = quickSizeHTML;

            const orderStatuHtml = document.getElementById('statusOrder');
            orderStatuHtml.innerHTML = '';
            const orderStatus = product.statut === "done" ? "livré" : product.statut == "review" ? "en attente" : product.statut === "onway" ? "en cours" : "échoué";
            const orderStatu = ` <span style="color: ${orderStatus === 'livré' ? 'green' : orderStatus === 'en attente' ? 'orange' : orderStatus === 'en cours' ? 'pink' : 'red'}">Commande ${orderStatus}</span>
                                    `;
            orderStatuHtml.innerHTML = orderStatu;


            document.getElementById('ido').value = `${_id}`;
            document.getElementById('proid').value = `${proid}`;
            document.getElementById('arti_id').value = `${arti_id}`;

            const element = document.getElementById('hidlater');
            element.classList.remove('hiddendhid');
            element.classList.add('hiddendshow');


            document.getElementById('villeValue').value = `${result.ville}`;
            document.getElementById('communeValue').value = `${result.commune}`;
            document.getElementById('adresseValue').value = `${result.lieu}`;
            document.getElementById('telephoneValue').value = `${result.phone}`;

            const bacgro = document.getElementById('bagron');
            bacgro.style.backgroundColor = product.backgroundColor;
            const modalImage = document.getElementById('ipage');
            modalImage.src = product.arti_id.image[0].ima;
            const colSizeImage = product.image.split(",");
            const quickColose = document.getElementById('quickColose');
            quickColose.innerHTML = '';
            selctSizea = [];
            selcta = [];
            for (let poa = 0; poa < colSizeImage.length; poa++) {
                quiColorfunb(poa, splo[parseInt(colSizeImage[poa])], product.arti_id.image[parseInt(colSizeImage[poa])].ima)
                quiSizefunab(parseInt(colSizeImage[poa]), sploa[parseInt(colSizeImage[poa])])
            }

            const updateposi = document.getElementById('updateposi');
            updateposi.innerHTML = "";

            if (product.statut == "review") {
                const updateposiHTML = `
                <button type="button" class="btn btn-info" data-dismiss="modal" onclick="EditeViewOrder()">Modifer</button>
                            
                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cancelItemById()">Annuller</button>
                <button type="button" class="btn btn-outline-success" data-dismiss="modal">Quitter</button>

            `;
                updateposi.innerHTML = updateposiHTML;
            } else {
                const updateposiHTML = `                            
                <button type="button" class="btn btn-outline-success" data-dismiss="modal">Quitter</button>

            `;
                updateposi.innerHTML = updateposiHTML;
            }

        } else {
            document.getElementById('optionCancilename').innerText = "Article Supprimé";

        };

    }).catch();

};

const imasEdi = [];

function previewImageEdite(event) {
    if (imasEdi.length < 5) {
        const imagePreview = document.getElementById(`Editeimage${imasEdi.length + 1}`);
        imagePreview.innerHTML = '';

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imasEdi.push({ _id: _idim[0] ? _idim[0].id : imasEdi[0].id, ima: e.target.result, nam: file.name, status: "update" });
                _idim.length > 0 ? _idim.splice(0, 1) : null;
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', 'removeImageEdite(event)');
                img.setAttribute('id', `EdieId${imasEdi.length}`);
                imagePreview.appendChild(img);

            };
            reader.readAsDataURL(file);
        };
    }
};

const _idim = [];

function removeImageEdite(event) {
    const clickedElementId = event.target.id;
    if (clickedElementId.startsWith('EdieId')) {
        const imageNumber = parseInt(clickedElementId.replace('EdieId', '')) - 1;
        if (imageNumber >= 0 && imageNumber < imasEdi.length) {
            // Remove the item from the array at the specified index
            _idim.push({ id: imasEdi[imageNumber]._id });
            const createItem = async () => {
                try {
                    await sendRequestforOrder('POST', `boutique/deleteim`, { name: imasEdi[imageNumber].ima });
                } catch (error) {
                    console.error('Error updating product:', error.message);
                }
            };

            createItem();
            imasEdi.splice(imageNumber, 1);

            // Clear the image previews
            const imagePreviews = document.querySelectorAll('[id^="Editeimage"]');
            imagePreviews.forEach((preview) => {
                preview.innerHTML = '';
            });

            // Update the remaining image previews
            imasEdi.forEach((ed, index) => {
                const imagePreview = document.getElementById(`Editeimage${index + 1}`);
                const img = document.createElement('img');
                img.src = ed.ima;
                img.style.height = '300px';
                img.style.width = '200px';
                img.setAttribute('onclick', 'removeImageEdite(event)');
                img.setAttribute('id', `EdieId${index + 1}`);
                imagePreview.appendChild(img);
            });
        }
    }
}

async function EditeViewOrder() {
    /*const ido = document.getElementById('ido').value;
    const idar = document.getElementById('proid').value;

    try {
        const addarticle = document.getElementById('Editearticle').value;
        const addquant = parseInt(document.getElementById('Editequant').value);
        const addgenre = document.getElementById('Editegenre').value;
        const addtransage = document.getElementById('Editetransage').value;
        const addprix = document.getElementById('Editeprix').value;
        const addreduction = document.getElementById('Editereduction').value;
        const addoccasion = document.getElementById('Editeoccasion').value;
        const addfour = document.getElementById('Editefour').value;
        const adddispo = document.getElementById('Editedispo').value;
        const addnouveaute = document.getElementById('Editenouveaute').value;
        const addcoul = document.getElementById('Editecoul').value;
        const addtail = document.getElementById('Editetail').value;
        const addmateri = document.getElementById('Editemateri').value;
        const addmarque = document.getElementById('Editemarque').value;
        const addtype = document.getElementById('Editetype').value;
        const addtypepro = document.getElementById('Editetypepro').value;
        const addphone = document.getElementById('Editephone').value;
        const addexpe = document.getElementById('Editeexpe').value;
        const notes = document.getElementById('Editenotes').value;


        if (addarticle && addquant && addgenre && addtransage && addprix && addfour && adddispo && addcoul && addtail && addmateri && addmarque && addtype && addtypepro && addphone && addexpe && notes) {
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
                image: imasEdi

            };
            const createItem = async () => {
                try {
                    await sendRequestforOrder('PUT', `orders/statoo/${ido}/${idar}`, { statut: sta });
                } catch (error) {
                    console.error('Error updating product:', error.message);
                }
            };

            createItem();
            window.location.reload()

        }
    } catch (error) {
        console.log(error)
    }*/


};

async function optionEditeView(_id) {
    imasEdi.length = 0
    await openArticleDatabase();
    getArticleById(_id).then(product => {
        document.getElementById('ediatiid').value = _id;
        document.getElementById('Editearticle').value = product.addarticle;
        document.getElementById('Editequant').value = parseInt(product.quantity);
        document.getElementById('Editegenre').value = product.addgenre;
        document.getElementById('Editetransage').value = product.addtransage;
        document.getElementById('Editereduction').value = product.addreduction;
        document.getElementById('Editeprix').value = product.addprix;
        document.getElementById('Editeoccasion').value = product.addoccasion;
        document.getElementById('Editefour').value = product.addfour;
        document.getElementById('Editedispo').value = product.adddispo;
        document.getElementById('Editenouveaute').value = product.addnouveaute;
        document.getElementById('Editecoul').value = product.addcoul;
        document.getElementById('Editetail').value = product.addtail;
        document.getElementById('Editemateri').value = product.addmateri;
        document.getElementById('Editemarque').value = product.addmarque;
        document.getElementById('Editetype').value = product.addtype;
        document.getElementById('Editetypepro').value = product.addtypepro;
        document.getElementById('Editephone').value = product.addphone;
        document.getElementById('Editeexpe').value = product.addexpe;
        document.getElementById('Editenotes').value = product.notes;

        product.image.forEach((ed, index) => {
            const imagePreview = document.getElementById(`Editeimage${index + 1}`);
            imagePreview.innerHTML = '';
            imasEdi.push(ed);
            const img = document.createElement('img');
            img.src = ed.ima;
            img.style.height = '300px';
            img.style.width = '200px';
            img.setAttribute('onclick', 'removeImageEdite(event)');
            img.setAttribute('id', `EdieId${index + 1}`);
            imagePreview.appendChild(img);
        });

    });
};

async function deleteArticleById() {
    const _ide = document.getElementById("ediatiid").value;
    await sendRequestforOrder('DELETE', `boutique/${_ide}`);
    await openArticleDatabase();
    await clearArticlea();
    const items = await sendRequestforOrderget('GET', 'boutique/matasa');
    await addArticlesa(items);
    window.location.reload();
}

function addArticlesa(data) {
    return new Promise((resolve, reject) => {
        const transaction = articldb.transaction(["ArticleStore"], "readwrite");
        const objectStore = transaction.objectStore("ArticleStore");

        const requests = data.map(article => {
            return new Promise((innerResolve, innerReject) => {
                const request = objectStore.add(article);
                request.onsuccess = () => innerResolve();
                request.onerror = (event) => innerReject(event.target.error);
            });
        });

        Promise.all(requests)
            .then(() => resolve('done'))
            .catch(error => reject(error));
    });
}

const sendRequestforOrder = async (method, endpoint, data = null) => {
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

    return response;

};

async function getDasbordById(_id) {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readonly");
        const objectStore = transaction.objectStore("OrderdStore");
        const getRequest = objectStore.get(_id);

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };

        getRequest.onsuccess = (event) => {
            const actioa = event.target.result;
            resolve(actioa)
        };


    });
}


async function getArticleById(_id) {
    return new Promise((resolve, reject) => {
        const transaction = articldb.transaction(["ArticleStore"], "readonly");
        const objectStore = transaction.objectStore("ArticleStore");
        const getRequest = objectStore.get(_id);

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };

        getRequest.onsuccess = (event) => {
            const actioa = event.target.result;
            resolve(actioa)
        };


    });
}



let selcta = [];

function quiSizefunab(id, siz) {
    const one = document.getElementById(`quisizeli${id}`);
    one.classList.add('active');
    selcta.push({ id: `quisizeli${id}`, size: siz });
};


let selctSizea = [];
function quiColorfunb(impo, id, im) {
    const bacgro = document.getElementById('bagron');
    bacgro.style.backgroundColor = id;
    const modalImage = document.getElementById('ipage');
    modalImage.src = im;

    const quickTailHtml = document.getElementById('quickColose');

    selctSizea.push({ col: id, id: impo });

    const quickSizeHTML = `<li style="background-color: ${id};"><a></a></li>`;
    quickTailHtml.innerHTML += quickSizeHTML;
};




function addOrders(data) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(data)) {
            reject(new Error('Data is not an array'));
            return;
        }

        const transaction = orderdb.transaction(["OrderdStore"], "readwrite");
        const objectStore = transaction.objectStore("OrderdStore");

        const requests = data.map(article => {
            return new Promise((innerResolve, innerReject) => {
                const request = objectStore.put(article);
                request.onsuccess = () => innerResolve();
                request.onerror = (event) => innerReject(event.target.error);
            });
        });

        Promise.all(requests)
            .then(() => resolve('done'))
            .catch(error => reject(error));
    });
}






function clearOrder() {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readwrite");
        const objectStore = transaction.objectStore("OrderdStore");
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = (event) => {
            resolve("cleared")
        };

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };


    });

}
