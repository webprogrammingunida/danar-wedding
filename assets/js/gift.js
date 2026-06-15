/**
 * gift.js
 * ---------------------------------------
 * Wedding Gift Module
 * ---------------------------------------
 */

import { $, copy } from "./utils/utils.js";

const Gift = (() => {

    const SELECTOR = {
        trigger: ".btn-buka-gift",
        section: "#gift"
    };

    const DOM = {};

    function cacheDom() {
        DOM.trigger = $(SELECTOR.trigger);
        DOM.section = $(SELECTOR.section);
    }

    function openGift() {
        if (!DOM.section) return;

        DOM.section.style.setProperty("display", "block", "important");

        DOM.section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    async function copyAccount(button) {

        const account = button.dataset.norek;

        if (!account) return;

        const success = await copy(account);

        if (!success) {
            alert("Gagal menyalin nomor rekening.");
            return;
        }

        const original = button.innerHTML;

        button.innerHTML =
            '<i class="bi bi-check-circle-fill"></i> Tersalin';

        button.disabled = true;

        setTimeout(() => {

            button.innerHTML = original;

            button.disabled = false;

        }, 2000);

    }

    function init() {

        cacheDom();

        // kompatibel dengan onclick di HTML lama
        window.bukaGiftPopup = openGift;

        window.salinRek = copyAccount;

    }

    return {
        init
    };

})();

Gift.init();
