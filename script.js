// typing animation
let i = 0;
let title = "BLOKART";

function typing() {
    if (i < title.length) {
        document.querySelector("#title").innerHTML += title.charAt(i);
        i++;
        setTimeout(typing, 120);
    }
}

typing(title);