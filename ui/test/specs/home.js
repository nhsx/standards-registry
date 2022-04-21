describe('Homepage', () => {
  it('should show home page and call to action', async () => {
    await browser.url(`/`);

    await expect(
      $(
        'h1=Find standards for data and interoperability in health and social care'
      )
    ).toBeExisting();

    await expect(
      $('p.nhsuk_body-l').toHaveText(
        'Use this directory to find nationally recognised information standards for interoperable technology in health and adult social care.'
      )
    );
  });

  it('should show recent standards on the right hand side', async () => {
    await browser.url(`/`);
    const $recents = await $$('ul.nhsuk-u-font-size-16 li');
    expect($recents.length).toBe(3);
  });
});
