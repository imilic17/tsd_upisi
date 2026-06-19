/* Render logika za sve plakate. Čita podatke iz data.js. */

function qp(name){ return new URLSearchParams(location.search).get(name); }
function esc(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function img(slug){ return "slike/"+slug+".jpg"; }
function setVars(el,sek){ el.style.setProperty("--accent",sek.accent); el.style.setProperty("--dark",sek.dark); }

/* Skalira fiksni plakat da stane na ekran (mobitel/tablet).
   Ne dira tisak (print reset u CSS-u) ni izvoz kartica (body.export). */
function fitPoster(){
  if(document.body.classList.contains("export")) return;
  const root = document.getElementById("root");
  if(!root) return;
  const poster = root.querySelector(".poster");
  if(!poster) return;
  poster.style.transform = "none";
  root.style.cssText = "";
  document.body.style.padding = "0";
  const pw = poster.offsetWidth, ph = poster.offsetHeight;
  const avail = Math.min(window.innerWidth || 99999, document.documentElement.clientWidth || 99999);
  const scale = Math.min(1, (avail - 2) / pw);
  if(scale < 1){
    poster.style.transformOrigin = "top left";
    poster.style.transform = "scale(" + scale + ")";
    root.style.width = (pw*scale) + "px";
    root.style.height = (ph*scale) + "px";
    root.style.overflow = "hidden";
    root.style.margin = "0 auto";
  } else {
    document.body.style.padding = "";
  }
}
["DOMContentLoaded","load","resize","orientationchange"].forEach(e=>window.addEventListener(e, fitPoster));
window.addEventListener("load", ()=>setTimeout(fitPoster, 150));

function headHTML(){
  return `<header class="head">
    <div class="school">
      <div class="logo"><img src="slike/tsd-logo.png" alt="TŠD"></div>
      <div><b>Tehnička škola Daruvar</b><span>${UPIS.adresa} · ${UPIS.web}</span></div>
    </div>
    <div class="slogan">Stvaraj budućnost</div>
  </header>`;
}

function stripHTML(){
  return `<div class="strip">
    <div class="item"><small>Prijava online</small><b>${UPIS.prijavaOnline}</b></div>
    <div class="item"><small>Upis u školi</small><b>${UPIS.upisSkola}</b></div>
    <div class="item"><small>Lokacija</small><b>${UPIS.adresa}</b></div>
    <div class="strip-right">
      <div class="web">${UPIS.web}</div>
      <div class="strip-qr"><img src="slike/qr-upisi.png" alt="QR za upise"></div>
    </div>
  </div>`;
}

/* ---- Bogati footer za single plakat (prijava, termini, dostava, lokacija + QR) ---- */
function footerPlakat(){
  const dani = UPIS.upisRedovi.map(r=>`<span class="row2"><b>${esc(r[0])}</b> · ${esc(r[1])}</span>`).join("");
  return `<footer class="pfoot">
    <div class="pf-cols">
      <div class="pf-item">
        <h5>Prijava online</h5>
        <span class="big">${UPIS.prijavaOnline}</span>
        <a href="${UPIS.eupisiUrl}" target="_blank">${UPIS.sustav}</a>
      </div>
      <div class="pf-item">
        <h5>Upis u školi</h5>
        ${dani}
      </div>
      <div class="pf-item">
        <h5>Dokumentaciju predaješ</h5>
        <span class="row2">e-poštom: <b>${UPIS.email}</b></span>
        <span class="row2">ili osobno u školi</span>
      </div>
      <div class="pf-item">
        <h5>Lokacija</h5>
        <span class="big">${UPIS.adresa}</span>
        <span class="row2">${UPIS.web} · ${UPIS.tel}</span>
      </div>
    </div>
    <div class="pf-qr"><img src="slike/qr-upisi.png" alt="QR za upise"><span>Skeniraj<br>za upise</span></div>
  </footer>`;
}

/* ---- Uvjeti upisa: svaki dio u svom retku ---- */
function uvjetiRows(z){
  const rows = [["Dokument za upis", z.docs]];
  if(z.predmet)    rows.push(["Predmet od posebne važnosti", z.predmet]);
  if(z.natjecanje) rows.push(["Vrednuje se", z.natjecanje]);
  if(z.jezici)     rows.push(["Strani jezici", z.jezici]);
  return rows.map(r=>`<div class="u-row"><b>${esc(r[0])}:</b> ${esc(r[1])}</div>`).join("");
}

/* ---- Individualni plakat ---- */
function renderPlakat(){
  const z = ZANIMANJA[qp("z")] || ZANIMANJA["mehatronika"];
  const sek = SEKTORI[z.sektor];
  document.title = z.naziv + " – plakat";
  const tasks = z.sto.map(t=>`<li>${esc(t)}</li>`).join("");
  const fmt = ["kvadrat","portret","story"].includes(qp("f")) ? " "+qp("f") : "";
  const html = `<div class="poster${fmt}">
    ${headHTML()}
    <section class="hero">
      <div class="placeholder">FOTOGRAFIJA ZANIMANJA<br><small>${img(qp("z")||"mehatronika")}</small></div>
      <img src="${img(qp("z")||"mehatronika")}" alt="" onerror="this.style.display='none'">
      <div class="badges">
        <div class="badge"><div><b>${z.godine}</b><span>godine</span></div></div>
        <div class="badge"><div><b>${z.mjesta}</b><span>mjesta</span></div></div>
      </div>
      <div class="titlewrap">
        <span class="sector">${esc(sek.naziv)}</span>
        <div class="title">${esc(z.naziv)}</div>
      </div>
    </section>
    <main class="body">
      <div>
        <div class="section-title">Što radiš?</div>
        <ul class="tasks">${tasks}</ul>
      </div>
      <div class="docs">
        <div class="section-title">Uvjeti upisa</div>
        <div class="uvjeti">${uvjetiRows(z)}</div>
      </div>
    </main>
    ${footerPlakat()}
  </div>`;
  const root = document.getElementById("root");
  root.innerHTML = html;
  setVars(root.querySelector(".poster"), sek);
}

/* ---- Naslovna (cover) kvadratna slika za kampanju ---- */
function renderNaslovna(){
  const fmt = qp("f")==="story" ? "story" : "kvadrat";
  document.title = "Upisi " + UPIS.godina + " – naslovna";
  document.getElementById("root").innerHTML = `<div class="poster ${fmt} naslovna">
    <div class="nas-logo"><img src="slike/tsd-logo.png" alt="TŠD"></div>
    <div class="nas-school">Tehnička škola Daruvar</div>
    <div class="nas-title">Upisi<br><span>${UPIS.godina}</span></div>
    <div class="nas-hook">Pronađi smjer koji te veseli — i kreni stvarati budućnost.</div>
    <div class="nas-stats">12 zanimanja · 6 sektora · 1 škola</div>
    <div class="nas-foot"><span>${UPIS.web}</span><span>Stvaraj budućnost</span></div>
  </div>`;
}

/* ---- Kartica za izvoz (slika + tekst, bez gumba) za CapCut ---- */
function renderKartica(){
  const slug = qp("z") || "mehatronika";
  const z = ZANIMANJA[slug]; const sek = SEKTORI[z.sektor];
  document.title = "Kartica: " + z.naziv;
  const f = qp("f");
  const cls = f==="kvadrat" ? " kv" : (f==="story" ? " story" : "");
  const bul = z.sto.slice(0,3).map(t=>`<li>${esc(t)}</li>`).join("");
  const termini = UPIS.upisRedovi.map(r=>`${r[0].replace(" 2026.","")} (${r[1]})`).join(", ");
  document.getElementById("root").innerHTML = `<div class="kartica${cls}" style="--c:${sek.accent}">
    <div class="pic">
      <div class="brand"><img src="slike/tsd-logo.png" alt=""><b>Tehnička škola Daruvar</b></div>
      <div class="yr">${z.godine} god. · ${z.mjesta} mjesta</div>
      <img src="${img(slug)}" alt="" onerror="this.style.display='none'">
      <div class="ttl"><span class="sek">${esc(sek.naziv)}</span><h2>${esc(z.naziv)}</h2></div>
    </div>
    <div class="k-body">
      <div class="h">Što radiš?</div>
      <ul>${bul}</ul>
      <div class="k-uvjeti">
        <div class="h">Uvjeti upisa</div>
        <div class="uvjeti">${uvjetiRows(z)}</div>
      </div>
      <div class="k-foot">
        <div class="kf-info">
          <span><b>Prijava online:</b> ${UPIS.prijavaOnline} · ${UPIS.sustav}</span>
          <span><b>Upis u školi:</b> ${termini}</span>
          <span><b>Dokumenti:</b> ${UPIS.email} ili osobno u školi</span>
          <span><b>Lokacija:</b> ${UPIS.adresa}</span>
        </div>
        <div class="kf-qr"><img src="slike/qr-upisi.png" alt="QR za upise"><span>Skeniraj<br>za upise</span></div>
      </div>
    </div>
  </div>`;
}

/* ---- Kartica zanimanja (za sektorski/razinski plakat) ---- */
function zcard(slug){
  const z = ZANIMANJA[slug];
  const bul = z.sto.slice(0,3).map(t=>`<li>${esc(t)}</li>`).join("");
  return `<div class="zcard">
    <div class="pic"><img src="${img(slug)}" alt="" onerror="this.style.display='none'">
      <span class="yr">${z.godine} god. · ${z.mjesta} mjesta</span></div>
    <div class="txt"><h3>${esc(z.naziv)}</h3><ul>${bul}</ul></div>
  </div>`;
}

/* ---- Sektorski plakat ---- */
function renderSektor(){
  const key = qp("s");
  const sek = SEKTORI[key];
  const list = REDOSLIJED.filter(s=>ZANIMANJA[s].sektor===key);
  document.title = "Sektor: "+sek.naziv;
  const cards = list.map(zcard).join("");
  const root = document.getElementById("root");
  root.innerHTML = `<div class="poster">
    ${headHTML()}
    <section class="cover">
      <span class="sector" style="margin-bottom:10px">Sektor</span>
      <div class="lead">${esc(sek.naziv)}</div>
      <div class="sub">Zanimanja koja možeš upisati u školskoj godini ${UPIS.godina}</div>
      <div class="zgrid ${list.length===1?'one':''}">${cards}</div>
    </section>
    ${stripHTML()}
  </div>`;
  setVars(root.querySelector(".poster"), sek);
}

/* ---- Razinski plakat (3 / 4 godine) ---- */
function renderRazina(){
  const r = qp("r")==="cetiri" ? "cetiri" : "tri";
  const sek = SEKTORI["elektrotehnika"];
  const list = REDOSLIJED.filter(s=>ZANIMANJA[s].razina===r);
  const naslov = r==="cetiri" ? "Četverogodišnja zanimanja" : "Trogodišnja zanimanja";
  const podnaslov = r==="cetiri"
    ? "Završavaš s titulom tehničara i možeš nastaviti na fakultet ili veleučilište."
    : "Brzo do zanimanja i tržišta rada, uz mogućnost daljnjeg obrazovanja.";
  document.title = naslov;
  const cards = list.map(zcard).join("");
  const root = document.getElementById("root");
  root.innerHTML = `<div class="poster">
    ${headHTML()}
    <section class="cover">
      <span class="sector" style="margin-bottom:10px">Upisi ${UPIS.godina}</span>
      <div class="lead">${naslov}</div>
      <div class="sub">${podnaslov}</div>
      <div class="zgrid">${cards}</div>
    </section>
    ${stripHTML()}
  </div>`;
  setVars(root.querySelector(".poster"), sek);
}

/* ---- UPISI plakat (datumi, dokumenti, kontakti) ---- */
function renderUpisi(){
  const sek = SEKTORI["promet"]; // zelena akcent
  const f = qp("f");
  const card = f==="kvadrat" || f==="story";
  const fcls = f==="story" ? "story" : "kvadrat";
  document.title = "Upisi "+UPIS.godina;

  // termini upisa s vremenima
  const terminiInline = UPIS.upisRedovi.map(r=>`${r[0].replace(" 2026.","")}: ${r[1]}`).join(" · ");

  // grupiranje liječničkih dokumenata po vrsti dokumenta
  const grupe = {};
  REDOSLIJED.forEach(s=>{
    const z = ZANIMANJA[s];
    const key = z.docs.indexOf("Liječnička svjedodžba medicine rada")===0
      ? "Liječnička svjedodžba medicine rada" : z.docs;
    (grupe[key] = grupe[key] || []).push(z.naziv);
  });
  const grpRed = [
    ["Liječnička svjedodžba medicine rada", "#e07b1a"],
    ["Potvrda nadležnog školskog liječnika", "#1f8fd1"],
    ["Rješenje o primjerenom programu obrazovanja + stručno mišljenje HZZ-a", "#7a52a8"]
  ];
  const docGroupsHTML = grpRed.filter(g=>grupe[g[0]]).map(g=>{
    const items = grupe[g[0]].map(n=>`<li>${esc(n)}</li>`).join("");
    return `<div class="dgroup" style="--g:${g[1]}"><h5>${esc(g[0])}</h5><ul>${items}</ul></div>`;
  }).join("");

  const mailSVG = `<svg class="menv" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7.5l8 5.5 8-5.5"/></svg>`;
  const clockSVG = `<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3.2 2"/></svg>`;
  const terminiRows = UPIS.upisRedovi.map(r=>
    `<div class="trow">${clockSVG}<div><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div></div>`).join("");
  const root = document.getElementById("root");

  if(card){  /* ---- umanjeni plakat: kvadrat (1:1) ili story (9:16) ---- */
    root.innerHTML = `<div class="poster ${fcls} upisi-kv">
      ${headHTML()}
      <div class="ukv-body">
        <div class="ukv-rok">
          <div><span>Prijava online</span><b>${UPIS.prijavaOnline}</b><small>${UPIS.sustav}</small></div>
          <div class="ukv-upis"><span>Upis u školi · ${UPIS.upisSkola}</span><div class="trows">${terminiRows}</div></div>
        </div>
        <div class="ukv-predaj">
          <div class="upisnica">Upisnica — <b>obavezna za sve</b></div>
          <p class="subline">Uz upisnicu, ovisno o zanimanju, predaješ i <b>jedan</b> dokument:</p>
          <div class="docgroups">${docGroupsHTML}</div>
        </div>
        <div class="mailbar">${mailSVG}<p>Sve dokumente pošalji e-poštom na <b>${UPIS.email}</b> ili ih osobno donesi u školu u terminu upisa.</p></div>
        <div class="ukv-foot">
          <div>${UPIS.adresa}<br>${UPIS.web} · ${UPIS.tel}</div>
          <div class="kf-qr"><img src="slike/qr-upisi.png" alt="QR za upise"><span>Skeniraj<br>za upise</span></div>
        </div>
      </div>
    </div>`;
    setVars(root.querySelector(".poster"), sek);
    return;
  }

  /* ---- puni A3 plakat ---- */
  root.innerHTML = `<div class="poster">
    ${headHTML()}
    <section class="up">
      <div>
        <h2>Ljetni upisni rok ${UPIS.godina}</h2>
        <table class="rok">
          <tr><td>Početak prijava u sustav</td><td class="d">1. 6. 2026.</td></tr>
          <tr><td>Prijava obrazovnih programa</td><td class="d">${UPIS.prijavaOnline}</td></tr>
          <tr><td>Prijava programa s dodatnim provjerama</td><td class="d">${UPIS.prijavaProvjere}</td></tr>
          <tr><td>Objava konačnih ljestvica poretka</td><td class="d">${UPIS.objavaListi}</td></tr>
        </table>
      </div>

      <div class="termini">
        <div class="th">Za osobni dolazak na upise u školu</div>
        <div class="trows">${terminiRows}</div>
      </div>

      <div>
        <h2>Što trebaš predati</h2>
        <div class="upisnica">Upisnica — <b>obavezna za sve</b></div>
        <div class="opcije"><span>online</span><i>ili</i><span>e-poštom</span><i>ili</i><span>osobno</span></div>
        <p class="subline">Uz upisnicu, <b>ovisno o zanimanju</b>, predaješ i jedan od sljedećih dokumenata:</p>
        <div class="docgroups">${docGroupsHTML}</div>
      </div>

      <div class="mailbar">
        ${mailSVG}
        <div class="mb-opcije">
          <p>Sve dokumente pošalji e-poštom na <b>${UPIS.email}</b></p>
          <span class="ili">ili</span>
          <p>osobno ih donesi u školu u terminu upisa.</p>
        </div>
      </div>

      <div class="cols cols-end">
        <div>
          <h2>Jesenski rok</h2>
          <table class="rok">
            <tr><td>Prijava programa</td><td class="d">24.–28. 8. 2026.</td></tr>
            <tr><td>Objava ljestvica</td><td class="d">31. 8. 2026.</td></tr>
            <tr><td>Dostava dokumenata / upis</td><td class="d">31. 8.–2. 9. 2026.</td></tr>
          </table>
        </div>
        <div>
          <h2>Kontakt</h2>
          <div class="kontakt">
            <p><b>${UPIS.adresa}</b></p>
            <p>${UPIS.adresa2}</p>
            <p>Tel: <b>${UPIS.tel}</b></p>
            <p>${UPIS.web} · ${UPIS.email}</p>
          </div>
        </div>
      </div>
    </section>
    ${stripHTML()}
  </div>`;
  setVars(root.querySelector(".poster"), sek);
}
