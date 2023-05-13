import { cloneDeep } from "lodash";

// 防抖函数
const debounce = (func: Function, time: number, immediate = false) => {
  let timer: number | null = null
  return (...args: any) => {
    if (timer) clearInterval(timer)
    if (immediate) {
      if (!timer) func.apply(this, args)
      timer = window.setTimeout(() => {
        timer = null
      }, time)
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args)
      }, time)
    }
  }
}

// 深拷贝
const deepCopy = (data: any) => {
  return cloneDeep(data)
}

// 图像转base64
const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export {
  debounce,
  deepCopy,
  getBase64
}