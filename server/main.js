import '../imports/api/Polls.js'
import '../imports/api/TickerAPI.js';

import UserId from '../imports/api/userid.js';

import { Meteor } from 'meteor/meteor';

import { Polls } from '../imports/api/Polls.js';
import { MasterState } from '../imports/api/MasterState.js';

import PollsHelper from '../imports/api/PollsHelper.js';

import Ticker from './Ticker.js';

Meteor.startup(() => {

    if(Meteor.isDevelopment) {
        console.log("Is development! Nuke everything at startup!");
        Polls.remove({});
        MasterState.remove({});
    }

    if(Meteor.isProduction) {
        console.log("Is Production! BEWARE!");
    }

    if(Polls.find().count() === 0) {
        console.log("Populate questions!");

        // Tekniikka
        Meteor.call('polls.insert', "jsframework",  0 , "Suosikki JS Framework tai alusta?");
        Meteor.call('polls.insert', "os",           1 , "Käyttöjärjestelmänä käytän mieluiten?");
        Meteor.call('polls.insert', "ide",          2 , "Kehitysympäristö suosikkini on?");
        Meteor.call('polls.insert', "language",     3 , "Jos voisin valita seuraavan projektin pääkielen...");
        Meteor.call('polls.insert', "role",         5 , "Työskentelisin projektissa mieluiten?");


        // Hauskat
        Meteor.call('polls.insert', "offices",      4 , "Cinian seuraava toimisto pitäisi avata...");



        // DevCon
        Meteor.call('polls.insert', "dcplace",             6, "DEVcon 2018 järjestetään...");
        Meteor.call('polls.insert', "dcbestis",             7, "DEVconin paras osuus on?");


        // Meteor.call('polls.insert', "",             8, "");
        // Meteor.call('polls.insert', "",             9, "");
        // Meteor.call('polls.insert', "",             10, "");
        // Meteor.call('polls.insert', "",             11, "");
        // Meteor.call('polls.insert', "",             12, "");



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
        Meteor.call('polls.addanswer', "ide", "other", "Something else");

        Meteor.call('polls.addanswer', "language", "python", "Python");
        Meteor.call('polls.addanswer', "language", "js", "JavaScript");
        Meteor.call('polls.addanswer', "language", "c", "C");
        Meteor.call('polls.addanswer', "language", "cpp", "C++");
        Meteor.call('polls.addanswer', "language", "java", "Java");
        Meteor.call('polls.addanswer', "language", "csharp", "C#");
        Meteor.call('polls.addanswer', "language", "Clojure", "Clojure");
        Meteor.call('polls.addanswer', "language", "go", "Go");
        Meteor.call('polls.addanswer', "language", "rust", "Rust");

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
        Meteor.call('polls.addanswer', "dcplace", "muu", "Jossain muualla");
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
        Meteor.call('polls.addanswer', "role", "daboss", "Isona kihona");



    }



    Ticker.reset();
    Ticker.start();

});
