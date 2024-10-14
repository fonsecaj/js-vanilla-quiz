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
    this.#home.start.subscribe(() => this.#renderGame());
    this.#game.finish.subscribe(() => this.#renderResult());
    this.#result.retry.subscribe(() => {
      this.#renderGame()
    });
  }

  #renderHome() {
    this.#home.render();
  }

  #renderGame() {
    this.#element.classList.add('app-blur');
    setTimeout(() => {
      this.#game.render();
      this.#element.classList.remove('app-blur');
    }, 150);
  }

  #renderResult() {
    this.#result.render();
  }

  render() {
    this.#renderHome();
  }
}
