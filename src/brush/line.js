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
        const points = lines[i];
        ctx.beginPath();
        for (let j = 0; j < lines[i].length; j++) {
          if (j === 0) {
            ctx.moveTo(points[j].x, points[j].y);
          } else {
            ctx.lineTo(points[j].x, points[j].y);
          }
        }
        ctx.stroke();
      }
    },
  };
};
