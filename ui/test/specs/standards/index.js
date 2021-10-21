describe('Standards', () => {
  it('should be able to access the standards page', async () => {
      await browser.url(`/standards`);

      await expect($('h1=Browse directory')).toBeExisting();
  });
});
