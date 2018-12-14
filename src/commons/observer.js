import { Dep } from './dep'

export default function observer(data) {
  if (data === null || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, value) {
  observer(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get: function() {
      if(Dep.target) {
        dep.addSub(Dep.target);
      }
      // 在无继承关系时，this指向定义当期属性的对象,谨慎使用
      return this.value;
    },
    set: function(newVal) {
      if(this.value !== newVal) {
        this.value = newVal;
        dep.notify(); // notify all the watcher of this prop
      }
    }
  })
}