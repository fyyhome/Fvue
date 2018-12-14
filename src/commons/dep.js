export default class Dep {
  static target = null;

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