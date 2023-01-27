import {Component, ElementRef, ViewChild, Renderer2, ViewChildren, QueryList} from '@angular/core';

interface HanoiParams {
  n: number,
  from: HTMLDivElement,
  to: HTMLDivElement,
  aux: HTMLDivElement
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // "#ffff0b", "#fc6a08",
  colors = ["#3f92ff", "#fc333c", "#6d4d93", "#46ff3c"]
  towers: HTMLDivElement[] = []
  items: HTMLSpanElement[] = []
  draggedItem: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.towers = this.el.nativeElement.querySelectorAll('.tower')
    this.colors.forEach(color => {
      // I was doing this just like i was with vanilla js, but this is a better approach
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'item')
      this.renderer.setAttribute(span, 'draggable', 'true')
      this.towers[0].appendChild(span)
    })
    this.towers.forEach(tower => {
      this.renderer.listen(tower, 'dragover', (event) => {
        this.dragOver(event)
      })
      this.renderer.listen(tower, 'drop', (event) => {
        this.dragDrop(event, tower)
      })
    })
  }

  ngAfterViewInit() {
    this.items = this.el.nativeElement.querySelectorAll('.item')
    this.items.forEach((item, i) => {
      this.renderer.setStyle(item, 'width', `${i + 4}rem`)
      this.renderer.setStyle(item, 'background-color', `${this.colors[i]}`);
      this.renderer.listen(item, 'dragstart', () => {
        this.dragStart(item)
      })
    })
  }

  startHanoi() {
    console.debug(this.items.length)
    this.solveHanoi(this.items.length - 1, this.towers[0], this.towers[2], this.towers[1])
  }

  dragStart(item: HTMLSpanElement) {
    this.draggedItem = item
    console.debug(this.draggedItem)
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
    console.debug(this.draggedItem)
  }

  dragDrop(event: DragEvent, tower: HTMLDivElement) {
    // event.preventDefault();
    console.log("drag dropped");
    tower.prepend(this.draggedItem);
    this.draggedItem = null;
  }

  solveHanoi(n: number, from: HTMLDivElement, to: HTMLDivElement, helper: HTMLDivElement) {
    if (n === 0) {
      to.prepend(this.items[0])
      return;
    }
    // if (n === 1) {
    //   to.prepend(this.items[0])
    //   console.debug(`Movendo item ${n}, da torre ${from.className}, para torre ${to.className}`)
    //   return
    // }
    this.solveHanoi(n - 1, from, helper, to);
    console.debug(`Movendo item ${n}, da torre ${from.className}, para torre ${to.className}`)
    if (this.items[n]) {
      to.prepend(this.items[n])
    }
    this.solveHanoi(n - 1, helper, to, from)
  }
}
