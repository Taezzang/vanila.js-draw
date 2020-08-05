const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const color_status = document.getElementById("color__status");
const line_canvas = document.getElementById("line__canvas");
const line_ctx = line_canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const LINE_SIZE = 100;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// ctx말고 캔버스 자체에 크기값을 넣어주자
line_canvas.width = LINE_SIZE;
line_canvas.height = LINE_SIZE;
line_ctx.strokeStyle = INITIAL_COLOR;
line_ctx.lineWidth = 2.5; 
line_ctx.fillStyle = "white";

line_ctx.beginPath();
line_ctx.moveTo(20, 50);
line_ctx.lineTo(80, 50);
// line_ctx.lineTo(80, 50);
line_ctx.stroke();
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true; 
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    color_status.style.backgroundColor=event.target.style.backgroundColor;
    checkTextColor();
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;

    //선 굵기를 변경할 시 우측 상단의 선 굵기 프리뷰가 변화함..
    //코드 변경이 필요한 구역
    line_ctx.lineWidth = event.target.value;
    line_ctx.fillRect(0, 0, line_canvas.width, line_canvas.height);
    line_ctx.stroke();
}

function checkTextColor() {
    if(color_status.style.backgroundColor == "white") {
        console.log("asdf");
        color_status.style.color = "black";
    } else {
        color_status.style.color="white";
    }
}

function handleModeClick(event) {
    if(filling) {
        filling = false;
        mode.innerText = "Paint"
        
        color_status.innerText ="Paint";
    } else {
        filling = true;
        mode.innerText = "Fill"
        
        color_status.innerText ="Fill";
    }
}

function handleCanvasClick(event) {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT 🖌]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}


if(colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
    // Array.from(colors).forEach(function(color) {
    //    color.addEventListener("click", handleColorClick);
    // });
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}