/**
 * guest.js
 * Mengelola nama tamu, query parameter ?to=,
 * layar pembuka undangan, dan sinkronisasi ke Hero & RSVP.
 */

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

const $ = (selector) => document.querySelector(selector);

function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("to") || "").trim();
}

function updateHero(name) {
    const hero = $(SELECTOR.heroTarget);

    if (!hero) return;

    hero.innerHTML = name
        ? `${TEXT.heroPrefix}<strong>${name}</strong>${TEXT.heroSuffix}`
        : `${TEXT.heroPrefix}${TEXT.defaultGuest}${TEXT.heroSuffix}`;
}

function updateRSVP(name) {
    const target = $(SELECTOR.rsvpTarget);

    if (!target) return;

    target.textContent = name || TEXT.defaultGuest;
}

function saveGuest(name) {
    const url = new URL(window.location.href);

    url.searchParams.set("to", name);

    history.replaceState({}, "", url);
}

function closeOverlay() {
    const overlay = $(SELECTOR.overlay);

    if (!overlay) return;

    overlay.classList.add("layar-nama-exit");

    setTimeout(() => {

        overlay.style.display = "none";

    }, 600);
}

function openInvitation() {

    const input = $(SELECTOR.input);

    const error = $(SELECTOR.error);

    if (!input) return;

    const name = input.value.trim();

    if (!name) {

        error?.classList.remove("d-none");

        input.focus();

        return;

    }

    error?.classList.add("d-none");

    saveGuest(name);

    updateHero(name);

    updateRSVP(name);

    closeOverlay();
}

function bindInput() {

    const input = $(SELECTOR.input);

    const button = $(SELECTOR.button);

    if (!input || !button) return;

    button.addEventListener("click", openInvitation);

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            openInvitation();

        }

    });

}

function restoreGuest() {

    const name = getGuestName();

    updateHero(name);

    updateRSVP(name);

    if (!name) return;

    const overlay = $(SELECTOR.overlay);

    if (overlay) {

        overlay.style.display = "none";

    }

}

export function initGuest() {

    bindInput();

    restoreGuest();

}
