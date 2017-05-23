import { Meteor } from 'meteor/meteor';

import { Polls } from '../imports/api/Polls.js';

import PollsHelper from '../imports/api/PollsHelper.js';

let Ticker = function() {

    let ticker = false;


    function createQuestions() {

        // Tekniikka
        Meteor.call('polls.insert', "jsframework",  9 , "Suosikki JS Framework tai alusta?");
        Meteor.call('polls.insert', "os",           10 , "Käyttöjärjestelmänä käytän mieluiten?");
        Meteor.call('polls.insert', "ide",          4 , "Kirjoitan koodini mieluiten...");
        Meteor.call('polls.insert', "language",     7 , "Jos voisin valita seuraavan projektin pääkielen...");
        Meteor.call('polls.insert', "role",         15 , "Työskentelisin projektissa mieluiten?");
        Meteor.call('polls.insert', "vcs",          12 , "Kun koodi pitää versioda, niin...");
        Meteor.call('polls.insert', "www",          0 , "Ainut oikea selain on!");
        Meteor.call('polls.insert', "tabs",         14 , "Tabeja selaimissani on auki kerralla?");

        // Puheet
        Meteor.call('polls.insert', "clojure",      1 , "Clojure sopii pelikehitykseen, vai sopiiko?");
        Meteor.call('polls.insert', "jython",       3 , "Jythonissa on tulevaisuus! Varmasti?");
        Meteor.call('polls.insert', "go",           5 , "Go on parasta! Onko?");

        // Hauskat
        Meteor.call('polls.insert', "offices",      6 , "Cinian seuraava toimisto pitäisi avata...");
        Meteor.call('polls.insert', "drinks",       13 , "Kun juon, otan...");
        Meteor.call('polls.insert', "music",        2 , "Kun työskentelen, kuuntelen...");

        // DevCon
        Meteor.call('polls.insert', "dcplace",      8, "DEVcon 2018 järjestetään...");
        Meteor.call('polls.insert', "dcbestis",     11, "DEVconin paras osuus on?");
        Meteor.call('polls.insert', "serious",      16, "Vastasin kysymyksiin tosissani?");


        // Vastaukset

        Meteor.call('polls.addanswer', "clojure", "ofcourse", "Toki sopii");
        Meteor.call('polls.addanswer', "clojure", "maybe", "Osaan peleistä");
        Meteor.call('polls.addanswer', "clojure", "notreally", "Ei oikein");
        Meteor.call('polls.addanswer', "clojure", "agreewith", "Komppaan Tuomasta");
        Meteor.call('polls.addanswer', "clojure", "sleeping", "Nukuin, sorry");


        Meteor.call('polls.addanswer', "jython", "ofcourse", "Samaa mieltä");
        Meteor.call('polls.addanswer', "jython", "maybe", "Ehkäpä");
        Meteor.call('polls.addanswer', "jython", "nope", "No ei ole");
        Meteor.call('polls.addanswer', "jython", "agreewith", "Komppaan Topia");
        Meteor.call('polls.addanswer', "jython", "sleeping", "Nukuin edelleen");

        Meteor.call('polls.addanswer', "go", "ofcourse", "Taatusti on");
        Meteor.call('polls.addanswer', "go", "maybe", "Voihan se ollakin");
        Meteor.call('polls.addanswer', "go", "nogo", "No Go");
        Meteor.call('polls.addanswer', "go", "agreewith", "Komppaan Rikua");
        Meteor.call('polls.addanswer', "go", "sleeping", "Just heräsin");

        Meteor.call('polls.addanswer', "serious", "fully", "Tietenkin!");
        Meteor.call('polls.addanswer', "serious", "nearly", "Suurimpaan osaan");
        Meteor.call('polls.addanswer', "serious", "soso", "Suurinpiirtein");
        Meteor.call('polls.addanswer', "serious", "some", "Muutamiin, ehkä");
        Meteor.call('polls.addanswer', "serious", "joke", "Vitsailetko?");
        Meteor.call('polls.addanswer', "serious", "nocomments", "En kommentoi");



        Meteor.call('polls.addanswer', "jsframework", "react", "ReactJS");
        Meteor.call('polls.addanswer', "jsframework", "angularjs", "AngularJS");
        Meteor.call('polls.addanswer', "jsframework", "angular2", "Angular 2");
        Meteor.call('polls.addanswer', "jsframework", "ember", "Ember JS");
        Meteor.call('polls.addanswer', "jsframework", "vue", "Vue JS");
        Meteor.call('polls.addanswer', "jsframework", "vanilla", "Plain old JS");
        Meteor.call('polls.addanswer', "jsframework", "jquery", "Jquery");
        Meteor.call('polls.addanswer', "jsframework", "meteor", "Meteor");
        Meteor.call('polls.addanswer', "jsframework", "jssucks", "Less JS, the better!");


        Meteor.call('polls.addanswer', "os", "win7", "Windows 7");
        Meteor.call('polls.addanswer', "os", "win10", "Windows 10");
        Meteor.call('polls.addanswer', "os", "osx", "OS X");
        Meteor.call('polls.addanswer', "os", "debian", "Debian");
        Meteor.call('polls.addanswer', "os", "ubuntu", "Ubuntu");
        Meteor.call('polls.addanswer', "os", "linux", "Other Linux");
        Meteor.call('polls.addanswer', "os", "android", "Android");
        Meteor.call('polls.addanswer', "os", "msdos", "MS-DOS");
        Meteor.call('polls.addanswer', "os", "solaris", "Solaris");

        Meteor.call('polls.addanswer', "ide", "idea", "IntelliJ");
        Meteor.call('polls.addanswer', "ide", "eclipse", "Eclipse");
        Meteor.call('polls.addanswer', "ide", "Netbeans", "Netbeans");
        Meteor.call('polls.addanswer', "ide", "vstudio", "Visual Studio");
        Meteor.call('polls.addanswer', "ide", "sublime", "Sublime Text");
        Meteor.call('polls.addanswer', "ide", "atom", "Atom");
        Meteor.call('polls.addanswer', "ide", "vim", "Vim");
        Meteor.call('polls.addanswer', "ide", "emacs", "Emacs");
        Meteor.call('polls.addanswer', "ide", "notepad", "Notepad");

        Meteor.call('polls.addanswer', "language", "python", "Python");
        Meteor.call('polls.addanswer', "language", "js", "JavaScript");
        Meteor.call('polls.addanswer', "language", "c", "C");
        Meteor.call('polls.addanswer', "language", "cpp", "C++");
        Meteor.call('polls.addanswer', "language", "java", "Java");
        Meteor.call('polls.addanswer', "language", "csharp", "C#");
        Meteor.call('polls.addanswer', "language", "Clojure", "Clojure");
        Meteor.call('polls.addanswer', "language", "go", "Go");
        Meteor.call('polls.addanswer', "language", "php", "PHP");

        Meteor.call('polls.addanswer', "offices", "turku", "Turkuun");
        Meteor.call('polls.addanswer', "offices", "lappeenranta", "Lappeenrantaan");
        Meteor.call('polls.addanswer', "offices", "oulu", "Ouluun");
        Meteor.call('polls.addanswer', "offices", "tukholma", "Tukholmaan");
        Meteor.call('polls.addanswer', "offices", "pietari", "Pietariin");
        Meteor.call('polls.addanswer', "offices", "lontoo", "Lontooseen");
        Meteor.call('polls.addanswer', "offices", "la", "Los Angalesiin");
        Meteor.call('polls.addanswer', "offices", "tokio", "Tokioon");
        Meteor.call('polls.addanswer', "offices", "kuu", "Kuuhun");


        Meteor.call('polls.addanswer', "dcplace", "tampere", "Tampereella");
        Meteor.call('polls.addanswer', "dcplace", "hesa", "Helsingissä");
        Meteor.call('polls.addanswer', "dcplace", "jyvaskyla", "Jyväskylässä");
        Meteor.call('polls.addanswer', "dcplace", "laiva", "Risteilyllä");
        Meteor.call('polls.addanswer', "dcplace", "cabin", "Mökillä");
        Meteor.call('polls.addanswer', "dcplace", "never", "Ei enään ikinä!");

        Meteor.call('polls.addanswer', "dcbestis", "intspeak", "Oman väen esitykset");
        Meteor.call('polls.addanswer', "dcbestis", "extspeak", "Keynote puhuja");
        Meteor.call('polls.addanswer', "dcbestis", "gallaria", "Demo Galleria");

        Meteor.call('polls.addanswer', "role", "front", "Front-End koodarina");
        Meteor.call('polls.addanswer', "role", "fullstack", "Full Stack koodarina");
        Meteor.call('polls.addanswer', "role", "backend", "Backend koodarina");
        Meteor.call('polls.addanswer', "role", "devops", "DevOps");
        Meteor.call('polls.addanswer', "role", "maint", "Ylläpitäjänä");
        Meteor.call('polls.addanswer', "role", "test", "Testaajana");
        Meteor.call('polls.addanswer', "role", "pp", "Projektipäällikkönä");
        Meteor.call('polls.addanswer', "role", "sales", "Myyjänä");
        Meteor.call('polls.addanswer', "role", "client", "Asiakkaana");

        Meteor.call('polls.addanswer', "vcs", "cvs", "CVS");
        Meteor.call('polls.addanswer', "vcs", "clearcase", "Clearcase");
        Meteor.call('polls.addanswer', "vcs", "svn", "SVN");
        Meteor.call('polls.addanswer', "vcs", "git", "GIT");
        Meteor.call('polls.addanswer', "vcs", "hg", "Mercurial");
        Meteor.call('polls.addanswer', "vcs", "bazaar", "Bazaar");
        Meteor.call('polls.addanswer', "vcs", "perforce", "Perforce");
        Meteor.call('polls.addanswer', "vcs", "disc", "Verkkolevy");
        Meteor.call('polls.addanswer', "vcs", "nope", "En tartte");

        Meteor.call('polls.addanswer', "drinks", "water", "Vettä");
        Meteor.call('polls.addanswer', "drinks", "milk", "Maitoa");
        Meteor.call('polls.addanswer', "drinks", "cola", "Colaa");

        Meteor.call('polls.addanswer', "drinks", "beer", "Oluen");
        Meteor.call('polls.addanswer', "drinks", "cider", "Siiderin");
        Meteor.call('polls.addanswer', "drinks", "long", "Lonkeron");

        Meteor.call('polls.addanswer', "drinks", "wine", "Viinin");
        Meteor.call('polls.addanswer', "drinks", "whisky", "Viskin");
        Meteor.call('polls.addanswer', "drinks", "vodka", "Vodkan");

        Meteor.call('polls.addanswer', "www", "chrome", "Chrome");
        Meteor.call('polls.addanswer', "www", "ff", "Firefox");
        Meteor.call('polls.addanswer', "www", "opera", "Opera");
        Meteor.call('polls.addanswer', "www", "safari", "Safari");
        Meteor.call('polls.addanswer', "www", "ie", "Internet Explorer");
        Meteor.call('polls.addanswer', "www", "edge", "Edge");
        Meteor.call('polls.addanswer', "www", "dragon", "Comodo Dragon");
        Meteor.call('polls.addanswer', "www", "lynx", "Lynx");
        Meteor.call('polls.addanswer', "www", "muu", "Mikä tahansa muu");

        Meteor.call('polls.addanswer', "tabs", "max1", "Korkeintaan 1");
        Meteor.call('polls.addanswer', "tabs", "alle5", "Alle 5");
        Meteor.call('polls.addanswer', "tabs", "5to10", "5 - 10");
        Meteor.call('polls.addanswer', "tabs", "11to20", "11 - 20");
        Meteor.call('polls.addanswer', "tabs", "21to30", "21 - 30");
        Meteor.call('polls.addanswer', "tabs", "31to50", "31 - 50");
        Meteor.call('polls.addanswer', "tabs", "51to75", "51 - 75");
        Meteor.call('polls.addanswer', "tabs", "76to99", "75 - 99");
        Meteor.call('polls.addanswer', "tabs", "liikaa", "Liikaa, ei kykene");

        Meteor.call('polls.addanswer', "music", "good", "Hyvää musaa");
        Meteor.call('polls.addanswer', "music", "bad", "Huonoa musaa");
        Meteor.call('polls.addanswer', "music", "radio", "Radiota");
        Meteor.call('polls.addanswer', "music", "client", "Asiakasta");
        Meteor.call('polls.addanswer', "music", "boss", "Esimiestä");
        Meteor.call('polls.addanswer', "music", "coder", "Naapuria");
        Meteor.call('polls.addanswer', "music", "help",  "Neuvoja");
        Meteor.call('polls.addanswer', "music", "mad",  "Ääntä päässäni");
        Meteor.call('polls.addanswer', "music", "silence", "Hiljaisuutta");
    }

    function reset(startAt, questionLen) {
        startAt = startAt > new Date().getTime() ? startAt : new Date().getTime() + 15000;
        questionLen = questionLen > 0 ? questionLen : 2;
        stop();

        Polls.remove({});
        createQuestions();
        Meteor.call('masterstate.reset', startAt, questionLen);
        Meteor.call('polls.reset');
    }

    function start() {
        let waitTime = PollsHelper.startTime() - new Date().getTime();
        waitTime = waitTime > 0 ? waitTime : 0;
        PollsHelper.setStatusToWaiting();
        Meteor.setTimeout(() => {
            PollsHelper.setStatusToActive();
            PollsHelper.setPoll(0);
            poller();
        }, waitTime);
    }

    function poller() {
        const pollCount = Polls.find().count();
        const pollLife = PollsHelper.getPollLife();

        ticker = Meteor.setInterval(() => {
            const state = PollsHelper.getState();
            console.log("\tTicker: Current Poll", state.currentPoll);
            if(state.currentPoll >= (pollCount - 1)) {
                Meteor.clearInterval(ticker);
                PollsHelper.setPoll(-1);
                PollsHelper.setStatusToDone();
                Meteor.clearInterval(ticker);
            } else {
                PollsHelper.nextPoll();
            }
        },pollLife);
    }


    function stop() {
        Meteor.clearInterval(ticker);
        PollsHelper.setStatusToStopped();
        // PollsHelper.setPoll(-1);
        // PollsHelper.setStatusToDone();
    }

    return {
        reset: reset,
        start: start,
        stop: stop,
        continue: poller
    };
};

let instance = new Ticker();

export default instance;