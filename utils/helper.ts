export function toStringParams (object: any) {
  return Object.keys(object).map(key => key + '=' + object[key]).join('&')
}