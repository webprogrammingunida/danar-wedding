/**
 * music.js
 * -----------------------------------------
 * Background Music Controller
 * -----------------------------------------
 */

import { $ } from "./utils/utils.js";

const SELECTOR = {
    audio: "#bgMusic",
    button: "#musik-btn",
    wrapper: "#musik-wrap",
    openButton: ".btn-open-wedding"
};

const Music = {

    audio: null,
    button: null,
    wrapper: null,
    disc: null,
    openButton: null,

    playing: false

};

/* --------------------------------------------------
 * UI
 * -------------------------------------------------- */

function updateUI(isPlaying) {

    Music.playing = isPlaying;

    Music.disc?.classList.toggle("spinning", isPlaying);

    Music.button?.classList.toggle("playing", isPlaying);

}

/* --------------------------------------------------
 * Audio
 * -------------------------------------------------- */

async function playMusic() {

    if (!Music.audio) return;

    try {

        await Music.audio.play();

        updateUI(true);

    } catch (error) {

        console.warn("Autoplay blocked:", error);

        updateUI(false);

    }

}

function pauseMusic() {

    if (!Music.audio) return;

    Music.audio.pause();

    updateUI(false);

}

export function toggleMusic() {

    Music.playing
        ? pauseMusic()
        : playMusic();

}

/* --------------------------------------------------
 * UI Helper
 * -------------------------------------------------- */

function showMusicPlayer() {

    Music.wrapper?.classList.remove("d-none");

}

/* --------------------------------------------------
 * Events
 * -------------------------------------------------- */

function bindAudioEvents() {

    if (!Music.audio) return;

    Music.audio.addEventListener("play", () => updateUI(true));

    Music.audio.addEventListener("pause", () => updateUI(false));

    Music.audio.addEventListener("ended", () => updateUI(false));

}

function bindButtonEvents() {

    Music.button?.addEventListener("click", toggleMusic);

    Music.openButton?.addEventListener("click", () => {

        setTimeout(() => {

            showMusicPlayer();

            playMusic();

        }, 800);

    });

}

/* --------------------------------------------------
 * Cache DOM
 * -------------------------------------------------- */

function cacheDom() {

    Music.audio = $(SELECTOR.audio);

    Music.button = $(SELECTOR.button);

    Music.wrapper = $(SELECTOR.wrapper);

    Music.openButton = $(SELECTOR.openButton);

    Music.disc = Music.button?.querySelector(".musik-disc");

}

/* --------------------------------------------------
 * Init
 * -------------------------------------------------- */

export function initMusic() {

    cacheDom();

    if (!Music.audio || !Music.button) return;

    bindButtonEvents();

    bindAudioEvents();

}
