describe('Homepage', () => {
  it('should show home page and call to action', async () => {
    await browser.url(`/`);

    await expect(
      $(
        'h1=Find standards and APIs to support data sharing in health and social care'
      )
    ).toBeExisting();

    await expect(
      $('p.nhsuk_body-l').toHaveText(
        'Find standards, services and APIs to build interoperable technology in health and social care.'
      )
    );
  });
});
