// grid function
const container = document.querySelector("#grid-container");

function makeGrid(wAndH) {
    container.style.setProperty("--grid-rows", wAndH);
    container.style.setProperty("--grid-cols", wAndH);

    for (let rows = 0; rows < wAndH; rows++) {
        for (let cols = 0; cols < wAndH; cols++) {
            let cell = document.createElement("div");
            container.appendChild(cell).className = "cell";
        }
    }
}

makeGrid(16);

// link hover and click
const links = document.querySelectorAll("a");

links.forEach((link) => {
    link.onmouseenter = () => link.style.color = "#6c757d";
    link.onmouseleave = () => link.style.color = "#212529";
})

// grid size slider
let slider = document.querySelector("#grid-size-slider")
let sliderValue = document.querySelector("#slider-value");

sliderValue.innerHTML = slider.value + "x" + slider.value; 

slider.oninput = () => {
    sliderValue.innerHTML = slider.value + "x" + slider.value;
    container.innerHTML = ""; // clear previous grid
    makeGrid(slider.value);
}
