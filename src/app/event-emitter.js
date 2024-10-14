export class EventEmitter {
  #subscribers = [];

  subscribe(observer) {
    this.#subscribers.push(observer);
  }

  emit() {
    this.#subscribers.forEach(observer => observer(this._value));
  }
}
