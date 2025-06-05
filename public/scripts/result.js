function svgToPng(svgElement) {
    const svgString = (new XMLSerializer()).serializeToString(svgElement);
    const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8'
    });
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);
    const image = new Image();
    image.width = svgElement.width.baseVal.value;
    image.height = svgElement.height.baseVal.value;
    image.src = url;
    image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);

        const imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
    
        let a = document.createElement("a");
        a.href = imgURI;
        a.download = 'avatar.png';
        a.click();
        a.remove();
        canvas.remove();
    };
    image.remove();
}

function downloadSvg(svgElement) {
    let a = document.createElement("a");
    const obj = svgElement.outerHTML;
    const blob = new Blob([obj], {type : 'image/svg+xml'});
    let url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'avatar.png';
    a.click();
    a.remove();
}

document.addEventListener("DOMContentLoaded", () => {
    const copyButtons = document.querySelectorAll(".copy");
    const iconDlndbtn = document.querySelector(".icon-btn.download");
    const avatar = document.querySelector(".avatar");

    [iconDlndbtn, avatar].forEach(avatarComponent => {
        avatarComponent.addEventListener("click", () => {
            downloadSvg(avatar);
        });
    });

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