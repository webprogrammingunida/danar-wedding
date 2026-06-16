/**
 * guest.js
 * -------------------------------------------------
 * Guest Module
 * Danar Wedding V2
 * -------------------------------------------------
 */

import { $ } from "./utils/utils.js";

const SELECTOR = {
    input: "#input-nama-tamu",
    button: "#btn-masuk-undangan",
    overlay: "#layar-nama",
    error: "#layar-nama-error",
    hero: "#hero-kepada",
    heroSection: "#hero",
    rsvp: "#rsvp-nama-tamu"
};

const TEXT = {
    defaultGuest: "Tamu Undangan",
    heroPrefix: "Kepada Bapak/Ibu/Saudara/i <br>",
    heroSuffix: "<br>di tempat"
};

const DOM = {};

/* ------------------------------------------ */

function cacheDom() {

    Object.entries(SELECTOR).forEach(([key, selector]) => {

        DOM[key] = $(selector);

    });

}

/* ------------------------------------------ */

function getGuestName() {

    const params = new URLSearchParams(window.location.search);

    return (params.get("to") || "").trim();

}

function saveGuest(name) {

    const url = new URL(window.location.href);

    url.searchParams.set("to", name);

    history.replaceState({}, "", url);

}

/* ------------------------------------------ */

function updateHero(name) {

    if (!DOM.hero) return;

    DOM.hero.innerHTML = name

        ? `${TEXT.heroPrefix}<strong>${name}</strong>${TEXT.heroSuffix}`

        : `${TEXT.heroPrefix}${TEXT.defaultGuest}${TEXT.heroSuffix}`;

}

function updateRSVP(name) {

    if (!DOM.rsvp) return;

    if ("value" in DOM.rsvp) {

        DOM.rsvp.value = name || "";

    } else {

        DOM.rsvp.textContent = name || TEXT.defaultGuest;

    }

}

/* ------------------------------------------ */

function showError() {

    DOM.error?.classList.remove("d-none");

}

function hideError() {

    DOM.error?.classList.add("d-none");

}

/* ------------------------------------------ */

function hideOverlay() {

    if (!DOM.overlay) return;

    DOM.overlay.classList.add("layar-nama-exit");

    setTimeout(() => {

        DOM.overlay.style.display = "none";

        document.body.classList.remove("no-scroll");

        document.documentElement.classList.remove("no-scroll");

        DOM.heroSection?.classList.add("slide-up-tirai");

        if (typeof AOS !== "undefined") {

            AOS.refresh();

        }

    }, 1000);

}

/* ------------------------------------------ */

function openInvitation() {

    if (!DOM.input) return;

    const name = DOM.input.value.trim();

    if (!name) {

        showError();

        DOM.input.focus();

        return;

    }

    hideError();

    saveGuest(name);

    updateHero(name);

    updateRSVP(name);

    hideOverlay();

}

/* ------------------------------------------ */

function bindEvents() {

    DOM.button?.addEventListener(

        "click",

        openInvitation

    );

    DOM.input?.addEventListener(

        "keydown",

        (event) => {

            if (event.key !== "Enter") return;

            event.preventDefault();

            openInvitation();

        }

    );

}

/* ------------------------------------------ */

function restoreGuest() {

    const name = getGuestName();

    updateHero(name);

    updateRSVP(name);

    if (name && DOM.overlay) {

    DOM.overlay.style.display = "none";

    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");

    DOM.heroSection?.classList.add("slide-up-tirai");

}
    

}

/* ------------------------------------------ */

export function initGuest() {

    cacheDom();

    bindEvents();

    restoreGuest();

}

/* Auto Init */

initGuest();
