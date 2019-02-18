import Dep from './dep'

export function proxyObserver(target) {
  if (target === null || typeof target !== 'object') {
    return;
  }
  let dep = new Dep();
  let handler = {
    get(target, prop) {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return Reflect.get(target, prop);
    },
  
    set(target, prop, value) {
      if (target[prop] !== value) {
        Reflect.set(target, prop, value);
        dep.notify();
        return true;
      } else {
        return true;
      }
    }
  }
  Object.keys(target).forEach((key) => {
    if (target[key] !== null && typeof target[key] === 'object') {
      target[key] = proxyObserver(target[key]);
    }
  })
  return new Proxy(target, handler);
}
