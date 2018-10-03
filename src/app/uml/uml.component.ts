import { Component, OnInit } from '@angular/core';
import * as joint from 'jointjs';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';

@Component({
  selector: 'app-uml',
  templateUrl: './uml.component.html',
  styleUrls: ['./uml.component.css']
})
export class UmlComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const graph = new joint.dia.Graph(),
      paper = new joint.dia.Paper({
    el: jQuery('#paperY'),
    model: graph
  });
    const stencilGraph = new joint.dia.Graph,
    stencilPaper = new joint.dia.Paper({
    el: jQuery('#stencil'),
    height: 60,
    model: stencilGraph,
    interactive: false
  });

  const r1 = new joint.shapes.basic.Rect({
    position: {
      x: 10,
      y: 10
    },
    size: {
      width: 100,
      height: 40
    },
    attrs: {
      text: {
        text: 'Rect1'
      }
    }
  });
  const r2 = new joint.shapes.basic.Rect({
    position: {
      x: 120,
      y: 10
    },
    size: {
      width: 100,
      height: 40
    },
    attrs: {
      text: {
        text: 'Rect2'
      }
    }
  });
  stencilGraph.addCells([r1, r2]);
// ---------------------------
stencilPaper.on('cell:pointerdown', function(cellView, e, x, y) {
    jQuery('body').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>');
    const flyGraph = new joint.dia.Graph,
      flyPaper = new joint.dia.Paper({
        el: jQuery('#flyPaper'),
        model: flyGraph,
        interactive: false
      }),
      flyShape = cellView.model.clone(),
      pos = cellView.model.position(),
      offset = {
        x: x - pos.x,
        y: y - pos.y
      };

    flyShape.position(0, 0);
    flyGraph.addCell(flyShape);
    jQuery('#flyPaper').offset({
      left: e.pageX - offset.x,
      top: e.pageY - offset.y
    });
    jQuery('body').on('mousemove.fly', function(element) {
        jQuery('#flyPaper').offset({
        left: element.pageX - offset.x,
        top: element.pageY - offset.y
      });
    });
    jQuery('body').on('mouseup.fly', function(element) {
      // tslint:disable-next-line:no-shadowed-variable
      const x = element.pageX,
        // tslint:disable-next-line:no-shadowed-variable
        y = element.pageY,
        target = paper.$el.offset();
// Dropped over paper ?
if (
    x > target.left &&
    x < target.left + paper.$el.width() &&
    y > target.top &&
    y < target.top + paper.$el.height()
  ) {
    const s = flyShape.clone();
    s.position(x - target.left - offset.x, y - target.top - offset.y);
    graph.addCell(s);
  }
  jQuery('body')
    .off('mousemove.fly')
    .off('mouseup.fly');
  flyShape.remove();
  jQuery('#flyPaper').remove();
});
});

    // -----------------UML
//     const graph = new joint.dia.Graph();

//     const paper = new joint.dia.Paper({
//     el: document.getElementById('paperUml'),
//     width: 1800,
//     height: 1600,
//     gridSize: 1,
//     model: graph
//     });

    const uml = joint.shapes.uml;

    const classes = {

    mammal: new uml.Interface({
        position: { x: 300  , y: 50 },
        size: { width: 240, height: 100 },
        name: ['Mammal'],
        attributes: ['dob: Date'],
        methods: ['+ setDateOfBirth(dob: Date): Void', '+ getAgeAsDays(): Numeric'],
        attrs: {
            '.uml-class-name-rect': {
                fill: '#feb662',
                stroke: '#ffffff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: '#fdc886',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }

        }
    }),

    person: new uml.Abstract({
        position: { x: 300  , y: 300 },
        size: { width: 260, height: 100 },
        name: ['Person'],
        attributes: ['firstName: String', 'lastName: String'],
        methods: ['+ setName(first: String, last: String): Void', '+ getName(): String'],
        attrs: {
            '.uml-class-name-rect': {
                fill: '#68ddd5',
                stroke: '#ffffff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: '#9687fe',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-methods-text, .uml-class-attrs-text': {
                fill: '#fff'
            }
        }
    }),

    bloodgroup: new uml.Class({
        position: { x: 20  , y: 190 },
        size: { width: 220, height: 100 },
        name: ['BloodGroup'],
        attributes: ['bloodGroup: String'],
        methods: ['+ isCompatible(bG: String): Boolean'],
        attrs: {
            '.uml-class-name-rect': {
                fill: '#ff8450',
                stroke: '#fff',
                'stroke-width': 0.5,
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: '#fe976a',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }
        }
    }),

    address: new uml.Class({
        position: { x: 630  , y: 190 },
        size: { width: 160, height: 100 },
        name: ['Address'],
        attributes: ['houseNumber: Integer', 'streetName: String', 'town: String', 'postcode: String'],
        methods: [],
        attrs: {
            '.uml-class-name-rect': {
                fill: '#ff8450',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: '#fe976a',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }
        }

    }),

    man: new uml.Class({
        position: { x: 200  , y: 500 },
        size: { width: 180, height: 50 },
        name: ['Man'],
        attributes: [],
        methods: [],
        attrs: {
            '.uml-class-name-rect': {
                fill: '#ff8450',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: '#fe976a',
                stroke: '#fff',
                'stroke-width': 0.5
            }
        }
    }),

    woman: new uml.Class({
        position: { x: 450  , y: 500 },
        size: { width: 180, height: 50 },
        name: ['Woman'],
        attributes: [],
        methods: ['+ giveABrith(): Person []'],
        attrs: {
            '.uml-class-name-rect': {
                fill: '#ff8450',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: '#fe976a',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-methods-text': {
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }
        }
    })


};

_.each(classes, function(c) { graph.addCell(c); });

const relations = [
    new uml.Generalization({ source: { id: classes.man.id }, target: { id: classes.person.id }}),
    new uml.Generalization({ source: { id: classes.woman.id }, target: { id: classes.person.id }}),
    new uml.Implementation({ source: { id: classes.person.id }, target: { id: classes.mammal.id }}),
    new uml.Aggregation({ source: { id: classes.person.id }, target: { id: classes.address.id }}),
    new uml.Composition({ source: { id: classes.person.id }, target: { id: classes.bloodgroup.id }})
];

_.each(relations, function(r) { graph.addCell(r); });

  }
}
