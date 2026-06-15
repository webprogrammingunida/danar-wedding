import './music.js';
import './countdown.js';
import './guest.js';
import './navbar.js';
import './gift.js';
import './rsvp.js';
import './admin.js';

/* ---------------------------------- */

if ("scrollRestoration" in history) {

    history.scrollRestoration = "manual";

}

window.scrollTo(0, 0);

/* ---------------------------------- */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (typeof AOS !== "undefined") {

            AOS.init({

                duration: 1000,

                once: true

            });

        }

    }

);
