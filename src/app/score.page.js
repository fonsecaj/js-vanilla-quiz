import { EventEmitter } from "./event-emitter";

export class ScorePage {
  constructor(parentElement, store) {
    this.retry = new EventEmitter();
    this.parentElement = parentElement;
    this.store = store;
  }

  #handleRetryButton() {
    this.parentElement
      .querySelector('#retry-btn')
      .addEventListener('click', () => this.retry.emit());
  }

  render() {
    this.parentElement.innerHTML = `
      <div class="score-container">
        <div class="animated-badge">
          <p class="ty-body">
            Score
          </p>
        </div>

        <p class="ty-display">
          ${this.store.score}
        </p>

        <button
          id="retry-btn"
          class="dark-btn"
          type="button"
          aria-disabled="false"
        >
          Retry
        </button>
      </div>
    `;

    this.#handleRetryButton();
  }
}