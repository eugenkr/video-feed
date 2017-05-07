import { Component, Input, OnInit, ElementRef } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import { DomService } from '../../services/dom.service';

import { Video } from '../../types/video';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html'
})
export class YoutubeVideoComponent implements OnInit {
  private player: any;

  errorMessage = 'Youtube video is missing!';

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

  /**
   * Shows error instead of video
   * @param {Object} event
   */
  showError (event) {
    const iFrame = event.target.getIframe();

    const errorCfg = {
      videoUrl: iFrame.getAttribute('src').split('?')[0],
      errorMessage: this.errorMessage,
      selector: '.player-body',
      el: this.el.nativeElement
    };

    DomService.placeError(errorCfg);
  }

  /**
   * Handler for video 'onReady' event
   * @param {Object} event
   */
  onReady (event) {
    DomService.removeLoader(this.el.nativeElement);

    if (event.target && !event.target.getDuration()) {
      this.showError(event);
    }
  }

  /**
   * Handler for video 'onError' event
   * @param {Object} event
   */
  onError (event) {
    DomService.removeLoader(this.el.nativeElement);
    this.showError(event);
  }
}
