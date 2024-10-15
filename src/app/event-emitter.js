export class EventEmitter {
  #subscribers = [];

  subscribe(observer) {
    this.#subscribers.push(observer);
  }

  emit(value) {
    this.#subscribers.forEach(observer => observer(value));
  }
}
