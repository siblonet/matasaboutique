const authantificationRequest = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(apiUrlfine + endpoint, options);
        const responseData = await response.json();

        if (!response.ok) {
            return { inconnu: "Inconnu" }
        }

        if (responseData.ee) {
            return { invalide: responseData.ee }
        }

        return { token: responseData.token }
    } catch (e) {
        const tohia = document.getElementById('tohia');
        const load = document.getElementById('tohi');
        const errer = document.getElementById('rejected');

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


async function Inscription() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phonea').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if (fname != "" && lname != "" && email != "" && password != "") {
        if (password === confirm) {
            tohia.classList.add("tohi");
            load.classList.remove("tohi");
            load.classList.add("load28");

            const person = {
                prenom: fname,
                nom: lname,
                motdepass: password,
                email: email,
                phone: phone,
                owner: "matasa"
            };


            const response = await authantificationRequest('POST', 'people', person);
            if (response && response.invalide) {
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                errer.classList.add("rejected");
                document.getElementById('nointer').innerText = `Le ${phone} est déjà associé un compte`;

                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 1000);

            } else if (response && response.token) {
                sessionStorage.setItem('tibule', response.token);
                localStorage.removeItem('myLive');

                const splo = response.token.split("°");
                const admin = splo[5];
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");

                window.location.href = admin == "GIFV" ? "admin" : "client"


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
};


async function loGin() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if (phone != "" && password != "") {
        tohia.classList.add("tohi");
        load.classList.remove("tohi");
        load.classList.add("load28");

        const person = {
            phone: phone,
            motdepass: password,
        };

        const response = await authantificationRequest('POST', 'people/login/matasa', person);

        if (response && response.invalide) {
            load.classList.remove("load28")
            load.classList.add("tohi")
            tohia.classList.remove("tohi");
            errer.classList.add("rejected");


            setTimeout(() => {
                errer.classList.remove("rejected");
            }, 1500);

        } else if (response && response.token) {
            sessionStorage.setItem('tibule', response.token);
            localStorage.removeItem('myLive');

            const splo = response.token.split("°");
            const admin = splo[5];
            load.classList.remove("load28")
            load.classList.add("tohi")
            tohia.classList.remove("tohi");
            window.location.href = admin == "GIFV" ? "admin" : "client"

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
    }

}


async function loginCommage() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if (phone != "" && password != "") {
        tohia.classList.add("tohi");
        load.classList.remove("tohi");
        load.classList.add("load28");

        const person = {
            phone: phone,
            motdepass: password,
        };

        const response = await authantificationRequest('POST', 'people/login/matasa', person);

        if (response && response.inconnu) {
            load.classList.remove("load28")
            load.classList.add("tohi")
            tohia.classList.remove("tohi");
            errer.classList.add("rejected");
            document.getElementById('nointer').innerText = "Erreur incconnu, Veuillez re-essayer plus tard";


            setTimeout(() => {
                errer.classList.remove("rejected");
            }, 1500);

        } else if (response && response.token) {
            sessionStorage.setItem('tibule', response.token);
            localStorage.removeItem('myLive');

            const splo = response.token.split("°");
            const name = splo[1];
            const lastname = splo[2];
            const mail = splo[4];
            const mynama = thisiswhat(`${name}â${lastname}`)
            const mynam = thisiswhat(`${name}â${lastname}â${mail}`)
            const myspl = mynam.split(" ");


            document.getElementById('prenomValue').value = myspl[0];
            document.getElementById('prenomValue').disabled = true;
            document.getElementById('nomValue').value = myspl[1];
            document.getElementById('nomValue').disabled = true;
            document.getElementById('motValue').value = password;
            document.getElementById('motValue').disabled = true;
            document.getElementById('confirmezValue').value = password;
            document.getElementById('confirmezValue').disabled = true;
            document.getElementById('emailValue').value = myspl[2];
            document.getElementById('emailValue').disabled = true;
            document.getElementById('telephoneValue').value = phone;
            const connectedor = document.getElementById('connectedor');
            connectedor.innerHTML = '';
            const connectedorHTML =
                `
             
            <div class="user-actions-linear"></div>
    
            <span class="span" style="color: #037703 !important;"> Bienvenue ${mynama}</span>
    
            `;
            connectedor.innerHTML = connectedorHTML;

            load.classList.remove("load28")
            load.classList.add("tohi")
            tohia.classList.remove("tohi");

        } else if (response && response.invalide) {
            load.classList.remove("load28")
            load.classList.add("tohi")
            tohia.classList.remove("tohi");
            errer.classList.add("rejected");
            document.getElementById('nointer').innerText = "Identifiants Incorrect !";


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
    };

}