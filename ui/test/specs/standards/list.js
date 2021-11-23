describe('Homepage', () => {
  it('should accesss the homepage', async () => {
    await browser.url(`/standards`);

    await expect(
      $('h1=Join up IT systems in health and social care')
    ).toExist();
    await expect($('ul')).toExist();
  });
});
