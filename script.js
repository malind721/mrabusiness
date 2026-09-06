// =========================================================
// M.R.A. BUSINESS — SCRIPT.JS
// EmailJS + Molten Metal
// =========================================================


// =========================================================
// EMAILJS
// =========================================================

emailjs.init({
  publicKey: "SRr23iOWBeTo4L2_t"
});


// =========================================================
// CONTACT FORM
// =========================================================

const form = document.getElementById("consulenza");

if (form) {

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    const button = form.querySelector(
      "button[type='submit']"
    );

    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Invio in corso...";


    emailjs.sendForm(
      "service_ru5uj72",
      "template_r2nb37p",
      form
    )

    .then(function () {

      alert("Richiesta inviata correttamente!");

      form.reset();

    })

    .catch(function (error) {

      console.error(
        "EmailJS error:",
        error
      );

      alert(
        "Si è verificato un errore nell'invio della richiesta. Riprova."
      );

    })

    .finally(function () {

      button.disabled = false;
      button.textContent = originalText;

    });

  });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navLinks = document.querySelectorAll(".links a");

const sections = document.querySelectorAll(
  "#servizi, #metodo, #pacchetti, #contatti"
);

function updateActiveNav() {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 180;
    const sectionBottom =
      sectionTop + section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionBottom
    ) {
      currentSection = section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }

  });
}

window.addEventListener(
  "scroll",
  updateActiveNav,
  { passive: true }
);

updateActiveNav();
/* =========================================================
   M.R.A. FUTURISTIC INTERACTIONS
========================================================= */


/* ---------- SCROLL REVEAL ---------- */

const revealElements = document.querySelectorAll(
  ".section-heading, .card, .stats, .steps article, .package-grid article, .quote-box, .contact-copy, .contact-form"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("reveal");
          
          requestAnimationFrame(() => {
            entry.target.classList.add("visible");
          });

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

}


/* ---------- CARD MOUSE GLOW ---------- */

const cards = document.querySelectorAll(
  ".card, .package-grid article, .website-price-card"
);

cards.forEach(card => {

  card.addEventListener("mousemove", event => {

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    card.style.setProperty(
      "--mouse-y",
      `${y}px`
    );

  });

});

// =========================================================
// MOBILE SIDEBAR — M.R.A. BUSINESS
// =========================================================

(function () {

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const mobileClose = document.getElementById("mobileClose");
  const mobileOverlay = document.getElementById("mobileMenuOverlay");

  // Se la pagina non ha il menu mobile, non fare nulla
  if (!mobileMenuBtn || !mobileSidebar) {
    return;
  }

  function openMobileMenu() {

    document.body.classList.add("menu-open");

    mobileMenuBtn.setAttribute(
      "aria-expanded",
      "true"
    );

  }

  function closeMobileMenu() {

    document.body.classList.remove("menu-open");

    mobileMenuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

  }

  // APERTURA
  mobileMenuBtn.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      openMobileMenu();

    }
  );

  // CHIUSURA X
  if (mobileClose) {

    mobileClose.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        closeMobileMenu();

      }
    );

  }

  // CHIUSURA CLICCANDO FUORI
  if (mobileOverlay) {

    mobileOverlay.addEventListener(
      "click",
      function () {

        closeMobileMenu();

      }
    );

  }

  // CHIUSURA QUANDO CLICCHI UN LINK
  const sidebarLinks =
    mobileSidebar.querySelectorAll("a");

  sidebarLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        closeMobileMenu();

      }
    );

  });

  // CHIUSURA CON ESC
  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {

        closeMobileMenu();

      }

    }
  );

})();