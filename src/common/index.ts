export function querystringify(params: object, prefix?: string) {
  prefix = prefix || ''
  let pairs: any = []
  if ('string' !== typeof prefix) prefix = '?'
  for (let key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    }
  }
  return pairs.length ? prefix + pairs.join('&') : ''
}

export function setCookie(name: string, value: string, days: number) {
  if (days === 0) {
    document.cookie = name + "=" + escape(value) + ";domain=baoshun.top;expires=0;path=/";
  } else {
    let exp: Date = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + "=" + escape(value) + ";domain=baoshun.top;expires="+ exp.toString() +";path=/";
  }
}