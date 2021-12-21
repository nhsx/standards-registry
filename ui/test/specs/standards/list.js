describe('Homepage', () => {
  it('should accesss the homepage', async () => {
    await browser.url(`/standards`);

    await expect($('h1=Browse the standards directory')).toExist();
    await expect($('ul')).toExist();
  });
});
