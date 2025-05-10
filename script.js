const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let nodes = [];

for (let i = 0; i < 100; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < nodes.length; i++) {
    let a = nodes[i];
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#00ffff"; // bright cyan
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      let b = nodes[j];
      let dx = a.x - b.x;
      let dy = a.y - b.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(100, 255, 255, ${(1 - dist / 100) * 0.5})`; // more subtle
// ctx.strokeStyle = `rgba(50, 150, 150, ${(1 - dist / 100) * 0.3})`;

        ctx.stroke();
      }
    }
  }

  // Move particles
  for (let node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
  }

  requestAnimationFrame(draw);
}

draw();
