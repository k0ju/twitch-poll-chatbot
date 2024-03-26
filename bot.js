const tmi = require('tmi.js');
const config = require('./config');

var abstimmung = []; // for votes
var user = []; // for users
var mesZeit = new Date(); // timestamp last vote
var postZeit = new Date(); // timestamp last result post

const client = new tmi.client(config);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

// for incoming chat messages
function onMessageHandler(channel, tags, msg, self) {
    if (self) return; // ignore bot messages

    const commandName = msg.trim();

    if (commandName === '1') {
        if (!(user.includes(tags.username))) {
            abstimmung.push(1);
            user.push(tags.username);
            console.log(`* Stimme ${commandName} von ${tags.username} hinzugefügt`);
            zeitfenster();            
        }
    } else if (commandName === '2') {
        if (!(user.includes(tags.username))) {
            abstimmung.push(2);
            user.push(tags.username);
            console.log(`* Stimme ${commandName} von ${tags.username} hinzugefügt`);
            zeitfenster();
        }
    }
}

// determine voting results
function auslesen() {
    let sortiert = abstimmung.toSorted();
    let split = sortiert.indexOf(2);
    let ergebnis;
    let ausgabe;

    if (split < 0) {
        ergebnis = [100, 0];
    } else if (split == 0) {
        ergebnis = [0, 100];
    } else {
        let temp = Math.round((split / sortiert.length) * 100);
        ergebnis = [temp, (100 - temp)];
    }

    ausgabe = "Abstimmungsergebnis: 1 (" + ergebnis[0] + "%) | 2 (" + ergebnis[1] + "%)";
    return ausgabe;
}

// interval check of votes
function zeitfenster() {
    let temp = new Date();
    let differenz = (temp.getTime() - mesZeit.getTime());
    let differenzPost = (temp.getTime() - postZeit.getTime());

    if (differenz < 3000 && abstimmung.length >= 5) {
        mesZeit = temp;
        if (differenzPost > 10000) {
            postZeit = temp;
            client.action(config.channels[0], auslesen());
        }
        console.log("Abstimmung ausgeführt");
    } else if (differenz < 3000 && abstimmung.length > 0) {
        mesZeit = temp;
        console.log("abwarten");
    } else {
        mesZeit = temp;
        abstimmung = [];
        user = [];
        console.log("keine laufende Abstimmung");
    }
}

// confirm connection and set interval
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    setInterval(() => {
        zeitfenster();
    }, 30000);
}