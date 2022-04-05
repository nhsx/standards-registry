describe('Standards Listing Index', () => {
  it('should accesss standards listing page', async () => {
    await browser.url(`/standards`);

    await expect($('ul')).toExist();
    await expect($('h1=Browse the standards directory')).toExist();
  });
});
