export default class Dep {

  constructor() {
    this.sub = [];
  }

  addSub(sub) {
    this.sub.push(sub);
  }

  notify() {
    this.sub.forEach((sub) => {
      sub.update();
    });
  }
}

Dep.prototype.target = null