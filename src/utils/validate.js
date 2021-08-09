const regex = {
  mobile: /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/,
  chineseName: /^[\u4e00-\u9fa5·]+$/,
  number: /^[0-9]*$/,
  upperCase: /^[A-Z]+$/,
  lowerCase: /^[a-z]+$/,
  alphabets: /^[A-Za-z]+$/,
  idNumber: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  chineseWord: /^[\u4e00-\u9fa5]+$/,
  birthday: /\d{4}(-)\d{2}\1\d{2}/,
  verificationCode: /^\d{6}$/
}

export default regex

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
