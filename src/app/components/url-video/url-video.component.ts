import { Component, Input, ViewChild, OnInit } from '@angular/core';

import { ErrorService } from '../../services/error.service';

import { Video } from '../../types/video';

@Component({
  selector: 'app-url-video',
  templateUrl: './url-video.component.html'
})
export class UrlVideoComponent implements OnInit {
  @Input() cfg: Video;
  @ViewChild('videoPlayer') player: any;
  @ViewChild('playerWrapper') wrapper: any;

  errorMessage = 'Video is unavailable!';

  ngOnInit () {
    const errorCfg = {
      videoUrl: this.cfg.url,
      errorMessage: this.errorMessage,
      selector: '.player-body',
      el: this.wrapper.nativeElement
    };

    this.player.nativeElement.addEventListener('error', (e) => ErrorService.placeError(errorCfg));
  }
}
