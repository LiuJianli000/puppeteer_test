const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
    ignoreDefaultArgs: ['--enable-automation'],
    slowMo: 200,
    args: ['--window-size=1366,700']
  })

  const page = await browser.newPage()

  await page.goto('http://www.mdeditor.com/', { waitUntil: 'networkidle2' })

  await page.keyboard.down('Control')
  await page.keyboard.down('a')
  await page.keyboard.up('a')
  await page.keyboard.up('Control')

  await page.keyboard.press('Backspace')

  await page.keyboard.down('Control')
  await page.keyboard.down('b')
  await page.keyboard.up('b')
  await page.keyboard.up('Control')
}

run()