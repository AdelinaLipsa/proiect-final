var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var input = document.querySelector('[type="color"]');
var inputRange = document.querySelector('[type="range"]');
var selectLineCap = document.querySelector('select');
var clear = document.querySelector('button');


ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.strokeStyle = input.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;


function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function handleUpdate() {
    ctx.lineWidth = this.value
    ctx.lineCap = this.value;
    ctx.strokeStyle = this.value;

    console.log(`${this.name}: ${this.value}`);
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
input.addEventListener('change', handleUpdate);
inputRange.addEventListener('change', handleUpdate)
selectLineCap.addEventListener('change', handleUpdate);
clear.addEventListener('click', clearCanvas)
