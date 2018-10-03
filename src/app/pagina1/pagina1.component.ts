import { Component, OnInit } from '@angular/core';
import * as joint from 'jointjs';
import * as jQuery from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component implements OnInit {

  constructor() {

  }

  ngOnInit() {
    const graph = new joint.dia.Graph;

    const paper = new joint.dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: 600,
      height: 100,
      gridSize: 1
    });

    const rect = new joint.shapes.basic.Rect({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 30 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    const rect2 = rect.clone() as joint.shapes.basic.Rect;
    rect2.translate(300);

    const link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link]);
  }

}
