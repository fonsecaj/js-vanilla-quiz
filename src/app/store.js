import questions from './data.json';

export class Store {
  #state;

  get state() {
    return { ...this.#state };
  }

  constructor() {
    this.#state = {
      questions,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isTimeElapsed: false,
      score: 0,
    }
  }

  patchState(partialState) {
    this.#state = { ...this.#state, ...partialState };
  }
}
