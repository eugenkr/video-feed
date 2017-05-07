import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VideoService } from './services/video.service';
import { PlayerService } from './services/player.service';
import { DomService } from './services/dom.service';

import { YoutubeVideoComponent } from './components/youtube-video/youtube-video.component';
import { FacebookVideoComponent } from './components/facebook-video/facebook-video.component';
import { UrlVideoComponent } from './components/url-video/url-video.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeVideoComponent,
    FacebookVideoComponent,
    UrlVideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [VideoService, PlayerService, DomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
