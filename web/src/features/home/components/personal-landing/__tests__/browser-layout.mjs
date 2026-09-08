import assert from 'node:assert/strict'

// Run against the isolated Bit2 preview; never start or stop other preview servers.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const previewUrl = process.env.BIT2_PREVIEW_URL || 'http://localhost:5175/'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(previewUrl)
    await page.locator('.bit2-illustration img').waitFor()
    await page
      .locator('.bit2-illustration img')
      .evaluate(async (image) => image.decode())
    const layout = await page.evaluate(() => {
      const card = document.querySelector('.landing-price-card')
      const hero = document.querySelector('.landing-hero-inner')
      const image = document.querySelector('.bit2-illustration img')
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        cardPadding: Number.parseFloat(getComputedStyle(card).paddingLeft),
        columns: getComputedStyle(hero).gridTemplateColumns.split(' ').length,
        imageLoaded: image.naturalWidth > 0,
        titleSize: Number.parseFloat(
          getComputedStyle(document.querySelector('h1')).fontSize
        ),
      }
    })
    assert.equal(
      layout.overflow,
      false,
      `${width}: no horizontal page overflow`
    )
    assert.ok(
      layout.cardPadding >= 20,
      `${width}: cards retain readable padding after CSS reset`
    )
    assert.equal(
      layout.columns,
      width > 900 ? 2 : 1,
      `${width}: responsive hero columns`
    )
    assert.ok(layout.imageLoaded, `${width}: supplied bunny image loads`)
    assert.ok(
      layout.titleSize >= 32,
      `${width}: hero heading retains its typography`
    )
    assert.deepEqual(errors, [], `${width}: no uncaught page errors`)
    await page.screenshot({ path: `/tmp/bit2-${width}.png`, fullPage: true })
    process.stdout.write(`${width}px layout passed\n`)
    await page.close()
  }
} finally {
  await browser.close()
}
