module.exports = (_ctx, opts) => {
  const ctx = _ctx;
  let options = {};
  if (opts) {
    options = opts;
  }
  const config = {
    lineWidth: options.lineWidth || 10,
    strokeStyle: options.strokeStyle || "black",
  };

  return {
    draw(lines) {
      ctx.strokeStyle = config.strokeStyle;
      ctx.lineWidth = config.lineWidth;
      for (let i = 0; i < lines.length; i += 1) {
        for (let j = 1; j < lines[i].length; j++) {
          const points = lines[i];
          this.drawLine(
            points[j - 1].x,
            points[j - 1].y,
            points[j].x,
            points[j].y
          );
        }
      }
    },
    drawLine(fromX, fromY, x, y) {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
  };
};
