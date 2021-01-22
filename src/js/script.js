window.addEventListener('resize', function () {
    log();
});

window.addEventListener('load', function () {
    log();
});

function log() {
    console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel`); // Ab ES6
}

function getViewportWidth() {
    return window.innerWidth ||
        document.documentElement.clientWidth;
}

function Raum(nummer, bezeichnung, gebaeude, kapazitaet, ausstattungsmerkmale) {
    this.nummer = nummer;
    this.bezeichnung = bezeichnung;
    this.gebaeude = gebaeude;
    this.kapazitaet = kapazitaet;
    this.ausstattungsmerkmale = ausstattungsmerkmale;
    this.buchungen = [];
    this.addBuchung = function (buchung) {
        this.buchungen.push(buchung);
        this.buchungen.sort((a, b) => b.startzeit - a.startzeit); // Absteigende Sortierung, größte Startzeit am Anfang
    };
}

function Buchung(bezeichnung, startzeit, endzeit, gebuchtVon, anzahlTeilnehmer, beschreibung) {
    this.bezeichnung = bezeichnung;
    this.startzeit = startzeit;
    this.endzeit = endzeit;
    this.gebuchtVon = gebuchtVon;
    this.anzahlTeilnehmer = anzahlTeilnehmer;
    this.beschreibung = beschreibung;
}

let raum1 = new Raum("A.E.01", "Hörsaal", "Emil-Figge-Str. 42", "300 Tischplätze", ["3 Beamer", "2 Whiteboards"]);
let raum2 = new Raum("A.E.02", "Hörsaal", "Emil-Figge-Str. 42", "25 Tischplätze", ["1 Beamer", "1 Tafel"]);

raum1.addBuchung(new Buchung(
    "Erstbesprechung",
    new Date("2022-09-27T09:00:00"),
    new Date("2022-09-27T12:00:00"),
    "Wladislaw Jerokin",
    3,
    "Lorem ipsum dolor sit amet"
));

raum1.addBuchung(new Buchung(
    "Kaffekranz",
    new Date("2022-11-27T09:00:00"),
    new Date("2022-11-27T12:00:00"),
    "Schwarz Braun",
    33,
    "Lorem ipsum dolor sit amet"
))

raum1.addBuchung(new Buchung(
    "Vorlesung",
    new Date("2022-10-27T09:00:00"),
    new Date("2022-10-27T12:00:00"),
    "Schnee Weiß",
    313,
    "Lorem ipsum dolor sit amet"
));

window.onload = function () {
    console.log([raum1, raum2]);

    for(let i = 0; i < raum1.buchungen.length; i++)
        console.log(raum1.buchungen[i]);

    //raum1.buchungen.forEach((a) => console.log(a));

    detailsAddRoomInformation();
    detailsAddRoomBookings();
    dashboardAddEvents();
}

function detailsAddRoomInformation(raum = raum1) {
    const table = document.querySelector(".details-room-information table");

    if(table === null || table === undefined) return;

    function Paar(txt, wert) {
        this.createDOM = function () {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            const td = document.createElement("td");

            th.appendChild(document.createTextNode(txt));
            td.appendChild(document.createTextNode(wert));
            tr.appendChild(th);
            tr.appendChild(td);

            return tr;
        }
    }

    const information = [
        new Paar("Nummer", raum.nummer),
        new Paar("Bezeichnung", raum.bezeichnung),
        new Paar("Gebäude", raum.gebaeude),
        new Paar("Kapazität", raum.kapazitaet),
        new Paar("Ausstattungsmerkmale", raum.ausstattungsmerkmale.join(", "))
    ];

    information.forEach((a) => table.appendChild(a.createDOM()));
}

function detailsAddRoomBookings(raum = raum1) {
    const tbody = document.querySelector("#room-bookings tbody");

    if(tbody === null || tbody === undefined) return;

    raum.buchungen.forEach((a) => {
        const tr = document.createElement("tr");

        const td = [];

        for(let i = 0; i < 4; i++)
            td[i] = document.createElement("td");

        td[0].appendChild(document.createTextNode(a.startzeit.toISOString().split("T")[0].split("-").reverse().join(".")));
        td[1].appendChild(document.createTextNode(a.startzeit.toISOString().split("T")[1].substring(0, 5)));
        td[2].appendChild(document.createTextNode(a.endzeit.toISOString().split("T")[1].substring(0, 5)));

        const link = document.createElement("a");
        link.href = "./booking.html";
        link.appendChild(document.createTextNode(a.bezeichnung));

        td[3].appendChild(link);

        for(let i = 0; i < 4; i++)
            tr.appendChild(td[i]);

        tbody.appendChild(tr);
    })
}

function dashboardAddEvents() {
    const add = document.getElementById("dashboard-add-new");

    if(add === null || add === undefined) return;

    add.addEventListener("click", dashboardAddClickEvent)
}

function dashboardAddClickEvent() {
    let name = prompt("Namen der Kachel eingeben");
    const holder = document.getElementsByClassName("dashboard-main-horizontal-box")[0];
    const last = document.getElementById("dashboard-add-new");
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(name));
    div.appendChild(p);

    holder.insertBefore(div, last);
}