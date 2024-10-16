'use strict;'

import { QuizPage } from "./quiz.page";
import { HomePage } from "./home.page"
import { ScorePage } from "./score.page"
import { Store } from "./store";

export class App {
  #element = document.getElementById('app');
  #store = new Store();
  #quizPage = new QuizPage(this.#element, this.#store);
  #homePage = new HomePage(this.#element, this.#store);
  #scorePage = new ScorePage(this.#element, this.#store);

  constructor() {
    this.#homePage.start.subscribe(() => this.#quizPage.render(true));
    this.#quizPage.finish.subscribe(() => this.#scorePage.render());
    this.#scorePage.retry.subscribe(() => this.#quizPage.render(true));
  }

  render() {
    this.#homePage.render();
  }
}
