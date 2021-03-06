import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import { DomService } from '../../services/dom.service';

import { Video } from '../../types/video';

@Component({
  selector: 'app-facebook-video',
  templateUrl: './facebook-video.component.html'
})
export class FacebookVideoComponent implements OnInit, OnDestroy {
  private player: any;
  private listeners: Array<any> = [];

  errorMessage = 'Facebook video is missing!';
  videoUrl = '';

  @Input() cfg: Video;

  constructor (private playerService: PlayerService, private el: ElementRef) {}

  ngOnInit () {
    this.videoUrl = `https://www.facebook.com/facebook/videos/${ this.cfg.videoId }/`;

    const errorCfg = {
      videoUrl: this.videoUrl,
      errorMessage: this.errorMessage,
      selector: '.player-body',
      el: this.el.nativeElement
    };

    this.playerService.getFBPlayers().subscribe(players => {
      DomService.removeLoader(this.el.nativeElement);

      this.player = players[this.cfg.videoId];

      if (!this.player) {
        DomService.placeError(errorCfg);

        return null;
      }

      const listener = this.player.subscribe('error', event => DomService.placeError(errorCfg));

      this.listeners.push({ event: 'error', listener: listener });
    });
  }

  ngOnDestroy () {
    if (this.player && this.listeners.length) {
      this.listeners.forEach(l => l.listener.removeListener(l.event));
    }
  }
}
