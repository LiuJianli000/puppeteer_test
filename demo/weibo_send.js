const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
    ignoreDefaultArgs: ['--enable-automation'],
    slowMo: 200,  // 设置 200 毫秒的延迟
    args: ['--window-size = 1366, 768']  // 设置窗口大小
  })

  const page = await browser.newPage()

  await page.goto('http://wufazhuce.com', { waitUntil: 'networkidle2' })
  const oneText = await page.$eval('div.fp-one-cita > a', ele => ele.innerText)
  console.log(oneText)

  await page.goto('https://weibo.com/', { waitUntil: 'networkidle2' })
  await page.waitFor(2*1000)
  await page.reload()

  const loginUserInput = await page.waitForSelector('input#loginname')
  await loginUserInput.click()
  await loginUserInput.type('18613326395')

  const loginUserPwInput = await page.waitForSelector('input[type="password"]')
  await loginUserPwInput.click()
  await loginUserPwInput.type('JIANli548542654')

  const loginBtn = await page.waitForSelector('a[action-type="btn_submit"]')
  await loginBtn.click()

  const textArea = await page.waitForSelector('textarea.W_input')
  await textArea.click()
  await textArea.type(oneText)

  const sendBtn = await page.waitForSelector('a[node-type=submit]')
  await sendBtn.click()
}

run()