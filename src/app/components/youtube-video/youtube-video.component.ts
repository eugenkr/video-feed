import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import { ErrorService } from '../../services/error.service';

import { Video } from '../../types/video';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html'
})
export class YoutubeVideoComponent implements OnInit, OnDestroy {
  private player: any;

  errorMessage = 'Youtube video is unavailable!';

  @Input() cfg: Video;

  constructor (private playerService: PlayerService, private el: ElementRef) {}

  ngOnInit () {
    this.playerService.getYTPlayers().subscribe(players => {
      this.player = players[this.cfg.videoId];

      if (!this.player) {
        return null;
      }

      this.player.addEventListener('onReady', event => this.onReady(event));
      this.player.addEventListener('onError', event => this.onError(event));
    });
  }

  ngOnDestroy () {
    this.player.removeEventListener('onReady', event => this.onReady(event));
    this.player.removeEventListener('onError', event => this.onError(event));
  }

  showError (event) {
    const iFrame = event.target.getIframe();

    const errorCfg = {
      videoUrl: iFrame.getAttribute('src').split('?')[0],
      errorMessage: this.errorMessage,
      selector: '.player-body',
      el: this.el.nativeElement
    };

    ErrorService.placeError(errorCfg);
  }

  onReady (event) {
    if (event.target && !event.target.getDuration()) {
      this.showError(event);
    }
  }

  onError (event) {
    this.showError(event);
  }
}
