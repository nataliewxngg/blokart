// Variables
const DEFAULT_COLOR = "#212529";
const DEFAULT_BUTTONBG = "rgba(33, 37, 41, 0.2)";
const SELECTED_BUTTONBG = "rgba(33, 37, 41, 0.4)";

let color = "#212529";
let eraser = false;
let randomColor = false;
let gridLines = true;

const links = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

const container = document.querySelector("#grid-container");

const colorPicker = document.querySelector("#color-picker");
let slider = document.querySelector("#grid-size-slider");
let sliderValue = document.querySelector("#slider-value");

const eraserButton = document.querySelector(".toggle-eraser");
const randomColorButton = document.querySelector(".toggle-random-color");

// Functions

// grid function
function makeGrid(wAndH) {
    container.style.setProperty("--grid-rows", wAndH);
    container.style.setProperty("--grid-cols", wAndH);

    for (let rows = 0; rows < wAndH; rows++) {
        for (let cols = 0; cols < wAndH; cols++) {
            let cell = document.createElement("div");
            container.appendChild(cell).className = "cell";

            // event listener
            cell.addEventListener("mouseover", () => {
                if (randomColor) {
                    color = generateRandomColor();
                }
                cell.style.background = color;
            })
        }
    }
}
makeGrid(16);

// reset booleans function
function resetBooleans() {
    eraser = false;
    randomColor = false;

    eraserButton.style.background = DEFAULT_BUTTONBG;
    randomColorButton.style.background = DEFAULT_BUTTONBG;
}

// rgb to hex
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// generate random color
function generateRandomColor() {
    let r = Math.floor((Math.random() * 255) + 1);
    let g = Math.floor((Math.random() * 255) + 1);
    let b = Math.floor((Math.random() * 255) + 1);

    return rgbToHex(r, g, b);
}

// Tools (Event Listeners) 

// color input
colorPicker.onchange = () => {
    color = colorPicker.value;
    console.log(color);
    resetBooleans();
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
    link.addEventListener("mouseover", function(e) {
        e.target.style.color = "#6c757d";
        e.target.style.textDecoration = "underline";
    })
    link.addEventListener("mouseout", function (e) {
        e.target.style.color = DEFAULT_COLOR;
        e.target.style.textDecoration = "none";
    })

    link.onmouseleave = () => link.style.color = DEFAULT_COLOR;
})

// selecting buttons
buttons.forEach((button) => {

    button.addEventListener("click", function (e) {
        // console.log(e.target.className);

        if (e.target.className == "toggle-eraser") {
            eraser = !eraser;
            if (eraser) {
                randomColor = false;

                e.target.style.background = SELECTED_BUTTONBG;
                color = "white";
            }
        }
        else if (e.target.className == "toggle-random-color") {
            randomColor = !randomColor;
            if (randomColor) {
                eraser = false;

                e.target.style.background = SELECTED_BUTTONBG;
            }
        }
        else if (e.target.className == "toggle-grid-lines") {
            gridLines = !gridLines;

            if (gridLines) {
                container.style.gridGap = "1px";
                container.style.background = DEFAULT_COLOR;
            } else {
                container.style.gridGap = "0";
            }
        }
        else if (e.target.className == "clear") {
            container.innerHTML = "";
            makeGrid(slider.value);
        }

        if (!eraser) {
            eraserButton.style.background = DEFAULT_BUTTONBG;
            color = colorPicker.value;
        }
        if (!randomColor) {
            randomColorButton.style.background = DEFAULT_BUTTONBG;
        } 

    })

})