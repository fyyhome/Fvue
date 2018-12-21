// Fvue入口文件

import Compile from './src/commons/compile'
import Observer from './src/commons/observer'

class Fvue{
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    Object.keys(this.$data).forEach((key) => {
      this.proxyData(key);
    })
    this.init();
  } 

  init() {
    Observer(this.$data);
    new Compile(this);
  }

  proxyData(key) {
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

window.Fvue = Fvue