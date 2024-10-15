'use strict;'

import { Game } from "./game";
import { Home } from "./home"
import { Result } from "./result"
import { Store } from "./store";

export class App {
  #element = document.getElementById('app');
  #store = new Store();
  #game = new Game(this.#element, this.#store);
  #home = new Home(this.#element, this.#store);
  #result = new Result(this.#element, this.#store);

  constructor() {
    this.#home.start.subscribe(() => this.#game.render(true));
    this.#game.finish.subscribe(() => this.#result.render());
    this.#result.retry.subscribe(() => this.#game.render(true));
  }

  render() {
    this.#home.render();
  }
}
