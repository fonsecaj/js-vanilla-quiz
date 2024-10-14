import { EventEmitter } from "./event-emitter";

export class Result {
  constructor(parentElement, store) {
    this.retry = new EventEmitter();
    this.parentElement = parentElement;
    this.store = store;
  }

  #handleRetryButton() {
    const btn = document.getElementById('retry-btn');

    btn.addEventListener('click', () => this.retry.emit());
  }

  render() {
    this.parentElement.innerHTML = `
      <div id="result" class="app-result">
        <p>Result: ${this.store.state.score}</p>

        <button id="retry-btn" aria-disabled="false" type="button">Retry</button>
      </div>
    `;

    this.#handleRetryButton();
  }
}