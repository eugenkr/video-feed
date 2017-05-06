import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
  static createErrorTemplate (message, url) {
    return `
        <div class="player-error">
            <div class="error-message">
                <i class="fa fa-error fa-3">
                <div class="message">${ message }</div>
            </div>
            <div class="error-details">${ url }</div>                
        </div>`;
  }

  static placeError (cfg: any) {
    const target = cfg.el.querySelector(cfg.selector);

    target.innerHTML = ErrorService.createErrorTemplate(cfg.errorMessage, cfg.videoUrl);
  }
}
