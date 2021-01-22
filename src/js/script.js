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
}
