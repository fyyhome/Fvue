import Dep from './dep'

export default class Watcher {
  constructor (vm, prop, callback) {
    this.vm = vm;
    this.prop = prop;
    this.callback = callback;
    this.value = this.get();
  }

  update() {
    const value = this.vm.$data[this.prop];
    const oldValue = this.value;
    if (value !== oldValue) {
      this.value = value; // 更新watcher实例中value的值
      this.callback(value);
    }
  }

  get() {
    Dep.target = this; // 保存当前watcher实例
    const value = this.vm.$data[this.prop]; // 触发属性的getter，给属性添加订阅者
    Dep.target = null;
    return value;
  }
}