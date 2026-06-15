/**
 * navbar.js
 * ------------------------------------
 */

const Navbar = (() => {

    const sections = [

        "home",

        "kalam",

        "story",

        "info",

        "galery",

        "gift-trigger",

        "gift",

        "rsvp",

        "penutup"

    ];

    const DOM = {};

    function cache() {

        DOM.navbar = document.getElementById(

            "navbar-bawah"

        );

        DOM.button = document.querySelector(

            ".btn-open-wedding"

        );

    }

    function scrollTo(id) {

        const el = document.getElementById(id);

        if (!el) return;

        el.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

    function highlight() {

        let current = "";

        sections.forEach(id => {

            const el = document.getElementById(id);

            if (

                el &&

                window.scrollY >=

                el.offsetTop - 120

            ) {

                current = id;

            }

        });

        document

            .querySelectorAll(".nav-item")

            .forEach(item => {

                item.classList.remove("active");

                if (

                    item.getAttribute("href")

                    ===

                    "#" + current

                ) {

                    item.classList.add("active");

                }

            });

    }

    function bind() {

        DOM.button?.addEventListener(

            "click",

            () => {

                setTimeout(() => {

                    DOM.navbar.classList.remove(

                        "d-none"

                    );

                }, 1000);

            }

        );

        window.addEventListener(

            "scroll",

            highlight

        );

        document

            .querySelectorAll(".nav-item")

            .forEach(item => {

                item.addEventListener(

                    "click",

                    e => {

                        e.preventDefault();

                        scrollTo(

                            item

                            .getAttribute("href")

                            .replace("#", "")

                        );

                    }

                );

            });

    }

    function init() {

        cache();

        bind();

    }

    return {

        init

    };

})();

Navbar.init();
