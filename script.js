// Variables
const DEFAULT_COLOR = "#212529";
const DEFAULT_BUTTONBG = "rgba(33, 37, 41, 0.2)";
const SELECTED_BUTTONBG = "rgba(33, 37, 41, 0.4)";

let color = "#212529";
let eraser = false;
let transparency = false;
let randomColor = false;
let gridLines = true;

const links = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

const container = document.querySelector("#grid-container");

const colorPicker = document.querySelector("#color-picker");
let slider = document.querySelector("#grid-size-slider");
let sliderValue = document.querySelector("#slider-value");

const eraserButton = document.querySelector(".toggle-eraser");
const transparencyButton = document.querySelector(".toggle-transparency");
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
                cell.style.background = color;
            })
        }
    }
}
makeGrid(16);

// reset booleans function
function resetBooleans() {
    eraser = false;
    transparency = false;
    randomColor = false;

    eraserButton.style.background = DEFAULT_BUTTONBG;
    transparencyButton.style.background = DEFAULT_BUTTONBG;
    randomColorButton.style.background = DEFAULT_BUTTONBG;
}

// hex to rgba
function hexToRGBA(hex) {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.1)';
    }
    throw new Error('Bad Hex');
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
                color = "white";
            }
        }
        else if (e.target.className == "toggle-transparency") {
            transparency = !transparency;
            if (transparency) {
                eraser = false;
                randomColor = false;

                e.target.style.background = SELECTED_BUTTONBG;

                color = hexToRGBA(color);
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
        if (!transparency) transparencyButton.style.background = DEFAULT_BUTTONBG;
        if (!randomColor) randomColorButton.style.background = DEFAULT_BUTTONBG;

    })

})