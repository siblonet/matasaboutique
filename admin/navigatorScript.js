const articlesData = [];
const ClientData = [];
const AdminData = [];
const Orderdata = [];

const sendRequestforOrderget = async (method, endpoint, data = null) => {
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

    // Check if the response is valid (status in the range 200-299)
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // Convert the response to JSON
    const responseData = await response.json();

    return responseData;
};

function addArti(data) {
    const transaction = articldb.transaction(["ArticleStore"], "readwrite");
    const objectStore = transaction.objectStore("ArticleStore");

    data.map(article => {
        objectStore.add(article);

    });
    getArticleOnly()
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

function clearArt(items) {
    const transacti = articldb.transaction(["ArticleStore"], "readwrite");
    const objectAr = transacti.objectStore("ArticleStore");
    const request = objectAr.clear();

    request.onsuccess = () => {
        addArti(items);
    };

    request.onerror = () => {
        window.location.reload();
    };

}


const Reloada = () => {
    window.location.reload();
}


async function FetchArticle() {
    try {
        const items = await sendRequestnot('GET', 'boutique/matasa');
        if (items) {
            await openArticleDatabase();
            clearArt(items);
        }

    } catch (e) {
        console.log(e)
    }

};


const NafigatioTo = async (where) => {
    const ActiveDas = document.getElementById('ActiveDas');
    const ActiveCo = document.getElementById('ActiveCo');
    const ActiveCl = document.getElementById('ActiveCl');
    const ActiveAd = document.getElementById('ActiveAd');
    const ActiveAr = document.getElementById('ActiveAr');



    const addAticlebtn = document.getElementById('addAticlebtn');
    const adminiSpace = document.getElementById('main-content');
    adminiSpace.innerHTML = '';

    if (where === "dasboard") {
        ActiveDas.classList.add('active');
        ActiveCo.classList.remove('active');
        ActiveCl.classList.remove('active');
        ActiveAd.classList.remove('active');
        ActiveAr.classList.remove('active');

        addAticlebtn.innerHTML = "";
        const dasboardHTML = `
        
            <div class="container-fluid content-top-gap">

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb my-breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="/">
                                <i class="fa fa-angle-double-left"></i>
                                    Aller à la boutique
                            </a>
                        </li>
                    </ol>
                </nav>
                <div class="welcome-msg pt-3 pb-4">
                    <h1>Bonjour <span class="text-primary">${username}</span></h1>
                    <p>Vous étes dans votre espace administratif.</p>
                </div>


                <div class="statistics">
                    <div class="row">
                        <div class="col-xl-6 pr-xl-2">
                            <div class="row">
                                <div class="col-sm-6 pr-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topa p-4" style="cursor: pointer" onclick="NafigatioTo('articles')">
                                        <i class="lnr lnr-cloud-download"> </i>
                                        <h3 class="text-primary number" id="availableArticle">0</h3>
                                        <p class="stat-text">Article Disponible</p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pl-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topb p-4" style="cursor: pointer" onclick="NafigatioTo('commandes')">
                                        <i class="lnr lnr-cart"> </i>
                                        <h3 class="text-secondary number" id="CommandesNum">0</h3>
                                        <p class="stat-text">Commandes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 pl-xl-2">
                            <div class="row">
                                <div class="col-sm-6 pr-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topc p-4" style="cursor: pointer" onclick="NafigatioTo('clients')">
                                        <i class="lnr lnr-users" style="color:#000000 !important;"> </i>
                                        <h3 class="text-success number"  style="color:#000000 !important;"id="ClientNum">0</h3>
                                        <p class="stat-text">Clients</p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pl-sm-2 statistics-grid">
                                    <div class="card card_border border-primary-topd p-4">
                                        <i class="fa fa-money"> </i>
                                        <h3 class="text-red number"  id="recetteMoney">0 F.CFA</h3>
                                        <p class="stat-text">Recettes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="chart">
                    <div class="row">
                        <div class="col-lg-6 pl-lg-2 chart-grid">
                            <div class="card text-center card_border">
                                <div class="card-body">
                                    <div id="container">
                                        <canvas id="linechart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 pr-lg-2 chart-grid">
                            <div class="card text-center card_border">
                                <div class="card-body">
                                <!-- bar chart -->
                                <div id="container">
                                    <canvas id="barchart"></canvas>
                                </div>
                                <!-- //bar chart -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        `;


        /*
        
          <div class="col-lg-6 pl-lg-2 chart-grid">
                            <div class="card text-center card_border">
                                <div class="card-header chart-grid__header">
                                </div>
                                <div class="card-body">
                                    <div id="container">
                                        <canvas id="linecharta"></canvas>
                                    </div>
                                </div>
                                <div class="card-footer text-muted chart-grid__footer">
                                    Mis à jour à l'instant
                                </div>

                            </div>
                        </div>
                        */


        adminiSpace.innerHTML = dasboardHTML;
        new Chart(document.getElementById("linechart"), {
            type: 'line',
            data: {
                labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                datasets: [{
                    label: 'Jan',
                    backgroundColor: "#20c997",
                    borderColor: "#28a745",
                    data: [0, 0, 0, 32, 85, 0, 55, 0],
                    fill: false,
                }, {
                    label: 'Fev',
                    fill: false,
                    backgroundColor: "#054846",
                    borderColor: "#054846",
                    data: [10, 0, 20, 0, 25, 0, 10, 40],
                }, {
                    label: 'Mars',
                    fill: false,
                    backgroundColor: "#4755AB",
                    borderColor: "#4755AB",
                    data: [0, 100, 20, 0, 0, 50, 0, 100],
                },
                {
                    label: 'Avr',
                    backgroundColor: "#03c895",
                    borderColor: "#03c895",
                    data: [10, 0, 0, 0, 25, 0, 10, 70],
                    fill: false,
                },
                {
                    label: 'Mai',
                    backgroundColor: "#B162AC",
                    borderColor: "#B162AC",
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                },
                {
                    label: 'Juin',
                    backgroundColor: "#E7EDF6",
                    borderColor: "#E7EDF6",
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                }, {
                    label: 'Juillet',
                    backgroundColor: "#8549ba",
                    borderColor: "#8549ba",
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                }, {
                    label: 'Août',
                    backgroundColor: "#58595b",
                    borderColor: "#58595b",
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                }, {
                    label: 'Sept',
                    backgroundColor: "#166a8f",
                    borderColor: "#166a8f",
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                }, {
                    label: 'Nov',
                    backgroundColor: "#acc236",
                    borderColor: "#acc236",
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                },
                {
                    label: 'Déc',
                    backgroundColor: "#f53794",
                    borderColor: "#f53794",
                    data: [31, 100, 1, 1, 1, 1, 1, 100],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Activité'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
        });

        new Chart(document.getElementById("barchart"), {
            type: 'bar',
            data: {
                labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                datasets: [
                    {
                        label: 'Jan',
                        backgroundColor: "#20c997",
                        borderColor: "#28a745",
                        borderWidth: 1,
                        data: [0, 0, 0, 0, 0, 0, 0, 0],

                    }, {
                        label: 'Fev',
                        borderWidth: 1,
                        backgroundColor: "#054846",
                        borderColor: "#054846",
                        data: [0, 0, 0, 0, 0, 0, 0, 0],

                    }, {
                        label: 'Mars',
                        borderWidth: 1,
                        backgroundColor: "#4755AB",
                        borderColor: "#4755AB",
                        data: [30, 10, 70, 15, 30, 20, 70, 80],

                    },
                    {
                        label: 'Avr',
                        backgroundColor: "#03c895",
                        borderColor: "#03c895",
                        data: [0, 0, 0, 0, 0, 0, 0, 0],
                        borderWidth: 1,
                    },
                    {
                        label: 'Mai',
                        backgroundColor: "#B162AC",
                        borderColor: "#B162AC",
                        data: [10, 38, 20, 35, 25, 0, 0, 5],
                        borderWidth: 1,
                    },
                    {
                        label: 'Juin',
                        backgroundColor: "#E7EDF6",
                        borderColor: "#E7EDF6",
                        data: [0, 0, 0, 0, 0, 0, 0, 0],
                        borderWidth: 1,
                    }, {
                        label: 'Juillet',
                        backgroundColor: "#4755AB",
                        borderColor: "#4755AB",
                        data: [10, 20, 30, 40, 50, 60, 70, 80],
                        borderWidth: 1,
                    }, {
                        label: 'Août',
                        backgroundColor: "#58595b",
                        borderColor: "#58595b",
                        data: [0, 0, 0, 0, 0, 0, 0, 0],

                        borderWidth: 1,
                    }, {
                        label: 'Sept',
                        backgroundColor: "#166a8f",
                        borderColor: "#166a8f",
                        data: [0, 100, 20, 1, 0, 50, 0, 100],

                        borderWidth: 1,
                    }, {
                        label: 'Nov',
                        backgroundColor: "#acc236",
                        borderColor: "#acc236",
                        data: [0, 0, 0, 0, 0, 0, 0, 0],
                        fill: false,
                    },
                    {
                        label: 'Déc',
                        backgroundColor: "#f53794",
                        borderColor: "#f53794",
                        borderWidth: 1,
                        data: [0, 0, 0, 0, 0, 0, 0, 0],

                    }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Ventes'
                },
                legend: {
                    position: 'top',
                },
            }
        });

        NavBaractivity();
        getArticles();
    } else if (where === "commandes") {
        ActiveDas.classList.remove('active');
        ActiveCo.classList.add('active');
        ActiveCl.classList.remove('active');
        ActiveAd.classList.remove('active');
        ActiveAr.classList.remove('active');
        await openOrdersDatabase();

        addAticlebtn.innerHTML = "";
        const commandesHTML = `
                <main class="main">
                <br>
                <br>
                <br>
                <section class="main__section">
                    <table>
                        <thead>
                            <tr>
                                <th>Client <span class="icon-arrow">&UpArrow;</span></th>
                                <th>Article <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Prix Unité <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Quantité <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;"> Statut <span class="icon-arrow">&UpArrow;</span></th>
                            </tr>
                        </thead>
                        <tbody id="tbody-data">
                          
                            

                        </tbody>
                    </table>
                </section>
            </main>
        `;
        adminiSpace.innerHTML = commandesHTML;

        const transaction = orderdb.transaction(["OrderdStore"], "readonly");
        const objectStore = transaction.objectStore("OrderdStore");
        const tbodyId = document.getElementById('tbody-data');
        tbodyId.innerHTML = '';
        Orderdata.length = 0

        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                Orderdata.push(cursor.value);
                cursor.continue();
            } else {

                Orderdata.forEach((pan) => {
                    pan.articles.forEach((pani) => {
                        const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";
                        const panierTBODY = `
                        <tr  style="cursor: pointer" data-toggle="modal" data-target="#optionCancile" onclick="optionCancileView('${pan._id}', '${pani._id}', '${pani.arti_id._id}')">

                            <td style="color: #ffffff !important">
                                <a>${pan.client.nom} ${pan.client.prenom}</a>
                                <ul>
                                    <li>
                                        <span>${pan.phone}</span>
                                    </li>
                                    <li>
                                        <span>${pan.ville}</span>
                                    </li>
                                    <li>
                                        <span">${pan.lieu}</span>
                                    </li>
                                </ul>

                            </td>
                            
                            <td style="color: #ffffff !important">
                                <a>${pani.arti_id ? pani.arti_id.addarticle : 'Article Supprimé'}</a>
                                <ul>
                                    <li>Color: <span style="background-color: ${pani.color.substring(0, 7)}; color: ${pani.color.substring(0, 7)}">${pani.color.substring(0, 7)}</span></li>
                                    <li>Size: <span>${pani.size}</span></li>
                                    <li>Material: <span>${pani.arti_id ? pani.arti_id.addmateri : 'Article Supprimé'}</span></li>
                                </ul>
                            </td>
                             
                            <td style="color: #ffffff !important; text-align: center !important;"> 
                                <strong> ${pani.prix} F </strong>
                            </td>
                    
                            <td style="color: #ffffff !important; text-align: center !important;">
                                ${pani.quantcho}
                            </td>

                            <td style="color: #ffffff !important; text-align: center !important;">
                                <p style="cursor: pointer" class="status ${deliveryStatus === 'livré' ? 'delivered' : deliveryStatus === 'en attente' ? 'pending' : deliveryStatus === 'en cours' ? 'shipped' : 'cancelled'}">
                                    ${deliveryStatus}
                                </p>
                               
                            </td>
                        </tr>
                    `;

                        tbodyId.innerHTML += panierTBODY;
                    });
                });

            }
        };

        transaction.onerror = (event) => {
            console.error("Transaction error:", event.target.error);
        };

    } else if (where === "clients") {
        ActiveDas.classList.remove('active');
        ActiveCo.classList.remove('active');
        ActiveCl.classList.add('active');
        ActiveAd.classList.remove('active');
        ActiveAr.classList.remove('active');

        addAticlebtn.innerHTML = "";
        const clientsHTML = `
        
        <main class="table">
            <br>
            <br>
            <br>
            <section class="table__body">
            <table>
                <thead>
                <tr>
                    <th>Nom et Prénom<span class="icon-arrow">&UpArrow;</span></th>
                    <th style="text-align: center !important;">eMail<span class="icon-arrow">&UpArrow;</span></th>
                    <th style="text-align: center !important;">Contacts<span class="icon-arrow">&phone;</span></th>
                    <th style="text-align: center !important;">Statut<span class="icon-arrow">&UpArrow;</span></th>
                </tr>
                </thead>
                <tbody id="tbody-client">
                
                </tbody>
            </table>

            </section>
        </main>
        `;

        adminiSpace.innerHTML = clientsHTML

        {
            const tbodyId = document.getElementById('tbody-client');
            tbodyId.innerHTML = '';

            ClientData.forEach(client => {
                const clientTBODY =
                    `
                    <tr  style="cursor: pointer" data-toggle="modal" data-target="#optionClient" onclick="optionClientView('${client._id}', 'client')" >
                        <td class="" style="color: #ffffff !important;"> 
                        ${client.nom} ${client.prenom}
                        </td>
                        <td class="" style="color: #ffffff !important; text-align: center !important">
                        ${client.email}
                        </td>
                        <td class="" style="color: #ffffff !important; text-align: center !important;">
                        <strong>${client.phone}</strong>
                        </td>
                        <td class="" style="text-align: center !important;">
                            <p class="status ${client.admin === 'false' ? 'shipped' : 'cancelled'}">${client.admin === 'false' ? 'Actif' : 'Bloqué'}</p>
                        </td>
                    </tr>
                    `;

                tbodyId.innerHTML += clientTBODY;

            });

        }
    } else if (where === "admin") {
        ActiveDas.classList.remove('active');
        ActiveCo.classList.remove('active');
        ActiveCl.classList.remove('active');
        ActiveAd.classList.add('active');
        ActiveAr.classList.remove('active');

        addAticlebtn.innerHTML = "";
        const adminHTML = `
        
                <main class="table">
                <br>
                <br>
                <br>
                <section class="table__body">
                <table>
                    <thead>
                    <tr>
                        <th>Nom et Prénom<span class="icon-arrow">&UpArrow;</span></th>
                        <th style="text-align: center !important;">eMail<span class="icon-arrow">&UpArrow;</span></th>
                        <th style="text-align: center !important;">Contacts<span class="icon-arrow">&phone;</span></th>
                        <th style="text-align: center !important;">Statut<span class="icon-arrow">&UpArrow;</span></th>
                    </tr>
                    </thead>
                    <tbody id="tbody-admin">
                    
                    </tbody>
                </table>

                </section>
            </main>
        `;

        adminiSpace.innerHTML = adminHTML

        {
            const tbodyId = document.getElementById('tbody-admin');
            tbodyId.innerHTML = '';

            AdminData.forEach(admin => {
                const adminTBODY =
                    `
                    <tr  style="cursor: pointer" data-toggle="modal" data-target="#optionClient" onclick="optionClientView('${admin._id}', 'admin')" >
                        <td class="" style="color: #ffffff !important;"> 
                        ${admin.nom} ${admin.prenom}
                        </td>
                        <td class="" style="color: #ffffff !important; text-align: center !important">
                        ${admin.email}
                        </td>
                        <td class="" style="color: #ffffff !important; text-align: center !important;">
                            <strong>${admin.phone}</strong>
                        </td>
                        <td class="" style="text-align: center !important;">
                            <p class="status shipped">Actif</p>
                        </td>
                    </tr>
                    `;

                tbodyId.innerHTML += adminTBODY;

            });

        }
    } else if (where === "articles") {
        ActiveDas.classList.remove('active');
        ActiveCo.classList.remove('active');
        ActiveCl.classList.remove('active');
        ActiveAd.classList.remove('active');
        ActiveAr.classList.add('active');


        function isMobileDevice() {
            const userAgent = navigator.userAgent.toLowerCase();
            return userAgent.includes('mobile');
        }
        if (isMobileDevice()) {

            const livecha = document.getElementById('add-article');

            setTimeout(() => {
                livecha.classList.add('active');
            }, 1000);


            const articlesHTML = `
                        <br>
                        <br>
                        <br>
                        <div class="articlerow">
                            ${articlesData.map(pani => {
                                
                return `
                                <div class="articlerowsub" >
                                    <div class="title">
                                        <div class="leftone">
                                            <p style="max-height: 50px; overflow: hidden;">${pani.addarticle}</p>
                                            <p>Quantité: ${pani.quantity}</p>
                                            <p>Prix: ${pani.addprix} F</p>
                                        </div>
                                        <div class="rightone">
                                            <p class="status">Statut</p>
                                            <p class="sta shipp"  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="optionEditeView('${pani._id}')">Ouvrir</p>
                                            <div style="height: 5px"></div>
                                            <p  class="sta" style="font-size: 14px; background-color: ${pani.quantity > 0 ? "#054846" : "rgba(255, 0, 89, 0.341)"}; font-weight: bold; color: ${pani.quantity > 0 ? "#ffffff" : "red"}">${pani.quantity > 0 ? "Disponible" : "Finis"}</p>
                                        </div>
                                    </div>
                                    <div class="imaros">
                                        <div style="background-color: ${pani.addcoul.substring(0, 7)};">
                                            <img src="${pani.image[0].ima}" alt="image1">
                                        </div>
                                        <span style="width: 10px;"></span>
                                        <div style="background-color: ${pani.addcoul.substring(8, 15)};">
                                            <img src="${pani.image[1].ima}" alt="image2">
                                        </div>
                                        <span style="width: 10px;"></span>
                                        <div style="background-color: ${pani.addcoul.substring(16, 23)};">
                                            <img src="${pani.image[2].ima}" alt="image3">
                                        </div>
                                        <span style="width: 10px;"></span>
                                        <div style="background-color: ${pani.addcoul.substring(24, 31)};">
                                            <img src="${pani.image[3].ima}" alt="image4">
                                        </div>
                                        <span style="width: 10px;"></span>
                                        <div style="background-color: ${pani.addcoul.substring(32, 39)};">
                                            <img src="${pani.image[4].ima}" alt="image5">
                                        </div>
                                    </div>
                                </div>
                            `;
            }).join('')}
                        </div>

                        `;

            adminiSpace.innerHTML = articlesHTML;


        } else {
            addAticlebtn.innerHTML = `
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addArticle">
                Ajouter
            </button>
    
    `;

            const articlesHTML = `
                <main class="main">
                <br>
                <br>
                <br>
                <section class="main__section">
                    <table>
                        <thead>
                            <tr>
                                <th>Image <span class="icon-arrow">&UpArrow;</span></th>
                                <th>Détails <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Prix Unité <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;">Quantité <span class="icon-arrow">&UpArrow;</span></th>
                                <th style="text-align: center !important;"> Action <span class="icon-arrow">&UpArrow;</span></th>
                            </tr>
                        </thead>
                        <tbody id="tbody-data">
                          
                            

                        </tbody>
                    </table>
                </section>
            </main>
        `;
            adminiSpace.innerHTML = articlesHTML

            {
                const tbodyId = document.getElementById('tbody-data');
                tbodyId.innerHTML = '';

                articlesData.forEach(pani => {
                    const panierTBODY =
                        `
                    <tr  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="optionEditeView('${pani._id}')" >
                        <td class=""> 
                            <img src="${pani.image[0].ima}" alt="">
                        </td>
                        <td class="" style="color: #ffffff !important">
                            <a style="color: #ffffff !important">${pani.addarticle}</a>
                            <ul>
                                <li>Color: <span style="background-color: ${pani.addcoul.substring(8, 15)} !important; color: #ffffff; padding-left: 5px; padding-right: 5px">${pani.addcoul.substring(8, 15)}</span></li>
                                <li>Size: <span>${pani.addtail}</span></li>
                                <li>Material: <span>${pani.addmateri}</span></li>
                                <li>Type de produit: <span>${pani.addtype}</span></li>
                            </ul>
                        </td>
                        <td style="color: #ffffff !important; text-align: center !important;"> 
                            <strong> ${pani.addprix} F </strong>
                        </td>
                
                        <td class="" style="color: #ffffff !important; text-align: center !important;">
                            ${pani.quantity}
                        </td>
                    
                        <td class="">
                            <p class="status ${pani.quantity > 0 ? "shipped" : "cancelled"}">${pani.quantity > 0 ? "Disponible" : "Finis"}</p>
                        </td>
                    </tr>
                    `;

                    tbodyId.innerHTML += panierTBODY;

                });

            }
        }
    }
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

const NavBaractivity = async () => {
    const items = await sendRequestforOrderget('GET', 'orders/matasa');
    await openOrdersDatabase();
    await clearOrder();
    await addOrders(items);
    //const items = [{ articles: [{ statut: "review" }, { statut: "review" }, { statut: "review" }] }];
    const ordernotif = [];

    let odernotnu = 0;
    let totalSold = 0;
    if (items.length > 0) {
        items.forEach((pan) => {
            pan.articles.forEach((pani) => {
                totalSold += pani.statut == "done" ? pani.prix * pani.quantcho : 0;
                if (pani.statut == "review") {
                    odernotnu += 1;
                    if (ordernotif.length < 3) {
                        ordernotif.push(pan);
                    }
                }

            });
        });

        const odernotifi = document.getElementById('odernotifi');
        odernotifi.innerHTML = '';
        document.getElementById('recetteMoney').innerText = `${totalSold} F.CFA`;

        if (odernotnu > 0) {
            document.getElementById('CommandesNum').innerText = odernotnu;
            const odernotifiHTML = `
    
                    <i class="fa fa-bell-o"></i>
                    <span class="badge blue" style="background-color: rgb(255, 0, 98);">${odernotnu}</span>
    
                        `;
            odernotifi.innerHTML = odernotifiHTML;
            const notification_header = document.getElementById('notification_header');
            notification_header.innerHTML = `
            <li>
                <div class="notification_header">
                    <h3>Vous avez ${odernotnu > 1 ? `<i style='color: red'>${odernotnu}</i>` + " nouvelles commandes en attentes" : "<i style='color: red'>Une</i> nouvelle commande en attente"}</h3>
                </div>
            </li>

            <li>
                <a href="#" class="grid">
                    <div class="user_img"><img src="../assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[0].client.nom + " " + ordernotif[0].client.prenom}</p>
                    <span>${ordernotif[0].articles[0].arti_id.addarticle} ${ordernotif[0].articles[0].prix * ordernotif[0].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            ${ordernotif.length > 1 ?
                    `
               
            <li class="odd">
                <a href="#" class="grid">
                    <div class="user_img"><img src="../assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[1].client.nom + " " + ordernotif[1].client.prenom}</p>
                    <span>${ordernotif[1].articles[0].arti_id.addarticle} ${ordernotif[1].articles[0].prix * ordernotif[1].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            `
                    :
                    ""
                }
            ${ordernotif.length > 2 ?
                    `
            <li>
                <a href="#" class="grid">
                    <div class="user_img"><img src="../assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[2].client.nom + " " + ordernotif[2].client.prenom}</p>
                    <span>${ordernotif[2].articles[0].arti_id.addarticle} ${ordernotif[2].articles[0].prix * ordernotif[2].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            `
                    :
                    ""
                }
            <li>
            <div class="notification_bottom">
                <a style="cursor: pointer" onclick="NafigatioTo('commandes')" class="bg-primary">Traiter les commandes</a>
            </div>
            </li>
            `;

        } else {
            const odernotifiHTML = `
                    <i class="fa fa-bell-o"></i>
                `;
            odernotifi.innerHTML = odernotifiHTML;
        }
    } else {

        const odernotifi = document.getElementById('odernotifi');
        odernotifi.innerHTML = '';
        const odernotifiHTML = `
                    <i class="fa fa-bell-o"></i>
                `;
        odernotifi.innerHTML = odernotifiHTML;
    }


}


async function getArticleOnly() {
    articlesData.length = 0;

    await openArticleDatabase();
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            articlesData.push(cursor.value);
            cursor.continue();
        } else {
            document.getElementById("ajouteencou").innerText = "Ajouter encore"
            NafigatioTo("articles")
        };
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };
}


async function getArticles() {
    ClientData.length = 0;
    AdminData.length = 0;
    let available = 0;
    const User = await sendRequestforOrderget('GET', 'people/persons/matasa');
    User.forEach(user => {
        if (user.admin == "true") {
            AdminData.push(user);
        } else {
            ClientData.push(user);
        }
    })

    document.getElementById('ClientNum').innerText = ClientData.length;

    await openArticleDatabase();
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            articlesData.push(cursor.value);
            available += cursor.value.quantity > 0 ? 1 : 0;
            cursor.continue();
        } else {
            document.getElementById('availableArticle').innerText = available;

        };
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };
}


async function Disconexion() {
    await openOrdersDatabase();
    await clearOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "login"
};



async function changeStatus(sta) {
    const clid = document.getElementById('clientid').value;
    await sendRequestforOrder('PUT', `people/status/${clid}`, { admin: sta });
    window.location.reload()
};

async function updateUser() {
    const nom = document.getElementById('clientNom').value;
    const prenom = document.getElementById('clientPrenom').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const toUpda = {
        prenom: nom,
        nom: prenom,
        phone: phone,
        email: email,
    }
    const clid = document.getElementById('clientid').value;
    await sendRequestforOrder('PUT', `people/personupdate/${clid}`, toUpda);
    window.location.reload()
};

async function deleteUser() {
    const clid = document.getElementById('clientid').value;

    const myode = await sendRequestforOrderget('GET', `orders/myorder/${clid}`);

    if (myode.length < 1) {
        await sendRequestforOrder('DELETE', `people/${clid}`);
        window.location.reload()
    } else {
        alert("Supprimez dabord ses commandes")
    }

};

function optionClientView(clid, whos) {
    let client = {};
    if (whos === "client") {
        client = ClientData.find(cli => cli._id == clid);

    } else {
        client = AdminData.find(cli => cli._id == clid);
    }
    document.getElementById('clientid').value = clid;
    document.getElementById('clientNom').value = client.nom;
    document.getElementById('clientPrenom').value = client.prenom;
    document.getElementById('clientEmail').value = client.email;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('userStatus').classList.add(`${client.admin === 'false' ? 'btn-info' : client.admin === 'true' ? 'btn-success' : 'btn-dangera'}`);
    document.getElementById('userStatus').innerText = `${client.admin === 'false' ? 'Clien' : client.admin === 'true' ? 'Adminitrateur' : 'Bloqué'}`;


    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    const userid = thisiswhat(`${splo[0]}`);

    const usermodif = document.getElementById('usermodif');

    if (userid == clid) {
        const usermodifHTML = `
        <button type="button" class="btn btn-outline-success" data-dismiss="modal"
            onclick="updateUser()">Modifer
        </button>
    `;
        usermodif.innerHTML = usermodifHTML;
    } else {
        usermodif.innerHTML = "";

    }

};