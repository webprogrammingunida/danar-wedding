/**
 * gift.js
 * ---------------------------------------
 * Wedding Gift Module
 */

import { $, $$, copy } from "./utils/utils.js";

const Gift = (() => {

    const DOM = {};

    function cacheDom() {

        DOM.section = $("#gift");

        DOM.openButtons = $$(".btn-buka-gift");

        DOM.copyButtons = $$("[data-norek]");

    }

    function openGift() {

        if (!DOM.section) return;

        DOM.section.style.setProperty(
            "display",
            "block",
            "important"
        );

        DOM.section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    async function handleCopy(button) {

        const rekening = button.dataset.norek;

        if (!rekening) return;

        const success = await copy(rekening);

        if (!success) {

            alert("Gagal menyalin nomor rekening");

            return;

        }

        const original = button.innerHTML;

        button.disabled = true;

        button.innerHTML =
            '<i class="bi bi-check-circle-fill"></i> Tersalin';

        setTimeout(() => {

            button.innerHTML = original;

            button.disabled = false;

        }, 2000);

    }

    function bindEvents() {

        DOM.openButtons.forEach(button => {

            button.addEventListener("click", openGift);

        });

        DOM.copyButtons.forEach(button => {

            button.addEventListener("click", () => {

                handleCopy(button);

            });

        });

    }

    function init() {

        cacheDom();

        bindEvents();

    }

    return {

        init

    };

})();

Gift.init();
