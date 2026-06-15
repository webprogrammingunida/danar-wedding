/**
 * guest.js
 * Mengelola nama tamu, query parameter (?to=),
 * layar pembuka undangan, serta sinkronisasi ke Hero & RSVP.
 */

import { $ } from "./utils/utils.js";

const SELECTOR = {
    input: "#input-nama-tamu",
    button: "#btn-masuk-undangan",
    overlay: "#layar-nama",
    error: "#layar-nama-error",
    heroTarget: "#hero-kepada",
    rsvpTarget: "#rsvp-nama-tamu"
};

const TEXT = {
    defaultGuest: "Tamu Undangan",
    heroPrefix: "Kepada Bapak/Ibu/Saudara/i <br>",
    heroSuffix: "<br>di tempat"
};

/**
 * Cache DOM agar querySelector tidak dipanggil berulang.
 */
const DOM = {};

function cacheDom() {
    DOM.input = $(SELECTOR.input);
    DOM.button = $(SELECTOR.button);
    DOM.overlay = $(SELECTOR.overlay);
    DOM.error = $(SELECTOR.error);
    DOM.hero = $(SELECTOR.heroTarget);
    DOM.rsvp = $(SELECTOR.rsvpTarget);
}

function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("to") || "").trim();
}

function updateHero(name) {
    if (!DOM.hero) return;

    DOM.hero.innerHTML = name
        ? `${TEXT.heroPrefix}<strong>${name}</strong>${TEXT.heroSuffix}`
        : `${TEXT.heroPrefix}${TEXT.defaultGuest}${TEXT.heroSuffix}`;
}

function updateRSVP(name) {
    if (!DOM.rsvp) return;

    DOM.rsvp.textContent = name || TEXT.defaultGuest;
}

function saveGuest(name) {
    const url = new URL(window.location.href);

    url.searchParams.set("to", name);

    history.replaceState({}, "", url);
}

function hideOverlay() {
    if (!DOM.overlay) return;

    DOM.overlay.classList.add("layar-nama-exit");

    setTimeout(() => {
        DOM.overlay.style.display = "none";
    }, 600);
}

function showError() {
    DOM.error?.classList.remove("d-none");
}

function hideError() {
    DOM.error?.classList.add("d-none");
}

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

function bindEvents() {
    if (!DOM.input || !DOM.button) return;

    DOM.button.addEventListener("click", openInvitation);

    DOM.input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;

        event.preventDefault();

        openInvitation();
    });
}

function restoreGuest() {
    const name = getGuestName();

    updateHero(name);

    updateRSVP(name);

    if (name && DOM.overlay) {
        DOM.overlay.style.display = "none";
    }
}

export function initGuest() {
    cacheDom();

    bindEvents();

    restoreGuest();
}
