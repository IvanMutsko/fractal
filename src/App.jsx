import { useRef } from 'react';
import './App.css';

function App() {
  const canvasEl = useRef(null);

  const basePoints = {
    a: {
      x: null,
      y: null,
    },
    b: {
      x: null,
      y: null,
    },
    c: {
      x: null,
      y: null,
    },
    start: {
      x: null,
      y: null,
    },
  };

  let intervalID = null;

  const handleClick = e => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(200,0,0)';

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!basePoints.a.x || !basePoints.a.y) {
      basePoints.a.x = x;
      basePoints.a.y = y;

      const circle = new Path2D();

      circle.arc(x - 2, y - 3, 5, 0, 2 * Math.PI);
      ctx.fill(circle);
      return;
    }
    if (!basePoints.b.x || !basePoints.b.y) {
      basePoints.b.x = x;
      basePoints.b.y = y;

      const circle = new Path2D();

      circle.arc(x - 2, y - 3, 5, 0, 2 * Math.PI);
      ctx.fill(circle);
      return;
    }
    if (!basePoints.c.x || !basePoints.c.y) {
      basePoints.c.x = x;
      basePoints.c.y = y;

      const circle = new Path2D();

      circle.arc(x - 2, y - 3, 5, 0, 2 * Math.PI);
      ctx.fill(circle);
      return;
    }
    if (!basePoints.start.x || !basePoints.start.y) {
      basePoints.start.x = x;
      basePoints.start.y = y;

      const circle = new Path2D();

      circle.arc(x - 2, y - 3, 1, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgb(0, 0, 200)';
      ctx.fill(circle);
      return;
    }
  };

  const calcAverageDistance = (x2, y2) => {
    const x1 = basePoints.start.x;
    const y1 = basePoints.start.y;

    const X = (x2 - x1) / 2;
    const Y = (y2 - y1) / 2;

    basePoints.start.x = basePoints.start.x + X;
    basePoints.start.y = basePoints.start.y + Y;
  };

  const startRendering = () => {
    intervalID = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 90) + 1;

      if (randomNumber <= 30) {
        calcAverageDistance(basePoints.a.x, basePoints.a.y);
      }
      if (randomNumber > 30 && randomNumber <= 60) {
        calcAverageDistance(basePoints.b.x, basePoints.b.y);
      }
      if (randomNumber > 60) {
        calcAverageDistance(basePoints.c.x, basePoints.c.y);
      }

      const canvas = canvasEl.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgb(0,200,0)';
      const circle = new Path2D();

      circle.arc(
        basePoints.start.x - 2,
        basePoints.start.y - 3,
        1,
        0,
        2 * Math.PI
      );

      ctx.fill(circle);
    }, 10);
  };

  return (
    <div className="wrap">
      <h1 className="title">
        Choose 3 main points in the field and the fourth as a reference point
      </h1>
      <canvas
        ref={canvasEl}
        id="fractal"
        width="500px"
        height="300px"
        onClick={handleClick}
      ></canvas>
      <div className="buttons">
        <button type="button" onClick={startRendering}>
          Start
        </button>
        <button type="button" onClick={() => clearInterval(intervalID)}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
