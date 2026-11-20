"use strict";
/* =====================================================================
   ÕHURUUMI ALAD · allikas: Eesti eAIP, AIRAC AIP AMDT 09/2026 (kehtib 01.10.2026)
   ENR 5.1 (piirangualad EER) ja ENR 5.3 (UAS-geoalad EEGZ, TSA, õppealad).
   Koordinaadid on AIP-st ümber kirjutatud. See on teadlikkuse abivahend, mitte ametlik allikas:
   kehtivad alad ja tingimused vaata enne lendu EANS Droonikaardilt ja NOTAM-idest.
   Siin EI OLE valitsuse kehtestatud looduskaitse- ja julgeolekualasid ega ajutisi piiranguid.
   ===================================================================== */
const ZONES_SRC={airac:"AIP AMDT 09/2026",eff:"2026-10-01",label:"eAIP AIRAC 09/2026 · kehtib 01.10.2026"};

/* tüübid: gz = UAS-geoala, r = piiranguala, tsa = ajutiselt eraldatud ala, trn = õppelennuala
   thr = kõrgus meetrites, millest ülespoole on luba vaja (0 = igal kõrgusel); null = kõrguspiiri pole, kehtib ainult tingimus
   need = kelle luba või teavitust on vaja; note = lisatingimus; season = [kuu,päev,kuu,päev] aktiivne periood */
const ZONES_RAW=[
 /* ---------- Tallinn ---------- */
 {id:"EEGZ1",n:"Tallinna lennujaam · lennuala",t:"gz",thr:0,need:"Ainult AS Tallinna Lennujaam vajadusel ja korra järgi",
  p:"592508N 0244837E – 592506N 0244837E – 592506N 0244859E – 592502N 0244859E – 592458N 0244917E – 592458N 0244926E – 592501N 0244936E – 592459N 0245005E – 592502N 0245010E – 592459N 0245019E – 592456N 0245020E – 592456N 0245209E – 592458N 0245230E – 592455N 0245235E – 592453N 0245227E – 592449N 0245241E – 592452N 0245249E – 592447N 0245259E – 592446N 0245259E – 592442N 0245249E – 592442N 0245240E – 592436N 0245240E – 592436N 0245050E – 592441N 0245050E – 592444N 0245022E – 592439N 0245022E – 592439N 0245015E – 592444N 0245015E – 592443N 0244856E – 592444N 0244805E – 592501N 0244745E – 592506N 0244757E – 592506N 0244818E – 592508N 0244818E – 592508N 0244837E"},
 {id:"EEGZ2",n:"Tallinna lennujaam · sisetsoon",t:"gz",thr:0,need:"Erikategooria käitamisluba või Lennuliiklusteeninduse AS-i kord",
  p:"592522N 0245401E – 592405N 0245400E – 592405N 0244616E – 592523N 0244617E – 592522N 0245401E"},
 {id:"EEGZ3",n:"Tallinna lennujaam · tsoon 30 m",t:"gz",thr:30,need:"Erikategooria luba ja lennuliiklusteeninduse luba",
  p:"592545N 0245540E – 592349N 0245539E – 592310N 0245344E – 592311N 0244724E – 592350N 0244452E – 592546N 0244453E – 592625N 0244725E – 592624N 0245346E – 592545N 0245540E"},
 {id:"EEGZ4",n:"Tallinna lennujaam · lääs 50 m",t:"gz",thr:50,need:"Erikategooria luba ja lennuliiklusteeninduse luba",
  p:"592350N 0244452E – 592350N 0243638E – 592547N 0243638E – 592546N 0244453E – 592350N 0244452E"},
 {id:"EEGZ5",n:"Tallinna lennujaam · ida 50 m",t:"gz",thr:50,need:"Erikategooria luba ja lennuliiklusteeninduse luba",
  p:"592347N 0250315E – 592349N 0245539E – 592545N 0245540E – 592544N 0250316E – 592347N 0250315E"},
 {id:"EEGZ6",n:"Tallinna lähiala · 90 m",t:"gz",thr:90,need:"Erikategooria luba ja lennuliiklusteeninduse luba",
  p:"593000N 0250010E – 592756N 0250547E – 592135N 0250540E – 591935N 0245508E – 591938N 0243700E – 592042N 0243439E – 592800N 0243440E – 593000N 0244110E – 593000N 0250010E"},
 {id:"EEGZ22",n:"Tallinna kopteriväljak",t:"gz",thr:90,need:"Erikategooria luba ja lennuliiklusteeninduse luba",note:"Ka alla 90 m on vaja lennuliiklusteeninduse luba.",c:"592729N 0244204E",r:600},
 {id:"EEGZ23",n:"Tallinna kopteriväljak",t:"gz",thr:90,need:"Erikategooria luba ja lennuliiklusteeninduse luba",note:"Ka alla 90 m on vaja lennuliiklusteeninduse luba.",c:"592653N 0244512E",r:600},
 {id:"EEGZ24",n:"Tallinna kopteriväljak",t:"gz",thr:50,need:"Erikategooria luba ja lennuliiklusteeninduse luba",note:"Ka alla 50 m on vaja lennuliiklusteeninduse luba.",c:"592347N 0244210E",r:600},
 {id:"EEGZ25",n:"Tallinna kopteriväljak",t:"gz",thr:90,need:"Erikategooria luba ja lennuliiklusteeninduse luba",note:"Ka alla 90 m on vaja lennuliiklusteeninduse luba.",c:"592702N 0243608E",r:600},
 /* ---------- Tartu ---------- */
 {id:"EEGZ7",n:"Tartu lennujaam · lennuala",t:"gz",thr:0,need:"Erikategooria luba või koostöökord Lennuliiklusteeninduse AS-iga",
  p:"581811N 0264420E – 581806N 0263804E – 581842N 0263802E – 581847N 0264418E – 581811N 0264420E"},
 {id:"EEGZ8",n:"Tartu lennujaam · tsoon 30 m",t:"gz",thr:30,need:"Erikategooria luba või koostöökord Lennuliiklusteeninduse AS-iga",
  p:"581940N 0264532E – 581721N 0264539E – 581713N 0263651E – 581932N 0263644E – 581940N 0264532E"},
 {id:"EEGZ9",n:"Tartu lennujaam · tsoon 50 m",t:"gz",thr:50,need:"Erikategooria luba või koostöökord Lennuliiklusteeninduse AS-iga",
  p:"582009N 0265259E – 581659N 0265308E – 581638N 0262934E – 581948N 0262922E – 582009N 0265259E"},
 /* ---------- Pärnu ---------- */
 {id:"EEGZ10",n:"Pärnu lennujaam · lennuala",t:"gz",thr:0,need:"Erikategooria käitamisluba",
  p:"582626N 0243035E – 582349N 0242705E – 582403N 0242626E – 582640N 0242957E – 582626N 0243035E"},
 {id:"EEGZ11",n:"Pärnu lennujaam · tsoon 30 m",t:"gz",thr:30,need:"Erikategooria käitamisluba",
  p:"582922N 0243559E – 582007N 0242331E – 582104N 0242101E – 583018N 0243329E – 582922N 0243559E"},
 {id:"EEGZ12",n:"Pärnu lennujaam · tsoon 50 m",t:"gz",thr:50,need:"Erikategooria käitamisluba",
  p:"583044N 0243314E – 582923N 0243650E – 581942N 0242346E – 582103N 0242010E – 583044N 0243314E"},
 {id:"EEGZ28",n:"Pärnu haigla kopteriväljak",t:"gz",thr:null,need:"Teavita Pärnu lennuinfoteenistust vahetult enne lendu",note:"Küsi lennuinfot vahetult enne lendu.",c:"582320N 0243248E",r:600},
 /* ---------- Kuressaare ---------- */
 {id:"EEGZ13",n:"Kuressaare lennujaam · lennuala",t:"gz",thr:0,need:"Erikategooria käitamisluba",
  p:"581212N 0222913E – 581213N 0223222E – 581543N 0223220E – 581542N 0222911E – 581212N 0222913E"},
 {id:"EEGZ14",n:"Kuressaare lennujaam · tsoon 40 m",t:"gz",thr:40,need:"Erikategooria käitamisluba",
  p:"581650N 0223308E – 580717N 0223308E – 580717N 0222824E – 581649N 0222824E – 581650N 0223308E"},
 {id:"EEGZ15",n:"Kuressaare lennujaam · tsoon 85 m",t:"gz",thr:85,need:"Erikategooria käitamisluba",
  p:"582052N 0223340E – 580704N 0223340E – 580702N 0222727E – 582049N 0222727E – 582052N 0223340E"},
 {id:"EEGZ26",n:"Kuressaare haigla kopteriväljak",t:"gz",thr:85,need:"Erikategooria käitamisluba",note:"Alla 85 m küsi lennuinfot Kuressaare lennuinfoteenistusest vahetult enne lendu.",c:"581510N 0222807E",r:600},
 /* ---------- Kärdla ---------- */
 {id:"EEGZ16",n:"Kärdla lennujaam · lennuala",t:"gz",thr:0,need:"Erikategooria käitamisluba",
  p:"585805N 0225247E – 585730N 0225100E – 590002N 0224753E – 590037N 0224939E – 585805N 0225247E"},
 {id:"EEGZ17",n:"Kärdla lennujaam · tsoon 20 m",t:"gz",thr:20,need:"Erikategooria käitamisluba",
  p:"590426N 0224553E – 585808N 0225343E – 585705N 0225033E – 590323N 0224243E – 590426N 0224553E"},
 {id:"EEGZ18",n:"Kärdla lennujaam · tsoon 50 m",t:"gz",thr:50,need:"Erikategooria käitamisluba",
  p:"590459N 0224549E – 585522N 0225745E – 585401N 0225343E – 590338N 0224147E – 590459N 0224549E"},
 {id:"EEGZ27",n:"Kärdla haigla kopteriväljak",t:"gz",thr:null,need:"Teavita Kärdla lennuinfoteenistust vahetult enne lendu",note:"Küsi lennuinfot vahetult enne lendu.",c:"585958N 0224525E",r:600},
 /* ---------- Ämari ---------- */
 {id:"EEGZ19",n:"Ämari lennubaas · lennuala",t:"gz",thr:0,need:"Kaitseväe luba ja vahetult enne lendu Ämari torni luba",
  p:"591706N 0241234E – 591629N 0241543E – 591558N 0241604E – 591442N 0241433E – 591321N 0241100E – 591342N 0240926E – 591511N 0240831E – 591706N 0241234E"},
 {id:"EEGZ20",n:"Ämari lennubaas · tsoon 30 m",t:"gz",thr:30,need:"Kaitseväe luba ja Ämari torni luba",
  p:"591507N 0235603E – 591546N 0240217E – 591837N 0240457E – 592019N 0241422E – 591852N 0242016E – 591942N 0242454E – 591615N 0242701E – 591533N 0242231E – 591232N 0241941E – 591051N 0241018E – 591215N 0240435E – 591104N 0240003E – 591507N 0235603E"},
 {id:"EEGZ21",n:"Ämari lennubaas · tsoon 60 m",t:"gz",thr:60,need:"Kaitseväe luba ja Ämari torni luba",
  p:"592204N 0234945E – 592335N 0241743E – 591942N 0242454E – 591417N 0242813E – 591117N 0241916E – 590631N 0240738E – 591104N 0240003E – 591643N 0235428E – 592204N 0234945E"},
 /* ---------- muud ---------- */
 {id:"EEGZ29",n:"Sisekaitseakadeemia õppeala",t:"gz",thr:0,need:"Ainult Sisekaitseakadeemia vajadusel või loal",c:"590638N 0261258E",r:1500},
 {id:"EETSA21",n:"Nurmsi ajutiselt eraldatud ala",t:"tsa",thr:0,need:"Aktiveeritakse NOTAM-iga päev ette (D-1). Kontrolli NOTAM-ist, kas ala on aktiivne",c:"585146N 0254451E",r:11112},
 {id:"ZONE1",n:"Ämari õppelennuala",t:"trn",thr:null,need:"Mehitatud õppelennud. Väldi võimalusel; infot annab Ämari torn",c:"591955N 0235700E",r:4630},
 {id:"ZONE8",n:"Tartu õppelennuala",t:"trn",thr:null,need:"Mehitatud õppelennud. Väldi võimalusel; infot annab Tartu AFIS",
  p:"582204N 0265300E – 582305N 0264432E – 582718N 0264025E – 582744N 0264705E – 582430N 0265340E – 582204N 0265300E"},
 /* ---------- piirangualad ENR 5.1 ---------- */
 {id:"EER1",n:"Piiriala",t:"r",thr:0,need:"Ala valdaja (PPA) luba",note:"Riigipiiri-poolne serv on siin lihtsustatud. Täpse piiri vaata Droonikaardilt.",approx:true,
  p:"573311N 0271110E – 573104N 0272102E – 592818N 0280236E – 594519N 0264317E – 595106N 0260442E – 594847N 0260108E – 594300N 0263900E – 593500N 0265200E – 593300N 0273900E – 592500N 0280000E – 592200N 0280400E – 591800N 0275000E – 590000N 0273700E – 584800N 0271600E – 583000N 0272400E – 581200N 0272400E – 575800N 0273300E – 573311N 0271110E"},
 {id:"EER3",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",p:"583212N 0214618E – 582918N 0215607E – 582201N 0220146E – 581950N 0220131E – 581404N 0215506E – 581915N 0214543E – 583212N 0214618E"},
 {id:"EER4",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",p:"585200N 0232100E – 585200N 0232300E – 584827N 0233239E – 584916N 0234548E – 584547N 0235922E – 584347N 0235822E – 583858N 0232325E – 584458N 0231801E – 585200N 0232100E"},
 {id:"EER15D",n:"Piiranguala",t:"r",thr:0,need:"Ala valdaja luba",p:"591633N 0261500E – 591639N 0255647E – 591614N 0254748E – 592104N 0254049E – 592119N 0253627E – 592412N 0253544E – 594716N 0255524E – 594421N 0261500E – 591633N 0261500E"},
 {id:"EER15E",n:"Piiranguala",t:"r",thr:0,need:"Ala valdaja luba",p:"591617N 0265703E – 591633N 0261500E – 594421N 0261500E – 594100N 0263727E – 593316N 0264925E – 593151N 0271520E – 592412N 0271450E – 591617N 0265703E"},
 {id:"EER15F",n:"Piiranguala",t:"r",thr:0,need:"Ala valdaja luba",p:"590730N 0253952E – 592119N 0253627E – 592104N 0254049E – 591614N 0254748E – 591639N 0255647E – 591633N 0261500E – 590730N 0261500E – 590730N 0253952E"},
 {id:"EER15G",n:"Piiranguala",t:"r",thr:0,need:"Ala valdaja luba",p:"591633N 0261500E – 591617N 0265703E – 590730N 0263755E – 590730N 0261500E – 591633N 0261500E"},
 {id:"EER15H",n:"Piiranguala",t:"r",thr:0,need:"Ala valdaja luba",p:"593150N 0271519E – 593031N 0274514E – 592459N 0275959E – 592200N 0280357E – 591801N 0274958E – 590734N 0274224E – 590729N 0263755E – 592411N 0271450E – 593150N 0271519E"},
 {id:"EER19",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"592043N 0272651E – 592045N 0272613E – 592102N 0272554E – 592121N 0272622E – 592122N 0272710E – 592052N 0272725E – 592043N 0272651E"},
 {id:"EER20",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"592011N 0270654E – 592022N 0270638E – 592028N 0270636E – 592033N 0270718E – 592025N 0270721E – 592012N 0270700E – 592011N 0270654E"},
 {id:"EER21",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"591152N 0255526E – 591227N 0255415E – 591324N 0255344E – 591437N 0255530E – 591507N 0255416E – 591516N 0255415E – 591518N 0255438E – 591522N 0255611E – 591506N 0255638E – 591448N 0255911E – 591428N 0255924E – 591313N 0255841E – 591222N 0255755E – 591152N 0255526E"},
 {id:"EER22",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"592019N 0240511E – 592020N 0240453E – 592024N 0240442E – 592032N 0240439E – 592041N 0240444E – 592043N 0240510E – 592039N 0240549E – 592025N 0240538E – 592019N 0240511E"},
 {id:"EER23",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"590646N 0240722E – 590722N 0240543E – 590807N 0240540E – 590811N 0240749E – 590700N 0240752E – 590646N 0240722E"},
 {id:"EER24",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"574912N 0270119E – 574931N 0270051E – 574938N 0270058E – 574940N 0270159E – 574934N 0270159E – 574912N 0270119E"},
 {id:"EER25",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"582230N 0265354E – 582231N 0265335E – 582239N 0265323E – 582244N 0265323E – 582251N 0265356E – 582247N 0265416E – 582230N 0265354E"},
 {id:"EER26",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"574525N 0264749E – 574532N 0264637E – 574600N 0264640E – 574616N 0264703E – 574612N 0264754E – 574525N 0264749E"},
 {id:"EER27",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"592515N 0244604E – 592522N 0244553E – 592529N 0244608E – 592538N 0244614E – 592534N 0244632E – 592527N 0244640E – 592522N 0244633E – 592515N 0244604E"},
 {id:"EER28",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"592703N 0244334E – 592703N 0244314E – 592716N 0244254E – 592727N 0244255E – 592735N 0244318E – 592722N 0244357E – 592707N 0244342E – 592703N 0244334E"},
 {id:"EER29",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"592443N 0251445E – 592502N 0251347E – 592513N 0251419E – 592455N 0251459E – 592443N 0251445E"},
 {id:"EER30",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"582409N 0242810E – 582413N 0242755E – 582426N 0242814E – 582416N 0242835E – 582410N 0242828E – 582409N 0242810E"},
 {id:"EER31",n:"Julgeolekuala",t:"r",thr:0,need:"Ala valdaja luba",p:"582306N 0264437E – 582312N 0264422E – 582327N 0264441E – 582327N 0264450E – 582320N 0264504E – 582313N 0264454E – 582306N 0264437E"},
 {id:"EER32",n:"Julgeolekuala (ajutine)",t:"r",thr:0,need:"Ala valdaja luba. Aktiivne AIP-s märgitud perioodil",p:"592350N 0244239E – 592350N 0244221E – 592401N 0244223E – 592400N 0244243E – 592357N 0244243E – 592350N 0244239E"},
 {id:"EER33",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",p:"580957N 0224625E – 580959N 0224935E – 580846N 0224933E – 580845N 0224631E – 580957N 0224625E"},
 {id:"EER34",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",p:"590157N 0230009E – 585558N 0230622E – 585540N 0230512E – 585733N 0225930E – 590132N 0225637E – 590157N 0230009E"},
 {id:"EER35",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",p:"585058N 0225809E – 584514N 0231309E – 584325N 0230731E – 584520N 0225959E – 585031N 0225635E – 585058N 0225809E"},
 {id:"EER36",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[2,1,11,30],p:"592054N 0234600E – 592055N 0234651E – 592024N 0234655E – 592024N 0234558E – 592054N 0234600E"},
 {id:"EER37",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[2,1,11,30],p:"593753N 0251809E – 593748N 0251950E – 593549N 0252018E – 593544N 0251843E – 593753N 0251809E"},
 {id:"EER38",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[2,1,11,30],p:"584008N 0222636E – 584008N 0222746E – 583935N 0222747E – 583935N 0222636E – 584008N 0222636E"},
 {id:"EER39",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[2,1,11,30],p:"581200N 0235154E – 581222N 0235356E – 581222N 0235439E – 581111N 0235439E – 581042N 0235208E – 581113N 0235136E – 581200N 0235154E"},
 {id:"EER40",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[2,1,11,30],p:"590551N 0225217E – 590432N 0225405E – 590408N 0225210E – 590528N 0225049E – 590551N 0225217E"},
 {id:"EER41",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[2,1,11,30],p:"594223N 0262805E – 594218N 0263240E – 593858N 0263248E – 593858N 0262903E – 594223N 0262805E"},
 {id:"EER42",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"584821N 0222120E – 584822N 0222336E – 584634N 0222434E – 584624N 0222117E – 584821N 0222120E"},
 {id:"EER43",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"585042N 0225302E – 584948N 0225341E – 584708N 0224631E – 584811N 0224449E – 584924N 0224559E – 585042N 0225302E"},
 {id:"EER44",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"590119N 0225000E – 585906N 0225634E – 585640N 0225925E – 585407N 0230453E – 585251N 0230123E – 590007N 0225009E – 590119N 0225000E"},
 {id:"EER45",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"590155N 0222814E – 590217N 0223047E – 590145N 0223527E – 585743N 0222836E – 585656N 0222534E – 585836N 0222217E – 590155N 0222814E"},
 {id:"EER46",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"583444N 0221737E – 583116N 0221923E – 582907N 0221732E – 582923N 0221426E – 583251N 0221236E – 583444N 0221737E"},
 {id:"EER47",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"580751N 0220734E – 580722N 0221143E – 580337N 0221011E – 580438N 0220518E – 580751N 0220734E"},
 {id:"EER48",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"582034N 0225047E – 581941N 0225607E – 581748N 0225830E – 581727N 0225043E – 582034N 0225047E"},
 {id:"EER49",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"582840N 0230928E – 582647N 0231925E – 582444N 0231932E – 582433N 0230958E – 582057N 0230143E – 582054N 0225702E – 582840N 0230928E"},
 {id:"EER50",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"583928N 0230129E – 583712N 0230640E – 583531N 0230436E – 583201N 0232247E – 583028N 0232526E – 582654N 0231928E – 583648N 0225728E – 583928N 0230129E"},
 {id:"EER51",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"581247N 0242801E – 580857N 0242905E – 580416N 0242902E – 580444N 0242646E – 581238N 0242648E – 581247N 0242801E"},
 {id:"EER52",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"582251N 0241802E – 582400N 0241813E – 582409N 0241948E – 582347N 0242343E – 582320N 0242227E – 582251N 0241802E"},
 {id:"EER53",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"585815N 0231548E – 585847N 0231827E – 585719N 0231900E – 585600N 0231727E – 585634N 0231422E – 585856N 0231226E – 585815N 0231548E"},
 {id:"EER54",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"590521N 0233149E – 585825N 0234512E – 585621N 0233255E – 590453N 0232827E – 590521N 0233149E"},
 {id:"EER55",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"583651N 0232823E – 583651N 0233506E – 583037N 0235037E – 582843N 0234703E – 582934N 0233858E – 583339N 0232725E – 583651N 0232823E"},
 {id:"EER56",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"593543N 0254701E – 593408N 0255051E – 593347N 0254837E – 593411N 0254619E – 593543N 0254701E"},
 {id:"EER57",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"582822N 0271446E – 582149N 0272623E – 582018N 0272508E – 581829N 0271013E – 582629N 0270610E – 582822N 0271446E"},
 {id:"EER58",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"583415N 0263924E – 583349N 0264110E – 583229N 0264248E – 583322N 0264004E – 583415N 0263924E"},
 {id:"EER59",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",season:[4,1,11,30],p:"585215N 0261027E – 585219N 0261245E – 585112N 0261305E – 585051N 0261242E – 585050N 0261104E – 585215N 0261027E"},
 {id:"EER60",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",p:"581028N 0272948E – 580745N 0273144E – 580624N 0273141E – 580621N 0272909E – 580752N 0272812E – 581001N 0272755E – 581028N 0272948E"},
 {id:"EER61",n:"Linnukaitseala",t:"r",thr:0,need:"Ala valdaja luba",p:"583615N 0255242E – 583420N 0261353E – 582813N 0262103E – 582306N 0262320E – 582328N 0261156E – 583615N 0255242E"}
];

/* DDMMSSN DDDMMSSE → [lat, lon] kraadides */
function zParse(s){const m=/^(\d{2})(\d{2})(\d{2})N\s*(\d{3})(\d{2})(\d{2})E$/.exec(s.trim());if(!m)throw new Error("koordinaat: "+s);
  return[+m[1]+m[2]/60+m[3]/3600,+m[4]+m[5]/60+m[6]/3600]}
const ZONES=ZONES_RAW.map(z=>{const o=Object.assign({},z);
  if(z.p){o.pts=z.p.split(/\s*[–-]\s*(?=\d{6}N)/).map(zParse)}
  if(z.c){o.ctr=zParse(z.c)}
  let la=0,lo=0;const P=o.pts||[o.ctr];P.forEach(p=>{la+=p[0];lo+=p[1]});o.mid=[la/P.length,lo/P.length];
  if(o.pts){const L=o.pts.map(p=>p[0]),G=o.pts.map(p=>p[1]);o.bb=[Math.min(...L),Math.max(...L),Math.min(...G),Math.max(...G)]}
  else{const dl=o.r/111000,dg=o.r/(111000*Math.cos(o.ctr[0]*Math.PI/180));o.bb=[o.ctr[0]-dl,o.ctr[0]+dl,o.ctr[1]-dg,o.ctr[1]+dg]}
  return o});
