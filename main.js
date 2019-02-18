// Fvue入口文件

import Compile from './src/commons/compile'
import { proxyObserver } from './src/commons/observer'

class Fvue{
  constructor(options) {
    this.$options = options;
    this.$target = options.data;
    this.$data = null;
    this.$method = options.method;
    this.$el = document.querySelector(options.el);
    this.init();
  } 

  init() {
    this.$data = proxyObserver(this.$target);
    new Compile(this);
  }
}

window.Fvue = Fvue