/**
 * rsvp.js
 * -----------------------------------
 * RSVP + Guest Wishes
 * Danar Wedding V2
 * -----------------------------------
 */

import { $ } from "./utils/utils.js";

const STORAGE_KEY = "ucapan-danar-celly-2026";

const DOM = {};

const SELECTOR = {
    form: "#rsvp-form",
    success: "#rsvp-sukses",
    list: "#ucapan-list",
    section: "#ucapan-section",

    guest: "#rsvp-nama-tamu",

    jumlah: "#rsvp-jumlah",
    status: "#rsvp-status",
    pesan: "#rsvp-pesan"
};

/* -------------------------------------------------- */

function cacheDom() {

    Object.entries(SELECTOR).forEach(([key, selector]) => {

        DOM[key] = $(selector);

    });

}

/* -------------------------------------------------- */

const Storage = {

    load() {

        try {

            return JSON.parse(

                localStorage.getItem(STORAGE_KEY)

            ) || [];

        } catch {

            return [];

        }

    },

    save(data) {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(data)

        );

    }

};

/* -------------------------------------------------- */

function badge(status) {

    const badgeMap = {

        "Hadir": `
            <span class="badge-hadir">
                <i class="bi bi-check-circle-fill"></i>
                Hadir
            </span>
        `,

        "Tidak Hadir": `
            <span class="badge-tidak-hadir">
                <i class="bi bi-x-circle-fill"></i>
                Tidak Hadir
            </span>
        `

    };

    return badgeMap[status] ?? `
        <span class="badge-ragu">
            <i class="bi bi-question-circle-fill"></i>
            Ragu-ragu
        </span>
    `;

}

/* -------------------------------------------------- */

function renderList() {

    if (!DOM.list) return;

    const list = Storage.load();

    if (!list.length) {

        DOM.list.innerHTML = `
            <p class="ucapan-kosong">
                Belum ada ucapan 💌
            </p>
        `;

        return;

    }

    DOM.list.innerHTML = list.map(item => `

        <div class="ucapan-item">

            <div class="ucapan-header">

                <span class="ucapan-nama">

                    <i class="bi bi-person-circle"></i>

                    ${item.nama}

                </span>

                ${badge(item.status)}

            </div>

            <p class="ucapan-pesan">

                "${item.pesan}"

            </p>

            <span class="ucapan-waktu">

                ${item.waktu}

            </span>

        </div>

    `).join("");

}

/* -------------------------------------------------- */

function getNow() {

    const d = new Date();

    return d.toLocaleDateString("id-ID", {

        day: "numeric",

        month: "long",

        year: "numeric"

    }) +

    " " +

    d.toLocaleTimeString("id-ID", {

        hour: "2-digit",

        minute: "2-digit"

    });

}

/* -------------------------------------------------- */

async function send(data) {

    try {

        await fetch(

            "https://api.web3forms.com/submit",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    access_key: "GANTI_ACCESS_KEY_ANDA",

                    "Nama Tamu": data.nama,

                    "Jumlah": data.jumlah,

                    "Status": data.status,

                    "Ucapan": data.pesan

                })

            }

        );

    } catch (err) {

        console.warn(err);

    }

}

/* -------------------------------------------------- */

function getFormData() {

    return {

        nama: DOM.guest.textContent,

        jumlah: DOM.jumlah.value,

        status: DOM.status.value,

        pesan: DOM.pesan.value.trim(),

        waktu: getNow()

    };

}

/* -------------------------------------------------- */

function saveLocal(data) {

    const list = Storage.load();

    list.unshift(data);

    Storage.save(list);

}

/* -------------------------------------------------- */

function showSuccess() {

    DOM.form.classList.add("d-none");

    DOM.success.classList.remove("d-none");

    setTimeout(() => {

        DOM.section?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }, 400);

}

/* -------------------------------------------------- */

async function submit(e) {

    e.preventDefault();

    const button = DOM.form.querySelector(

        "button[type=submit]"

    );

    button.disabled = true;

    button.innerHTML =
        '<i class="bi bi-hourglass-split"></i> Mengirim...';

    const data = getFormData();

    if (!data.pesan) {

        button.disabled = false;

        button.innerHTML =
            '<i class="bi bi-send"></i> Kirim Konfirmasi';

        return;

    }

    saveLocal(data);

    renderList();

    await send(data);

    showSuccess();

}

/* -------------------------------------------------- */

export function initRSVP() {

    cacheDom();

    renderList();

    DOM.form?.addEventListener(

        "submit",

        submit

    );

}
