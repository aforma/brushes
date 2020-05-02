const sketch = require("canvas-sketch");
const lineBrush = require("./brush/line");
const bcakgroundPainter = require("./painter/background");
const mouse = require("./painter/mouse");

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  duration: 20,
  units: "px",
  fps: 24,
  animate: true
};

window.onload = () => {
  sketch(s => {
    const background = lineBrush(s.context, {
      strokeStyle: "#5a0004",
      lineWidth: 20,
    });
    const mousePainter = mouse(background.draw.bind(background), s.canvas);

    return {
      resize(params) {},
      render(params) {
        mousePainter.draw();
      },
      unload() {}
    };
  }, settings);
};
