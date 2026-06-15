/**
 * music.js
 * -----------------------------------------
 * Background Music Controller
 * -----------------------------------------
 */

const SELECTOR = {
    audio: "#bgMusic",
    button: "#musik-btn",
    wrapper: "#musik-wrap",
    openButton: ".btn-open-wedding"
};

let audio = null;
let button = null;
let disc = null;
let playing = false;

/**
 * -----------------------
 * UI
 * -----------------------
 */

function updateUI(state) {

    playing = state;

    if (disc) {
        disc.classList.toggle("spinning", state);
    }

    if (button) {
        button.classList.toggle("playing", state);
    }

}

/**
 * -----------------------
 * Audio
 * -----------------------
 */

async function playMusic() {

    if (!audio) return;

    try {

        await audio.play();

        updateUI(true);

    } catch (err) {

        console.warn("Autoplay blocked:", err);

        updateUI(false);

    }

}

function pauseMusic() {

    if (!audio) return;

    audio.pause();

    updateUI(false);

}

export function toggleMusic() {

    if (playing) {

        pauseMusic();

    } else {

        playMusic();

    }

}

/**
 * -----------------------
 * Show Music Button
 * -----------------------
 */

function showMusicPlayer() {

    const wrap = document.querySelector(SELECTOR.wrapper);

    if (!wrap) return;

    wrap.classList.remove("d-none");

}

/**
 * -----------------------
 * Events
 * -----------------------
 */

function bindEvents() {

    if (button) {

        button.addEventListener("click", toggleMusic);

    }

    const openButton = document.querySelector(SELECTOR.openButton);

    if (openButton) {

        openButton.addEventListener("click", () => {

            setTimeout(() => {

                showMusicPlayer();

                playMusic();

            }, 800);

        });

    }

    if (audio) {

        audio.addEventListener("play", () => updateUI(true));

        audio.addEventListener("pause", () => updateUI(false));

        audio.addEventListener("ended", () => updateUI(false));

    }

}

/**
 * -----------------------
 * Init
 * -----------------------
 */

export function initMusic() {

    audio = document.querySelector(SELECTOR.audio);

    button = document.querySelector(SELECTOR.button);

    disc = button?.querySelector(".musik-disc");

    if (!audio || !button) return;

    bindEvents();

}
