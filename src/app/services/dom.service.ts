import { Injectable } from '@angular/core';

@Injectable()
export class DomService {
  static createErrorTemplate (message, url) {
    return `
        <div class="player-error">
            <div class="error-message">
                <i class="fa fa-exclamation-circle fa-3x" aria-hidden="true"></i>
                <div class="message">${ message }</div>
            </div>
            <div class="error-details">${ url }</div>                
        </div>`;
  }

  static placeError (cfg: any) {
    const target = cfg.el.querySelector(cfg.selector);

    target.innerHTML = DomService.createErrorTemplate(cfg.errorMessage, cfg.videoUrl);
  }

  static removeLoader (el: any) {
    const loader = el.getElementsByClassName('fa-spin')[0];

    if (loader) {
      loader.parentNode.removeChild(loader);
    }
  }
}
