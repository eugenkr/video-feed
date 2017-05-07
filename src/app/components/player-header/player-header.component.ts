import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-header',
  templateUrl: './player-header.component.html'
})
export class PlayerHeaderComponent {
  @Input() title: string;
  @Input() views: number;
}
