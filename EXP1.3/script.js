const svg = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;
let startX, startY;
let currentRect = null;
let shapes = [];

function getMousePosition(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

svg.addEventListener("mousedown", (e) => {
  drawing = true;
  const pos = getMousePosition(e);
  startX = pos.x;
  startY = pos.y;

  currentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  currentRect.setAttribute("x", startX);
  currentRect.setAttribute("y", startY);
  currentRect.setAttribute("width", 0);
  currentRect.setAttribute("height", 0);
  currentRect.setAttribute("fill", colorPicker.value);

  svg.appendChild(currentRect);
});

svg.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const pos = getMousePosition(e);
  const width = pos.x - startX;
  const height = pos.y - startY;

  currentRect.setAttribute("width", Math.abs(width));
  currentRect.setAttribute("height", Math.abs(height));
  currentRect.setAttribute("x", width < 0 ? pos.x : startX);
  currentRect.setAttribute("y", height < 0 ? pos.y : startY);
});

svg.addEventListener("mouseup", () => {
  if (drawing && currentRect) {
    shapes.push(currentRect);
  }
  drawing = false;
  currentRect = null;
});

undoBtn.addEventListener("click", undo);
clearBtn.addEventListener("click", clearCanvas);

function undo() {
  const shape = shapes.pop();
  if (shape) svg.removeChild(shape);
}

function clearCanvas() {
  shapes.forEach(shape => svg.removeChild(shape));
  shapes = [];
}
