import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent {

  @Input()
  public url?: string;

  @Input()
  public title: string = '';

  @Input()
  public height: string = '';

  @Input()
  public width: string = '';

  public hasLoaded: boolean = false;
  public noImage: boolean = false;



  ngOnInit(): void {
    if (!this.url) {
      this.noImage = true;

    };

  }

  onLoad() {

    this.hasLoaded = true;

  }

}
