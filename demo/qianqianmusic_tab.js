const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
    ignoreDefaultArgs: ['--enable-automation'],
    slowDo: 200,
    args: ['--window-size=1366,700']
  })

  const page = await browser.newPage()

  await page.goto('http://music.taihe.com/', { waitUntil: 'networkidle2'})

  const jinBao = await page.waitForSelector("a[title='劲爆歌曲']")
  await jinBao.click()

  const target = await browser.waitForTarget(t => t.url().includes('tag'))
  const newPage = await target.page()

  await newPage.waitForSelector('div.search-song-list')
  const text = await newPage.$eval('div.search-song-list', ele => ele.innerText)
  console.log(text)
}

run()