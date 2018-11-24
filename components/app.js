import getDataAsync from './getDataAsync.js';
import Graph from './Graph.js';


let coordinates = [
  {x: 0, y: 1},
  {x: 1, y: 2},
  {x: 2, y: 1},
  {x: 3, y: 2},
  {x: 4, y: 1},
  {x: 5, y: 1},
];

const currencyApp = (function () {

  // getDataAsync('./data/data.json').then(data => {
  //   // document.body.appendChild(new CurrencyGraph(data));
  // });
  let graph = new Graph(document.getElementById('canvas'), coordinates, 0.5);
  graph.draw();

  window.g = graph;
  window.addEventListener('resize', ()=>{
    graph.draw();
  });
})();