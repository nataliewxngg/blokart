// link hover and click
const links = document.querySelectorAll("a");

links.forEach((link) => {
    link.onmouseenter = () => link.style.color = "#6c757d";
    link.onmouseleave = () => link.style.color = "#212529";
})