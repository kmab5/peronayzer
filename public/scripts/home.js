document.addEventListener("DOMContentLoaded", () => {
    const modes = document.querySelectorAll('input[name="mode"]');
    const auto = document.querySelector(".auto");
    const manual = document.querySelector(".manual");
    const style = document.querySelector("#style");
    const stylePreview = document.querySelector(".style-preview");
    const personality = document.querySelector("#personality");
    const personalityInp = document.querySelector("#personality-inp");
    const add = document.querySelector(".add");
    const iconStyles = [
        "adventurer",
        "adventurer-neutral",
        "avataaars",
        "avataaars-neutral",
        "big-ears",
        "big-ears-neutral",
        "big-smile",
        "bottts",
        "bottts-neutral",
        "croodles",
        "croodles-neutral",
        "dylan",
        "fun-emoji",
        "glass",
        "icons",
        "identicon",
        "initials",
        "lorelei",
        "lorelei-neutral",
        "micah",
        "miniavs",
        "notionists",
        "notionists-neutral",
        "open-peeps",
        "personas",
        "pixel-art",
        "pixel-art-neutral",
        "rings",
        "shapes",
        "thumbs"
    ];

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

    add.addEventListener("click", () => {
        if(personality.value == "") personality.value = personalityInp.value;
        else personality.value += ", " + personalityInp.value;
        personalityInp.value = null;
        personalityInp.focus();
        document.querySelector(".personalities").innerHTML = "<b>Personalities:</b> " + personality.value;
    });

    style.addEventListener("change", () => {
        if(style.value === "") stylePreview.src = "https://api.dicebear.com/9.x/" + iconStyles[Math.floor(Math.random() * iconStyles.length)] + "/svg?flip=true";
        else stylePreview.src = "https://api.dicebear.com/9.x/" + style.value + "/svg?flip=true";
        
    });
});