(function initializeSiteGlobal() {
  "use strict";

  if (window.__maratonaSiteGlobalLoaded) return;
  window.__maratonaSiteGlobalLoaded = true;

  const measurementId = "G-8ZHFY5QQQG";
  const googleTagSource = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  if (!document.querySelector(`script[src="${googleTagSource}"]`)) {
    const googleTagScript = document.createElement("script");
    googleTagScript.async = true;
    googleTagScript.src = googleTagSource;
    document.head.appendChild(googleTagScript);
  }

  function initializeStickyNavigation() {
    const navigation = document.querySelector(".top-navigation");
    if (!navigation) return;

    const navigationStart = navigation.getBoundingClientRect().top + window.scrollY;

    function updateNavigationState() {
      navigation.classList.toggle("is-stuck", window.scrollY >= navigationStart);
    }

    window.addEventListener("scroll", updateNavigationState, { passive: true });
    updateNavigationState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeStickyNavigation, { once: true });
  } else {
    initializeStickyNavigation();
  }
}());
