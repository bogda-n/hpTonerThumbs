const path = require('path')
const excelToJson = require('simple-excel-to-json')


function getProducts(filename, listNumber= 0) {
  if (!filename) {
    throw new Error('Filename is required')
  }
  const lists = excelToJson.parseXls2Json(path.resolve(__dirname, '../_input', filename))
  return lists[listNumber]
}




module.exports.getProducts = getProducts