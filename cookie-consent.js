/* =====================================================
   M.R.A. BUSINESS — COOKIE CONSENT SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const STORAGE_KEY = "mra_cookie_consent";

  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("cookie-modal");

  if (!banner || !modal) return;

  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  const settingsBtn = document.getElementById("cookie-settings");

  const closeBtn = document.getElementById("cookie-close");
  const saveBtn = document.getElementById("cookie-save");

  const analyticsToggle =
    document.getElementById("cookie-analytics");

  const marketingToggle =
    document.getElementById("cookie-marketing");


  /* =====================================================
     LEGGI CONSENSO SALVATO
  ===================================================== */

  function getConsent() {

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) return null;

      return JSON.parse(saved);

    } catch (error) {

      console.error(
        "Errore nella lettura del consenso cookie:",
        error
      );

      return null;
    }
  }


  /* =====================================================
     SALVA CONSENSO
  ===================================================== */

  function saveConsent(consent) {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(consent)
    );

  }


  /* =====================================================
     MOSTRA / NASCONDI
  ===================================================== */

  function showBanner() {

    banner.classList.add("show");

  }

  function hideBanner() {

    banner.classList.remove("show");

  }

  function openSettings() {

    const consent = getConsent();

    if (consent) {

      analyticsToggle.checked =
        consent.analytics === true;

      marketingToggle.checked =
        consent.marketing === true;

    } else {

      analyticsToggle.checked = false;
      marketingToggle.checked = false;

    }

    modal.classList.add("show");

  }

  function closeSettings() {

    modal.classList.remove("show");

  }


  /* =====================================================
     APPLICA CONSENSO
  ===================================================== */

  function applyConsent(consent) {

    /*
      QUI COLLEGHEREMO GOOGLE ANALYTICS.

      Esempio futuro:

      if (consent.analytics) {
        loadGoogleAnalytics();
      }

      In questo momento NON carichiamo
      nessun servizio analitico.
    */


    if (consent.analytics) {

      console.log(
        "Cookie analitici autorizzati."
      );

      // Google Analytics verrà inserito qui.

    } else {

      console.log(
        "Cookie analitici non autorizzati."
      );

    }


    if (consent.marketing) {

      console.log(
        "Cookie marketing autorizzati."
      );

      // Meta Pixel / TikTok Pixel ecc.
      // verranno inseriti qui in futuro.

    } else {

      console.log(
        "Cookie marketing non autorizzati."
      );

    }

  }


  /* =====================================================
     ACCETTA TUTTI
  ===================================================== */

  acceptBtn.addEventListener("click", () => {

    const consent = {

      necessary: true,

      analytics: true,

      marketing: true,

      date: new Date().toISOString()

    };

    saveConsent(consent);

    applyConsent(consent);

    hideBanner();

    closeSettings();

  });


  /* =====================================================
     RIFIUTA
  ===================================================== */

  rejectBtn.addEventListener("click", () => {

    const consent = {

      necessary: true,

      analytics: false,

      marketing: false,

      date: new Date().toISOString()

    };

    saveConsent(consent);

    applyConsent(consent);

    hideBanner();

    closeSettings();

  });


  /* =====================================================
     GESTISCI PREFERENZE
  ===================================================== */

  settingsBtn.addEventListener("click", () => {

    openSettings();

  });


  /* =====================================================
     CHIUDI PANNELLO
  ===================================================== */

  closeBtn.addEventListener("click", () => {

    closeSettings();

  });


  /* =====================================================
     SALVA PREFERENZE
  ===================================================== */

  saveBtn.addEventListener("click", () => {

    const consent = {

      necessary: true,

      analytics: analyticsToggle.checked,

      marketing: marketingToggle.checked,

      date: new Date().toISOString()

    };

    saveConsent(consent);

    applyConsent(consent);

    hideBanner();

    closeSettings();

  });


  /* =====================================================
     CLICK FUORI DAL MODALE
  ===================================================== */

  modal.addEventListener("click", (event) => {

    if (event.target === modal) {

      closeSettings();

    }

  });


  /* =====================================================
     CONTROLLO INIZIALE
  ===================================================== */

  const savedConsent = getConsent();

  if (!savedConsent) {

    setTimeout(() => {

      showBanner();

    }, 700);

  } else {

    applyConsent(savedConsent);

  }


  /* =====================================================
     FUNZIONE PUBBLICA PER RIAPRIRE LE PREFERENZE
  ===================================================== */

  window.openCookieSettings = function () {

    openSettings();

  };

});