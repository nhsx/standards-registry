describe('Standards', () => {
  it('should be able to access the content standards list', async () => {
      await browser.url(`/standards/content`);

      await expect($('h1=Browse content standards')).toBeExisting();
  });
});
