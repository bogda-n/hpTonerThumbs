const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs-extra')


const focus = require('./modules/focus')
const render = require('./modules/render')


async function start() {
  try {
    await cleanOutputDir()
    const products = focus.getProducts('#export_TabNeils_2.xlsx')
    await rendering(products)
  } catch (e) {
    console.error(e)
  }
}

async function rendering(products) {
  const browser = await puppeteer.launch()
  for (const product of products) {
    await render(browser, product)
  }
  await browser.close()
}

async function cleanOutputDir() {
  const outputDir = path.resolve(__dirname, '_outputs')
  await fs.emptyDir(outputDir)
}

start()
