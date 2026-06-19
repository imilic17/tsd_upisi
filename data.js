/* ============================================================
   PODACI ZA PLAKATE – Tehnička škola Daruvar (upisi 2026./2027.)
   Ovo je JEDINI dokument koji uređuješ. Promjena ovdje = promjena
   na svim plakatima (individualni, sektorski, razinski, UPISI).
   Izvor: službeni Natječaj za upis + prezentacija škole.
   ============================================================ */

/* --- Zajednički podaci o upisu (mijenjaju se svake godine) --- */
const UPIS = {
  godina: "2026./2027.",
  prijavaOnline: "24. 6. – 3. 7. 2026.",   // prijava obrazovnih programa (e-Upisi)
  prijavaProvjere: "24. 6. – 26. 6. 2026.", // programi koji traže dodatne provjere
  upisSkola: "7. – 9. 7. 2026.",            // dostava upisnice/dokumenata dolaskom u školu
  objavaListi: "7. 7. 2026.",
  sustav: "srednje.e-upisi.hr",
  eupisiUrl: "https://srednje.e-upisi.hr",
  email: "knjiznica@tsd.hr",
  web: "www.tsd.hr",
  tel: "043/331-082",
  adresa: "I. Gundulića 14, Daruvar",
  adresa2: "Zrinskoga 19 i 30, Daruvar",
  // termini dolaska u školu (datum + vrijeme)
  upisRedovi: [
    ["7. 7. 2026.", "12 – 14 h"],
    ["8. i 9. 7. 2026.", "8 – 14 h"]
  ]
};

/* --- Sektori (boje + opis) --- */
const SEKTORI = {
  elektrotehnika: { naziv: "Elektrotehnika i računalstvo", accent: "#1f8fd1", dark: "#13567f" },
  strojarstvo:    { naziv: "Strojarstvo, brodogradnja i metalurgija", accent: "#e07b1a", dark: "#a8560f" },
  promet:         { naziv: "Promet i logistika", accent: "#2a9d5c", dark: "#1c6e40" },
  turizam:        { naziv: "Turizam i ugostiteljstvo", accent: "#d24b6a", dark: "#9b324c" },
  sumarstvo:      { naziv: "Šumarstvo, prerada i obrada drva", accent: "#3f7d3a", dark: "#295726" },
  graditeljstvo:  { naziv: "Graditeljstvo", accent: "#7a52a8", dark: "#523574" }
};

/* --- Zanimanja ---
   slug: naziv datoteke slike (slike/<slug>.jpg) i ključ u URL-u
   docs: što treba za upis (liječnički / potvrda / rješenje)
   posebno: predmet od posebne važnosti + natjecanje (za 4-god.) ili "" */
const ZANIMANJA = {
  programiranje: {
    naziv: "Tehničar/ka za programiranje",
    sektor: "elektrotehnika", godine: 4, mjesta: 20, razina: "cetiri",
    sto: [
      "Programiraš u modernim programskim jezicima",
      "Izrađuješ aplikacije za web, desktop i mobitel",
      "Upravljaš bazama podataka i obradom podataka",
      "Postavljaš i konfiguriraš računalne mreže i WiFi",
      "Popravljaš i nadograđuješ računala",
      "Obrađuješ audio, video i 3D animacije"
    ],
    docs: "Potvrda nadležnog školskog liječnika",
    predmet: "Kemija", natjecanje: "Natjecanje iz geografije",
    jezici: "Engleski ili njemački"
  },
  mehatronika: {
    naziv: "Tehničar/ka za mehatroniku",
    sektor: "elektrotehnika", godine: 4, mjesta: 20, razina: "cetiri",
    sto: [
      "Izrađuješ i testiraš elektroničke sheme i sustave",
      "Sastavljaš, rastavljaš i testiraš mehatroničke konstrukcije",
      "Programiraš industrijskog robota za manipulaciju predmetima",
      "Komuniciraš sa senzorima i aktuatorima mobilnog robota",
      "Konfiguriraš mreže računala, senzora i aktuatora u robotici",
      "Spajaš elektroniku, strojarstvo i informatiku"
    ],
    docs: "Liječnička svjedodžba medicine rada",
    predmet: "Kemija", natjecanje: "Natjecanje iz geografije",
    jezici: "Engleski ili njemački"
  },
  elektronika: {
    naziv: "Tehničar/ka za elektroniku i komunikacije",
    sektor: "elektrotehnika", godine: 4, mjesta: 20, razina: "cetiri",
    sto: [
      "Sastavljaš, ispituješ i održavaš elektroničke sklopove i računalnu opremu",
      "Pronalaziš kvarove mjernim uređajima i alatima",
      "Ugrađuješ komunikacijsku opremu, uređaje i kabele",
      "Izrađuješ tehničku dokumentaciju",
      "Primjenjuješ industrijske standarde i propise struke",
      "Kontroliraš sigurnost i pouzdanost uređaja i sustava"
    ],
    docs: "Potvrda nadležnog školskog liječnika",
    predmet: "Kemija", natjecanje: "Natjecanje iz geografije",
    jezici: "Engleski ili njemački"
  },
  elektroinstalater: {
    naziv: "Elektroinstalater/ka",
    sektor: "elektrotehnika", godine: 3, mjesta: 10, razina: "tri",
    sto: [
      "Izvodiš električne instalacije prema projektu",
      "Montiraš razdjelne ormare, priključne i spojne kutije",
      "Detektiraš i otklanjaš kvarove rasvjete i razvodnih ormara",
      "Izrađuješ instalacije fotonaponskih (solarnih) sustava",
      "Povezuješ fotonaponske module u sustav",
      "Postavljaš nadžbukne instalacije (kanali i kabeli)"
    ],
    docs: "Liječnička svjedodžba medicine rada",
    predmet: "", natjecanje: "Natjecanje mladih tehničara",
    jezici: "Engleski ili njemački"
  },
  operater: {
    naziv: "Operater/ka za strojne obrade",
    sektor: "strojarstvo", godine: 3, mjesta: 10, razina: "tri",
    sto: [
      "Radiš u radionici i pogonu strojne obrade",
      "Pripremaš i podešavaš alatne strojeve",
      "Unosiš i prilagođavaš programe za CNC strojeve",
      "Nadzireš tijek obrade",
      "Mjeriš i kontroliraš kvalitetu gotovih komada"
    ],
    docs: "Liječnička svjedodžba medicine rada",
    predmet: "", natjecanje: "Natjecanje mladih tehničara",
    jezici: "Engleski ili njemački"
  },
  monter: {
    naziv: "Monter/ka strojarskih instalacija",
    sektor: "strojarstvo", godine: 3, mjesta: 10, razina: "tri",
    sto: [
      "Izvodiš instalacije grijanja, hlađenja i ventilacije",
      "Postavljaš vodovod i kanalizaciju",
      "Spajaš klima uređaje, ventilokonvektore i radijatore",
      "Montiraš klima komore i rekuperatorske jedinice",
      "Ispituješ instalacije i puštaš opremu u rad"
    ],
    docs: "Liječnička svjedodžba medicine rada",
    predmet: "", natjecanje: "Natjecanje mladih tehničara",
    jezici: "Engleski ili njemački"
  },
  automehatronicar: {
    naziv: "Automehatroničar/ka",
    sektor: "strojarstvo", godine: 3, mjesta: 10, razina: "tri",
    sto: [
      "Objedinjuješ poslove automehaničara i autoelektričara",
      "Održavaš, servisiraš i popravljaš sustave na vozilu",
      "Postavljaš dijagnozu kvara i vršiš popravak",
      "Radiš s mehaničkim, električnim i elektroničkim sustavima",
      "Obavljaš prijem vozila i kontrolu ispravnosti"
    ],
    docs: "Liječnička svjedodžba medicine rada",
    predmet: "", natjecanje: "Natjecanje mladih tehničara",
    jezici: "Engleski ili njemački"
  },
  cestovni: {
    naziv: "Tehničar/ka cestovnog prometa",
    sektor: "promet", godine: 4, mjesta: 20, razina: "cetiri",
    sto: [
      "Organiziraš prijevoz putnika i tereta u domaćem i međunarodnom prometu",
      "Primjenjuješ propise o cestovnom prijevozu i sigurnosti prometa",
      "Reguliraš i nadzireš cestovni promet",
      "Planiraš tehnološki proces prijevoza",
      "Koristiš opremu za nadzor cestovnog prometa"
    ],
    docs: "Potvrda nadležnog školskog liječnika",
    predmet: "Kemija", natjecanje: "Natjecanje iz geografije",
    jezici: "Engleski ili njemački"
  },
  vozac: {
    naziv: "Vozač/ica motornog vozila",
    sektor: "promet", godine: 3, mjesta: 20, razina: "tri",
    sto: [
      "Upravljaš teretnim motornim vozilom",
      "Planiraš i pripremaš prijevoz tereta u cestovnom prometu",
      "Preuzimaš, ukrcavaš i iskrcavaš teret",
      "Rukuješ ručnom prekrcajnom mehanizacijom",
      "Stječeš vozačke kategorije tijekom školovanja"
    ],
    docs: "Liječnička svjedodžba medicine rada (vozači II. skupine)",
    predmet: "", natjecanje: "Natjecanje mladih tehničara",
    jezici: "Engleski ili njemački"
  },
  kuhar: {
    naziv: "Pomoćni kuhar / Pomoćna kuharica",
    sektor: "turizam", godine: 3, mjesta: 10, razina: "tri",
    sto: [
      "Pripremaš i obrađuješ namirnice",
      "Pomažeš u izradi jela i slastica",
      "Slažeš i serviraš jednostavna jela",
      "Radiš s kuhinjskom opremom i priborom",
      "Održavaš čistoću i higijenu radnog prostora"
    ],
    docs: "Rješenje o primjerenom programu obrazovanja + stručno mišljenje HZZ-a",
    predmet: "", natjecanje: "",
    jezici: ""
  },
  stolar: {
    naziv: "Pomoćni stolar / Pomoćna stolarica",
    sektor: "sumarstvo", godine: 3, mjesta: 5, razina: "tri",
    sto: [
      "Obrađuješ drvo ručnim i električnim alatima",
      "Pripremaš materijal za izradu proizvoda",
      "Pomažeš u izradi i sastavljanju namještaja",
      "Brusiš, lijepiš i površinski obrađuješ drvo",
      "Održavaš alate i radni prostor"
    ],
    docs: "Rješenje o primjerenom programu obrazovanja + stručno mišljenje HZZ-a",
    predmet: "", natjecanje: "",
    jezici: ""
  },
  interijer: {
    naziv: "Pomoćni/a radnik/ca za uređenje interijera",
    sektor: "graditeljstvo", godine: 3, mjesta: 5, razina: "tri",
    sto: [
      "Pripremaš zidove i površine za bojanje",
      "Naličuješ i bojiš zidove i stolariju",
      "Postavljaš zaštitne i dekorativne obloge",
      "Radiš sa soboslikarskim alatima i materijalima",
      "Pomažeš u uređenju unutarnjih prostora"
    ],
    docs: "Rješenje o primjerenom programu obrazovanja + stručno mišljenje HZZ-a",
    predmet: "", natjecanje: "",
    jezici: ""
  }
};

/* redoslijed prikaza */
const REDOSLIJED = [
  "programiranje","mehatronika","elektronika","elektroinstalater",
  "operater","monter","automehatronicar",
  "cestovni","vozac","kuhar","stolar","interijer"
];
