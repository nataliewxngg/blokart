// Variables
const DEFAULT_COLOR = "#212529";
const DEFAULT_BUTTONBG = "rgba(33, 37, 41, 0.2)";
const SELECTED_BUTTONBG = "rgba(33, 37, 41, 0.4)";

let color = "#212529";
let wh = 16;

const links = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

const container = document.querySelector("#grid-container");

const colorPicker = document.querySelector("#color-picker");
let slider = document.querySelector("#grid-size-slider");
let sliderValue = document.querySelector("#slider-value");

const eraserButton = document.querySelector(".toggle-eraser");
const transparencyButton = document.querySelector(".toggle-transparency");
const randomColorButton = document.querySelector(".toggle-random-color");

let eraser = false;
let transparency = false;
let randomColor = false;
let gridLines = true;

// grid function
function makeGrid(wAndH) {
    container.style.setProperty("--grid-rows", wAndH);
    container.style.setProperty("--grid-cols", wAndH);

    for (let rows = 0; rows < wAndH; rows++) {
        for (let cols = 0; cols < wAndH; cols++) {
            let cell = document.createElement("div");
            container.appendChild(cell).className = "cell";

            // cell.onmousedown = () => mouseDown = true;
            // cell.onmouseup = () => mouseDown = false;

            // event listener
            cell.addEventListener("mouseover", () => {
                // if (mouseDown) {
                    cell.style.background = color;
                // }
            })
        }
    }
}

makeGrid(wh);

// color input
colorPicker.onchange = () => {
    color = colorPicker.value;
}

// grid size slider
sliderValue.innerHTML = slider.value + "x" + slider.value; 

slider.oninput= () => {
    sliderValue.innerHTML = slider.value + "x" + slider.value;
}
slider.onchange = () => {
    container.innerHTML = ""; // clear previous grid
    makeGrid(slider.value);
}

// link hover and click
links.forEach((link) => {
    link.onmouseenter = () => link.style.color = "#6c757d";
    link.onmouseleave = () => link.style.color = DEFAULT_COLOR;
})

// selecting buttons
buttons.forEach((button) => {

    button.addEventListener("click", function (e) {
        // console.log(e.target.className);

        if (e.target.className == "toggle-eraser") {
            eraser = !eraser;
            if (eraser) {
                transparency = false;
                randomColor = false;

                e.target.style.background = SELECTED_BUTTONBG;
            }
        }
        else if (e.target.className == "toggle-transparency") {
            transparency = !transparency;
            if (transparency) {
                eraser = false;
                randomColor = false;

                e.target.style.background = SELECTED_BUTTONBG;
            }
        } 
        else if (e.target.className == "toggle-random-color") {
            randomColor = !randomColor;
            if (randomColor) {
                eraser = false;
                transparency = false;

                e.target.style.background = SELECTED_BUTTONBG;
            }
        }

        if (!eraser) eraserButton.style.background = DEFAULT_BUTTONBG;
        if (!transparency) transparencyButton.style.background = DEFAULT_BUTTONBG;
        if (!randomColor) randomColorButton.style.background = DEFAULT_BUTTONBG;

    })

})