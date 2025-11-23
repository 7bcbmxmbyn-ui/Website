// ---------- YEAR ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- I18N DICTIONARY ----------
const i18n = {
  en: {
    "meta.title": "Klaas de Jager — Portfolio",
    "a11y.skip": "Skip to content",
    "nav.features": "Background",
    "nav.cases": "Experiences",
    "nav.contact": "Contact",

    "hero.title": "Who am I?<br>I am Klaas.",
    "hero.subtitle": "I specialise in solving practical problems and making processes smarter.",
    "cta.start": "Get in touch",

    "features.title": "What is my background?",
    "features.fast.title": "General Secondary Education",
    "features.fast.body": "I completed my havo at Jac. P. Thijsse College in Castricum. My profiles were Economics & Culture and Society. Electives included German, History and Music.",
    "features.pricing.title": "Engineering: Industrial Engineering & Management",
    "features.pricing.body": "After havo I moved on to university of applied sciences. I obtained my bachelor’s degree in Engineering (Industrial Engineering & Management) at the Amsterdam University of Applied Sciences. Electives: Modelling in Operations and Colour & Material Finishing. In my third year, alongside my internship at MSD, I completed the Entrepreneurship minor.",
    "features.support.title": "Pre-master in Management",
    "features.support.body": "Since early November I have completed my pre-master in Management at Nyenrode Business University in Amsterdam, with an average grade of 7.4. From January 2026 I will start the master programme, which I’m really looking forward to.",

    "cases.title": "Experiences",
    "cases.one.title": "Thesis internship at Ernst & Young",
    "cases.one.body": "KPI overview for virtual machines and network analysis.",
    "cases.two.title": "Third-year internship at MSD",
    "cases.two.body": "Real-time monitoring of incidents and security threats.",
    "cases.three.title": "Work planner at A. Hak",
    "cases.three.body": "Managing endpoints, assets and updates from a single portal.",
    "cases.four.title": "Hospitality role at Tuindiners",
    "cases.four.body": "Process optimisation, guest experience and operational performance.",

    "contact.title": "Get in touch",

    "footer.rights": "All rights reserved."
  },
  nl: {
    "meta.title": "Klaas de Jager — Portfolio",
    "a11y.skip": "Direct naar inhoud",
    "nav.features": "Achtergrond",
    "nav.cases": "Ervaring",
    "nav.contact": "Contact",

    "hero.title": "Wie ben ik?<br>Ik ben Klaas.",
    "hero.subtitle": "Ik ontwikkel mij in het oplossen van praktische problemen en het slimmer maken van processen.",
    "cta.start": "Neem contact op!",

    "features.title": "Wat is mijn achtergrond?",
    "features.fast.title": "Hoger Algemeen Voortgezet Onderwijs",
    "features.fast.body": "Op het Jac. P. Thijsse College in Castricum heb ik mijn havo afgerond. Mijn profielen waren Economie &amp; Maatschappij en Cultuur &amp; Maatschappij. Extra vakken: Duits, Geschiedenis en Muziek.",
    "features.pricing.title": "Engineering: Technische Bedrijfskunde",
    "features.pricing.body": "Na de havo ben ik doorgestroomd naar het hbo. Aan de Hogeschool van Amsterdam heb ik mijn bachelor in Engineering (Technische Bedrijfskunde) afgerond. Extra vakken: Modelling in Operations en Kleur &amp; Materiaalafwerking. In mijn derde jaar heb ik naast mijn stage bij MSD de minor Ondernemerschap gevolgd.",
    "features.support.title": "Pre-master in Management",
    "features.support.body": "Sinds begin november ben ik klaar met mijn pre-master in Management aan Nyenrode Business University in Amsterdam, afgerond met een gemiddelde van een 7,4. Vanaf januari 2026 start ik met de master. Daar heb ik enorm veel zin in.",

    "cases.title": "Ervaring",
    "cases.one.title": "Scriptiestage bij Ernst &amp; Young",
    "cases.one.body": "Ondersteunde het Technology Risk team bij technische controls en schreef een scriptie over het verbeteren van het onboardingproces van de afdeling (Landelijk)",
    "cases.two.title": "Derdejaars stage bij MSD",
    "cases.two.body": "Maakte de FTE-inzet binnen Capex-projecten volledig inzichtelijk. Ontwikkelde en verfijnde een Excel/VBA-tool die het planningsproces duidelijker en efficiënter maakte.",
    "cases.three.title": "Werkvoorbereider bij A. Hak",
    "cases.three.body": "Planningen afstemmen, knelpunten bespreken en informatie verduidelijken. Ik was de schakel tussen het kantoor en de ploegen buiten",
    "cases.four.title": "Horecamedewerker bij Tuindiners",
    "cases.four.body": "Procesoptimalisatie, gastenervaring en operationele prestaties.",

    "contact.title": "Neem contact op",

    "footer.rights": "Alle rechten voorbehouden."
  }
};

// ---------- LANGUAGE ----------
function applyLang(lang){
  const dict = i18n[lang] || i18n.en;
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const val = dict[key];
    if(!val) return;

    if(
      (el.tagName === "INPUT" || el.tagName === "TEXTAREA") &&
      el.hasAttribute("placeholder")
    ){
      el.placeholder = val;
    }else{
      el.innerHTML = val;
    }
  });

  document.querySelectorAll(".lang-switch a").forEach(a=>{
    a.classList.toggle("active", a.dataset.lang === lang);
  });
}

const savedLang = localStorage.getItem("lang");
const fallbackLang = (navigator.language||"en").toLowerCase().startsWith("nl") ? "nl" : "en";
applyLang(savedLang || fallbackLang || "en");

document.querySelectorAll(".lang-switch a").forEach(a=>{
  a.addEventListener("click", e=>{
    e.preventDefault();
    applyLang(a.dataset.lang);
  });
});

// ---------- THEME ----------
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if(themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

(function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved){
    applyTheme(saved);
    return;
  }
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(systemDark ? 'dark' : 'light');
})();

const mm = window.matchMedia('(prefers-color-scheme: dark)');
if(mm.addEventListener){
  mm.addEventListener('change', e=>{
    if(!localStorage.getItem('theme')){
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

themeBtn?.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ---------- SMOOTH SCROLL WITH OFFSET ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;

    e.preventDefault();
    const headerOffset = 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    const start = window.pageYOffset;
    const distance = targetPosition - start;
    const duration = 750;
    let startTime = null;

    function smoothStep(timestamp){
      if(!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
      window.scrollTo(0, start + distance * ease);
      if(progress < 1) requestAnimationFrame(smoothStep);
    }
    requestAnimationFrame(smoothStep);
  });
});