import { Component, ElementRef, ViewChild, Renderer2, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// const
export class AppComponent {
	colors = ["#3f92ff", "#46ff3c", "#ffff0b", "#fc6a08", "#fc333c", "#6d4d93"]
  towers: HTMLDivElement[] = []
  draggedItem: any;
	constructor(private renderer: Renderer2, private el: ElementRef){
  }
  ngOnInit() {
    this.towers = this.el.nativeElement.querySelectorAll('.tower')
    this.colors.forEach(color => {
      // I was doing this just like i was with vanilla js, but this is a better approach
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span,  'item')
      this.renderer.setAttribute(span, 'draggable', 'true')
      this.towers[0].appendChild(span)
    })
    this.towers.forEach(tower => {
      this.renderer.listen(tower, 'dragover', (event) => { this.dragOver(event) })
      this.renderer.listen(tower, 'drop', (event) => { this.dragDrop(event, tower) })
    })
  }
  ngAfterViewInit() {
    const items: HTMLSpanElement[] = this.el.nativeElement.querySelectorAll('.item')
		items.forEach((item, i) => {
			this.renderer.setStyle(item, 'width', `${i+4}rem`)
			this.renderer.setStyle(item, 'background-color', `${this.colors[i]}`);
      this.renderer.listen(item, 'dragstart', () => { this.dragStart(item) })
		})
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
}
