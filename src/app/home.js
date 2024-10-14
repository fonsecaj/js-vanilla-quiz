import { EventEmitter } from "./event-emitter";

export class Home {  
  constructor(parentElement) {
    this.start = new EventEmitter();
    this.parentElement = parentElement;
  }

  #handleStartButton() {
    const btn = document.getElementById('start-btn');

    btn.addEventListener('click', () => this.start.emit());
  }

  render() {
    this.parentElement.innerHTML = `
      <div id="home" class="hero">
        <h1>It's time for a JavaScript quiz.</h1>
        <p>
          No framework or library, just a simple quiz application built with plain JavaScript <i>classes</i>. Have fun.
        </p>

        <button id="start-btn" aria-disabled="false" type="button">Start</button>
      </div>
    `;

    this.#handleStartButton();
  }
}