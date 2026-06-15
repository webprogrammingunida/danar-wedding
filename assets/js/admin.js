/**
 * admin.js
 * -----------------------------------------
 * Admin Panel
 * Danar Wedding V2
 * -----------------------------------------
 */

const STORAGE_KEY = "ucapan-danar-celly-2026";

const Admin = (() => {

    const DOM = {};

    function cacheDom() {

        DOM.panel = document.getElementById("admin-panel");

        DOM.list = document.getElementById("admin-list");

        DOM.close = document.querySelector(".admin-close");

        DOM.deleteAll = document.querySelector(".admin-btn-hapus-semua");

    }

    function loadData() {

        try {

            return JSON.parse(

                localStorage.getItem(STORAGE_KEY)

            ) || [];

        } catch {

            return [];

        }

    }

    function saveData(data) {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(data)

        );

    }

    function render() {

        if (!DOM.list) return;

        const list = loadData();

        if (!list.length) {

            DOM.list.innerHTML = `
                <p class="admin-kosong">
                    Belum ada ucapan.
                </p>
            `;

            return;

        }

        DOM.list.innerHTML = list.map((item, index) => `

            <div class="admin-item">

                <div class="admin-item-info">

                    <strong>${item.nama}</strong>

                    — ${item.status}

                    <br>

                    <span>${item.pesan}</span>

                    <br>

                    <small>${item.waktu}</small>

                </div>

                <button
                    class="admin-btn-hapus"
                    data-index="${index}">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `).join("");

    }

    function deleteItem(index) {

        if (!confirm("Hapus ucapan ini?")) return;

        const list = loadData();

        list.splice(index, 1);

        saveData(list);

        render();

        window.renderList?.();

    }

    function deleteAll() {

        if (

            !confirm(

                "Hapus SEMUA ucapan?"

            )

        ) return;

        localStorage.removeItem(STORAGE_KEY);

        render();

        window.renderList?.();

    }

    function bindEvents() {

        DOM.close?.addEventListener("click", () => {

            DOM.panel.classList.add("d-none");

        });

        DOM.deleteAll?.addEventListener(

            "click",

            deleteAll

        );

        DOM.list?.addEventListener(

            "click",

            (e) => {

                const button = e.target.closest(

                    ".admin-btn-hapus"

                );

                if (!button) return;

                deleteItem(

                    Number(

                        button.dataset.index

                    )

                );

            }

        );

    }

    function checkAccess() {

        const params = new URLSearchParams(

            window.location.search

        );

        if (

            params.get("admin")

            !==

            "danar2026"

        ) return;

        DOM.panel.classList.remove("d-none");

        render();

    }

    function init() {

        cacheDom();

        bindEvents();

        checkAccess();

    }

    return {

        init

    };

})();

Admin.init();
