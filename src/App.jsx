import { useRef } from 'react';
import './App.css';

function App() {
  const canvasEl = useRef(null);

  const coords = [];

  function calcDistance(coordsArr) {
    if (coords.length === 2) {
      const x1 = coordsArr[0].pointX;
      const x2 = coordsArr[1].pointX;
      const y1 = coordsArr[0].pointY;
      const y2 = coordsArr[1].pointY;

      // const X = x2 - x1;
      // const Y = y2 - y1;

      const X = (x2 - x1) / 2;
      const Y = (y2 - y1) / 2;

      console.log(coordsArr[0].pointX + X, coordsArr[0].pointY + Y);
      // console.log(coords);

      // return Math.sqrt(X * X + Y * Y);
      return [coordsArr[0].pointX + X, coordsArr[0].pointY + Y];
    }
    return;
  }

  const handleClick = e => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(200,0,0)';

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = new Path2D();

    circle.arc(x - 2, y - 3, 3, 0, 2 * Math.PI); // -2 & -3 for centering on mouse
    ctx.fill(circle);

    // coords 2 point
    coords.push({ pointX: x - 2, pointY: y - 3 });
    const test = calcDistance(coords);

    if (test) {
      const circle = new Path2D();
      circle.arc(test[0], test[1], 3, 0, 2 * Math.PI);
      ctx.fill(circle);
    }
  };

  return (
    <canvas
      ref={canvasEl}
      id="fractal"
      width="500px"
      height="300px"
      onClick={handleClick}
    ></canvas>
  );
}

export default App;
