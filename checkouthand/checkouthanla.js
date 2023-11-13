function totalManager() {
    TotalAll('all2', "");

    const token = sessionStorage.getItem('tibule');
    if (token) {
        const splo = token.split("°");
        const phone = splo[3];
        const name = splo[1];
        const lastname = splo[2];
        const mynama = thisiswhat(`${name}â${lastname}`)
        const mynam = thisiswhat(`${phone}`);
        document.getElementById('prenomValue').disabled = true;
        document.getElementById('nomValue').disabled = true;
        document.getElementById('motValue').disabled = true;
        document.getElementById('confirmezValue').disabled = true;
        document.getElementById('emailValue').disabled = true;
        document.getElementById('telephoneValue').value = mynam;
        const connectedor = document.getElementById('connectedor');
        connectedor.innerHTML = '';
        const connectedorHTML =
            `
         
        <div class="user-actions-linear"></div>

        <span class="span" style="color: #037703 !important;"> Bienvenue ${mynama}</span>

        `;
        connectedor.innerHTML = connectedorHTML;
    };
};

totalManager();

async function sendCommen() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    const token = sessionStorage.getItem('tibule');
    if (token) {
        const splo = token.split("°");

        const _id = splo[0];
        const mynam = thisiswhat(`${_id}`);
        const villeValue = document.getElementById('villeValue').value;
        const communeValue = document.getElementById('communeValue').value;
        const adresseValue = document.getElementById('adresseValue').value;
        const telephoneValue = document.getElementById('telephoneValue').value;
        const notesValue = document.getElementById('notes').value;

        if (villeValue && communeValue && adresseValue) {

            const articleOne = {
                articles: [],
                ville: villeValue,
                commune: communeValue,
                lieu: adresseValue,
                phone: telephoneValue,
                note: notesValue,
                owner: "matasa",
                client: mynam,
            };


            TotalAll('sendOrder', articleOne);
        };

    } else {

        const prenomValue = document.getElementById('prenomValue').value;
        const nomValue = document.getElementById('nomValue').value;
        const villeValue = document.getElementById('villeValue').value;
        const communeValue = document.getElementById('communeValue').value;
        const adresseValue = document.getElementById('adresseValue').value;
        const motValue = document.getElementById('motValue').value;
        const confirmezValue = document.getElementById('confirmezValue').value;
        const emailValue = document.getElementById('emailValue').value;
        const telephoneValue = document.getElementById('telephoneValue').value;
        const notesValue = document.getElementById('notes').value;

        if (prenomValue && nomValue && villeValue && communeValue && adresseValue && motValue && emailValue && telephoneValue) {
            if (confirmezValue === motValue) {
                const person = {
                    prenom: prenomValue,
                    nom: nomValue,
                    motdepass: motValue,
                    email: emailValue,
                    phone: telephoneValue,
                    owner: "matasa",
                };

                const response = await CreatClientd(person, 'POST', 'people');  // Await the result
                if (response && response.invalide) {
                    load.classList.remove("load28")
                    load.classList.add("tohi")
                    tohia.classList.remove("tohi");
                    errer.classList.add("rejected");
                    document.getElementById('nointer').innerText = `Le ${telephoneValue} est déjà associé un compte, \n Connectez-vous pour continuer`;

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 1000);

                } else if (response && response.token) {

                    const articleOne = {
                        articles: [],
                        ville: villeValue,
                        commune: communeValue,
                        lieu: adresseValue,
                        phone: telephoneValue,
                        note: notesValue,
                        owner: "matasa",
                        client: response.token,
                    };

                    TotalAll('sendOrder', articleOne);

                } else if (response && response.inconnu) {
                    load.classList.remove("load28")
                    load.classList.add("tohi")
                    tohia.classList.remove("tohi");
                    errer.classList.add("rejected");
                    document.getElementById('nointer').innerText = "Erreur incconnu, Veuillez re-essayer plus tard";


                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 1500);
                }
            } else {
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                errer.classList.add("rejected");
                document.getElementById('nointer').innerText = "Mot de passe n'est pas conform a la confirmation";
                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 3500);
            }

        }
    }

};



const sendRequestOrder = async (method, endpoint, data = null) => {
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

async function CreatClientd(client, method, endpoint) {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (client) {
            options.body = JSON.stringify(client);
        }

        const response = await fetch(apiUrlfine + endpoint, options);
        const responseData = await response.json();

        if (!response.ok) {
            return { inconnu: "Inconnu" }

        }


        if (!response.ok) {
            return { inconnu: "Inconnu" }
        }

        if (responseData.ee) {
            return { invalide: responseData.ee }
        }

        sessionStorage.setItem('tibule', responseData.token);
        const splo = responseData.token.split("°");
        const userid = { token: thisiswhat(splo[0]) }
        return userid;
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

};
