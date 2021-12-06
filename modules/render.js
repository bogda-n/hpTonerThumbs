const path = require('path')
const qs = require('qs')
const fs = require('fs-extra')

const { translations } = require('../config')

async function render(browser, product) {
  const query = qs.stringify({...product, translations})
  const url = 'file://' + path.resolve(__dirname, `../templates/TemplateHP_2.1/index.html?${query}`)
  const page = await browser.newPage()
  await page.setViewport({
    width: 860,
    height: 860
  })
  await page.goto(url, { waitUntil: 'load', timeout: 0 })
  const outputDir = path.resolve(__dirname, '../_outputs', product.locale)
  await fs.ensureDir(outputDir)

  await page.screenshot({
    path: path.resolve(outputDir, `${product.sku}.jpg`),
    type: 'jpeg',
    quality: 100
  })
  await page.close()
}

module.exports = render