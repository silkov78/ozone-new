// Общие шапка/подвал и фейковые данные для макета (без БД)
const NAV = [
  ["observations.html", "Наблюдения"],
  ["news.html", "Новости"],
  ["about.html", "О центре"],
  ["documents.html", "Документы"],
];
const page = location.pathname.split("/").pop() || "index.html";

document.getElementById("header").outerHTML = `
<header class="header"><div class="container">
  <a class="logo" href="index.html">
    <span>ННИЦ МО БГУ<small>Белорусский государственный университет</small></span></a>
  <nav class="nav" id="nav">${NAV.map(([h, t]) =>
    `<a href="${h}" class="${page.startsWith(h.split(".")[0]) ? "active" : ""}">${t}</a>`).join("")}</nav>
  <div class="lang"><a class="active" href="#">RU</a><a href="#">BE</a><a href="#">EN</a></div>
  <button class="burger" onclick="document.getElementById('nav').classList.toggle('open')">☰</button>
</div></header>`;

// шапка: тёмная поверх hero, светлая — ниже
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero"), hd = document.querySelector(".header");
  if (hero) {
    document.body.classList.add("has-hero");
    const upd = () => hd.classList.toggle("dark", hero.getBoundingClientRect().bottom > 68);
    addEventListener("scroll", upd, { passive: true }); upd();
  }
});
document.addEventListener("DOMContentLoaded", () => { document.getElementById("footer").outerHTML = `
<footer class="footer"><div class="container">
  <div class="cols">
    <div><h4>Национальный научно-исследовательский центр мониторинга озоносферы БГУ</h4>
      <p>Структурное подразделение <a href="https://bsu.by">Белорусского государственного университета</a></p><p>220045, г. Минск, ул. Курчатова, 7</p></div>
    <div><h4>Контакты</h4><ul>
      <li><a href="tel:+375173993611">+375 (17) 399-36-11</a></li>
      <li><a href="mailto:nomrec@bsu.by">nomrec@bsu.by</a></li></ul></div>
    <div><h4>Ссылки</h4><ul>
      <li><a href="https://bsu.by">bsu.by</a></li>
      <li><a href="https://web.telegram.org/k/#@nomrec">Telegram</a></li>
      <li><a href="#">Политика конфиденциальности</a></li></ul></div>
  </div>
  <div class="copy"><span>© 2026 ННИЦ МО БГУ · Белорусский государственный университет</span><span>Данные доступны без регистрации</span></div>
</div></footer>`; });

// --- фейковые наблюдения ---
function genObs(days = 365) {
  const out = [], now = new Date(2026, 10, 12);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    const doy = (d - new Date(d.getFullYear(), 0, 0)) / 864e5;
    const season = Math.sin((doy - 80) / 365 * 2 * Math.PI);
    const r = () => Math.random() - 0.5;
    const oz = b => Math.round(b + 40 * Math.cos((doy - 90) / 365 * 2 * Math.PI) + 25 * r());
    const uv = b => Math.max(0, +(b + 3 * season + r()).toFixed(1));
    out.push({
      date: d.toISOString().slice(0, 10),
      total_ozone_minsk: oz(320), total_uvi_minsk: uv(2.6), max_uvi_minsk: uv(3.2), surface_ozone_minsk: +(0.4 + 0.2 * season + r() * .2).toFixed(2),
      total_ozone_homel: oz(315), total_uvi_homel: uv(2.8), max_uvi_homel: uv(3.4),
      total_ozone_naroch: oz(325), total_uvi_naroch: uv(2.4), max_uvi_naroch: uv(3.0),
    });
  }
  return out;
}
const OBS = genObs();
const uviClass = v => v < 3 ? ["uvi-low", "низкий"] : v < 6 ? ["uvi-mod", "умеренный"] : ["uvi-high", "высокий"];
const fmtDate = s => new Date(s).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

// Моковые новости по схеме модели News (после изменений):
// id, title (≤100), image_logo, body (HTML из редактора), published, status ('PB'|'DF'), source_url (опц.)
const IMG = q => `https://images.unsplash.com/${q}?w=1200`;
const NEWS = [
  { id: 1, title: "Озоновая дыра над Антарктидой в 2026 году — одна из самых маленьких за 20 лет",
    image_logo: IMG("photo-1451187580459-43490279c0fa"), published: "2026-11-08", status: "PB",
    source_url: "https://www.nasa.gov/earth/ozone-hole-2026",
    body: `<p>По данным спутниковых наблюдений, максимальная площадь озоновой дыры в этом сезоне составила <strong>около 19 млн км²</strong>, что заметно меньше среднего значения за последние два десятилетия.</p>
<h2>Что это значит для Беларуси</h2>
<p>Состояние антарктической озоновой дыры напрямую не влияет на озоновый слой над Беларусью, однако служит индикатором эффективности Монреальского протокола.</p>
<ul><li>ОСО над Минском в октябре — в пределах нормы;</li><li>УФ-индекс осенью не превышал 3;</li><li>аномалий на станциях Гомель и Нарочь не зафиксировано.</li></ul>
<blockquote>«Восстановление озонового слоя идёт медленно, но устойчиво», — отмечают специалисты центра.</blockquote>` },
  { id: 2, title: "Сотрудники центра выступили на международной конференции по атмосферному озону",
    image_logo: IMG("photo-1540575467063-178a50c2df87"), published: "2026-10-29", status: "PB",
    source_url: "https://www.wmo.int/",
    body: `<p>В Женеве прошёл <strong>Квадрегиальный симпозиум по озону</strong>. Сотрудники центра представили доклад о 25-летнем ряде наблюдений над Минском.</p><p>Доклад вызвал интерес коллег из Польши и Литвы, обсуждалось совместное сравнение приборов.</p>` },
  { id: 3, title: "Новый спектрофотометр установлен на станции Нарочь",
    image_logo: IMG("photo-1532094349884-543bc11b234d"), published: "2026-10-15", status: "PB", source_url: "",
    body: `<p>На станции Нарочь введён в эксплуатацию спектрофотометр ПИО-2 собственной разработки центра.</p><h2>Характеристики</h2><ul><li>диапазон 290–360 нм;</li><li>автоматическое слежение за Солнцем;</li><li>передача данных в реальном времени.</li></ul>` },
  { id: 4, title: "Итоги летнего сезона наблюдений УФ-излучения",
    image_logo: IMG("photo-1504608524841-42fe6f032b4b"), published: "2026-09-30", status: "PB", source_url: "",
    body: `<p>Летом 2026 года УФ-индекс в Минске <strong>12 дней</strong> достигал высоких значений (6 и выше). Максимум — 7,8 — зафиксирован 3 июля.</p><p>Полные ряды доступны в разделе <a href="observations.html">Наблюдения</a>.</p>` },
  { id: 5, title: "Студенты физфака прошли практику в лаборатории центра",
    image_logo: IMG("photo-1523240795612-9a054b0db644"), published: "2026-09-12", status: "PB", source_url: "https://physics.bsu.by/",
    body: `<p>Двенадцать студентов третьего курса познакомились с методиками измерения общего содержания озона и калибровкой приборов.</p>` },
  { id: 6, title: "Опубликован годовой отчёт о состоянии озоносферы над Беларусью",
    image_logo: IMG("photo-1419242902214-272b3f66ee7a"), published: "2026-08-20", status: "PB", source_url: "",
    body: `<p>Отчёт за 2025 год доступен в разделе <a href="about.html#reports">Годовые отчёты</a>. В нём — среднемесячные значения ОСО, УФ-индекса и сравнение с климатической нормой.</p>` },
  { id: 7, title: "Черновик: план работ на 2027 год",
    image_logo: IMG("photo-1446776811953-b23d57bd21aa"), published: "2026-11-10", status: "DF", source_url: "", body: "<p>Не публикуется.</p>" },
].filter(n => n.status === "PB").sort((a, b) => b.published.localeCompare(a.published));

// превью = начало body без HTML (замена subtitle)
const excerpt = (html, n = 180) => { const t = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").replace(/ ([,.;:!?])/g, "$1").trim(); return t.length > n ? t.slice(0, n).replace(/\s\S*$/, "") + "…" : t; };
const domain = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
const newsCard = (n, cls = "") => `
<a class="card ${cls}" href="news-item.html?id=${n.id}"><div class="thumb"><img src="${n.image_logo}" alt="" loading="lazy"></div>
<div class="body"><span class="date">${fmtDate(n.published)}${n.source_url ? ` · ${domain(n.source_url)}` : ""}</span><h3>${n.title}</h3><p>${excerpt(n.body)}</p></div></a>`;

// скачивание CSV (в Django это будет /observations/download/?format=csv)
function downloadCSV(rows = OBS) {
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map(r => keys.map(k => r[k] ?? "").join(","))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `observations_${rows[0].date}_${rows[rows.length - 1].date}.csv`;
  a.click();
}

// Моковые сотрудники по схеме staff.Worker + связанные таблицы
const WORKERS_BASE = [
  { id: 1, last_name: "Иванов", first_name: "Иван", middle_name: "Иванович", photo: "https://i.pravatar.cc/400?img=12",
    academic_rank: "Кандидат физ.-мат. наук, доцент", position: "Директор ННИЦ МО БГУ", mail: "ivanov@bsu.by", phone: "+375 (17) 399-36-11",
    adress: "ул. Курчатова, 7, к. 301", google_academy: "https://scholar.google.com/",
    education: [{ study_finishing: 1995, study_description: "БГУ, физический факультет" }, { study_finishing: 1999, study_description: "Аспирантура БГУ" }],
    career: [{ career_start: 1999, career_period: "1999–2010", career_description: "Научный сотрудник ННИЦ МО БГУ" }, { career_start: 2010, career_period: "2010 — н.в.", career_description: "Директор ННИЦ МО БГУ" }],
    rewards: [{ reward_year: 2018, reward_description: "Почётная грамота БГУ" }],
    interests: ["Атмосферный озон", "УФ-радиометрия", "Спектрофотометрия"],
    publications: [{ publication_year: 2024, publication_description: "Иванов И.И. и др. Долговременные изменения ОСО над Беларусью // Журнал БГУ. Физика, 2024.", publication_link: "https://elib.bsu.by/" },
                   { publication_year: 2021, publication_description: "Иванов И.И. УФ-индекс в Минске: 20 лет наблюдений // Вестник БГУ, 2021.", publication_link: "" }] },
  { id: 2, last_name: "Петрова", first_name: "Анна", middle_name: "Сергеевна", photo: "https://i.pravatar.cc/400?img=47", academic_rank: "Кандидат физ.-мат. наук", position: "Заведующая лабораторией" },
  { id: 3, last_name: "Сидоров", first_name: "Павел", middle_name: "Олегович", photo: "https://i.pravatar.cc/400?img=15", academic_rank: "", position: "Ведущий научный сотрудник" },
  { id: 4, last_name: "Ковалёва", first_name: "Мария", middle_name: "Игоревна", photo: "https://i.pravatar.cc/400?img=45", academic_rank: "", position: "Научный сотрудник" },
];

// Подразделения — просто перечень (сотрудники к ним не привязаны)
const DEPARTMENTS = ["Лаборатория физики атмосферы","Лаборатория биофотоники","Лаборатория оптических средств измерений","Информационно-аналитический центр","Озонометрическая станция № 354 GAW"];
const _LN = ["Новик","Козлов","Мельник","Ткачук","Шевчук","Бондарь","Лукашевич","Жук","Гончар","Савицкая","Климович","Романенко","Кравец","Пашкевич","Литвин","Зайцева","Орлова","Белова","Кузьмич","Мороз","Ярош","Головач","Сорока","Демченко","Карпович","Лис"];
const _FN = ["Андрей","Ольга","Дмитрий","Елена","Сергей","Наталья","Алексей","Татьяна","Виктор","Ирина"];
const _MN = ["Александрович","Викторовна","Петрович","Николаевна","Сергеевич","Андреевна"];
const _POS = ["Ведущий научный сотрудник","Старший научный сотрудник","Научный сотрудник","Младший научный сотрудник","Инженер","Ведущий инженер","Лаборант"];
const WORKERS = [...WORKERS_BASE];
_LN.slice(0, 6).forEach((ln, i) => WORKERS.push({ id: 10 + i, last_name: ln, first_name: _FN[i % 10], middle_name: _MN[i % 6],
  photo: `https://i.pravatar.cc/300?img=${(i % 60) + 1}`, position: i % 6 === 0 ? "Заведующий" : _POS[i % 7],
  academic_rank: i % 4 === 0 ? "Кандидат физ.-мат. наук" : "" }));

// Иллюстрация: край Земли, атмосфера и светящийся озоновый слой (SVG, без картинок)
function ozoneArt({ labels = false, stars = 60, cy = 3150, r = 2560, w = 1600, h = 700 } = {}) {
  const cx = w / 2, rnd = (a, b) => a + Math.random() * (b - a);
  const st = Array.from({ length: stars }, () => `<circle cx="${rnd(0, w).toFixed(0)}" cy="${rnd(0, cy - r - 40).toFixed(0)}" r="${rnd(.4, 1.4).toFixed(1)}" fill="#fff" opacity="${rnd(.15, .7).toFixed(2)}"/>`).join("");
  const arc = rr => `M ${cx - rr} ${cy} A ${rr} ${rr} 0 0 1 ${cx + rr} ${cy}`;
  const lab = (rr, t, o = 54) => `<text class="oz-lab"><textPath href="#p${rr}" startOffset="${o}%">${t}</textPath></text><path id="p${rr}" d="${arc(rr)}" fill="none"/>`;
  return `<svg class="oz-art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <radialGradient id="planet" cx="50%" cy="0%" r="12%"><stop offset="0" stop-color="#1b4a63"/><stop offset="1" stop-color="#081a26"/></radialGradient>
    <linearGradient id="ozg" x1="0" x2="1"><stop offset="0" stop-color="#68a4c4" stop-opacity="0"/><stop offset=".3" stop-color="#7fd6ff"/><stop offset=".5" stop-color="#b9a6ff"/><stop offset=".7" stop-color="#7fd6ff"/><stop offset="1" stop-color="#68a4c4" stop-opacity="0"/></linearGradient>
    <filter id="b30" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="30"/></filter>
    <filter id="b6"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="b2"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <g>${st}</g>
  <circle cx="${cx}" cy="${cy}" r="${r + 70}" fill="none" stroke="#0091c2" stroke-opacity=".35" stroke-width="90" filter="url(#b30)"/>
  <circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="none" stroke="#a2cce3" stroke-opacity=".45" stroke-width="28" filter="url(#b6)"/>
  <circle class="oz-band" cx="${cx}" cy="${cy}" r="${r + 46}" fill="none" stroke="url(#ozg)" stroke-width="7" filter="url(#b2)"/>
  <circle cx="${cx}" cy="${cy}" r="${r + 46}" fill="none" stroke="url(#ozg)" stroke-width="1.2" opacity=".9"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#planet)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#cfe9f7" stroke-opacity=".7" stroke-width="1.5"/>
  ${labels ? lab(r + 58, "ОЗОНОВЫЙ СЛОЙ · 15–35 КМ", 51) + lab(r + 8, "ТРОПОСФЕРА · 0–12 КМ", 49) : lab(r + 58, "ОЗОНОВЫЙ СЛОЙ", 50)}
</svg>`;
}
