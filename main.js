// Fvue入口文件

import Compile from './src/commons/compile'
import Observer from './src/commons/observer'

class Fvue{
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$method = options.method;
    this.$el = document.querySelector(options.el);
    Object.keys(this.$data).forEach((key) => {
      this.proxyData(this.$data, key);
    });
    Object.keys(this.$method).forEach((key) => {
      this.proxyData(this.$method, key);
    })
    this.init();
  } 

  init() {
    Observer(this.$data);
    new Compile(this);
  }

  proxyData(obj, key) {
    if (typeof obj[key] === 'function') {
      Object.defineProperty(this, key, {
        value: this.$method[key],
        writable: true,
        enumerable: true,
        configurable: true
      })
    } else {
      Object.defineProperty(this, key, {
        get: function() {
          return this.$data[key];
        },
        set: function(value) {
          this.$data[key] = value;
        }
      })
    }
  }
}

window.Fvue = Fvue