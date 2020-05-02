const simplify = require("simplify-js");

module.exports = (_ctx, opts) => {
  const ctx = _ctx;
  let options = {};
  if (opts) {
    options = opts;
  }
  const config = {
    lineWidth: options.lineWidth || 10,
    strokeStyle: options.strokeStyle || "black",
    linesNumber: options.linesNumber || 4,
    lineOffset: options.lineOffset || 50,
  };

  const offsetLines = [];
  for (let i = 0; i < config.linesNumber; i++) {
    offsetLines.push([]);
  }

  return {
    draw(lines) {
      while (offsetLines[0].length < lines.length) {
        for (let i = 0; i < config.linesNumber; i++) {
          offsetLines[i].push([])
        }
      }
      const lastLine = lines[lines.length - 1];
      const point = lastLine[lastLine.length - 1];
      for (let i = 0; i < config.linesNumber; i++) {
        if (point) {
          offsetLines[i][offsetLines[0].length - 1].push({
            x: point.x + i * config.lineOffset,
            y: point.y + i * config.lineOffset,
          });
          offsetLines[i][offsetLines[0].length - 1] = simplify(
            offsetLines[i][offsetLines[0].length - 1],
            1,
            true
          );
        }
      }
      for (let lineNumber = 0; lineNumber < config.linesNumber; lineNumber++) {
        ctx.beginPath();
        this.drawLines(offsetLines[lineNumber]);
        ctx.stroke();
      }
    },
    drawLines(lines) {
      ctx.strokeStyle = config.strokeStyle;
      ctx.lineWidth = config.lineWidth;
      for (let i = 0; i < lines.length; i += 1) {
        const points = lines[i];
        for (let j = 0; j < points.length; j++) {
          if (j === 0) {
            ctx.moveTo(points[j].x, points[j].y);
          } else {
            ctx.lineTo(points[j].x, points[j].y);
          }
        }
      }
    }
  };
};
