document.documentElement.classList.add("js");

const sliders = document.querySelectorAll("[data-slider]");

sliders.forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll("[data-slider-slide]"));
  const dots = Array.from(slider.querySelectorAll(".gallery-dots span"));
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

  const showSlide = (nextIndex) => {
    if (!slides.length) return;
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle("is-active", index === activeIndex));
    dots.forEach((dot, index) => dot.classList.toggle("is-active", index === activeIndex));
  };

  slider.querySelectorAll("[data-slider-prev]").forEach((button) => {
    button.addEventListener("click", () => showSlide(activeIndex - 1));
  });

  slider.querySelectorAll("[data-slider-next]").forEach((button) => {
    button.addEventListener("click", () => showSlide(activeIndex + 1));
  });

  showSlide(activeIndex);
});

const dialog = document.querySelector("#problemDialog");

const problemPopups = {
  finance: {
    title: "Финансы",
    text:
      "Основные траты идут на три вещи: тренировки, экипировку и поездки на соревнования. Одно индивидуальное занятие с тренером стоит от 2000 до 7000 рублей. Чтобы прогрессировать, нужно заниматься минимум 3-4 раза в неделю, поэтому в месяц на тренера уходит 50-80 тысяч рублей. Дальше — костюмы. Соревновательное платье для девушек с ручной вышивкой и стразами стоит от 100 тысяч рублей, а хорошее — 300-500 тысяч. Мужской костюм дешевле — 30-70 тысяч рублей. Туфли (около 10-15 тысяч) меняют каждые полгода, потому что они быстро изнашиваются. Стартовый взнос за один турнир — 2-5 тысяч рублей, плюс дорога, гостиница, автозагар и прическа. В итоге один выезд на соревнования обходится в 15-30 тысяч. За год занятий на уровне любителя выходит 300-500 тысяч рублей",
  },
  injuries: {
    title: "Травмы",
    text:
      "Травмы в бальных танцах — это обычное дело, а не исключение. Около 80% танцоров за свою карьеру получают хотя бы одну серьезную травму. Самые уязвимые места — это стопа, голеностоп и поясница. Стопа страдает из-за постоянных вращений и туфель (особенно у девушек, которые танцуют на каблуках). Поясница болит из-за того, что корпус постоянно держат в напряжении. Также часто травмируются колени и шея. Основные причины — перегрузка, неправильное восстановление и усталость. Профессионалы тренируются по 10-12 часов в неделю, а во время сборов — еще больше. Самые частые травмы — растяжения связок голеностопа, воспаление ахиллова сухожилия, грыжи в пояснице. Восстановление после серьезной травмы занимает от 2 до 6 месяцев",
  },
  psychology: {
    title: "Психология",
    text:
      "Танцоры привыкают постоянно себя критиковать, и со временем это перерастает в заниженную самооценку и неумение радоваться своим успехам. Также распространено эмоциональное выгорание. Из-за частых турниров и ежедневных тренировок танцор работает на износ, но перестает чувствовать удовольствие от танца. Появляется апатия, раздражительность и желание все бросить. Особенно сильно это проявляется у подростков 14-17 лет, которые совмещают спорт со школой и экзаменами. Еще одна проблема — страх травмы. Танцор, который уже получил серьезную травму, подсознательно начинает беречь больное место, из-за чего техника ломается, и возникает риск новой травмы уже с другой стороны",
  },
  conflicts: {
    title: "Конфликты в паре",
    text:
      "Танцоры проводят вместе по 4-6 часов в день, а на сборах и турнирах — и все 24 часа. При этом они находятся в постоянном физическом и эмоциональном контакте, что рано или поздно приводит к напряжению. Самая частая причина конфликтов — это разный уровень подготовки. Вторая причина — распределение ответственности. Один хочет тренироваться ради удовольствия и ездить на турниры раз в месяц, а второй мечтает о чемпионстве и готов пахать каждый день. Компромисс найти сложно, и пара распадается. Также часты конфликты из-за усталости. Когда оба вымотаны тренировкой, любая мелочь (слишком сильный захват, не тот шаг, кривая улыбка) вызывает вспышку агрессии. Многие пары ссорятся прямо на паркете, но стараются делать это шепотом или через зубы, чтобы не видно было судьям",
  },
};

if (dialog) {
  const title = dialog.querySelector("h3");
  const text = dialog.querySelector("p");

  const lockPage = () => {
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
  };

  const unlockPage = () => {
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
  };

  const openProblem = (key) => {
    const popup = problemPopups[key];
    if (!popup) return;
    title.textContent = popup.title;
    text.textContent = popup.text;
    lockPage();
    dialog.hidden = false;
    dialog.querySelector(".dialog-close").focus();
  };

  const closeProblem = () => {
    dialog.hidden = true;
    unlockPage();
  };

  document.querySelectorAll("[data-problem]").forEach((card) => {
    card.addEventListener("click", () => {
      openProblem(card.dataset.problem);
    });
  });

  dialog.querySelector(".dialog-close").addEventListener("click", closeProblem);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeProblem();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.hidden) closeProblem();
  });

  const initialProblem = new URLSearchParams(window.location.search).get("problem");
  if (initialProblem) openProblem(initialProblem);
}

const responsiveLinks = document.querySelectorAll("[data-mobile-href]");

if (responsiveLinks.length) {
  const mobileMedia = window.matchMedia("(max-width: 640px)");

  const updateResponsiveLinks = () => {
    responsiveLinks.forEach((link) => {
      if (!link.dataset.defaultHref) {
        link.dataset.defaultHref = link.getAttribute("href") || "";
      }

      link.setAttribute("href", mobileMedia.matches ? link.dataset.mobileHref : link.dataset.defaultHref);
    });
  };

  updateResponsiveLinks();

  if (typeof mobileMedia.addEventListener === "function") {
    mobileMedia.addEventListener("change", updateResponsiveLinks);
  } else {
    mobileMedia.addListener(updateResponsiveLinks);
  }
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobileMenu");

if (menuToggle && mobileMenu) {
  const desktopMedia = window.matchMedia("(min-width: 641px)");
  const menuLinks = mobileMenu.querySelectorAll("a");

  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    mobileMenu.hidden = !isOpen;
    document.documentElement.classList.toggle("nav-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(mobileMenu.hidden);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  const closeOnDesktop = () => {
    if (desktopMedia.matches) setMenuOpen(false);
  };

  closeOnDesktop();

  if (typeof desktopMedia.addEventListener === "function") {
    desktopMedia.addEventListener("change", closeOnDesktop);
  } else {
    desktopMedia.addListener(closeOnDesktop);
  }
}

const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-media, .hero-button, .section-title, .article-photo, .article-content, .myth-wrap, .story-frame, .pressure-illustration, .problem-card, .author-photo, .author-text, .author-illustration, .gallery-wrap, .cta-inner, .site-footer"
);

if (revealTargets.length) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealElement = (element) => {
    element.classList.add("is-visible");
  };

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });

  const showAll = () => {
    revealTargets.forEach(revealElement);
  };

  if (motionQuery.matches || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      }
    );

    requestAnimationFrame(() => {
      revealTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          revealElement(element);
        } else {
          observer.observe(element);
        }
      });
    });
  }
}
