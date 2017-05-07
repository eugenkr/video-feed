import { Injectable } from '@angular/core';

@Injectable()
export class DomService {
  /**
   * Creates error mark-up
   * @param {String} message - error message
   * @param {String} url - url with missing video
   * @returns {string}
   */
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

  /**
   * Replace inner HTML of the target element with error
   * @param {Object} cfg - {
   *  selector: '.some-css-class',
   *  el: HTMLElement, // target element to replace its inner HTML
   *  errorMessage: 'Error',
   *  videoUrl: 'http://some.url/some-video'
   * }
   */
  static placeError (cfg: any) {
    const target = cfg.el.querySelector(cfg.selector);

    target.innerHTML = DomService.createErrorTemplate(cfg.errorMessage, cfg.videoUrl);
  }

  /**
   * Removes the loader element of certain element
   * @param {HTMLElement} el - element to replace loader
   */
  static removeLoader (el: any) {
    const loader = el.getElementsByClassName('fa-spin')[0];

    if (loader) {
      loader.parentNode.removeChild(loader);
    }
  }
}
