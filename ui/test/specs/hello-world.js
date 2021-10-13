describe('Hello World', () => {
  it('should say hello', async () => {
      await browser.url(`/`);

      await expect($('h1=Hello World')).toBeExisting();
  });
});

