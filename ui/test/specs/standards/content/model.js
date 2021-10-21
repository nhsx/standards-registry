describe('Standards', () => {
  it('should be able to access a content standards model', async () => {
      await browser.url(`/standards/content/123`);

      await expect($('h1=Mental health inpatient discharge')).toBeExisting();
  });
});
