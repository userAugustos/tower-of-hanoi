import { Component, ElementRef, ViewChild, Renderer2, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// const
export class AppComponent {
	colors = ["#3f92ff", "#46ff3c", "#ffff0b", "#fc6a08", "#fc333c", "#6d4d93"] // 6 colors

	constructor(private renderer: Renderer2, private el: ElementRef){}

  // @ViewChildren('tower') towers!: QueryList<ElementRef<HTMLElement>>;

  async ngOnInit() {
    const towers = this.el.nativeElement.querySelectorAll('.tower')
    this.colors.forEach(color => {
      // i was doing this just like i was with vanilla js, but this is a better approach
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span,  'item')
      this.renderer.setAttribute(span, 'draggable', 'true')
      towers[0].appendChild(span)
    })
  }
	async ngAfterViewInit() {
    const items: HTMLSpanElement[] = this.el.nativeElement.querySelectorAll('.item')

		items.forEach((item, i) => {
      console.debug(item)
			this.renderer.setStyle(item, 'width', `${i+4}rem`)
			this.renderer.setStyle(item, 'background-color', `${this.colors[i]}`)

			// item.nativeElement.addEventListener()
		})
	}
}
