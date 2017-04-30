import { VideoFeedPage } from './app.po';

describe('video-feed App', () => {
  let page: VideoFeedPage;

  beforeEach(() => {
    page = new VideoFeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
