import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {

    interface ControlPoints {
      topLeft: string;
      topRight: string;
      bottomRight: string;
      bottomLeft: string;
    }

    const csstricks = {
      init: function() {
        csstricks.randomizeBackgrounds();
      },

      generateControlPoints: function(): ControlPoints {
        const spread = 20; // Aanpassen naar gewenste spreiding
        return {
          topLeft: `${getRandomInt(0, spread)},${getRandomInt(0, spread)}`,
          topRight: `${getRandomInt(100 - spread, 100)},${getRandomInt(0, spread)}`,
          bottomRight: `${getRandomInt(100 - spread, 100)},${getRandomInt(100 - spread, 100)}`,
          bottomLeft: `${getRandomInt(0, spread)},${getRandomInt(100 - spread, 100)}`,
        };
      },

      randomizeHeader: function() {
        let newControlPoints = csstricks.generateControlPoints();
        let pathData = `M0,0 L100,0 C${newControlPoints.topRight} ${newControlPoints.bottomRight} 100,100 L0,100 C${newControlPoints.bottomLeft} ${newControlPoints.topLeft} 0,0 Z`;
        const jaggedTopElement = document.getElementById("jagged-top");
        if (jaggedTopElement instanceof SVGPathElement) {
          jaggedTopElement.setAttribute("d", pathData);
        }
      },

      randomizeBackgrounds: function() {
        csstricks.randomizeHeader();
        requestInterval(function() {
          csstricks.randomizeHeader();
        }, 2000);
      },
    };

    csstricks.init();

    function getRandomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function requestInterval(fn: () => void, delay: number): { value: number } {
      const requestAnimFrame = (() => {
        return (
          window.requestAnimationFrame ||
          function (callback: FrameRequestCallback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      let start = new Date().getTime();
      let handle: { value: number } = { value: 0 };

      function loop() {
        handle.value = requestAnimFrame(loop);
        let current = new Date().getTime();
        let delta = current - start;

        if (delta >= delay) {
          fn();
          start = new Date().getTime();
        }
      }

      handle.value = requestAnimFrame(loop);
      return handle;
    }







  }
}
