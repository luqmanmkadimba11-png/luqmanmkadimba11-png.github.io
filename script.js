const DEPTS = [
  { code: "PR", id: "programu", title: "Ujenzi wa Programu na IT", sum: "Mifumo, tovuti na app zinazosaidia biashara yako kuuza na kufanya kazi kwa urahisi.",
    items: [
      ["Ujenzi wa Tovuti na Mifumo", "Tovuti za makampuni, maduka ya mtandaoni (e-commerce), na mifumo ya usimamizi kama CRM, ERP na POS."],
      ["Ujenzi wa App za Simu", "Programu za Android na iOS kwa ajili ya biashara na huduma zako."],
      ["Wi-Fi na Hotspot", "Mifumo ya intaneti yenye vocha (hotspot management) kwa maduka, hoteli na maeneo ya umma."],
      ["API na Integration", "Kuunganisha malipo ya M-Pesa, Airtel Money, Tigo Pesa na Kadi kwenye tovuti na app yako."]
    ] },
  { code: "HW", id: "ukarabati", title: "Ukarabati na Matengenezo", sum: "Vifaa vyako vinarudi vikifanya kazi, kuanzia simu mfukoni hadi printer ofisini.",
    items: [
      ["Simu na Tablet", "Skrini, betri, motherboard na matatizo ya software."],
      ["Kompyuta na Server", "Laptop na PC: usafi wa ndani na kubadilisha vipuri."],
      ["Vifaa vya Maofisini", "Kuhudumia na kukarabati printers, scanners na projectors."]
    ] },
  { code: "NW", id: "mtandao", title: "Mtandao na Usalama", sum: "Mtandao imara, kamera zinazoangalia mali yako, na taarifa zilizolindwa.",
    items: [
      ["Ufungaji wa Mtandao", "Kujenga na kuweka miundombinu ya mtandao wa ndani (LAN na Wi-Fi)."],
      ["Kamera za Usalama (CCTV)", "Kufunga mifumo ya kamera za ulinzi zinazofanya kazi mtandaoni."],
      ["Usalama wa Mifumo", "Ukaguzi wa usalama wa taarifa na kuzuia mashambulizi ya mtandaoni."]
    ] },
  { code: "CL", id: "cloud", title: "Cloud na Usimamizi wa Data", sum: "Anwani ya tovuti yako, barua pepe rasmi, na kumbukumbu zako zikiwa salama.",
    items: [
      ["Hosting na Domain", "Kuuza anwani za tovuti (domains) na nafasi za kuhifadhia tovuti (hosting)."],
      ["Data Backup na Recovery", "Kuhifadhi kumbukumbu za biashara kwa usalama kwenye Cloud na kuokoa data zilizopotea."],
      ["Barua Pepe Rasmi", "Kutengeneza na kusimamia barua pepe za kampuni, mfano info@kampuni.com."]
    ] },
  { code: "GR", id: "ubunifu", title: "Ubunifu wa Picha na Chapa", sum: "Muonekano unaotambulika, kuanzia nembo hadi bango kubwa barabarani.",
    items: [
      ["Nembo na Utambulisho", "Logo, mwongozo wa rangi na muonekano wa kampuni (corporate identity)."],
      ["Vifaa vya Masoko", "Flyers, posters, broshua na mabango makubwa (banners na billboards)."],
      ["Social Media na Web", "Posters za matangazo ya Instagram na WhatsApp, pamoja na ubunifu wa mifumo (UI/UX)."],
      ["Vifungashio na Kadi", "Stika na lebo za bidhaa, Business Cards, vitambulisho (ID Cards) na kadi za mialiko."]
    ] },
  { code: "ST", id: "steshenari", title: "Steshenari na Uchapishaji", sum: "Nakala, kuunganisha vitabu, mihuri, picha za pasipoti na kujaza fomu za mtandaoni.",
    items: [
      ["Kupiga Chapa na Kutoa Nakala", "Uchapishaji wa nyaraka za rangi na nyeusi-nyeupe kwa saizi mbalimbali."],
      ["Binding, Lamination na Scanning", "Kuunganisha vitabu (spiral au hardcover), lamination, na kuchanganua nyaraka kuwa PDF."],
      ["Mihuri na Picha", "Mihuri ya self-inking na picha za pasipoti za papo kwa papo."],
      ["Huduma za Mtandaoni na Vifaa", "Kujaza fomu za mtandaoni (vyuo, NIDA, TRA, pasipoti) na kuuza vifaa vya ofisi kama karatasi, kalamu na mafaili."]
    ] }
];

const $ = (s) => document.querySelector(s);
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

$("#index").innerHTML = DEPTS.map((d) =>
  `<a href="#${d.id}"><code>${d.code}</code><span>${esc(d.title)}</span><span class="n">${d.items.length} huduma</span></a>`
).join("");

$("#depts").innerHTML = DEPTS.map((d) => `
  <article class="dept" id="${d.id}" data-dept="${d.id}">
    <div>
      <span class="tag">${d.code}</span>
      <h2>${esc(d.title)}</h2>
      <p class="sum">${esc(d.sum)}</p>
    </div>
    <div class="items">
      ${d.items.map((it, i) => `
        <div class="item">
          <span class="c">${d.code}-${i + 1}</span>
          <h3>${esc(it[0])}</h3>
          <p>${esc(it[1])}</p>
        </div>`).join("")}
    </div>
  </article>`).join("");

// Filters
const fWrap = $("#filters");
const fItems = [{ id: "zote", label: "Zote" }].concat(DEPTS.map((d) => ({ id: d.id, label: d.title.split(" na ")[0].replace("Ujenzi wa ", "") })));
fWrap.innerHTML = fItems.map((f, i) => `<button type="button" class="chip" data-f="${f.id}" aria-pressed="${i === 0}">${esc(f.label)}</button>`).join("");
fWrap.addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  const f = b.dataset.f;
  fWrap.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
  document.querySelectorAll(".dept").forEach((s) => { s.hidden = !(f === "zote" || s.dataset.dept === f); });
});

// Form
const sel = $("#huduma-sel");
sel.innerHTML = `<option value="">Chagua huduma</option>` + DEPTS.map((d) =>
  `<optgroup label="${esc(d.title)}">${d.items.map((it) => `<option>${esc(it[0])}</option>`).join("")}</optgroup>`
).join("");

$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const jina = $("#jina").value.trim();
  const h = sel.value;
  const m = $("#maelezo").value.trim();
  const lines = ["Habari, naomba bei na maelezo ya huduma hii:"];
  if (h) lines.push("Huduma: " + h);
  if (m) lines.push("Maelezo: " + m);
  if (jina) lines.push("Jina: " + jina);
  $("#msg").textContent = lines.join("\n");
  $("#result").hidden = false;
  $("#copied").textContent = "";
});

$("#copy").addEventListener("click", () => {
  const txt = $("#msg").textContent;
  const done = () => { $("#copied").textContent = "Umenakiliwa."; };
  const fallback = () => {
    const r = document.createRange(); r.selectNodeContents($("#msg"));
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    $("#copied").textContent = "Umechaguliwa. Bonyeza nakili.";
  };
  try { navigator.clipboard.writeText(txt).then(done, fallback); } catch (_) { fallback(); }
});

$("#yr").textContent = new Date().getFullYear();
