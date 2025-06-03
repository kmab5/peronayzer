document.addEventListener("DOMContentLoaded", () => {
    const copyButtons = document.querySelectorAll(".copy");

    copyButtons.forEach((button) => {
        button.parentElement.addEventListener("click", () => {
            let copyText = button.parentElement.firstChild;
            navigator.clipboard.writeText(copyText.textContent);
            button.classList.add("active-icon");
            setTimeout(() => button.classList.remove("active-icon"), 750);
        });
    });

    document.body.style.setProperty('--gen-1', document.querySelectorAll(".color")[0].firstChild.textContent);
    document.body.style.setProperty('--gen-2', document.querySelectorAll(".color")[1].firstChild.textContent);
});