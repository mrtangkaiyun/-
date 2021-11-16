/* eslint-disable */
/**
 * 通用校验
 */

/**
 * 校验手机或座机
 */
export function validateTel (rule, value, callback) {
  const { required } = rule
  const reg = new RegExp(/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-|\s]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/i)
  if (!reg.test(value) && required) return callback(new Error('请输入正确的格式'))
  callback()
}

/**
 * 校验邮箱
 */
export function validateEmail (rule, value, callback) {
  const { required } = rule
  if (!value && required) {
    return callback(new Error('请输入邮箱地址'))
  }
  const reg = new RegExp(/^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i)
  if (!reg.test(value) && required) {
    return callback(new Error('请输入正确的邮箱地址'))
  }
  callback()
}
