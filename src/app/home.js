import { EventEmitter } from "./event-emitter";

export class Home {  
  constructor(parentElement) {
    this.start = new EventEmitter();
    this.parentElement = parentElement;
  }

  #handleStart() {
    this.parentElement
      .querySelector('button')
      .addEventListener('click', () => this.start.emit());
  }

  render() {
    this.parentElement.innerHTML = `
      <div class="home-container">
        <h1 class="ty-headline">
          It's time for a JavaScript quiz.
        </h1>

        <p class="ty-headline-sub">
          No framework or library, just a simple quiz application built with plain JavaScript <i>classes</i>. Have fun.
        </p>

        <button
          aria-disabled="false"
          type="button"
          class="translucid-btn"
        >
          Start
        </button>
      </div>
    `;

    this.#handleStart();
  }
}