import Watcher from './watcher'

export default class Compile{
  constructor(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.fragment = null;
    this.init();
  }

  init() {
    this.fragment = this.nodeFragment(this.el);
    this.compileNode(this.fragment);
    this.el.appendChild(this.fragment);
  }

  nodeFragment(el) {
    const fragment = document.createDocumentFragment();
    let child = el.firstChild;
    while(child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  }

  compileNode(fragment) {
    let childNodes = fragment.childNodes;
    [...childNodes].forEach((node) => {
      if (this.isElementNode(node)) {
        this.compile(node);
      }
      let reg = /\{\{(.*)\}\}/;
      let text = node.textContent;
      if (reg.test(text)) {
        let prop = reg.exec(text)[1]; // 括号中的分组匹配
        this.compileText(node, prop); // 替换模板
      }
      // 递归编译子节点
      if (node.childNodes && node.childNodes.length) {
        // this.compileNode(this.nodeFragment(node));
        this.compileNode(node);
      }
    });
  }

  compile(ele) {
    let eleAttrs = ele.attributes; // 获取元素节点的属性对象集合（name：value
    [...eleAttrs].forEach((attr) => {
      if (this.isDrective(attr.name)) {
        let value = attr.value;
        // 编译model指令
        if (attr.name === 'fv-model') {
          this.compileModel(ele, value);
        }
      }
    });
  }

  compileText(node, prop) {
    let val = this.vm.$data[prop];
    this.updateView(node, val);
    new Watcher(this.vm, prop, (value) => {
      this.updateView(node, value);
    });
  }

  compileModel(node, prop) {
    // 初始化节点的值
    let val = this.vm.$data[prop];
    this.updateModel(node, val);

    // 添加订阅者，实现视图更新
    new Watcher(this.vm, prop, (value) => {
      this.updateModel(node, value);
    });

    // 添加input事件监听，让数据回流
    node.addEventListener('input', (e) => {
      let newVal = e.target.value;
      if (newVal !== this.vm.$data[prop]) {
        this.vm.$data[prop] = newVal;
      }
    });
  }

  updateModel(node, val) {
    // htmlDataElement
    node.value = typeof val === 'undefined'? '' : val;
  }

  updateView(node, val) {
    // 文本节点
    node.textContent = typeof val === 'undefined'? '' : val;
  }

  isDrective(attr) {
    return attr.indexOf('fv-') !== -1;
  }

  isElementNode(node) {
    return node.nodeType === 1; // 判断是否是元素节点
  }

  isTextNode(node) {
    return node.nodeType === 3; // 判断是否是文本节点
  }
}