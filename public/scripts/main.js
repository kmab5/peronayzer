document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const darkToggle = document.querySelector(".dark-toggle");
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const close = document.querySelector(".close");
    const modes = document.querySelectorAll('input[name="mode"]');
    const auto = document.querySelector(".auto");
    const manual = document.querySelector(".manual");


    modes.forEach(mode => {
        mode.addEventListener("change", () => {
            if(mode.value === "auto") {
                auto.classList.remove("hidden");
                manual.classList.add("hidden");
            } else {
                auto.classList.add("hidden");
                manual.classList.remove("hidden");
            }
        });
    });

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        darkToggle.classList.toggle("active-icon");
    });

    menuToggle.addEventListener("click", () => {
        menu.classList.add("menu-visible");
    });

    close.addEventListener("click", () => {
        menu.classList.remove("menu-visible");
    });

    document.addEventListener("scroll", e => {
        if(window.scrollY > 0) {
            header.classList.add("detached");
        } else {
            header.classList.remove("detached");
        }
    });
});