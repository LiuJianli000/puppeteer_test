const puppeteer = require('puppeteer')

async function aly() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
    // 当我们运行发现chrome 左上角有个 Chrome 正受自动软件控制，但是有时候有的网站会检测到自动化脚本，会禁止掉，这时候我们如何避免puppeteer 被前端JS检测到
    ignoreDefaultArgs:['--enable-automation']
  })
  const page = await browser.newPage()

  await page.goto('https://account.aliyun.com/register/register.html?', {waitUntil:'networkidle2'})  // 页面完全加载完成

  const frame = await page.frames().find(frame => frame.url().includes('https://passport.aliyun.com'))
  const span = await frame.waitForSelector('#nc_1_n1z')
  const spanInfo = await span.boundingBox()
  console.log(spanInfo)

  const div = await frame.waitForSelector('div#nc_1__scale_text > span')
  const divInfo = await div.boundingBox()

  await page.mouse.move(spanInfo.x, spanInfo.y)
  await page.mouse.down()

  for (let i = 0; i < divInfo.width; i++) {
    await page.mouse.move(spanInfo.x + i, spanInfo.y)
  }

  await page.mouse.up()
  
}

aly()