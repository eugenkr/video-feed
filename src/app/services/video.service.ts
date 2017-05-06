import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Video } from '../types/video';

@Injectable()
export class VideoService {
  feedUrl = 'https://cdn.playbuzz.com/content/feed/items';

  constructor (private http: Http) {}

  /**
   * Retrieves video feed
   * @returns {Observable<Video[]>}
   *
   * Response format:
   * {
   *   "items": [
   *     {
   *      "title": "Title 1",
   *       "type": "video",
   *       "source": "youtube",
   *       "videoId": "xxxx",
   *       "views": yyy
   *     },
   *     {
   *       "title": "Title 2",
   *       "type": "video",
   *       "source": "facebook",
   *       "videoId": "xxx",
   *       "views": yyy
   *     },
   *     {
   *       "type": "video",
   *       "source": "url",
   *       "url": "http://some_address.com/video-1.mp4",
   *       "views": xxx
   *     }
   *   ]
   *  }
   */
  getVideoFeed (): Observable<Video[]> {
    return this.http.get(this.feedUrl)
      .map(res => res.json())
      .map(res => res.items);
  }
}
