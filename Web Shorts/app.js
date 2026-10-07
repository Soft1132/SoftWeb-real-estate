(() => {
  const translations = {
  "en": {
    "skip": "Skip to content",
    "navWork": "Reels",
    "navAbout": "Approach",
    "navContact": "Let’s talk",
    "heroTitle": "Helping real estate agents grow their personal brand.",
    "heroButton": "Explore the reels",
    "workLabel": "REELS FOR YOUR SOCIAL PRESENCE",
    "workTitle": "Your listings. Your voice.",
    "category1": "LIFE IN ORLANDO",
    "title1": "Orlando.<br> Through an agent’s eyes.",
    "description1": "A reel about life in Orlando. Dynamic transitions and bold captions bring the key ideas into focus.",
    "tag1a": "Transitions",
    "tag1b": "Captions",
    "tag1c": "Location",
    "category2": "PROPERTY TOUR",
    "title2": "A home.<br> In every detail.",
    "description2": "A tour of the house, interiors and grounds. Smooth editing lets viewers feel the space.",
    "tag2a": "Flow",
    "tag2b": "Detail",
    "tag2c": "Atmosphere",
    "category3": "EXPERT REEL",
    "title3": "Expertise.<br> With a personal touch.",
    "description3": "An agent shares her approach to selling. Clean cuts, expressive captions and graphic accents.",
    "tag3a": "Captions",
    "tag3b": "Graphics",
    "tag3c": "Voice",
    "category4": "REGULAR CONTENT",
    "title4": "A consistent<br> presence.",
    "description4": "A repeatable style for your next videos. You film and work with clients; I take care of the edit.",
    "tag4a": "Series",
    "tag4b": "Consistency",
    "tag4c": "Your style",
    "soon": "Reel coming soon",
    "preview": "CONCEPT PREVIEW",
    "aboutLabel": "YOUR EDITOR, BEHIND THE SCENES",
    "aboutTitle": "Hi, I’m Artyom.<br> You can call me SOFT.",
    "aboutDescription": "I turn your footage into reels that reflect your expertise and personality. We agree on the style, deadline and scope before editing begins.",
    "process1Title": "A style that fits you",
    "process1Text": "Your page, your audience and a shared reference.",
    "process2Title": "Reels in batches",
    "process2Text": "Plan the volume and deadlines around your filming.",
    "process3Title": "Clear feedback",
    "process3Text": "Timecoded notes and agreed revisions in one place.",
    "contactLabel": "YOUR NEXT STEP ON SOCIAL",
    "contactTitle": "A page that feels like you.<br> Start with one reel.",
    "contactDescription": "Send me your profile and an idea.<br> We’ll discuss the style and start with one video.",
    "contactButton": "Discuss your first reel",
    "footer": "REELS FOR REAL ESTATE AGENTS",
    "agencyLead": "Need a website?",
    "agencyLink": "Get yours built by KK agency"
  },
  "ru": {
    "skip": "Перейти к содержимому",
    "navWork": "Рилсы",
    "navAbout": "Подход",
    "navContact": "Обсудить",
    "heroTitle": "Помогаю риелторам продвигать их личный бренд",
    "heroButton": "Посмотреть рилсы",
    "workLabel": "РИЛСЫ ДЛЯ ВАШИХ СОЦСЕТЕЙ",
    "workTitle": "Объекты. Опыт. Ваш характер.",
    "category1": "ЖИЗНЬ В ОРЛАНДО",
    "title1": "Орландо<br> глазами риелтора.",
    "description1": "Рилс о жизни в Орландо. Динамичные переходы и крупные титры выделяют главные мысли.",
    "tag1a": "Переходы",
    "tag1b": "Титры",
    "tag1c": "Локация",
    "category2": "ОБЗОР ОБЪЕКТА",
    "title2": "Дом<br> в деталях.",
    "description2": "Обзор дома, интерьера и участка. Плавный монтаж помогает почувствовать пространство.",
    "tag2a": "Темп",
    "tag2b": "Детали",
    "tag2c": "Атмосфера",
    "category3": "ЭКСПЕРТНЫЙ РИЛС",
    "title3": "Экспертность,<br> которой доверяют.",
    "description3": "Риелтор рассказывает о своём подходе к продаже. Чистый монтаж, выразительные титры и графические акценты.",
    "tag3a": "Титры",
    "tag3b": "Графика",
    "tag3c": "Голос",
    "category4": "РЕГУЛЯРНЫЙ КОНТЕНТ",
    "title4": "Стиль,<br> который узнают.",
    "description4": "Единая подача для следующих роликов. Вы снимаете и работаете с клиентами, я собираю видео.",
    "tag4a": "Серии",
    "tag4b": "Регулярность",
    "tag4c": "Ваш стиль",
    "soon": "Скоро здесь будет рилс",
    "preview": "ВИЗУАЛЬНАЯ КОНЦЕПЦИЯ",
    "aboutLabel": "ВАШ МОНТАЖЁР ЗА КАДРОМ",
    "aboutTitle": "Привет, я Артём.<br> Можно просто SOFT.",
    "aboutDescription": "Собираю из ваших кадров рилсы, которые передают ваш опыт и характер. До начала работы согласуем стиль, сроки и объём монтажа.",
    "process1Title": "Стиль под вас",
    "process1Text": "Ваша страница, аудитория и общий референс.",
    "process2Title": "Рилсы партиями",
    "process2Text": "Объём и сроки планируем под ваши съёмки.",
    "process3Title": "Понятная обратная связь",
    "process3Text": "Комментарии по таймкодам и согласованные правки.",
    "contactLabel": "СЛЕДУЮЩИЙ ШАГ ДЛЯ ВАШИХ СОЦСЕТЕЙ",
    "contactTitle": "Ваш характер.<br> В каждом рилсе.",
    "contactDescription": "Пришлите свою страницу и идею.<br> Обсудим стиль и начнём с одного ролика.",
    "contactButton": "Обсудить первый рилс",
    "footer": "РИЛСЫ ДЛЯ РИЕЛТОРОВ",
    "agencyLead": "Нужен сайт?",
    "agencyLink": "Закажите в KK agency"
  }
};
  const altTexts = {
    en:{villa:"Contemporary villa with warm windows beside an infinity pool at blue hour",villaReel:"Poolside view of a contemporary villa",interior:"Sunlit penthouse interior with tall windows",detail:"Architectural details and materials in a modern penthouse",tower:"Contemporary residential tower against a blue sky"},
    ru:{villa:"Современная вилла с тёплым светом в окнах и бассейном в вечерних сумерках",villaReel:"Современная вилла со стороны бассейна",interior:"Светлый интерьер пентхауса с высокими окнами",detail:"Архитектурные детали и материалы современного пентхауса",tower:"Современный жилой небоскрёб на фоне синего неба"}
  };
  let language = "en";
  const toggle = document.getElementById("language-toggle");
  function setLanguage(next) {
    language=next;
    document.documentElement.lang=next;
    document.querySelectorAll("[data-i18n]").forEach(el=>{const value=translations[next][el.dataset.i18n];if(value!==undefined)el.innerHTML=value;});
    document.querySelectorAll("[data-alt]").forEach(el=>{el.alt=altTexts[next][el.dataset.alt]||el.alt;});
    toggle.innerHTML=next==="en"?"EN <span>/ RU</span>":"RU <span>/ EN</span>";
    toggle.setAttribute("aria-label",next==="en"?"Switch to Russian":"Switch to English");
    document.title=next==="en"?"SOFT — Reels for Real Estate Agents":"SOFT — Рилсы для риелторов";
    const subject=next==="en"?"Reels for my real estate page":"Рилсы для моей страницы риелтора";
    const body=next==="en"?"Hi Artyom,\n\nI’d like to discuss reels for my real estate page.\nMy profile: \nVideo idea: \nFootage (if available): ":"Привет, Артём!\n\nХочу обсудить рилсы для моей страницы риелтора.\nМоя страница: \nИдея ролика: \nИсходники (если есть): ";
    document.getElementById("email-cta").href="mailto:artyomsoft91@gmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
    document.dispatchEvent(new Event("soft:language"));
  }
  toggle.addEventListener("click",()=>setLanguage(language==="en"?"ru":"en"));
  document.getElementById("year").textContent=new Date().getFullYear();
  (window.SOFT_REELS||[]).slice(0,4).forEach((reel,index)=>{
    if(!reel.src)return;
    const shell=document.querySelector('[data-reel="'+index+'"]');
    if(!shell)return;
    const video=shell.querySelector("video")||document.createElement("video");
    if(video.getAttribute("src")!==reel.src)video.src=reel.src;
    video.poster=reel.poster||"";video.controls=true;video.preload="none";video.playsInline=true;
    video.setAttribute("aria-labelledby","reel-title-"+(index+1));
    shell.querySelector(".reel-media").replaceChildren(video);shell.classList.add("has-video");
  });
  if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.documentElement.classList.add("js-motion");
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.08});
    document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  }
})();
