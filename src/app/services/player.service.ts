import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlayerService {
  private players: any = {};
  private ytPlayersSubject = new Subject<any>();
  private fbPlayersSubject = new Subject<any>();

  /**
   * Creates Youtube and FB players
   * @param {Video[]} items - video feed
   */
  createPlayers (items) {
    this.createYoutubePlayers(items);
    this.createFacebookPlayers();
  }

  /**
   * Creates the instance of Youtube player
   * @param {Video} cfg - player params
   */
  createYoutubePlayer (cfg) {
    const videoId = cfg.videoId;

    this.players[cfg.source] = this.players[cfg.source] || {};

    this.players[cfg.source][videoId] = new (window as any).YT.Player(`player-${ videoId }`, {
      height: '315',
      width: '560',
      videoId: videoId
    });
  }

  /**
   * Creates the list Youtube players
   * @param {Video[]} items - video feed
   */
  createYoutubePlayers (items) {
    items.forEach(item => {
      if (item.source === 'youtube') {
        this.createYoutubePlayer(item);
      }
    });

    this.setYTPlayers(this.players.youtube);
  }

  /**
   * Defines handler for FB init event and creates the list of FB players
   */
  createFacebookPlayers () {
    (window as any).fbAsyncInit = () => {
      const event = (window as any).FB.Event;

      event.subscribe('xfbml.ready', msg => {
        if (msg.type === 'video' && msg.id) {
          this.players.facebook = this.players.facebook || {};
          this.players.facebook[msg.id] = msg.instance;
        }
      });

      event.subscribe('xfbml.render', () => this.setFBPlayers(this.players.facebook));
    };
  }

  /**
   * Returns observable subject of Youtube players
   * @returns {Observable<any>}
   */
  getYTPlayers (): Observable<any> {
    return this.ytPlayersSubject.asObservable();
  }

  /**
   * Sets FB players to observable subject
   * @param {Object} cfg
   */
  setYTPlayers (cfg: any) {
    this.ytPlayersSubject.next(cfg);
  }

  /**
   * Returns observable subject of FB players
   * @returns {Observable<any>}
   */
  getFBPlayers (): Observable<any> {
    return this.fbPlayersSubject.asObservable();
  }

  /**
   * Sets FB players to observable subject
   * @param {Object} cfg
   */
  setFBPlayers (cfg: any) {
    this.fbPlayersSubject.next(cfg);
  }
}
