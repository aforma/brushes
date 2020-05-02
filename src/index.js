const sketch = require("canvas-sketch");
const lineBrush = require("./brush/line");
const multipleLineBrush = require("./brush/multiple-line");
const mouse = require("./painter/mouse");
const pinball = require("./painter/pinball");

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
    const background = multipleLineBrush(s.context, {
      lineWidth: 10,
      linesNumber: 10,
      lineOffset: 15,
    });
    
    const mousePainter = mouse(background.draw.bind(background), s.canvas);
    const pinballPainter = pinball(
      background.draw.bind(background),
      s.canvas.width,
      s.canvas.height,
      settings.duration,
    );

    return {
      resize(params) {},
      render(params) {
        mousePainter.draw();
        pinballPainter.draw()
      },
      unload() {}
    };
  }, settings);
};
