describe('Standards Listing Index', () => {
  it('should accesss standards listing page', async () => {
    await browser.url(`/standards`);
    await expect($('ul')).toExist();
    await expect($('h1=Browse the standards directory')).toExist();
  });

  it('There should be results in the directory ', async () => {
    await browser.url(`/standards`);
    await expect($('#browse-results')).toExist();
    expect(await $$('#browse-results li').length).toBe(10);
  });
});
