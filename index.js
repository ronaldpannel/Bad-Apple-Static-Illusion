/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const { width, height } = canvas;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);
ctx.beginPath();
ctx.arc(width / 2, height / 2, 100, 0, Math.PI * 2);
ctx.fill();

let paused = false;
canvas.addEventListener("click", () => {
  paused = !paused;
  if (!paused) {
    animate();
  }
});

function animate() {
  const oldImageData = ctx.getImageData(0, 0, width, height);
  const oldData = oldImageData.data;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";

  const radius = 100;
  const percent = Math.sin(Date.now() / 1000) ** 2;
  const x = lerp(radius, width - radius, percent);
  const y = height / 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] == 0) {
      const randBW = Math.random() > 0.5 ? 255 : 0;
      data[i] = randBW;
      data[i + 1] = randBW;
      data[i + 2] = randBW;
    } else {
      data[i] = oldData[i];
      data[i + 1] = oldData[i + 1];
      data[i + 2] = oldData[i + 2];
    }
  }

  ctx.putImageData(imageData, 0, 0);

  if (!paused) {
    requestAnimationFrame(animate);
  }
}
animate();


