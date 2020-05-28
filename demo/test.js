const puppeteer = require('puppeteer')

// puppeteer.launch({
//   headless: false,
//   defaultViewport: { width: 1366, height: 768 }
// }).then((browser) => {
//   browser.newPage().then(page => {
//     page.goto('https://www.baidu.com')
//   })
// })

async function run() {
  // 打开浏览器
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 }
  })
  // 新建一个页面
  const page = await browser.newPage()
  // 打开百度
  await page.goto('https://www.baidu.com')

  // 定位到输入框节点
  const input_area = await page.$('#kw')
  // 输入内容
  await input_area.type('hello world')
  // 定位到搜索按钮
  const search_btn = await page.$('#su')
  // 点击搜索
  await search_btn.click()

  // 等待节点出现
  await page.waitForSelector('div#content_left > div.result-op.c-container.xpath-log', { visible: true })
  // 获取节点内容
  let resultText = await page.$eval('div#content_left > div.result-op.c-container.xpath-log', ele => ele.innerText)
  console.log(resultText)
}

run()