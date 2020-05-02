module.exports = function(drawer, canvas) {
  const mouse = { x: 0, y: 0 };
  let lines = [];
  const bounds = canvas.getBoundingClientRect();
  const scale =
    parseInt(canvas.getAttribute("width")) / parseInt(canvas.style.width);
  let mouseIsDown = false;

  document.onmousedown = e => {
    mouse.x = (e.pageX - bounds.x) * scale;
    mouse.y = (e.pageY - bounds.y) * scale;
    mouseIsDown = true;
    lines.push([])
  };

  document.onmousemove = e => {
    if (mouseIsDown) {
      mouse.x = (e.pageX - bounds.x) * scale;
      mouse.y = (e.pageY - bounds.y) * scale;
      lines[lines.length - 1].push({ x: mouse.x, y: mouse.y });
    }
  };

  document.onmouseup = e => {
    mouseIsDown = false;
  };

  return {
    done() {},
    draw() {
      if (mouseIsDown) {
        drawer(lines);
      }
    }
  };
};
