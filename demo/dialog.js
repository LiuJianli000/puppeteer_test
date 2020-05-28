// dialog.accept  点击确认
// dialog.defaultValue  获取输入对话框初始值
// dialog.dismiss  点击取消
// dialog.message  对话框的消息内容
// dialog.type()  可以是 alert、beforeunload、confirm、prompt

const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
    ignoreDefaultArgs: ['--enable-automation'],
    slowMo: 200,
    args: ['--window-size=1366,768']
  })

  const page = await browser.newPage()

  await page.goto('E:\\puppeteer_test\\demo\\dialog.html', { waitUntil: 'networkidle2' })

  page.on('dialog', async dialog => {
    // console.log(dialog.message())
    console.log(dialog.defaultValue())
    await dialog.accept('liu')
  })

  const btn1 = await page.waitForSelector('#btn1')
  await btn1.click()
  const btn2 = await page.waitForSelector('#btn2')
  await btn2.click()


}

run()
