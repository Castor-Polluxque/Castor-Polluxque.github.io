window.onload = function () {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create moving particles
  let nodes = [];
  const numNodes = 100;

  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 2
    });
  }

  function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
      let a = nodes[i];
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#00ffff";
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
          ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - dist / 100) * 0.5})`;
          ctx.stroke();
        }
      }

      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
      if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  draw();
};
