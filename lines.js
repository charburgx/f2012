/**
 * Manages background lines
 */

const GAP_PX = 200;
const ANIM_TIME = 50;

const svg = document.getElementById("lines-bg");

let lines1 = [ ]
let lines2 = [ ]

// Helper Functions //

// Simple range function (1...n)
//  used as helper throughout
function range(start, stop, step) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
}

// Random val between n-s and n+s
//  rounded to two digits
//  used for random variance
function randStart(n, s) {
    return (n + (Math.random() * 2 * s) - s).toFixed(2);
}

// Set coordiantes of line
function setLinePos(line, arr) {
    if(arr.length != 4) return;

    for (let i = 0; i < 4; i++) {
        line.setAttribute(["x1", "y1", "x2", "y2"][i], arr[i]);
    }
}

// Create line and add to DOM
function line(pos = null) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "line");
    //line.setAttribute("style", "animation-delay:-" + randStart(10) + "s;")
    //line.setAttribute("style", "animation-duration:" + randStart(ANIM_TIME, 30) + "s;");

    if(pos) setLinePos(line, pos);

    svg.appendChild(line);

    return line;
}

function setSVGSize() {
    svg.setAttribute("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight);
}

// Clear all lines on screen
function clearLines() {
    // Clear all elements of main SVG
    while(svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    lines1 = [ ];
    lines2 = [ ];
}

function populateLines() {
    clearLines();

    w = window.innerWidth;
    h = window.innerHeight;

    // math to figure out how many lines are needed on screen
    f = n => Math.floor(n / GAP_PX);
    wf = f(w); hf = f(h);
    hwf = f(w + h)

    // creates lines

    range(-wf, hf).forEach(i => {
        x = 0;
        y = i * GAP_PX;
        
        lines1.push(line([x, y, x+w, y+w]));
    })

    range(0, hwf).forEach(j => {
        x = j * GAP_PX;
        y = 0;

        lines2.push(line([x, y, x-h, y+h]));
    })
}

function draw() {
    setSVGSize();
    populateLines();
}

draw();
window.onresize = draw;