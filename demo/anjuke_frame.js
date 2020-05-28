const puppeteer = require('puppeteer')

// frame 切换
async function ajk() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 }
  })
  const page = await browser.newPage()
  await page.goto('https://login.anjuke.com/login/form')

  // 切换 iframe
  await page.frames().map(frame => {
    console.log(frame.url())
  })

  const  targetFrameUrl = 'https://login.anjuke.com/login/iframeform'

  const frame = await page.frames().find(frame => frame.url().includes(targetFrameUrl))

  const phone = await frame.waitForSelector('#phoneIpt')
  await phone.type('18613326395')
}

ajk()