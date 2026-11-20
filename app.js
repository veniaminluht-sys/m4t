"use strict";
/* =====================================================================
   ANDMED (sisu) · kõik väärtused on rakenduse sees, võrku ei vaja
   ===================================================================== */
const VERSION="2026.11.20-v2";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $=s=>document.querySelector(s);

/* ---------- ikoonid (24×24, 1,75 px joon, nurgeline) ---------- */
const IC={
 plan:'<path d="M12 21s-6.5-5.8-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z"/><path d="M12 8v5M9.5 10.5h5"/>',
 ready:'<path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z"/><path d="M8.3 12.2l2.6 2.6 4.8-5.4"/>',
 flight:'<path d="M10 10h4v4h-4z"/><path d="M10 10L7.2 7.2M14 10l2.8-2.8M10 14l-2.8 2.8M14 14l2.8 2.8"/><circle cx="5.5" cy="5.5" r="2.6"/><circle cx="18.5" cy="5.5" r="2.6"/><circle cx="5.5" cy="18.5" r="2.6"/><circle cx="18.5" cy="18.5" r="2.6"/>',
 after:'<path d="M6 3h9l3 3v15H6z"/><path d="M14.5 3v3.5H18"/><path d="M9 11h6M9 14.5h6M9 18h3.5"/>',
 learn:'<path d="M3.5 5.5h6a2.5 2.5 0 0 1 2.5 2.5v12a2 2 0 0 0-2-2H3.5z"/><path d="M20.5 5.5h-6A2.5 2.5 0 0 0 12 8v12a2 2 0 0 1 2-2h6.5z"/>',
 wx:'<path d="M3 8.5h10.5a2.75 2.75 0 1 0-2.75-2.75"/><path d="M3 12.5h15a3 3 0 1 1-3 3"/><path d="M3 16.5h7"/>',
 air:'<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7.5A4.5 4.5 0 1 0 16.5 12"/><path d="M12 12l7-7"/><path d="M16.5 3.5h3v3"/><circle cx="12" cy="12" r="1"/>',
 risk:'<path d="M12 3l9.8 17.5H2.2z"/><path d="M12 9.5v5"/><path d="M12 17.2v.6"/>',
 chk:'<path d="M5 4.5h14v16H5z"/><path d="M9 2.8h6v3.4H9z"/><path d="M8.3 13l2.4 2.4 5-5"/>',
 sos:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>',
 settings:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><path d="M13 4.5h4v5h-4zM7 14.5h4v5H7z"/>',
 bat:'<path d="M3 7.5h15v9H3z"/><path d="M18 10.5h2.5v3H18"/><path d="M6 10.5v3M9 10.5v3"/>',
 timer:'<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5"/><path d="M9 2.5h6M12 2.5v3.5"/><path d="M18.5 6.5l1.5-1.5"/>',
 gps:'<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22"/>',
 temp:'<path d="M10 14.2V5a2 2 0 0 1 4 0v9.2a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
 eye:'<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 rain:'<path d="M7 15.5a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 8a3.75 3.75 0 0 1 .5 7.5z"/><path d="M8.5 18.5l-1 2.5M12.5 18.5l-1 2.5M16.5 18.5l-1 2.5"/>',
 wave:'<path d="M2 9c2.5-2.2 5-2.2 7.5 0s5 2.2 7.5 0c1.6-1.4 3.3-1.8 5-1.2"/><path d="M2 15c2.5-2.2 5-2.2 7.5 0s5 2.2 7.5 0c1.6-1.4 3.3-1.8 5-1.2"/>',
 storm:'<path d="M13.5 2L5 14h6.5l-1.5 8 9-12.5h-6.5z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/>',
 gust:'<path d="M3 7h8a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 11.5h16a2.5 2.5 0 1 1-2.5 2.5"/><path d="M3 16h5.5a2.5 2.5 0 1 1-2.5 2.5"/><path d="M15 7h4"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
 cloud:'<path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10a4 4 0 0 1-.5 8z"/>',
 turb:'<path d="M3 8c3 0 3 3 6 3s3-3 6-3 3 3 6 3"/><path d="M3 14c3 0 3 3 6 3s3-3 6-3 3 3 6 3"/>',
 play:'<path d="M7 4.5l12.5 7.5L7 19.5z"/>',
 stop:'<path d="M6 6h12v12H6z"/>',
 copy:'<path d="M8 8h12v12H8z"/><path d="M4 16V4h12"/>',
 down:'<path d="M12 3v12M7 10.5l5 5 5-5"/><path d="M4 20.5h16"/>',
 up:'<path d="M12 16V4M7 8.5l5-5 5 5"/><path d="M4 20.5h16"/>',
 cmd:'<path d="M3.5 6.5l5 5-5 5"/><path d="M11 18h9.5"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/>',
 x:'<path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>',
 plus:'<path d="M12 4.5v15M4.5 12h15"/>',
 trash:'<path d="M4 6.5h16M9 6.5V3.5h6v3"/><path d="M6.5 6.5l1 14h9l1-14"/>',
 chev:'<path d="M9 5l7 7-7 7"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',
 notam:'<path d="M4 20V4.5h11l-1.5 4 1.5 4H6"/>',
 layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5"/><path d="M3 17l9 5 9-5" opacity=".5"/>',
 phone:'<path d="M6.5 3h4l1.5 4.5-2.5 1.5a11 11 0 0 0 5.5 5.5l1.5-2.5 4.5 1.5v4a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z"/>',
 signal:'<path d="M5 19v-3M9.5 19v-6M14 19V9M18.5 19V5"/>',
 obstacle:'<path d="M12 2.5v19"/><path d="M8 21.5L12 6l4 15.5"/><path d="M9.4 15.5h5.2"/><path d="M12 2.5h3"/>',
 people:'<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.5a4.5 4.5 0 0 1 6 4.5"/>',
 bird:'<path d="M3 13c3-4 6-4 9 0 3-4 6-4 9 0"/><path d="M8.5 17c1.5-2 3.5-2 5 0"/>',
 doc:'<path d="M5 3h10l4 4v14H5z"/><path d="M8.5 12.5h7M8.5 16h7M8.5 9h3"/>',
 team:'<circle cx="12" cy="7.5" r="3"/><path d="M6.5 20a5.5 5.5 0 0 1 11 0"/><path d="M3 10.5h3M18 10.5h3"/>',
 moon:'<path d="M19.5 15A8 8 0 0 1 9 4.5a8 8 0 1 0 10.5 10.5z"/>',
 nav:'<path d="M12 2.5l7.5 19L12 17l-7.5 4.5z"/>',
 radio:'<path d="M6 9a8.5 8.5 0 0 1 12 0M8.5 11.5a5 5 0 0 1 7 0"/><circle cx="12" cy="14.5" r="1.4"/><path d="M12 16v5.5"/>',
 cam:'<path d="M3 7.5h4l1.5-2.5h7L17 7.5h4v12H3z"/><circle cx="12" cy="13" r="3.8"/>',
 therm:'<path d="M3 7.5h4l1.5-2.5h7L17 7.5h4v12H3z"/><path d="M8 16.5c1.5-3 2.5-3 4 0s2.5 3 4 0"/>',
 fire:'<path d="M12 21.5a6 6 0 0 0 6-6c0-4.5-4-6.5-4.5-11-3 2-6.5 5.5-6.5 9.5"/><path d="M7 14a5 5 0 0 0 5 7.5"/>',
 flag:'<path d="M5 21.5V3.5h12l-2 4 2 4H5"/>',
 home:'<path d="M3.5 11L12 3.5l8.5 7.5"/><path d="M6 9.5v11h12v-11"/><path d="M10 20.5v-6h4v6"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 lock:'<path d="M5.5 10.5h13v10h-13z"/><path d="M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5"/>',
 hex:'<path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z"/>',
 rotate:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4.5h-4.5"/>'
};
const ic=(n,c="")=>`<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||IC.hex}</svg>`;

/* ---------- olekumudel ---------- */
const SW={ok:"OK",warn:"Hoiatus",partial:"Osaline",stale:"Aegunud",missing:"Allikas puudub",unchecked:"Kontrollimata",stop:"Peata"};
const FILL={ok:1,warn:.72,partial:.5,stale:.32,missing:0,unchecked:0,stop:1};
const chip=s=>`<span class="chip ${s}"><i class="mk"></i>${SW[s]}</span>`;
const prov=a=>`<span class="prov">${a.filter(Boolean).map(esc).join("<i>·</i>")}</span>`;

/* ---------- kontrollnimekiri: 7 rühma, 28 punkti ---------- */
const CHECK=[
 {g:"Droon",ic:"flight",items:[["prop","Propellerid terved, kinnitatud ja lukus"],["body","Kere, kaamerad ja andurid puhtad, kahjustusteta"],["bats","Akud laetud ja soojad, numbrid märgitud"],["sd","Mälukaart sees, vaba ruumi piisavalt"],["fw","Püsivara ja andmebaasid ajakohased"]]},
 {g:"Pult",ic:"radio",items:[["rc","RC Plus 2 laetud"],["ant","Antennid välja keeratud ja drooni suunas"],["bright","Ekraani heledus väljas loetav"],["link","Ühendus droonini stabiilne"]]},
 {g:"Navigatsioon",ic:"nav",items:[["gnss","GNSS satelliite piisavalt, asukoht lukus"],["comp","Kompass ja IMU ilma hoiatusteta"],["home","Koduasukoht salvestatud"],["rth","RTH kõrgus seatud (takistus + 20 m, vähemalt 30 m)"]]},
 {g:"Õhuruum",ic:"air",items:[["map","EANS droonikaart üle vaadatud"],["notam","NOTAM-id lennualale kontrollitud"],["perm","Luba või kooskõlastus olemas, kui vaja"],["atc","Lennujuhti/AFIS-t teavitatud, kui vaja"]]},
 {g:"Ilm",ic:"wx",items:[["wind","Tuul ja puhangud piirides"],["precip","Sademeid ei ole"],["vis","Nähtavus piisav, VLOS säilib"],["tempc","Temperatuur tootja piirides"]]},
 {g:"Dokumendid ja pädevus",ic:"doc",items:[["pilot","Kaugpiloodi pädevus kehtiv"],["opreg","Operaatori registreering / ülesande alus olemas"],["ins","Kindlustus või asutuse kord kaetud"]]},
 {g:"Meeskond ja ala",ic:"team",items:[["roles","Rollid jaotatud (piloot, vaatleja)"],["comms","Side meeskonnaga toimib"],["area","Stardi- ja maandumisala vaba"],["emland","Hädamaandumiskoht määratud"]]}
];
const CK_ALL=CHECK.flatMap(g=>g.items.map(i=>i[0]));
/* ---------- riskid ---------- */
const RISKS=[
 ["wind","Tuul ja puhangud","wx","Lenda madalamal, hoia tagasitulekuks varu, alusta vastutuult."],
 ["link","Side kadu","radio","Hoia antennid suunatud, väldi takistusi drooni ja puldi vahel, kontrolli RTH-d."],
 ["gnss","GNSS häire","gps","Harjuta ATTI-režiimi, hoia visuaalne kontakt, lenda avatud alal."],
 ["bat","Aku ja külm","bat","Soojenda akud, varu üks lisaaku, naase varem."],
 ["birds","Linnud","bird","Väldi pesitsusalasid, kõrguse muutus rünnaku korral."],
 ["people","Inimesed all","people","Ära lenda üle kogunemiste, tõkesta stardiala."],
 ["manned","Mehitatud õhusõidukid","flight","Kuula raadiot, vaatleja jälgib taevast, lasku kohe."],
 ["obst","Takistused (mastid, kraanad)","obstacle","Uuri ala enne, RTH kõrgus üle takistuste."],
 ["water","Vesi ja paat","wave","Start/maandumine käsitsi, haaramine ettevaatlikult, soolavee puhastus."],
 ["fatigue","Väsimus","moon","Pausid, roteeri piloote, lühemad lennud."],
 ["light","Valgus ja pimedus","sun","Öölennul tuled, termokaamera, pimestuse vältimine."],
 ["emi","Elektromagnetilised häired","signal","Väldi raadiomaste ja kõrgepingeliine, jälgi kompassi hoiatusi."]
];
/* ---------- õhuruumi abiküsimused (ei ole õiguslik otsus) ---------- */
const AIRQ=[
 ["zone","Kas lennuala on EANS-i geoalas?",[["Ei","g"],["Jah, tingimused täidetud","y"],["Jah, luba puudub","r"]]],
 ["aero","Kas lähedal on lennuväli või kopteriväljak?",[["Ei","g"],["Jah, kooskõlastatud","y"],["Jah, kooskõlastamata","r"]]],
 ["alt","Kas plaanitud kõrgus jääb lubatud piiridesse?",[["Jah","g"],["Ei tea","y"],["Ei","r"]]],
 ["notam","Kas kehtiv NOTAM lõikab lennuala või aega?",[["Ei","g"],["Ei tea","y"],["Jah","r"]]],
 ["crowd","Kas lennutakse inimkogunemise kohal?",[["Ei","g"],["Jah","r"]]],
 ["vlos","Kas visuaalne kontakt (VLOS) säilib kogu lennu?",[["Jah","g"],["Vaatlejaga","y"],["Ei","r"]]],
 ["night","Kas tegemist on öölennuga?",[["Ei","g"],["Jah, tuled ja kord olemas","y"]]],
 ["basis","Kas lennu alus (ülesanne/luba) on dokumenteeritud?",[["Jah","g"],["Ei","r"]]]
];
/* ---------- hädaolukorrad (näidistekst) ---------- */
const EMERG=[
 ["link","Side kadunud","radio",[["Ära paanitse","Droon käivitab RTH ise pärast signaali kadu."],["Kontrolli","Antennid, nähtavus droonini, aku protsent."],["Tee","Liigu kõrgemale, suuna antennid, oota sidet."],["Kui ei õnnestu","Teavita lennujuhti/AFIS-t, kui droon võib siseneda kontrollitud alasse."],["Pärast","Märgi aeg ja viimane asukoht, koosta intsidendi raport."]]],
 ["gps","GPS kadunud","gps",[["Ära paanitse","Droon läheb ATTI-režiimi ja triivib tuulega."],["Kontrolli","Kõrgus, kaugus, tuule suund."],["Tee","Juhi käsitsi visuaalse kontaktiga."],["Kui ei õnnestu","Maandu ohutusse kohta; vee kohal eelista kallast."],["Pärast","Logi asukoht; kontrolli kompassi kalibreerimist."]]],
 ["bat","Aku kriitiline","bat",[["Ära paanitse","Sundmaandumine algab ise."],["Kontrolli","Kaugus kaldani või paadini, kõrgus."],["Tee","Juhi otse lähima ohutu maandumiskoha poole."],["Kui ei õnnestu","Kontrollitud maandumine eemal inimestest, ka vette."],["Pärast","Aku kasutusest välja kuni kontrollini."]]],
 ["wind","Tugev tuul","wx",[["Ära paanitse","Hoiatus tähendab, et varu on väike."],["Kontrolli","Kiirus maapinna suhtes ja aku kulu."],["Tee","Lasku madalamale ja liigu vastutuult tagasi."],["Kui ei õnnestu","Maandu lähimasse ohutusse kohta allatuult."],["Pärast","Logi tuuleandmed, vaata üle operatiivpiir."]]],
 ["fly","Droon ei allu","flight",[["Ära paanitse","Proovi RTH-nuppu ja režiimilülitit."],["Kontrolli","Puldi hoiatused, droon nähtaval."],["Tee","Hoia inimesed drooni võimalikult teelt eemal."],["Kui ei õnnestu","Helista 112 ja vajadusel lennujuhile."],["Pärast","Säilita logid, ära kustuta lennuandmeid."]]],
 ["obst","Kokkupõrkeoht","obstacle",[["Ära paanitse","Peata liikumine (pausinupp)."],["Kontrolli","Takistuse kaugus kaamerast ja anduritest."],["Tee","Tõuse vertikaalselt, siis liigu eemale."],["Kui ei õnnestu","Maandu kontrollitult."],["Pärast","Kontrolli propellereid ja kere."]]],
 ["rth","RTH vale suunda","home",[["Ära paanitse","Katkesta RTH."],["Kontrolli","Koduasukoht kaardil ja kompass."],["Tee","Juhi käsitsi tagasi."],["Kui ei õnnestu","Maandu ohutult ja otsi droon üles."],["Pärast","Uuenda koduasukohta enne järgmist lendu."]]],
 ["zone","Sattusin keelualasse","air",[["Ära paanitse","Peata liikumine kohe."],["Kontrolli","Mis ala see on ja kes vastutab."],["Tee","Välju lühimat teed pidi, mitte üle inimeste."],["Kui ei õnnestu","Võta ühendust ala vastutajaga või lennujuhiga."],["Pärast","Märgi aeg ja teekond, koosta raport."]]],
 ["land","Sundmaandumine","flag",[["Ära paanitse","Vali lähim vaba ala."],["Kontrolli","Inimesed, vesi, puud."],["Tee","Lasku aeglaselt, maandu käsitsi."],["Kui ei õnnestu","Hoiata inimesi, eelista vett asustusele."],["Pärast","Tähista koht, korja droon ja akud ettevaatlikult."]]]
];
/* ---------- õpe: küsimused ---------- */
const QUIZ=[
 ["Mis on Matrice 4T tootja maksimaalne tuulekindlus?",["8 m/s","10 m/s","12 m/s","15 m/s"],2,"Tootja piir on 12 m/s. Sinu operatiivpiir (vaikimisi 8 m/s) peab olema sellest madalam."],
 ["Milline on Matrice 4T töötemperatuuri vahemik?",["−20…+50 °C","−10…+40 °C","0…+35 °C","−5…+45 °C"],1,"−10…+40 °C. Külmas lüheneb ka lennuaeg."],
 ["Mitu minutit on tootja nimetatud maksimaalne lennuaeg?",["31","42","49","55"],2,"Kuni 49 min ideaaltingimustes. Rakendus vähendab seda tuule ja külma järgi."],
 ["Kas Matrice 4T-l on IP-kaitseklass?",["IP55","IP45","Ei ole","IP67"],2,"4T-l ei ole IP-klassi. Vihmas ei lennata."],
 ["Kuidas arvutab rakendus minimaalse RTH kõrguse?",["Alati 60 m","Kõrgeim takistus + 20 m, vähemalt 30 m","Lennukõrgus × 2","Tootja vaikeväärtus"],1,"max(takistus + 20, 30) meetrit."],
 ["Mida tähendab olek KONTROLLIMATA?",["Väärtus on korras","Keegi ei ole seda kinnitanud","Andmed on vanad","Tootja piir ületatud"],1,"Kontrollimata ei näe kunagi välja nagu OK."],
 ["Puhangud 10,4 m/s, keskmine tuul 6,2 m/s. Mis hoiatab rakendus?",["Midagi","Puhangute vahe on 4,2 m/s","Tootja piir ületatud","Temperatuur"],1,"Vahe 4,2 m/s on lähedal sinu piirile 5 m/s, nii et tuleb hoiatus."],
 ["Mis juhtub, kui asukoht puudub?",["Kasutatakse Pärnu demoasukohta","Ilma ja õhuruumi ei hinnata","Kasutatakse viimast asukohta","Rakendus arvab"],1,"Ilma kinnitatud asukohata ei hinnata midagi."],
 ["Kuidas mõjutab külm lennuaega rakenduse arvutuses?",["Ei mõjuta","−1,8 % iga kraadi kohta alla 10 °C","−5 % iga kraadi kohta","Ainult alla 0 °C"],1,"−1,8 % kraadi kohta alla 10 °C, kuni −25 %."],
 ["Side kaob. Mida droon esimesena teeb?",["Maandub kohe","Hõljub igavesti","Käivitab RTH","Lülitub välja"],2,"Vaikimisi käivitub RTH (kontrolli seadetest)."],
 ["Mida tähendab VLOS?",["Lend nägemisulatuses","Lend öösel","Lend vee kohal","Lend automaatrežiimis"],0,"Visual Line Of Sight: piloot või vaatleja näeb drooni kogu aeg."],
 ["Millal tohib vajutada ALUSTA LENDU?",["Alati","Kui ilm on OK","Kui kõik neli väravat on OK või teadlikult kinnitatud","Kui GPS on olemas"],2,"Lahtiste väravatega start logitakse teadliku otsusena."]
];
const POST=[["dr","Droon ja propellerid üle vaadatud"],["rec","Salvestused olemas ja kopeeritud"],["bat","Akud hoiustatud ohutult"],["salt","Soolaniiskus eemaldatud"],["fault","Vead ja märkused kirja pandud"]];
const TPL=[
 ["sea","Otsing merel","wave",{goal:"Otsing merel",alt:60,radius:1200,dur:75,bats:4,obst:25}],
 ["port","Sadama kontroll","flag",{goal:"Sadama kontroll",alt:40,radius:500,dur:30,bats:2,obst:35}],
 ["border","Piirilend","nav",{goal:"Piirilend",alt:80,radius:2000,dur:60,bats:3,obst:20}],
 ["doc","Dokumenteerimine","cam",{goal:"Dokumenteerimine",alt:50,radius:300,dur:20,bats:2,obst:20}]
];

/* =====================================================================
   OLEK (salvestatakse ainult sellesse seadmesse)
   ===================================================================== */
const KEY="m4t.neoon.v1";
const now=()=>Date.now();
function fresh(){return{
  v:1,theme:"dark",bgfx:true,auto:true,chkM:{},limits:{opWind:8,gustDiff:5,batMin:30,wxMaxAgeH:3},contacts:[["Hädaabi","112"]],
  plan:{name:"",lat:"",lon:"",locSrc:"",locAt:0,date:new Date().toISOString().slice(0,10),time:"",goal:"",alt:60,radius:1000,dur:45,bats:3,obst:20,tpl:""},
  wx:{f:{},src:"",at:0,confirmed:0},air:{a:{},notes:"",confirmed:0},risk:{l:{},confirmed:0},chk:{},
  flight:{n:1,run:false,start:0,acc:0,w1:false,w2:false},log:[],post:{},inc:{},quiz:{},recent:[],ev:[]};}
let S;
/* Turvalisus: kõik salvestatud või imporditud andmed läbivad tüübikontrolli ja piirangud (ei usalda sisendit) */
const clampN=(v,lo,hi,d)=>{const n=typeof v==="number"?v:parseFloat(String(v??"").replace(",","."));return isFinite(n)?Math.min(hi,Math.max(lo,n)):d};
const str=(v,max=200)=>typeof v==="string"?v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"").slice(0,max):"";
const isObj=o=>o&&typeof o==="object"&&!Array.isArray(o);
const pick=(o,keys,fn)=>{const r={};if(!isObj(o))return r;for(const k of keys)if(k in o){const v=fn(o[k],k);if(v!==undefined)r[k]=v}return r};
const inR=(v,a,b)=>{const n=parseFloat(v);return v!==""&&v!=null&&isFinite(n)&&n>=a&&n<=b?String(n):""};
function sanitize(o){
  const d=fresh();if(!isObj(o)||o.v!==1)return d;
  d.theme=o.theme==="graphite"?"graphite":"dark";d.bgfx=o.bgfx!==false;d.auto=o.auto!==false;
  const L=o.limits||{};d.limits={opWind:clampN(L.opWind,1,12,8),gustDiff:clampN(L.gustDiff,1,12,5),batMin:clampN(L.batMin,5,60,30),wxMaxAgeH:clampN(L.wxMaxAgeH,.5,24,3)};
  if(Array.isArray(o.contacts))d.contacts=o.contacts.slice(0,20).filter(c=>Array.isArray(c)&&c.length===2).map(c=>[str(c[0],60),str(c[1],30)]).filter(c=>c[0]&&/^[+0-9()\-\s]{3,30}$/.test(c[1]));
  if(!d.contacts.length)d.contacts=[["Hädaabi","112"]];
  const P=o.plan||{};Object.assign(d.plan,{name:str(P.name,80),goal:str(P.goal,80),lat:inR(P.lat,-90,90),lon:inR(P.lon,-180,180),
    locSrc:str(P.locSrc,40),locAt:clampN(P.locAt,0,4e12,0),date:/^\d{4}-\d{2}-\d{2}$/.test(P.date)?P.date:d.plan.date,time:/^\d{2}:\d{2}$/.test(P.time)?P.time:"",
    alt:clampN(P.alt,0,500,60),radius:clampN(P.radius,0,20000,1000),dur:clampN(P.dur,1,600,45),bats:clampN(P.bats,1,20,3),obst:clampN(P.obst,0,500,20),tpl:TPL.some(t=>t[0]===P.tpl)?P.tpl:""});
  const W=o.wx||{},WK=WXF.map(x=>x[0]),ENUM={p:PREC,th:THN,sea:SEA,terr:TERR};
  d.wx={f:pick(W.f,WK,(x,k)=>{if(!isObj(x))return;const v=ENUM[k]?(x.v in ENUM[k]?x.v:undefined):(isFinite(parseFloat(String(x.v).replace(",",".")))?String(clampN(x.v,-100,1000,0)):undefined);return v===undefined?undefined:{v,src:str(x.src,40),at:clampN(x.at,0,4e12,0)}}),
    src:str(W.src,40),at:clampN(W.at,0,4e12,0),confirmed:clampN(W.confirmed,0,4e12,0)};
  const A=o.air||{};d.air={a:pick(A.a,AIRQ.map(q=>q[0]),(v,k)=>{const q=AIRQ.find(x=>x[0]===k);return Number.isInteger(v)&&v>=0&&v<q[2].length?v:undefined}),notes:str(A.notes,4000),confirmed:clampN(A.confirmed,0,4e12,0)};
  const K=o.risk||{};d.risk={l:pick(K.l,RISKS.map(r=>r[0]),v=>[0,1,2].includes(v)?v:undefined),confirmed:clampN(K.confirmed,0,4e12,0)};
  d.chk=pick(o.chk,CK_ALL,v=>v==="ok"||v==="bad"?v:undefined);d.chkM=pick(o.chkM,CK_ALL,v=>v===true?true:undefined);d.chkT=pick(o.chkT,CK_ALL,v=>clampN(v,0,4e12,undefined));
  const F=o.flight||{};d.flight={n:Math.round(clampN(F.n,1,99999,1)),run:F.run===true,start:clampN(F.start,0,4e12,0),acc:clampN(F.acc,0,86400,0),w1:F.w1===true,w2:F.w2===true};
  if(Array.isArray(o.log))d.log=o.log.slice(0,500).filter(isObj).map(l=>({n:Math.round(clampN(l.n,1,99999,1)),start:clampN(l.start,0,4e12,0),dur:Math.round(clampN(l.dur,0,86400,0)),loc:str(l.loc,80),goal:str(l.goal,80)}));
  d.post=pick(o.post,POST.map(p=>p[0]),v=>v===true?true:undefined);
  d.inc=pick(o.inc,["phase","what","cause","act","cons","told"],v=>str(v,4000));
  d.quiz=pick(o.quiz,QUIZ.map((q,i)=>String(i)),v=>typeof v==="boolean"?v:undefined);d.quizA=pick(o.quizA,QUIZ.map((q,i)=>String(i)),v=>Number.isInteger(v)&&v>=0&&v<4?v:undefined);
  if(Array.isArray(o.recent))d.recent=o.recent.filter(r=>typeof r==="string"&&/^[a-z]+$/.test(r)).slice(0,5);
  if(Array.isArray(o.ev))d.ev=o.ev.slice(0,40).filter(isObj).map(e=>({t:clampN(e.t,0,4e12,0),k:str(e.k,4),msg:str(e.msg,160),st:["ok","warn","stop"].includes(e.st)?e.st:""}));
  return d;
}

let saveErr=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));saveErr=false}catch(e){if(!saveErr)toast("Salvestamine ebaõnnestus: andmed kehtivad ainult selle seansi lõpuni.");saveErr=true}}
function ev(k,msg,st){S.ev.unshift({t:now(),k,msg,st});S.ev=S.ev.slice(0,40)}
const U={r:"ready",sheet:null,alarm:false,toast:null,prevGates:null,wxBusy:false,pal:null};

/* =====================================================================
   HINDAMINE
   ===================================================================== */
const num=v=>{if(v===""||v==null)return null;const n=parseFloat(String(v).replace(",","."));return isFinite(n)?n:null};
const hasLoc=()=>num(S.plan.lat)!=null&&num(S.plan.lon)!=null;
const fmtN=(n,d=1)=>n==null?"—":Number(n).toFixed(d).replace(".",",");
const ago=t=>{if(!t)return"";const m=Math.round((now()-t)/60000);return m<1?"just nüüd":m<60?m+" min":m<1440?Math.round(m/60)+" h":Math.round(m/1440)+" p"};
const hhmm=t=>{const d=new Date(t);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};
const utc=()=>{const d=new Date();return String(d.getUTCHours()).padStart(2,"0")+":"+String(d.getUTCMinutes()).padStart(2,"0")+"Z"};

/* ilm: 0..3 tase iga teguri kohta (sama loogika mis MATRiCE 4T-s) */
const WXF=[
 ["w","Tuul","wx","m/s",true],["g","Puhangud","gust","m/s",true],["dir","Tuule suund","compass","°",false],["t","Temperatuur","temp","°C",true],
 ["p","Sademed","rain","",true],["vis","Nähtavus","eye","km",true],["th","Äike","storm","",false],["sea","Merelaine","wave","",false],["terr","Maastik","turb","",false]
];
const PREC={none:"Ei",drizzle:"Uduvihm",rain:"Vihm",snow:"Lumi"},THN={no:"Ei",poss:"Võimalik",yes:"Jah"},SEA={calm:"Rahulik",mod:"Mõõdukas",rough:"Kõrge"},TERR={open:"Avatud",coast:"Rannik/linn",edge:"Metsaserv/järsak"};
function wxEval(){
  const f=S.wx.f,L=S.limits,out={};
  const v=k=>f[k]?f[k].v:null;
  const w=num(v("w")),g=num(v("g")),t=num(v("t")),vis=num(v("vis"));
  out.w=w==null?null:w>12?3:w>L.opWind?2:w>.7*L.opWind?1:0;
  out.g=g==null?null:g>12?3:(w!=null&&g-w>=L.gustDiff)?2:(w!=null&&g-w>=.6*L.gustDiff)?1:0;
  out.t=t==null?null:(t<-10||t>40)?3:(t<0||t>35)?2:t<5?1:0;
  out.p=v("p")==null?null:{none:0,drizzle:2,rain:3,snow:3}[v("p")];
  out.vis=vis==null?null:vis<1?3:vis<3?2:vis<5?1:0;
  out.th=v("th")==null?null:{no:0,poss:2,yes:3}[v("th")];
  out.sea=v("sea")==null?null:{calm:0,mod:1,rough:2}[v("sea")];
  out.terr=v("terr")==null?null:{open:0,coast:1,edge:2}[v("terr")];
  const dir=num(v("dir"));out.dir=dir==null?null:0;
  if(t!=null&&t>=-10&&t<=3&&((out.p||0)>0||(vis!=null&&vis<3)))out.t=3; /* jäätumine */
  return out;
}
const lvlSt=l=>l==null?"missing":l>=3?"stop":l>=1?"warn":"ok";
function batLimit(){const w=num(S.wx.f.w?.v)??0,t=num(S.wx.f.t?.v)??15;
  const wp=Math.min(.30,Math.max(0,w-3)*.035),tp=Math.min(.25,Math.max(0,10-t)*.018);
  return{sec:Math.max(300,Math.round(S.limits.batMin*60*Math.max(.5,1-wp-tp))),wp:Math.round(wp*100),tp:Math.round(tp*100)}}
const rthMin=()=>Math.max((num(S.plan.obst)||0)+20,30);

let _G=null;function gates(){if(_G)return _G;_G=computeGates();queueMicrotask(()=>{_G=null});return _G}
function computeGates(){
  const G={};
  /* 01 ilm */
  {const e=wxEval(),core=["w","g","t","vis","p"],miss=core.filter(k=>e[k]==null).length,mx=Math.max(-1,...Object.values(e).filter(x=>x!=null));
   const age=S.wx.at?(now()-S.wx.at)/3600000:null;let st,sum;
   if(!hasLoc()){st="missing";sum="Asukoht puudub"}
   else if(miss===core.length){st="missing";sum="Ilmaandmeid pole"}
   else if(mx>=3){st="stop";const k=Object.keys(e).find(k=>e[k]>=3);sum=(WXF.find(x=>x[0]===k)||[,"Ilm"])[1]+" üle tootja piiri"}
   else if(age!=null&&age>S.limits.wxMaxAgeH){st="stale";sum="Andmed "+ago(S.wx.at)+" vanad"}
   else if(miss){st="partial";sum=miss+" põhivälja puudu"}
   else if(S.wx.confirmed&&S.wx.confirmed>=S.wx.at){st="ok";sum=mx>0?"Sobib · hoiatused teadvustatud":"Sobib lennuks"}
   else if(S.auto&&mx<=0&&core.every(k=>S.wx.f[k]&&String(S.wx.f[k].src).startsWith("Open-Meteo"))){st="ok";sum="Sobib lennuks · automaatne"}
   else{st=mx>0?"warn":"partial";sum=mx>0?"Hoiatused, kinnita":"Kinnita hinnang"}
   G.wx={st,sum,p:[S.wx.src||"—",S.wx.at?ago(S.wx.at):"",S.plan.name||""]}}
  /* 02 õhuruum: kunagi ise roheline */
  {const a=S.air.a,n=AIRQ.filter(q=>a[q[0]]!=null).length,flags=AIRQ.map(q=>a[q[0]]!=null?q[2][a[q[0]]][1]:null);let st,sum;
   if(!n){st="unchecked";sum="Küsimustik täitmata"}
   else if(flags.includes("r")){st="stop";sum="Punane vastus: sel kujul ei lennata"}
   else if(n<AIRQ.length){st="partial";sum=n+" / "+AIRQ.length+" vastatud"}
   else if(S.air.confirmed){st="ok";sum="Kinnitatud käsitsi "+hhmm(S.air.confirmed)}
   else{st="warn";sum=(flags.filter(x=>x==="y").length||"Kõik")+(flags.includes("y")?" kollast · kinnita":" roheline · kinnita")}
   G.air={st,sum,p:["käsitsi",S.air.confirmed?ago(S.air.confirmed):""]}}
  /* 03 riskid */
  {const l=S.risk.l,n=RISKS.filter(r=>l[r[0]]!=null).length,hi=RISKS.filter(r=>l[r[0]]===2).length,mid=RISKS.filter(r=>l[r[0]]===1).length;let st,sum;
   if(!n){st="unchecked";sum="Hindamata"}
   else if(n<RISKS.length){st="partial";sum=n+" / 12 hinnatud"}
   else if(S.risk.confirmed){st="ok";sum=hi?hi+" kõrget, meetmed kinnitatud":mid?mid+" keskmist, meetmed olemas":"Madalad"}
   else{st="warn";sum=(hi?hi+" kõrget · ":"")+"kinnita meetmed"}
   G.risk={st,sum,p:["käsitsi",S.risk.confirmed?hhmm(S.risk.confirmed):""]}}
  /* 04 kontroll */
  {const ok=CK_ALL.filter(k=>S.chk[k]==="ok").length,bad=CK_ALL.filter(k=>S.chk[k]==="bad").length;let st,sum;
   if(bad){st="stop";sum=bad+" probleemi"}else if(ok===CK_ALL.length){st="ok";sum="28 / 28"}else if(ok){st="partial";sum=ok+" / 28"}else{st="unchecked";sum="0 / 28"}
   const lt=Math.max(0,...Object.values(S.chkT||{}));
   G.chk={st,sum,p:["lend nr "+S.flight.n,lt?hhmm(lt):""]}}
  return G;
}
const GATES=[{id:"wx",nr:"01",n:"Ilm",ic:"wx",r:"wx"},{id:"air",nr:"02",n:"Õhuruum",ic:"air",r:"air"},{id:"risk",nr:"03",n:"Riskid",ic:"risk",r:"risk"},{id:"chk",nr:"04",n:"Kontroll",ic:"chk",r:"chk"}];
function verdict(G){G=G||gates();
  if(Object.values(G).some(g=>g.st==="stop")){const b=GATES.find(x=>G[x.id].st==="stop");return{k:"stop",h:["Lendu ei","alusta"],s:b.n+": "+G[b.id].sum}}
  const open=GATES.filter(x=>G[x.id].st!=="ok");
  if(!open.length)return{k:"ok",h:["Valmis","stardiks"],s:"Kõik neli väravat on kinnitatud"};
  return{k:"open",h:["Ei ole","valmis"],s:open.length+" "+(open.length===1?"värav":"väravat")+" lahti: "+open.map(x=>x.n.toLowerCase()).join(", "),open};
}

/* =====================================================================
   VAATED
   ===================================================================== */
const ROUTES={ready:"Valmidus",plan:"Plaan",wx:"Ilm",air:"Õhuruum",risk:"Riskid",chk:"Kontroll",flight:"Lend",after:"Pärast",learn:"Õpi",settings:"Seaded"};
const RIC={ready:"ready",plan:"plan",wx:"wx",air:"air",risk:"risk",chk:"chk",flight:"flight",after:"after",learn:"learn",settings:"settings"};
function header(){
  const L=hasLoc();
  $("#hd").innerHTML=`<button class="mark" data-go="ready" aria-label="Valmidus">${ic("hex","sm")}M4T</button>
   <div class="loc">${L?`<b>${esc(S.plan.name||"Nimetu ala")}${S.plan.goal?" · "+esc(S.plan.goal):""}</b><span>${fmtN(num(S.plan.lat),4)} N · ${fmtN(num(S.plan.lon),4)} E · ${esc(S.plan.locSrc||"käsitsi")} · ${ago(S.plan.locAt)}</span>`:`<b style="color:var(--unknown)">Asukoht puudub</b><span>Lisa plaani · demoasukohta ei kasutata</span>`}</div>
   <span class="clock" data-utc>${utc()}</span>
   <button class="ib" data-go="settings" aria-label="Seaded">${ic("settings")}</button><button class="ib" data-a="pal" aria-label="Otsing ja käsklused">${ic("search")}</button>
   <button class="sosb" data-a="sos" aria-label="Hädaolukord">${ic("sos","sm")}SOS</button>`;
}
function nav(){
  const G=gates(),cur=["wx","air","risk","chk"].includes(U.r)?"ready":U.r;
  const v=verdict(G),dot=v.k==="ok"?"ok":v.k==="stop"?"stop":"partial";
  const items=[["plan","Plaan"],["ready","Valmidus"],["flight","Lend"],["after","Pärast"],["learn","Õpi"]];
  $("#nav").innerHTML=items.map(([k,n])=>`<button data-go="${k}" ${cur===k?'aria-current="page"':""}>${ic(RIC[k],"")}<span>${n}</span>${k==="ready"?`<span class="dot chip ${dot}"><i class="mk"></i></span>`:""}${k==="flight"&&S.flight.run?`<span class="dot chip ok"><i class="mk"></i></span>`:""}</button>`).join("")
   +`<div class="sep"></div><button class="wide-only" data-go="settings" ${U.r==="settings"?'aria-current="page"':""}>${ic("settings")}<span>Seaded</span></button>`;
}
function pghd(title,icn,right=""){return `<div class="pghd"><h1>${ic(icn,"lg")}${esc(title)}</h1><div class="row">${right}</div></div>`}

/* ---------- VALMIDUS ---------- */
function scopeSvg(){
  const L=hasLoc(),c=60,K=v=>v/4*52,r=Math.min(4,(num(S.plan.radius)||0)/1000);
  const dir=num(S.wx.f.dir?.v),w=num(S.wx.f.w?.v);
  return `<svg class="scope" viewBox="0 0 120 120" role="img" aria-label="${L?"Skeem: lennuring "+fmtN(r)+" km":"Asukoht puudub"}">
   ${[1,2,3,4].map(k=>`<circle class="r" cx="${c}" cy="${c}" r="${K(k)}"/>`).join("")}
   <line class="ax" x1="${c}" y1="4" x2="${c}" y2="116"/><line class="ax" x1="4" y1="${c}" x2="116" y2="${c}"/><text x="${c+2}" y="10">N</text><text x="${c+K(4)-14}" y="${c-3}">4km</text>
   ${L?`<circle class="fr" cx="${c}" cy="${c}" r="${K(r).toFixed(1)}"/>
   ${dir!=null&&w!=null?(()=>{const a=dir*Math.PI/180,x1=c+Math.sin(a)*46,y1=c-Math.cos(a)*46,x2=c+Math.sin(a)*28,y2=c-Math.cos(a)*28;return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="var(--screen-ink)" stroke-width="2"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="2" fill="var(--screen-ink)"/>`})():""}
   <circle cx="${c}" cy="${c}" r="2.6" fill="var(--screen-accent)"/><text x="6" y="116">SKEEM · EI OLE KAART</text>`
   :`<text x="${c}" y="${c+3}" text-anchor="middle" style="fill:var(--unknown);font-size:10px">NO FIX</text>`}</svg>`;
}
function tel(id,G){
  if(id==="wx"){const w=num(S.wx.f.w?.v),g=num(S.wx.f.g?.v);if(w==null&&g==null)return `<svg class="tel" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true"><line x1="0" x2="120" y1="7" y2="7" stroke="var(--stop)" opacity=".4"/></svg>`;
    const y=v=>28-Math.min(16,v)/16*28,op=S.limits.opWind,bar=(x,v,c)=>v==null?"":`<rect x="${x}" y="${y(v)}" width="22" height="${28-y(v)}" fill="${c}"/>`;
    return `<svg class="tel" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true">${bar(8,w,w>12?"var(--stop)":w>op?"var(--warn)":"var(--ink-muted)")}${bar(40,g,g>12?"var(--stop)":g>op?"var(--warn)":"var(--ink-muted)")}<line x1="0" x2="120" y1="${y(12)}" y2="${y(12)}" stroke="var(--stop)" stroke-width="1.2"/><line x1="0" x2="120" y1="${y(op)}" y2="${y(op)}" stroke="var(--warn)" stroke-dasharray="3 2"/></svg>`}
  if(id==="air"){const n=AIRQ.length;return `<div class="cells r12" style="grid-template-columns:repeat(${n},1fr)">${AIRQ.map(q=>{const a=S.air.a[q[0]];const f=a==null?"":q[2][a][1];return `<i class="${f==="g"?"f":f==="y"?"m":f==="r"?"b":""}"></i>`}).join("")}</div>`}
  if(id==="risk")return `<div class="cells r12">${RISKS.map(r=>{const l=S.risk.l[r[0]];return `<i class="${l===0?"f":l===1?"m":l===2?"p":""}"></i>`}).join("")}</div>`;
  return `<div class="cells">${CK_ALL.map(k=>`<i class="${S.chk[k]==="ok"?"f":S.chk[k]==="bad"?"b":""}"></i>`).join("")}</div>`;
}
function startB(c){const v=verdict();return v.k==="ok"?`<button class="btn go full ${c}" data-a="start" style="min-height:64px">${ic("play")}Alusta lendu</button>`:`<button class="btn held full ${c}" data-a="start" style="min-height:64px">${ic("lock")}Start ootel · ${v.k==="stop"?"peata":v.open.length+" lahti"}</button>`}
function vReady(){
  const G=gates(),v=verdict(G),L=hasLoc();
  const log=S.ev.slice(0,6);
  return `<div class="pg"><div class="grid2"><div class="stack">
   <section class="panel screen" aria-label="Otsus">
    <div class="lbl" style="display:flex;justify-content:space-between"><span>// GO-NO-GO · LEND ${String(S.flight.n).padStart(3,"0")}</span><span data-utc>${utc()}</span></div>
    <h1 class="verdict ${v.k==="ok"?"ok":v.k==="stop"?"stop":""}">${esc(v.h[0])} <span class="ol">${esc(v.h[1])}</span></h1>
    <p class="why">&gt; ${esc(v.s)}</p>
    <div class="hgrid"><div>
     <div class="bar" aria-hidden="true">${GATES.map(x=>`<div class="seg4 ${G[x.id].st}" data-seg="${x.id}"><i style="--f:${FILL[G[x.id].st]}"></i></div>`).join("")}</div>
     <div class="barl">${GATES.map(x=>`<span>${x.nr}</span>`).join("")}</div>
     <div class="coord">${L?`<span>LAT/LON <b>${fmtN(num(S.plan.lat),4)} · ${fmtN(num(S.plan.lon),4)}</b></span><span>R <b>${fmtN((num(S.plan.radius)||0)/1000)} km</b> · ALT <b>${esc(S.plan.alt)} m</b></span><span>RTH ≥ <b>${rthMin()} m</b></span>`:`<span>${chip("missing")}</span><span>Lisa asukoht plaanis</span>`}</div>
    </div>${scopeSvg()}</div>
   </section>
   ${startB("only-n")}
   <div class="mods">${GATES.map(x=>{const g=G[x.id];return `<button class="mod ${g.st}" data-go="${x.r}" data-g="${x.id}"><span class="id"><b>${ic(x.ic,"sm")}MOD-${x.nr}</b>${chip(g.st)}</span><span class="nm">${x.n}</span>${tel(x.id,G)}<span class="sum">${esc(g.sum)}</span>${prov(g.p)}</button>`}).join("")}</div>
  </div><div class="stack">
   ${startB("only-w")}
   <div class="row" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s2)"><button class="btn" data-go="plan">${ic("plan")}Plaan</button><button class="btn" data-go="wx">${ic("wx")}Ilm</button></div>
   <section class="panel screen" aria-label="Süsteemilogi"><div class="lbl" style="color:var(--screen-accent);margin-bottom:6px">// süsteemilogi</div>
    <div class="log">${log.length?log.map(e=>`<div>${hhmm(e.t)} <b>${esc(e.k)}</b> <span class="${e.st||""}">${esc(e.msg)}</span></div>`).join(""):`<div>Sündmusi pole. Alusta plaanist.</div>`}</div></section>
   <section class="panel"><h2>${ic("sos")}Hädaolukorrad</h2><div class="picks" style="margin-top:0">${EMERG.slice(0,4).map(e=>`<button data-a="em" data-k="${e[0]}">${ic(e[2])}${esc(e[1])}</button>`).join("")}</div>
    <button class="btn sm full" data-a="sos" style="margin-top:var(--s2)">Kõik 9 olukorda ${ic("chev","sm")}</button></section>
  </div></div></div>`;
}

/* ---------- PLAAN ---------- */
function vPlan(){
  const P=S.plan,b=batLimit(),need=Math.ceil((num(P.dur)||0)/(b.sec/60))+1;
  const f=(k,lab,type="text",extra="")=>`<label class="fld"><span>${lab}</span><input class="inp" data-p="${k}" type="${type}" value="${esc(P[k])}" ${extra}></label>`;
  return `<div class="pg">${pghd("Lennuplaan","plan",`<button class="btn sm" data-a="copyplan">${ic("copy","sm")}Kopeeri kokkuvõte</button>`)}
  <div class="grid2"><div class="stack">
   <section class="panel"><h2>${ic("layers")}Mall</h2><div class="picks" style="margin-top:0">${TPL.map(t=>`<button data-a="tpl" data-k="${t[0]}" style="${P.tpl===t[0]?"border-color:var(--accent)":""}">${ic(t[2])}<span>${esc(t[1])}<br><small class="prov">${t[3].alt} m · r ${t[3].radius} m · ${t[3].dur} min</small></span></button>`).join("")}</div>
    <p class="note">Mallid annavad algväärtused. Kontrolli need üle iga lennu eel.</p></section>
   <section class="panel"><h2>${ic("gps")}Asukoht</h2>
    <div class="fgrid">${f("name","Ala nimi","text",'placeholder="nt Pärnu laht"')}<label class="fld"><span>Ülesanne</span><input class="inp" data-p="goal" value="${esc(P.goal)}" placeholder="nt Otsing merel"></label>
    ${f("lat","Laius (N)","text",'inputmode="decimal" placeholder="58,3859"')}${f("lon","Pikkus (E)","text",'inputmode="decimal" placeholder="24,4971"')}</div>
    <div class="row" style="margin-top:var(--s3)"><button class="btn sm primary" data-a="gpsfix">${ic("gps","sm")}Võta GPS-ist</button><span class="prov">${hasLoc()?esc(P.locSrc||"käsitsi")+" · "+ago(P.locAt):"Ilma asukohata ilma ega õhuruumi ei hinnata."}</span></div>
   </section>
  </div><div class="stack">
   <section class="panel"><h2>${ic("flight")}Lend</h2>
    <div class="fgrid">${f("date","Kuupäev","date")}${f("time","Algus (kohalik)","time")}
     ${f("alt","Kõrgus (m)","number",'min="0" max="500"')}${f("radius","Raadius (m)","number",'min="0" step="50"')}
     ${f("dur","Kestus (min)","number",'min="1"')}${f("obst","Kõrgeim takistus (m)","number",'min="0"')}
     ${f("bats","Akusid kaasas","number",'min="1"')}</div></section>
   <section class="panel screen"><h2>${ic("bat")}Arvutus</h2><div class="log" style="font-size:13px">
    <div>Lennuaeg aku kohta <b style="width:auto">${Math.floor(b.sec/60)} min</b> <span class="mut">(tuul −${b.wp} %, temp −${b.tp} %)</span></div>
    <div>Akusid vaja <b style="width:auto">${need}</b> <span class="${need>(num(P.bats)||0)?"warn":"ok"}">${need>(num(P.bats)||0)?"· kaasas "+esc(P.bats)+", lisa akusid":"· kaasas "+esc(P.bats)}</span></div>
    <div>Min RTH kõrgus <b style="width:auto">${rthMin()} m</b> <span class="mut">(takistus + 20, vähemalt 30)</span></div></div></section>
  </div></div></div>`;
}

/* ---------- ILM ---------- */
function vWx(){
  const G=gates().wx,e=wxEval(),f=S.wx.f,L=hasLoc();
  const fv=(k)=>{const x=f[k];if(!x||x.v==null||x.v==="")return"—";const v=x.v;
    return k==="p"?PREC[v]:k==="th"?THN[v]:k==="sea"?SEA[v]:k==="terr"?TERR[v]:fmtN(num(v),k==="dir"?0:1)+(k==="dir"?"°":" "+(WXF.find(q=>q[0]===k)[3]))};
  const inp=(k,lab,extra="")=>`<label class="fld"><span>${lab}</span><input class="inp" data-w="${k}" inputmode="decimal" value="${esc(f[k]?.v??"")}" ${extra}></label>`;
  const sel=(k,lab,map)=>`<label class="fld"><span>${lab}</span><select class="inp" data-w="${k}"><option value="">—</option>${Object.entries(map).map(([a,b])=>`<option value="${a}" ${f[k]?.v===a?"selected":""}>${b}</option>`).join("")}</select></label>`;
  return `<div class="pg">${pghd("Ilm","wx",`${chip(G.st)}${prov(G.p)}`)}
  <div class="grid2"><div class="stack">
   <section class="panel screen"><div class="lbl">// värav 01 · ilm</div>
    <h1 class="verdict ${G.st==="ok"?"ok":G.st==="stop"?"stop":""}" style="font-size:clamp(34px,6vw,58px)">${esc(G.sum)}</h1>
    <div class="row" style="margin-top:var(--s4)">
     <button class="btn primary" data-a="omfetch" ${L?"":"disabled"}>${ic("rotate","sm")}${U.wxBusy?"Laen…":"Lae Open-Meteo"}</button>
     <button class="btn ${G.st==="ok"?"":"go"}" data-a="wxok" ${["missing","stop"].includes(G.st)||G.st==="ok"?"disabled":""}>${ic("check","sm")}Kinnita hinnang</button></div>
    <p class="why">${L?"Open-Meteo prognoos plaanitud tunnile. Iga väärtuse juures on allikas ja vanus.":"Asukoht puudub. Lisa see plaanis."}</p>
   </section>
   <section class="panel"><h2>${ic("info")}Tegurid</h2>
    <table class="ftab"><thead><tr><th>Tegur</th><th>Väärtus</th><th>Seis</th><th>Päritolu</th></tr></thead><tbody>
    ${WXF.map(([k,n,icn])=>{const st=lvlSt(e[k]);return `<tr><td class="n">${ic(icn,"sm")}<span>${n}${k==="t"&&e.t===3&&num(f.t?.v)<=3&&num(f.t?.v)>=-10?`<span class="why2">Jäätumisoht</span>`:""}</span></td><td class="v" style="${st==="missing"?"color:var(--unknown)":""}">${fv(k)}</td><td class="s">${chip(k==="dir"&&e.dir!=null?"ok":st)}</td><td class="p">${f[k]?prov([f[k].src,ago(f[k].at)]):'<span class="prov">—</span>'}</td></tr>`}).join("")}
    </tbody></table>
    <p class="note">Tootja piirid on lukus (tuul 12 m/s, −10…+40 °C, IP-klass puudub). Operatiivpiirid saad muuta seadetes.</p></section>
  </div><div class="stack">
   <section class="panel"><h2>${ic("doc")}Käsitsi sisestus</h2>
    <div class="fgrid">${inp("w","Tuul (m/s)")}${inp("g","Puhangud (m/s)")}${inp("dir","Suund, kust puhub (°)")}${inp("t","Temperatuur (°C)")}${inp("vis","Nähtavus (km)")}
     ${sel("p","Sademed",PREC)}${sel("th","Äike",THN)}${sel("sea","Merelaine",SEA)}${sel("terr","Maastik",TERR)}</div>
    <p class="prov" style="margin-top:var(--s3)">Käsitsi muudetud väli saab allikaks „käsitsi“ ja kinnitus tuleb anda uuesti.</p></section>
   <section class="panel"><h2>${ic("layers")}Ametlikud allikad</h2><div class="list">
    ${[["Keskkonnaagentuur · ilmateenistus.ee","https://www.ilmateenistus.ee/"],["Windy",L?`https://www.windy.com/${num(S.plan.lat)}/${num(S.plan.lon)}`:"https://www.windy.com/"],["Lennuilm · EANS","https://lennuilm.ee/"]].map(([n,u])=>`<div class="li"><span class="t">${esc(n)}</span><a class="btn sm" href="${u}" target="_blank" rel="noopener">Ava ${ic("chev","sm")}</a></div>`).join("")}</div></section>
  </div></div></div>`;
}

/* ---------- ÕHURUUM ---------- */
function vAir(){
  const G=gates().air,a=S.air.a,done=AIRQ.every(q=>a[q[0]]!=null),red=AIRQ.some(q=>a[q[0]]!=null&&q[2][a[q[0]]][1]==="r");
  return `<div class="pg">${pghd("Õhuruum","air",`${chip(G.st)}${prov(G.p)}`)}
  <div class="grid2"><section class="panel"><h2>${ic("chk")}Kontrollküsimused</h2>
   <div class="list">${AIRQ.map(([k,q,opts])=>`<div class="li" style="grid-template-columns:1fr"><span class="t">${esc(q)}</span><div class="seg">${opts.map((o,i)=>`<button class="${o[1]}" data-air="${k}" data-i="${i}" aria-pressed="${a[k]===i}">${esc(o[0])}</button>`).join("")}</div></div>`).join("")}</div>
   <p class="note">Abivahend, mitte õiguslik otsus. Riiklikele lendudele võivad kehtida asutuse eraldi reeglid.</p></section>
  <div class="stack"><section class="panel screen"><div class="lbl">// värav 02</div><h1 class="verdict ${G.st==="ok"?"ok":G.st==="stop"?"stop":""}" style="font-size:clamp(28px,5vw,46px)">${esc(G.sum)}</h1>
    <p class="why">Õhuruum ei muutu kunagi ise roheliseks. Vaata kaart ja NOTAM-id üle ning kinnita ise.</p>
    <button class="btn go full" data-a="airok" style="margin-top:var(--s3)" ${!done||red||S.air.confirmed?"disabled":""}>${ic("check","sm")}Vaatasin kaardi ja NOTAM-id üle</button></section>
   <section class="panel"><h2>${ic("notam")}NOTAM ja märkmed</h2><textarea class="inp" data-airnotes placeholder="Kleebi asjakohased NOTAM-id või märkmed">${esc(S.air.notes)}</textarea></section>
   <section class="panel"><h2>${ic("layers")}Allikad</h2><div class="list">
    ${[["EANS droonikaart","https://utm.eans.ee/"],["EANS AIM · NOTAM","https://aim.eans.ee/"],["Transpordiamet · droonid","https://transpordiamet.ee/droonid"]].map(([n,u])=>`<div class="li"><span class="t">${esc(n)}</span><a class="btn sm" href="${u}" target="_blank" rel="noopener">Ava ${ic("chev","sm")}</a></div>`).join("")}</div></section>
  </div></div></div>`;
}

/* ---------- RISKID ---------- */
function vRisk(){
  const G=gates().risk,l=S.risk.l,all=RISKS.every(r=>l[r[0]]!=null);
  return `<div class="pg">${pghd("Riskianalüüs","risk",`${chip(G.st)}<button class="btn sm go" data-a="riskok" ${!all||S.risk.confirmed?"disabled":""}>${ic("check","sm")}Kinnita meetmed</button>`)}
  <section class="panel"><div class="list">${RISKS.map(([k,n,icn,m])=>`<div class="li"><span class="t" style="display:flex;gap:10px;align-items:center">${ic(icn)}${esc(n)}</span>
   <div class="seg">${["Madal","Keskmine","Kõrge"].map((t,i)=>`<button class="${["g","y","r"][i]}" data-risk="${k}" data-i="${i}" aria-pressed="${l[k]===i}">${t}</button>`).join("")}</div>
   ${l[k]>0?`<span class="d">${ic("info","sm")} Meede: ${esc(m)}</span>`:""}</div>`).join("")}</div></section></div>`;
}

/* ---------- KONTROLL ---------- */
function vChk(){
  const G=gates().chk;
  return `<div class="pg">${pghd("Kontroll","chk",`${chip(G.st)}<span class="prov">lend nr ${S.flight.n}</span><button class="btn sm" data-a="chkreset">${ic("rotate","sm")}Tühjenda</button>`)}
  <section class="panel">${CHECK.map(gr=>{const ok=gr.items.filter(i=>S.chk[i[0]]==="ok").length;return `<div class="gh"><h3>${ic(gr.ic)}${esc(gr.g)}</h3><span class="row"><span class="prov">${ok} / ${gr.items.length}</span>${ok<gr.items.length?`<button class="btn sm" data-a="grpok" data-g="${esc(gr.g)}">${ic("check","sm")}Rühm OK</button>`:""}</span></div>
   <div class="list">${gr.items.map(([k,t])=>`<div class="li"><span class="t">${esc(t)}${["wind","precip","vis","tempc"].includes(k)&&S.chk[k]&&!(S.chkM||{})[k]?` <span class="prov">· automaatne ilmast</span>`:""}</span><div class="two"><button class="yes" data-ck="${k}" data-v="ok" aria-pressed="${S.chk[k]==="ok"}">${ic("check","sm")}OK</button><button class="no" data-ck="${k}" data-v="bad" aria-pressed="${S.chk[k]==="bad"}">${ic("x","sm")}Probleem</button></div></div>`).join("")}</div>`}).join("")}
  <p class="note">Neli ilmapunkti täituvad ise ilmaandmetest ja muutuvad koos nendega; puudutus teeb punkti käsitsiks. Iga lend algab tühja nimekirjaga. Kaks eraldi nuppu: topeltpuudutus ei muuda olekut kogemata.</p></section></div>`;
}

/* ---------- LEND ---------- */
const curEl=()=>{const f=S.flight;return f.run?f.acc+(now()-f.start)/1000:f.acc};
const fmtT=s=>{s=Math.max(0,Math.floor(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
function vFlight(){
  const b=batLimit(),el=curEl(),left=b.sec-el,G=gates(),v=verdict(G);
  return `<div class="op">
   <div class="cell timer ${left<=0?"x":left<=120?"w":""}" id="tcell"><h4>${ic("timer","sm")}Lennuaeg · lend nr ${S.flight.n}</h4>
    <div class="tval" id="tval">${fmtT(el)}</div><div class="tsub" id="tsub">Naasmiseni <b>${fmtT(left)}</b> · piir ${fmtT(b.sec)}</div></div>
   <button class="btn run ${S.flight.run?"danger":"go"}" data-a="${S.flight.run?"stop":"run"}">${S.flight.run?ic("stop")+"Stop · lõpeta lend":ic("play")+"Start · droon õhus"}</button>
   <button class="cell" data-go="wx"><h4>${ic("wx","sm")}Ilm</h4><span class="big">${fmtN(num(S.wx.f.g?.v))} m/s</span><span class="mut" style="font-size:13px">puhangud · tuul ${fmtN(num(S.wx.f.w?.v))}</span>${chip(G.wx.st)}</button>
   <button class="cell" data-go="air"><h4>${ic("air","sm")}Õhuruum</h4><span class="big" style="font-size:18px">${esc(G.air.sum)}</span>${chip(G.air.st)}</button>
   <div class="cell"><h4>${ic("obstacle","sm")}Kõrgus · RTH</h4><span class="big">${esc(S.plan.alt)} m</span><span class="mut" style="font-size:13px">RTH ≥ ${rthMin()} m · r ${esc(S.plan.radius)} m</span></div>
   <div class="cell"><h4>${ic("ready","sm")}Valmisolek</h4><span class="big" style="font-size:18px">${esc(v.h.join(" "))}</span>${chip(v.k==="ok"?"ok":v.k==="stop"?"stop":"partial")}</div>
   <button class="sos" data-a="sos">${ic("sos","lg")}Hädaolukord</button>
  </div>`;
}

/* ---------- PÄRAST ---------- */
function vAfter(){
  const I=S.inc;
  return `<div class="pg">${pghd("Pärast lendu","after",`<button class="btn sm" data-a="copylog" ${S.log.length?"":"disabled"}>${ic("copy","sm")}Kopeeri logi (CSV)</button>`)}
  <div class="grid2"><div class="stack">
   <section class="panel"><h2>${ic("timer")}Lennulogi</h2>${S.log.length?`<div class="list">${S.log.map((l,i)=>`<div class="li"><span><span class="t">Lend nr ${l.n} · ${esc(l.loc||"—")}</span><br>${prov([new Date(l.start).toLocaleDateString("et-EE"),hhmm(l.start),fmtT(l.dur),l.goal||""])}</span>
     <button class="ib" data-a="dellog" data-i="${i}" aria-label="Kustuta lend ${l.n}">${ic("trash","sm")}</button></div>`).join("")}</div>`
    :`<div class="empty">${ic("flight","xl")}<b>Lende pole veel logitud</b><span>Lend lisatakse siia, kui vajutad Lend-ekraanil STOP.</span></div>`}</section>
   <section class="panel"><h2>${ic("chk")}Järelkontroll</h2><div class="list">${POST.map(([k,t])=>`<div class="li"><span class="t">${esc(t)}</span><div class="two" style="grid-template-columns:1fr;min-width:110px"><button class="yes" data-post="${k}" aria-pressed="${!!S.post[k]}">${ic("check","sm")}${S.post[k]?"Tehtud":"Märgi"}</button></div></div>`).join("")}</div></section>
  </div>
  <section class="panel"><h2>${ic("doc")}Intsidendi raport</h2>
   <p class="note" style="margin-top:0">Ära sisesta isikuandmeid ega salastatud teavet.</p>
   <div class="fgrid" style="margin-top:var(--s3)">
    ${[["phase","Lennu etapp","select",["","Start","Lend","Naasmine","Maandumine"]],["what","Mis juhtus","area"],["cause","Asjaolud ja põhjus","area"],["act","Piloodi tegevus","area"],["cons","Tagajärjed","area"],["told","Keda teavitati","text"]].map(([k,n,t,o])=>
      t==="select"?`<label class="fld span"><span>${n}</span><select class="inp" data-inc="${k}">${o.map(x=>`<option ${I[k]===x?"selected":""}>${x}</option>`).join("")}</select></label>`
      :t==="area"?`<label class="fld span"><span>${n}</span><textarea class="inp" data-inc="${k}">${esc(I[k]||"")}</textarea></label>`
      :`<label class="fld span"><span>${n}</span><input class="inp" data-inc="${k}" value="${esc(I[k]||"")}"></label>`).join("")}
   </div>
   <div class="row" style="margin-top:var(--s3)"><button class="btn primary" data-a="copyinc">${ic("copy","sm")}Kopeeri raport</button><button class="btn" data-a="clearinc">${ic("trash","sm")}Tühjenda</button></div>
   <p class="prov" style="margin-top:var(--s2)">Raportisse lisatakse automaatselt plaani andmed ja viimase lennu aeg.</p></section>
  </div></div>`;
}

/* ---------- ÕPI ---------- */
function vLearn(){
  const done=Object.keys(S.quiz).length,right=Object.values(S.quiz).filter(x=>x).length;
  return `<div class="pg">${pghd("Õpi","learn",`<span class="prov">${right} / ${QUIZ.length} õigesti</span><button class="btn sm" data-a="quizreset">${ic("rotate","sm")}Alusta uuesti</button>`)}
  <div class="grid2"><section class="panel"><h2>${ic("learn")}Teadmiste test</h2><div class="prog"><i style="width:${done/QUIZ.length*100}%"></i></div>
   <div class="list" style="margin-top:var(--s3)">${QUIZ.map(([q,o,a,ex],i)=>{const r=S.quiz[i];return `<div class="li q" style="grid-template-columns:1fr"><span class="t">${i+1}. ${esc(q)}</span>
    <div class="opts">${o.map((t,j)=>`<button data-q="${i}" data-j="${j}" class="${r!==undefined?(j===a?"right":"")+(r===false&&S.quizA?.[i]===j?" wrong":""):""}" ${r!==undefined?"disabled":""}>${esc(t)}</button>`).join("")}</div>
    ${r!==undefined?`<span class="d">${r?ic("check","sm")+" Õige. ":ic("x","sm")+" Vale. "}${esc(ex)}</span>`:""}</div>`}).join("")}</div></section>
  <div class="stack"><section class="panel"><h2>${ic("sos")}Hädaolukorrad</h2><div class="picks" style="margin-top:0">${EMERG.map(e=>`<button data-a="em" data-k="${e[0]}">${ic(e[2])}${esc(e[1])}</button>`).join("")}</div></section>
   <section class="panel"><h2>${ic("info")}Matrice 4T põhiandmed</h2><div class="list">
    ${[["Tuulekindlus","12 m/s"],["Töötemperatuur","−10…+40 °C"],["Max lennuaeg","49 min"],["IP-klass","puudub (4TD: IP55)"],["Klass","C2"],["Kaamerad","lainurk, tele, termo 640 × 512"]].map(([a,b])=>`<div class="li"><span class="mut">${a}</span><b class="mono" style="font-family:var(--font-mono)">${b}</b></div>`).join("")}</div>
    <p class="note">Tootja andmed. Kontrolli DJI ametlikust spetsifikatsioonist.</p></section></div></div></div>`;
}

/* ---------- SEADED ---------- */
function vSettings(){
  const L=S.limits;
  return `<div class="pg">${pghd("Seaded","settings")}
  <div class="grid2"><div class="stack">
   <section class="panel"><h2>${ic("sun")}Ekraan</h2><div class="fld"><span>Teema</span><div class="seg"><button data-settheme="dark" aria-pressed="${S.theme==="dark"}">Tume</button><button data-settheme="graphite" aria-pressed="${S.theme==="graphite"}">Grafiit</button></div></div>
    <div class="fld" style="margin-top:var(--s3)"><span>Automaatika (GPS, ilm, ilmapunktid)</span><div class="seg"><button data-a="auto" aria-pressed="${S.auto}">${S.auto?"Sees":"Väljas"}</button></div></div>
    <div class="fld" style="margin-top:var(--s3)"><span>Elav kärjetaust</span><div class="seg"><button data-a="bgfx" aria-pressed="${S.bgfx}">${S.bgfx?"Sees":"Väljas"}</button></div></div></section>
   <section class="panel"><h2>${ic("wx")}Operatiivpiirid</h2><div class="fgrid">
    ${[["opWind","Tuul (m/s)"],["gustDiff","Puhangute vahe (m/s)"],["batMin","Lennuaeg aku kohta (min)"],["wxMaxAgeH","Ilm aegub (h)"]].map(([k,n])=>`<label class="fld"><span>${n}</span><input class="inp" data-lim="${k}" type="number" value="${L[k]}"></label>`).join("")}</div>
    <p class="note">Need on näidisväärtused. Sea need oma üksuse korra järgi. Tootja piire muuta ei saa.</p></section>
  </div><div class="stack">
   <section class="panel"><h2>${ic("phone")}Kontaktid</h2><div class="list">${S.contacts.map((c,i)=>`<div class="li"><span><span class="t">${esc(c[0])}</span><br><span class="prov">${esc(c[1])}</span></span><div class="row"><a class="btn sm" href="tel:${esc(c[1].replace(/\s/g,""))}">${ic("phone","sm")}Helista</a>${i?`<button class="ib" data-a="delc" data-i="${i}" aria-label="Kustuta">${ic("trash","sm")}</button>`:""}</div></div>`).join("")}</div>
    <div class="fgrid" style="margin-top:var(--s3)"><input class="inp" id="cn" placeholder="Nimi (nt Pärnu AFIS)"><input class="inp" id="cp" placeholder="Number" inputmode="tel"></div>
    <button class="btn sm" data-a="addc" style="margin-top:var(--s2)">${ic("plus","sm")}Lisa kontakt</button>
    <p class="note">Lisa ainult kontrollitud numbrid oma üksuse korrast.</p></section>
   <section class="panel"><h2>${ic("lock")}Turvalisus</h2><div class="list">
    ${[["Andmed","ainult selles seadmes, pilve ega kontot pole"],["Võrk","ainult Open-Meteo ilm; muud ühendused on keelatud (CSP)"],["Kolmandad osapooled","puuduvad: fonte, analüütikat ega jälgimist pole"],["Sisend","kõik väljad ja import kontrollitakse ja piiratakse"],["Salastatud teave","ÄRA SISESTA: rakendus ei ole akrediteeritud süsteem"]].map(([a,b])=>`<div class="li"><span class="t">${a}</span><span class="prov" style="grid-column:1/-1">${b}</span></div>`).join("")}</div>
    <p class="note">Ehitatud NATO-laadsete põhimõtete järgi (kaitse mitmes kihis, minimaalsed õigused, andmete minimeerimine). Ei ole sertifitseeritud ega akrediteeritud. Kaitse seadet ennast: ekraanilukk ja kettakrüpteering.</p></section>
   <section class="panel"><h2>${ic("doc")}Andmed</h2><p class="mut" style="margin-top:0">Kõik andmed on ainult selles seadmes. Pilve ega kontot pole.</p>
    <div class="row"><button class="btn sm" data-a="export">${ic("down","sm")}Ekspordi JSON</button><button class="btn sm" data-a="import">${ic("up","sm")}Impordi</button><button class="btn sm" data-a="newflight">${ic("plus","sm")}Uus lend</button><button class="btn sm danger" data-a="wipe">${ic("trash","sm")}Kustuta kõik</button></div>
    <p class="prov" style="margin-top:var(--s3)">Versioon ${VERSION}</p></section>
  </div></div></div>`;
}

/* =====================================================================
   RENDER
   ===================================================================== */
const VIEWS={ready:vReady,plan:vPlan,wx:vWx,air:vAir,risk:vRisk,chk:vChk,flight:vFlight,after:vAfter,learn:vLearn,settings:vSettings};
function render(keep){
  document.documentElement.dataset.theme=S.theme;
  document.querySelector('meta[name="theme-color"]').content=S.theme==="graphite"?"#0a0c10":"#05070c";
  const m=$("#main"),st=m.scrollTop;
  header();nav();m.innerHTML=VIEWS[U.r]();
  if(keep)m.scrollTop=st;
  layer();
  const gs=GATES.map(x=>gates()[x.id].st).join(",");
  if(U.r==="ready"&&U.prevGates&&U.prevGates!==gs){const p=U.prevGates.split(","),G=gates();let k=0;GATES.forEach((x,i)=>{if(G[x.id].st==="ok"&&p[i]!=="ok")conduit(x.id,(k++)*180)})}
  U.prevGates=gs;fxTargets();save();if(typeof fxKick==="function")fxKick();
}
function go(r,opt={}){
  if(!VIEWS[r])return;U.r=r;U.sheet=null;
  if(!opt.noRecent){S.recent=[r,...S.recent.filter(x=>x!==r)].slice(0,5)}
  try{history.replaceState(null,"","#"+r)}catch(e){}
  render();$("#main").scrollTop=0;$("#main").focus({preventScroll:true});
}
/* Üks aken korraga: alarm > leht (sheet) > käsupalett. Fookus liigub dialoogi ja tagasi. */
let _lastFocus=null,_lastSheet=null;
function layer(){
  if(U.alarm)U.sheet=null;
  if((U.sheet||U.alarm)&&U.pal){U.pal=null;drawPal()}
  let h="";const s=U.sheet;
  if(s){let b="";
   if(s.k==="sos")b=`<span class="lbl" style="color:var(--stop-ink)">${ic("sos","sm")} Hädaolukord</span><h2>Mis juhtus?</h2><div class="picks">${EMERG.map(e=>`<button data-a="em" data-k="${e[0]}">${ic(e[2])}${esc(e[1])}</button>`).join("")}</div>
     <div class="list" style="margin-top:var(--s4)">${S.contacts.map(c=>`<div class="li"><span class="t">${esc(c[0])} · <span class="mono">${esc(c[1])}</span></span><a class="btn sm danger" href="tel:${esc(c[1].replace(/\s/g,""))}">${ic("phone","sm")}Helista</a></div>`).join("")}</div>
     <div class="acts"><button class="btn" data-a="close">Sulge</button></div>`;
   else if(s.k==="em"){const e=EMERG.find(x=>x[0]===s.e);b=`<span class="lbl" style="color:var(--stop-ink)">${ic(e[2],"sm")} Hädaolukord</span><h2>${esc(e[1])}</h2>
     <ol class="steps">${e[3].map((q,i)=>`<li><b>${i+1}</b><div><strong>${esc(q[0])}</strong><span>${esc(q[1])}</span></div></li>`).join("")}</ol>
     <p class="note">Üldine juhis. Järgi oma üksuse korda.</p><div class="acts"><button class="btn" data-a="sos">${ic("back","sm")}Teised olukorrad</button><button class="btn" data-a="close">Sulge</button></div>`}
   else if(s.k==="start"){const G=gates(),v=verdict(G);b=`<span class="lbl">Stardi kinnitus</span><h2>${v.k==="stop"?"Peata-olek":"Mõni värav on lahti"}</h2>
     <p class="mut">${v.k==="stop"?"Vähemalt üks värav on PEATA. Kui siiski alustad, kirjutatakse logisse põhjus.":"Start ei ole keelatud, aga lahtised väravad logitakse koos sinu kinnitusega."}</p>
     <div class="list">${GATES.filter(x=>G[x.id].st!=="ok").map(x=>`<div class="li"><span class="t">${x.nr} ${x.n} — ${esc(G[x.id].sum)}</span>${chip(G[x.id].st)}</div>`).join("")}</div>
     <div class="acts"><button class="btn primary" data-a="close">Tagasi kontrollima</button><button class="btn" data-a="startok">Alusta teadlikult · logitakse</button></div>`}
   else if(s.k==="stop")b=`<span class="lbl">Lõpeta lend</span><h2>Droon on maandunud?</h2><p class="mut">Kestus ${fmtT(curEl())}. Lend lisatakse logisse.</p>
     <div class="acts"><button class="btn danger" data-a="stopok">${ic("stop","sm")}Jah, lõpeta lend</button><button class="btn" data-a="close">Ei, lend jätkub</button></div>`;
   else if(s.k==="confirm")b=`<h2>${esc(s.t)}</h2><p class="mut">${esc(s.d)}</p><div class="acts"><button class="btn danger" data-a="confirmok">${esc(s.ok)}</button><button class="btn" data-a="close">Tühista</button></div>`;
   else if(s.k==="text")b=`<h2>${esc(s.t)}</h2><textarea class="inp" id="tx" style="min-height:220px;font-family:var(--font-mono);font-size:12px" ${s.ro?"readonly":""}>${esc(s.v||"")}</textarea>
     <div class="acts">${s.dl?`<button class="btn primary" data-a="dl">${ic("down","sm")}Laadi alla</button>`:""}${s.ro?`<button class="btn ${s.dl?"":"primary"}" data-a="copytx">${ic("copy","sm")}Kopeeri</button>`:`<button class="btn primary" data-a="importok">${ic("up","sm")}Impordi</button>`}<button class="btn" data-a="close">Sulge</button></div>`;
   h+=`<div class="veil" data-a="veil"><div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(s.t||({sos:"Hädaolukord",em:"Hädaolukorra juhis",start:"Stardi kinnitus",stop:"Lõpeta lend"})[s.k]||"Dialoog")}">${b}</div></div>`}
  if(U.alarm)h+=`<div class="alarm" role="alertdialog" aria-modal="true" aria-label="Alusta naasmist">${ic("bat","xl")}<span class="mono">AKU PIIR KÄES</span><h2>Alusta<br>naasmist</h2><button class="btn" data-a="alarmok">Selge, naasen</button><button class="btn" data-a="alarmsos" style="background:transparent;color:inherit;border:2px solid currentColor">${ic("sos","sm")}Hädaolukord</button></div>`;
  if(U.toast)h+=`<div class="toast" role="status">${esc(U.toast)}</div>`;
  const opened=(s||U.alarm)&&_lastSheet!==(s||"alarm");
  if(opened&&!_lastSheet)_lastFocus=document.activeElement;
  $("#layer").innerHTML=h;
  document.querySelectorAll("#main,#nav,#hd").forEach(el=>{if(s||U.alarm)el.setAttribute("inert","");else el.removeAttribute("inert")});
  if(opened){const f=$("#layer .sheet button, #layer .sheet textarea, #layer .alarm button");f&&f.focus()}
  if(!s&&!U.alarm&&_lastSheet&&_lastFocus&&document.contains(_lastFocus))_lastFocus.focus();
  _lastSheet=s||(U.alarm?"alarm":null);
}
let tt;function toast(m){U.toast=m;layer();clearTimeout(tt);tt=setTimeout(()=>{U.toast=null;layer()},3000)}
async function copy(t,ok){try{await navigator.clipboard.writeText(t);toast(ok||"Kopeeritud")}catch(e){U.sheet={k:"text",t:"Kopeeri käsitsi",v:t,ro:true};layer()}}

/* =====================================================================
   TEGEVUSED
   ===================================================================== */
function planSummary(){const P=S.plan,G=gates(),v=verdict(G);
  return `OPERATSIOONI KOKKUVÕTE · lend nr ${S.flight.n}\n${P.name||"—"} · ${P.goal||"—"} · ${P.date} ${P.time||""}\nAsukoht: ${hasLoc()?fmtN(num(P.lat),4)+" N, "+fmtN(num(P.lon),4)+" E":"puudub"}\nKõrgus ${P.alt} m · raadius ${P.radius} m · kestus ${P.dur} min · akud ${P.bats} · RTH ≥ ${rthMin()} m\n\nOtsus: ${v.h.join(" ").toUpperCase()} — ${v.s}\n`+GATES.map(x=>`${x.nr} ${x.n}: ${SW[G[x.id].st]} · ${G[x.id].sum}`).join("\n")+`\n\nAbivahend. Ei asenda ametlikke allikaid ega asutuse korda.`}
async function omFetch(silent){
  if(!hasLoc()||U.wxBusy)return;U.wxBusy=true;if(!silent)render(true);
  const lat=num(S.plan.lat),lon=num(S.plan.lon);
  try{
    const u=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weather_code,visibility,wind_speed_10m,wind_gusts_10m,wind_direction_10m&wind_speed_unit=ms&forecast_days=2&timezone=auto`;
    const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),12000);
    const r=await fetch(u,{credentials:"omit",cache:"no-store",signal:ctl.signal});clearTimeout(to);
    if(!r.ok)throw new Error("HTTP "+r.status);if(!/json/.test(r.headers.get("content-type")||""))throw new Error("type");const j=await r.json(),H=j&&j.hourly;
    const okArr=k=>Array.isArray(H&&H[k])&&H[k].length===H.time.length;if(!H||!Array.isArray(H.time)||!H.time.length||H.time.length>400||!["temperature_2m","wind_speed_10m","wind_gusts_10m","wind_direction_10m","weather_code","visibility"].every(okArr))throw new Error("shape");
    const target=(S.plan.date&&S.plan.time)?S.plan.date+"T"+S.plan.time.slice(0,2)+":00":null;
    let i=target?H.time.indexOf(target):-1;if(i<0){const n=new Date();const key=n.toISOString().slice(0,13);i=Math.max(0,H.time.findIndex(t=>t.slice(0,13)>=key.slice(0,13)))}
    const wc=H.weather_code[i],t=now(),src="Open-Meteo "+H.time[i].slice(11,16);
    const LIM={w:[0,80],g:[0,100],dir:[0,360],t:[-60,60],vis:[0,100]};const put=(k,v)=>{if(v==null||v==="")return;if(LIM[k]){const n=parseFloat(v);if(!isFinite(n)||n<LIM[k][0]||n>LIM[k][1])return}S.wx.f[k]={v:String(v),src,at:t}};
    put("w",H.wind_speed_10m[i]?.toFixed(1));put("g",H.wind_gusts_10m[i]?.toFixed(1));put("dir",H.wind_direction_10m[i]);put("t",H.temperature_2m[i]?.toFixed(1));
    if(H.visibility[i]!=null)put("vis",(H.visibility[i]/1000).toFixed(1));
    put("p",wc>=71&&wc<=77||wc===85||wc===86?"snow":wc>=61&&wc<=67||wc>=80&&wc<=82?"rain":wc>=51&&wc<=57?"drizzle":"none");
    put("th",wc>=95?"yes":"no");
    S.wx.src="Open-Meteo";S.wx.at=t;S.wx.confirmed=0;U.net=true;autoChk();ev("wx","prognoos laaditud · Open-Meteo "+H.time[i].slice(11,16),"ok");if(!silent)toast("Ilm laaditud: Open-Meteo, tund "+H.time[i].slice(11,16));
  }catch(e){U.net=false;if(!silent){ev("wx","Open-Meteo ei vastanud","warn");toast("Open-Meteo ei vastanud. Sisesta väärtused käsitsi.")}}
  U.wxBusy=false;render(true);
}
function gpsFix(silent){
  if(!navigator.geolocation){if(!silent)toast("Selles keskkonnas GPS puudub. Sisesta koordinaadid käsitsi.");return}
  navigator.geolocation.getCurrentPosition(p=>{S.plan.lat=p.coords.latitude.toFixed(5);S.plan.lon=p.coords.longitude.toFixed(5);S.plan.locSrc="GPS ±"+Math.round(p.coords.accuracy)+" m";S.plan.locAt=now();
    if(!S.plan.name)S.plan.name="GPS-asukoht";if(!silent||!U.gpsLogged){ev("gps","fix "+fmtN(p.coords.latitude,4)+" N · "+fmtN(p.coords.longitude,4)+" E · ±"+Math.round(p.coords.accuracy)+" m","ok");U.gpsLogged=true}render(true);if(S.auto)autoRun()},
   ()=>{U.gpsDenied=true;if(!silent)toast("GPS-i ei saanud. Luba asukoht või sisesta käsitsi.")},{enableHighAccuracy:true,timeout:15000});
}
/* ---------- AUTOMAATIKA: GPS → ilm → ilmapunktid; kõik on nähtav ja käsitsi ülekirjutatav ---------- */
function autoChk(){
  const e=wxEval(),M=S.chkM||(S.chkM={}),set=(k,v)=>{if(M[k])return;if(v==null)delete S.chk[k];else S.chk[k]=v;S.chkT=S.chkT||{};S.chkT[k]=now()};
  set("wind",e.w==null||e.g==null?null:(e.w>=2||e.g>=2)?"bad":"ok");
  set("precip",e.p==null?null:e.p>0?"bad":"ok");
  set("vis",e.vis==null?null:e.vis>=2?"bad":"ok");
  set("tempc",e.t==null?null:e.t>=3?"bad":"ok");
}
function autoRun(){
  if(!S.auto||S.flight.run&&false)return;
  const gpsOwned=!hasLoc()||String(S.plan.locSrc).startsWith("GPS");
  if(gpsOwned&&!U.gpsDenied&&(!hasLoc()||now()-S.plan.locAt>10*60000)){gpsFix(true);if(!hasLoc())return}
  if(hasLoc()&&U.net!==false&&(!S.wx.at||now()-S.wx.at>30*60000||S.wx.src!=="Open-Meteo"&&!Object.keys(S.wx.f).length)){omFetch(true).then(()=>render(true))}
  if(!S.plan.time){const d=new Date();S.plan.time=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")}
}
setInterval(()=>{if(document.visibilityState==="visible"){if(U.net===false&&Math.random()<.2)U.net=undefined;autoRun()}},60000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")autoRun()});
function startFlight(forced){
  const v=verdict();if(forced)ev("sys","start lahtiste väravatega: "+v.s,"warn");
  U.sheet=null;go("flight");
}
function newFlight(){S.flight={n:S.flight.n+1,run:false,start:0,acc:0,w1:false,w2:false};S.chk={};S.chkT={};S.chkM={};autoChk();S.post={};S.wx.confirmed=0;S.air.confirmed=0;S.risk.confirmed=0;ev("sys","lend nr "+S.flight.n+" loodud · nimekiri tühi","ok")}

document.addEventListener("click",e=>{
  const g=e.target.closest("[data-go]");if(g){go(g.dataset.go);return}
  const t=e.target.closest("[data-settheme]");if(t){S.theme=t.dataset.settheme;render(true);fxResize();return}
  const ck=e.target.closest("[data-ck]");if(ck){const k=ck.dataset.ck,v=ck.dataset.v;S.chkM=S.chkM||{};S.chkM[k]=true;S.chk[k]=S.chk[k]===v?undefined:v;if(S.chk[k]===undefined)delete S.chk[k];S.chkT=S.chkT||{};S.chkT[k]=now();
    const G=gates().chk;if(v==="bad"&&S.chk[k])ev("chk","probleem: "+CHECK.flatMap(x=>x.items).find(i=>i[0]===k)[1].toLowerCase(),"stop");if(G.st==="ok")ev("chk","kontroll 28 / 28","ok");render(true);return}
  const ai=e.target.closest("[data-air]");if(ai){const k=ai.dataset.air,i=+ai.dataset.i;S.air.a[k]=S.air.a[k]===i?undefined:i;if(S.air.a[k]===undefined)delete S.air.a[k];S.air.confirmed=0;render(true);return}
  const rk=e.target.closest("[data-risk]");if(rk){const k=rk.dataset.risk,i=+rk.dataset.i;S.risk.l[k]=i;S.risk.confirmed=0;render(true);return}
  const po=e.target.closest("[data-post]");if(po){const k=po.dataset.post;S.post[k]=!S.post[k];render(true);return}
  const q=e.target.closest("[data-q]");if(q){const i=+q.dataset.q,j=+q.dataset.j;S.quiz[i]=j===QUIZ[i][2];S.quizA=S.quizA||{};S.quizA[i]=j;render(true);return}
  const a=e.target.closest("[data-a]");if(!a)return;const act=a.dataset.a;
  if(act==="veil"&&e.target!==a)return;
  switch(act){
   case "pal":openPal();break;
   case "sos":U.sheet={k:"sos"};layer();break;
   case "em":U.sheet={k:"em",e:a.dataset.k};layer();break;
   case "close":case "veil":U.sheet=null;layer();break;
   case "start":if(verdict().k==="ok"){ev("sys","start: kõik väravad OK","ok");startFlight()}else{U.sheet={k:"start"};layer()}break;
   case "startok":startFlight(true);break;
   case "run":Object.assign(S.flight,{run:true,start:now(),w1:false,w2:false});ev("sys","lend nr "+S.flight.n+" algas","ok");render(true);break;
   case "stop":U.sheet={k:"stop"};layer();break;
   case "stopok":{const d=curEl();S.log.unshift({n:S.flight.n,start:S.flight.start-S.flight.acc*1000,dur:Math.round(d),loc:S.plan.name,goal:S.plan.goal});ev("sys","lend nr "+S.flight.n+" lõppes · "+fmtT(d),"ok");
     const n=S.flight.n;newFlight();U.sheet=null;go("after");toast("Lend nr "+n+" logitud ("+fmtT(d)+"). Uus lend nr "+S.flight.n+" on valmis.");break}
   case "alarmok":U.alarm=false;layer();break;
   case "alarmsos":U.alarm=false;U.sheet={k:"sos"};layer();break;
   case "tpl":{const tp=TPL.find(x=>x[0]===a.dataset.k);Object.assign(S.plan,tp[3],{tpl:tp[0]});ev("sys","mall: "+tp[1].toLowerCase(),"ok");render(true);break}
   case "gpsfix":gpsFix();break;
   case "omfetch":omFetch();break;
   case "wxok":S.wx.confirmed=now();ev("wx","hinnang kinnitatud","ok");render(true);break;
   case "airok":S.air.confirmed=now();ev("air","kinnitatud käsitsi","ok");render(true);break;
   case "riskok":S.risk.confirmed=now();ev("rsk","meetmed kinnitatud","ok");render(true);break;
   case "grpok":{const gr=CHECK.find(x=>x.g===a.dataset.g);S.chkM=S.chkM||{};S.chkT=S.chkT||{};gr.items.forEach(i=>{if(S.chk[i[0]]!=="bad"){S.chk[i[0]]="ok";S.chkM[i[0]]=true;S.chkT[i[0]]=now()}});ev("chk",gr.g.toLowerCase()+": rühm kinnitatud","ok");if(gates().chk.st==="ok")ev("chk","kontroll 28 / 28","ok");render(true);break}
   case "chkreset":U.sheet={k:"confirm",t:"Tühjenda kontrollnimekiri?",d:"Kõik 28 punkti lähevad tagasi olekusse KONTROLLIMATA.",ok:"Tühjenda",fn:()=>{S.chk={};S.chkT={};S.chkM={};autoChk();ev("chk","nimekiri tühjendatud","warn")}};layer();break;
   case "copyplan":copy(planSummary(),"Kokkuvõte kopeeritud");break;
   case "copylog":copy("nr;kuupäev;algus;kestus;ala;ülesanne\n"+S.log.map(l=>[l.n,new Date(l.start).toLocaleDateString("et-EE"),hhmm(l.start),fmtT(l.dur),l.loc||"",l.goal||""].join(";")).join("\n"),"Logi kopeeritud (CSV)");break;
   case "dellog":{const i=+a.dataset.i,l=S.log[i];U.sheet={k:"confirm",t:"Kustuta lend nr "+l.n+"?",d:"Kirjet ei saa taastada.",ok:"Kustuta",fn:()=>{S.log.splice(i,1)}};layer();break}
   case "copyinc":{const I=S.inc,l=S.log[0];copy(`DROONIJUHTUMI TEADE\n${new Date().toLocaleString("et-EE")}\nAla: ${S.plan.name||"—"} (${hasLoc()?fmtN(num(S.plan.lat),4)+" N, "+fmtN(num(S.plan.lon),4)+" E":"asukoht puudub"})\nÜlesanne: ${S.plan.goal||"—"} · kõrgus ${S.plan.alt} m\n${l?"Viimane lend: nr "+l.n+", "+hhmm(l.start)+", "+fmtT(l.dur)+"\n":""}\nEtapp: ${I.phase||"—"}\nMis juhtus: ${I.what||"—"}\nAsjaolud: ${I.cause||"—"}\nPiloodi tegevus: ${I.act||"—"}\nTagajärjed: ${I.cons||"—"}\nTeavitati: ${I.told||"—"}`,"Raport kopeeritud");ev("sys","intsidendi raport koostatud","warn");break}
   case "clearinc":S.inc={};render(true);break;
   case "quizreset":S.quiz={};S.quizA={};render(true);break;
   case "bgfx":S.bgfx=!S.bgfx;render(true);break;
   case "auto":S.auto=!S.auto;render(true);if(S.auto)autoRun();break;
   case "addc":{const n=str($("#cn").value.trim(),60),p=$("#cp").value.trim();if(!n||!/^[+0-9()\-\s]{3,30}$/.test(p)){toast("Sisesta nimi ja korrektne number (ainult numbrid, +, -, tühik)");break}if(S.contacts.length>=20){toast("Kuni 20 kontakti");break}S.contacts.push([n,p]);render(true);break}
   case "delc":S.contacts.splice(+a.dataset.i,1);render(true);break;
   case "export":U.sheet={k:"text",t:"Andmed (JSON)",v:JSON.stringify(S,null,1),ro:true,dl:true};layer();break;
   case "dl":{try{const b=new Blob([$("#tx").value],{type:"application/json"}),u=URL.createObjectURL(b),x=document.createElement("a");x.href=u;x.download="m4t-neoon-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(x);x.click();x.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);toast("Allalaadimine alustatud")}catch(e){toast("Allalaadimine pole siin lubatud. Kasuta kopeerimist.")}break}
   case "import":U.sheet={k:"text",t:"Kleebi eksporditud JSON",v:"",ro:false};layer();break;
   case "importok":{try{const raw=$("#tx").value;if(raw.length>2e6)throw 0;const o=JSON.parse(raw);if(!o||o.v!==1||!o.plan)throw 0;S=sanitize(o);U.sheet=null;ev("sys","andmed imporditud","ok");render();toast("Imporditud")}catch(e){toast("See ei ole selle rakenduse eksport.")}break}
   case "copytx":copy($("#tx").value);break;
   case "newflight":U.sheet={k:"confirm",t:"Alusta uut lendu?",d:"Kontrollnimekiri ja kinnitused tühjenevad. Plaan ja logi jäävad.",ok:"Uus lend",fn:newFlight};layer();break;
   case "wipe":U.sheet={k:"confirm",t:"Kustuta kõik andmed?",d:"Plaan, logi, kinnitused ja seaded kustutatakse sellest seadmest. Tagasi võtta ei saa.",ok:"Kustuta kõik",fn:()=>{S=fresh();U.r="ready"}};layer();break;
   case "confirmok":{const fn=U.sheet.fn;U.sheet=null;fn();render(true);break}
  }
});
document.addEventListener("input",e=>{
  const t=e.target;
  if(t.dataset.p){const k=t.dataset.p;S.plan[k]=str(t.value,80);if(k==="lat"&&num(t.value)!=null&&Math.abs(num(t.value))>90)S.plan[k]="";if(k==="lon"&&num(t.value)!=null&&Math.abs(num(t.value))>180)S.plan[k]="";if(k==="lat"||k==="lon"){S.plan.locSrc="käsitsi";S.plan.locAt=now()}save();header();clearTimeout(U.pt);U.pt=setTimeout(()=>render(true),600)}
  else if(t.dataset.w){const k=t.dataset.w;if(t.value==="")delete S.wx.f[k];else S.wx.f[k]={v:t.value,src:"käsitsi",at:now()};S.wx.src=S.wx.src||"käsitsi";S.wx.at=now();S.wx.confirmed=0;autoChk();save();clearTimeout(U.pt);U.pt=setTimeout(()=>render(true),700)}
  else if(t.dataset.lim){const k=t.dataset.lim,R={opWind:[1,12],gustDiff:[1,12],batMin:[5,60],wxMaxAgeH:[.5,24]}[k],v=num(t.value);if(R&&v!=null){S.limits[k]=Math.min(R[1],Math.max(R[0],v));save()}}
  else if(t.dataset.inc){S.inc[t.dataset.inc]=str(t.value,4000);save()}
  else if(t.hasAttribute("data-airnotes")){S.air.notes=str(t.value,4000);save()}
});
document.addEventListener("change",e=>{if(e.target.matches("select[data-w]"))render(true)});

/* ---------- taimer ja kell ---------- */
setInterval(()=>{
  document.querySelectorAll("[data-utc]").forEach(n=>n.textContent=utc());
  if(!S.flight.run)return;const el=curEl(),b=batLimit(),left=b.sec-el;
  const tv=$("#tval");if(tv){tv.textContent=fmtT(el);$("#tsub").innerHTML=`Naasmiseni <b>${fmtT(left)}</b> · piir ${fmtT(b.sec)}`;const c=$("#tcell");c.classList.toggle("w",left<=120&&left>0);c.classList.toggle("x",left<=0)}
  if(left<=120&&!S.flight.w1){S.flight.w1=true;try{navigator.vibrate&&navigator.vibrate(300)}catch(e){}toast("2 minutit naasmiseni");save()}
  if(left<=0&&!S.flight.w2){S.flight.w2=true;U.alarm=true;try{navigator.vibrate&&navigator.vibrate([400,200,400])}catch(e){}layer();save()}
},250);

/* =====================================================================
   KÄSUPALETT (Ctrl+K)
   ===================================================================== */
function cmds(){
  const L=[];
  Object.entries(ROUTES).forEach(([k,n])=>L.push({g:"Ava",n,ic:RIC[k],f:()=>go(k)}));
  L.push({g:"Tegevus",n:"Alusta lendu",ic:"play",f:()=>{if(verdict().k==="ok")startFlight();else{U.sheet={k:"start"};layer()}}});
  L.push({g:"Tegevus",n:"Lae ilm (Open-Meteo)",ic:"rotate",f:()=>{go("wx");omFetch()}});
  L.push({g:"Tegevus",n:"Võta asukoht GPS-ist",ic:"gps",f:()=>{go("plan");gpsFix()}});
  L.push({g:"Tegevus",n:"Uus lend",ic:"plus",f:()=>{U.sheet={k:"confirm",t:"Alusta uut lendu?",d:"Kontrollnimekiri ja kinnitused tühjenevad.",ok:"Uus lend",fn:newFlight};layer()}});
  L.push({g:"Tegevus",n:"Kopeeri plaani kokkuvõte",ic:"copy",f:()=>copy(planSummary())});
  L.push({g:"Tegevus",n:"Vaheta teemat: "+(S.theme==="dark"?"Grafiit":"Tume"),ic:"sun",f:()=>{S.theme=S.theme==="dark"?"graphite":"dark";render(true);fxResize()}});
  TPL.forEach(t=>L.push({g:"Mall",n:t[1],ic:t[2],f:()=>{Object.assign(S.plan,t[3],{tpl:t[0]});go("plan")}}));
  EMERG.forEach(e=>L.push({g:"Hädaolukord",n:e[1],ic:e[2],f:()=>{U.sheet={k:"em",e:e[0]};layer()}}));
  CHECK.forEach(gr=>gr.items.forEach(i=>L.push({g:"Kontrollpunkt",n:i[1],ic:gr.ic,h:gr.g,f:()=>go("chk")})));
  return L;
}
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function palList(){const q=norm(U.pal.q).split(/\s+/).filter(Boolean),all=cmds();
  if(!q.length){const rec=S.recent.filter(r=>ROUTES[r]).map(r=>({g:"Viimati",n:ROUTES[r],ic:RIC[r],f:()=>go(r)}));return rec.concat(all.filter(c=>c.g==="Tegevus"||c.g==="Hädaolukord"))}
  return all.filter(c=>q.every(t=>norm(c.n+" "+c.g+" "+(c.h||"")).includes(t))).slice(0,40)}
function drawPal(){
  let host=$("#palh");if(!host){host=document.createElement("div");host.id="palh";document.body.appendChild(host)}
  if(!U.pal){host.innerHTML="";return}
  const L=palList();U.pal.i=Math.min(U.pal.i,Math.max(0,L.length-1));let last="";
  host.innerHTML=`<div class="pal-veil" data-pv><div class="pal" role="dialog" aria-modal="true" aria-label="Käsklused"><div class="in">${ic("search")}<input id="pq" placeholder="Otsi ekraani, tegevust, hädaolukorda…" value="${esc(U.pal.q)}" autocomplete="off" aria-label="Otsi"></div>
   <ul role="listbox">${L.length?L.map((c,i)=>{const ph=c.g!==last?`<li class="ph" role="presentation">${esc(c.g)}</li>`:"";last=c.g;return ph+`<li role="option" data-pi="${i}" aria-selected="${i===U.pal.i}">${ic(c.ic,"sm")}<span>${esc(c.n)}</span>${c.h?`<small>${esc(c.h)}</small>`:""}</li>`}).join(""):`<li class="ph">Ei leitud</li>`}</ul>
   <div class="ft"><span>↑↓ vali</span><span>Enter ava</span><span>Esc sulge</span></div></div></div>`;
  const inp=$("#pq");inp.focus();inp.setSelectionRange(U.pal.q.length,U.pal.q.length);host.querySelector('[aria-selected="true"]')?.scrollIntoView({block:"nearest"});
}
function openPal(){if(U.alarm||U.sheet)return;U.pal={q:"",i:0};drawPal()}
function runPal(i){const c=palList()[i];U.pal=null;drawPal();if(c)c.f()}
document.addEventListener("input",e=>{if(e.target.id==="pq"){U.pal.q=e.target.value;U.pal.i=0;drawPal()}});
document.addEventListener("click",e=>{const v=e.target.closest("[data-pv]");if(v&&e.target===v){U.pal=null;drawPal()}const o=e.target.closest("[data-pi]");if(o)runPal(+o.dataset.pi)});
document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();U.pal?(U.pal=null,drawPal()):openPal();return}
  if(U.pal){const n=palList().length;if(e.key==="Escape"){U.pal=null;drawPal()}else if(e.key==="ArrowDown"){e.preventDefault();U.pal.i=Math.min(U.pal.i+1,n-1);drawPal()}else if(e.key==="ArrowUp"){e.preventDefault();U.pal.i=Math.max(0,U.pal.i-1);drawPal()}else if(e.key==="Enter"){e.preventDefault();runPal(U.pal.i)}return}
  if(e.key==="Escape"&&U.sheet){U.sheet=null;layer()}
  if(e.key==="Tab"&&(U.sheet||U.alarm)){const f=[...document.querySelectorAll("#layer .sheet button:not([disabled]),#layer .sheet a,#layer .sheet textarea,#layer .alarm button")];if(f.length){const i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}}
});

/* =====================================================================
   ELAV KÄRJETAUST: valgus = valmisolek, triiv = tuul, juhe = värav OK
   ===================================================================== */
const FX={running:false,lastDraw:0,c:$("#fx"),hex:null,s1:{x:0,y:0,c:[0,229,255],a:0},s2:{x:0,y:0,c:[0,229,255],a:0},d:[{x:200,y:200},{x:600,y:400}],last:performance.now(),t:{}};
const RM=matchMedia("(prefers-reduced-motion: reduce)");
function fxResize(){const c=FX.c,dpr=Math.min(2,devicePixelRatio||1);c.width=innerWidth*dpr;c.height=innerHeight*dpr;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";
  const A=46,S3=Math.sqrt(3),IN=.88,p=new Path2D();
  for(let r=-1;r*A*1.5<innerHeight+A*1.5;r++){const off=(r%2+2)%2?A*S3/2:0;for(let x=-A*S3+off;x<innerWidth+A*S3;x+=A*S3){const cy=r*A*1.5;for(let m=0;m<6;m++){const t=(-90+60*m)*Math.PI/180,px=x+IN*A*Math.cos(t),py=cy+IN*A*Math.sin(t);m?p.lineTo(px,py):p.moveTo(px,py)}p.closePath()}}
  FX.hex=p;FX.dpr=dpr}
function fxTargets(){
  const G=gates(),v=verdict(G),mods=[...document.querySelectorAll(".mod")];
  const ctr=e=>{const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
  FX.t={mode:v.k,open:mods.filter(m=>!m.classList.contains("ok")).map(ctr),bad:mods.filter(m=>m.classList.contains("stop")).map(ctr)};
  const w=num(S.wx.f.w?.v),g=num(S.wx.f.g?.v),dir=num(S.wx.f.dir?.v);FX.wind=w!=null&&dir!=null?{w,g:g??w,from:dir}:null;
}
const CLR={ok:[166,255,0],warn:[255,181,71],stop:[190,24,46],cyan:[0,229,255]};
function fxKick(){if(!FX.running){FX.running=true;FX.last=performance.now();requestAnimationFrame(fxFrame)}}
function fxFrame(n){
  const c=FX.c,x=c.getContext("2d"),W=innerWidth,H=innerHeight,on=S.bgfx&&U.r!=="flight"&&!document.hidden;
  if(!on){x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,c.width,c.height);FX.running=false;return}
  if(n-FX.lastDraw<32&&!RM.matches){requestAnimationFrame(fxFrame);return}FX.lastDraw=n;
  x.setTransform(FX.dpr,0,0,FX.dpr,0,0);x.clearRect(0,0,W,H);
  if(on&&FX.hex){
    const dt=Math.min(.1,(n-FX.last)/1000),t=n/1000,still=RM.matches;FX.last=n;
    const k1=Math.min(1,dt*1.1),mix=(a,b,k)=>a.forEach((v,i)=>a[i]=v+(b[i]-v)*k);
    FX.d.forEach((d,i)=>{const Wd=FX.wind;if(Wd&&!still){const to=(Wd.from+180)*Math.PI/180,vx=Math.sin(to),vy=-Math.cos(to),gust=1+((Wd.g-Wd.w)/Math.max(1,Wd.w))*.6*Math.max(0,Math.sin(t*1.7+i*2)+Math.sin(t*.63+i));
      d.x+=vx*Wd.w*5.2*gust*dt;d.y+=vy*Wd.w*5.2*gust*dt;const R=260;if(d.x<-R)d.x=W+R;if(d.x>W+R)d.x=-R;if(d.y<-R)d.y=H+R;if(d.y>H+R)d.y=-R;d.sx=d.x+(-vy)*Math.sin(t*.35+i*3)*70;d.sy=d.y+vx*Math.sin(t*.35+i*3)*70}
      else{d.sx=W*(.5+.4*Math.sin((still?2:t)*.06+i*2.4));d.sy=H*(.5+.35*Math.sin((still?2:t)*.09+i*1.3))}});
    const T=FX.t,R1=Math.hypot(W,H)*.3,R2=Math.hypot(W,H)*.22;let p1,c1,a1,r1=1,c2,a2,r2=1;
    if(T.mode==="ok"){p1=[FX.d[0].sx,FX.d[0].sy];c1=CLR.ok;a1=1;r1=1+.14*Math.sin(t*.9);c2=CLR.ok;a2=.75;r2=1+.12*Math.sin(t*.9+1.6)}
    else if(T.mode==="stop"){p1=T.bad[0]||[W*.5,H*.5];c1=CLR.stop;a1=.95;r1=.75;c2=CLR.stop;a2=0}
    else{p1=T.open&&T.open.length?T.open[Math.floor(t/6)%T.open.length]:[FX.d[0].sx,FX.d[0].sy];c1=CLR.warn;a1=.95;r1=.8;c2=CLR.cyan;a2=.6}
    const s1=FX.s1,s2=FX.s2,k=still?1:k1;s1.x+=(p1[0]-s1.x)*k;s1.y+=(p1[1]-s1.y)*k;mix(s1.c,c1,k);s1.a+=(a1-s1.a)*k;s2.x=FX.d[1].sx;s2.y=FX.d[1].sy;mix(s2.c,c2,k);s2.a+=(a2-s2.a)*k;
    const light=(s,R,al)=>{if(s.a<.01)return;const col=s.c.map(Math.round).join(",");
      let g=x.createRadialGradient(s.x,s.y,0,s.x,s.y,R);g.addColorStop(0,`rgba(${col},${.18*s.a})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.fillRect(0,0,W,H);
      g=x.createRadialGradient(s.x,s.y,0,s.x,s.y,R);g.addColorStop(0,`rgba(${col},${.95*s.a*al})`);g.addColorStop(.5,`rgba(${col},${.35*s.a*al})`);g.addColorStop(1,`rgba(${col},0)`);
      x.strokeStyle=g;x.lineWidth=2;x.lineJoin="round";x.stroke(FX.hex)};
    light(s1,R1*r1,1);light(s2,R2*r2,.9);
  }
  if(RM.matches){FX.running=false;return}
  requestAnimationFrame(fxFrame);
}
function conduit(gid,delay){
  if(RM.matches||!S.bgfx||document.querySelectorAll('.cond').length>=4)return;const mod=document.querySelector(`.mod[data-g="${gid}"]`),seg=document.querySelector(`[data-seg="${gid}"]`);if(!mod||!seg)return;
  const c=e=>{const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]},a=c(mod),b=c(seg),dirs=[-90,-30,30,90,150,210].map(d=>d*Math.PI/180),L=22;let p=[...a];const pts=[p];
  for(let i=0;i<120;i++){const ang=Math.atan2(b[1]-p[1],b[0]-p[0]);if(Math.hypot(b[0]-p[0],b[1]-p[1])<L){pts.push(b);break}const best=dirs.map(d=>[d,Math.cos(d-ang)]).sort((x,y)=>y[1]-x[1]);const d=(i%2&&best[1][1]>.35)?best[1][0]:best[0][0];p=[p[0]+Math.cos(d)*L,p[1]+Math.sin(d)*L];pts.push(p)}
  let len=0;for(let i=1;i<pts.length;i++)len+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
  const d="M"+pts.map(q=>q[0].toFixed(1)+" "+q[1].toFixed(1)).join("L"),el=document.createElement("div");el.className="cond";
  el.innerHTML=`<svg width="100%" height="100%"><path class="g" d="${d}" style="--l:${len|0};animation-delay:${delay}ms"/><path class="c" d="${d}" style="--l:${len|0};animation-delay:${delay}ms"/></svg>`;document.body.appendChild(el);
  setTimeout(()=>{seg.classList.add("hit");setTimeout(()=>seg.classList.remove("hit"),900)},delay+650);setTimeout(()=>el.remove(),delay+1600);
}
addEventListener("resize",()=>{fxResize();fxTargets()});
let _st=0;$("#main").addEventListener("scroll",()=>{if(_st)return;_st=requestAnimationFrame(()=>{_st=0;fxTargets()})},{passive:true});
document.addEventListener("visibilitychange",()=>{if(!document.hidden)fxKick()});

/* ---------- start ---------- */
try{S=sanitize(JSON.parse(localStorage.getItem(KEY)||"null"))}catch(e){S=fresh()}
if(!S.ev.length)ev("sys","käivitus · lend nr "+S.flight.n+" · nimekiri tühi","ok");
const h0=(location.hash||"").slice(1);U.r=VIEWS[h0]?h0:(S.flight.run?"flight":"ready");
fxResize();autoChk();render();fxKick();setTimeout(autoRun,600);
if("serviceWorker" in navigator&&location.protocol==="https:"){try{navigator.serviceWorker.register("sw.js").catch(()=>{})}catch(e){}}
addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(VIEWS[h]&&h!==U.r)go(h,{noRecent:true})});
