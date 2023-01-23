import { Component, ElementRef, ViewChild, Renderer2, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// const 
export class AppComponent {
  title = 'introduction';
	name = 'nomenclatura';
	colors = ["#3f92ff", "#46ff3c", "#ffff0b", "#fc6a08", "#fc333c", "#6d4d93"] // 6 colors

	constructor(private renderer: Renderer2){}

	@ViewChildren('item') span!: QueryList<ElementRef<HTMLSpanElement>>;

	ngAfterViewInit() {
		const items = this.span.toArray()
		console.debug(items)

		items.forEach((item, i) => {
			this.renderer.setStyle(item.nativeElement, 'width', `${i+4}rem`)
			this.renderer.setStyle(item.nativeElement, 'background-color', `${this.colors[i]}`)

			item.nativeElement.addEventListener()
		})
		// this.renderer.setProperty(this.span.nativeElement, '', '')
	}
}
