/**
 * 在此处配置字体
 */
const BLOG = require('../blog.config')

// const { fontFamily } = require('tailwindcss/defaultTheme')

function CJK() {
  return 'SC' // 强制返回简体中文配置
}

const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`]
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`]

const fontFamilies = {
  sans: [...fontSansCJK, '"Noto Sans SC"'],
  serif: [...fontSerifCJK]
};
module.exports = { fontFamilies }
