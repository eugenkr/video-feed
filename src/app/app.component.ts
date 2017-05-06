import { Component, OnInit } from '@angular/core';

import { VideoService } from './services/video.service';
import { PlayerService } from './services/player.service';
import { Video } from './types/video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  private ytApiUrl = 'https://www.youtube.com/iframe_api';
  private fbApiUrl = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1972597542960030';

  feed: Video[];

  constructor (private videoService: VideoService, private playerService: PlayerService) { }

  ngOnInit () {
    this.getVideoFeed();
  }

  /**
   * Gets video feed from server
   */
  getVideoFeed () {
    const fb = new Video();
    const url = new Video();

    // fake id for testing unavailable FB video
    fb.videoId = '10154651089866729_fake';
    fb.source = 'facebook';
    fb.title = 'Test';

    // fake video url
    url.source = 'url';
    url.url = 'http://cdn.playbuzz.com/content/feed/fake-video.mp4';

    this.videoService.getVideoFeed().subscribe(data => {
      data.push(fb);
      data.push(url);

      this.feed = data;

      this.attachYoutubeApi();
      this.attachFacebookApi();
    });
  }

  /**
   * Creates video players
   */
  createPlayers () {
    this.playerService.createPlayers(this.feed);
  }

  /**
   * Attaches special Youtube API which works with iframe player
   */
  attachYoutubeApi () {
    let tag, firstScriptTag;
    const s = 'script';
    const d = document;

    tag = d.createElement(s);
    tag.src = this.ytApiUrl;
    firstScriptTag = d.getElementsByTagName(s)[0];

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => this.createPlayers();
  }

  /**
   * Attaches special Facebook JavaScript SDK which works with FB content
   */
  attachFacebookApi () {
    const d = document;
    const s = 'script';
    const id = 'facebook-jssdk';
    const fjs = document.getElementsByTagName(s)[0];

    let js;

    if (d.getElementById(id)) {
      return null;
    }

    js = document.createElement(s);
    js.id = id;
    js.src = this.fbApiUrl;

    fjs.parentNode.insertBefore(js, fjs);
  }
}
