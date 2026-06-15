/**
 * countdown.js
 * ---------------------------------------
 * Countdown Wedding
 * Target : 5 Juli 2026
 * ---------------------------------------
 */

const Countdown = (() => {

    const EVENT_DATE = {
        year: 2026,
        month: 7,
        day: 5
    };

    function init() {

        if (typeof simplyCountdown !== "function") {
            console.warn("simplyCountdown belum dimuat.");
            return;
        }

        simplyCountdown(".simply-countdown", {
            year: EVENT_DATE.year,
            month: EVENT_DATE.month,
            day: EVENT_DATE.day,

            words: {
                days: {
                    singular: "Hari",
                    plural: "Hari"
                },
                hours: {
                    singular: "Jam",
                    plural: "Jam"
                },
                minutes: {
                    singular: "Menit",
                    plural: "Menit"
                },
                seconds: {
                    singular: "Detik",
                    plural: "Detik"
                }
            },

            plural: true,
            inline: false,
            enableUtc: false,
            refresh: 1000
        });

    }

    return {
        init
    };

})();

Countdown.init();
