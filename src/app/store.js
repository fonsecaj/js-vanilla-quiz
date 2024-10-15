import DATA from './data.json';

export class Store {
  #state = {
    questions: DATA,
    currentQuestionIndex: 0,
    selectedAnswerValue: null,
    isTimeElapsed: false,
    score: 0,
  };

  get questions() {
    return this.#state.questions;
  }

  get currentQuestionIndex() {
    return this.#state.currentQuestionIndex;
  }

  get currentQuestion() {
    return this.#state.questions[this.#state.currentQuestionIndex];
  }

  get currentQuestionTitle() {
    return this.currentQuestion.title;
  }

  get currentQuestionAnswers() {
    return this.currentQuestion.answers
  }

  get currentQuestionAnswerValue() {
    return this.currentQuestion.answerValue;
  }

  get currentQuestionExplanation() {
    return this.currentQuestion.explanation;
  }

  get selectedAnswerValue() {
    return this.#state.selectedAnswerValue;
  }

  get isTimeElapsed() {
    return this.#state.isTimeElapsed;
  }

  get score() {
    return this.#state.score;
  }

  get canSelectAnswer() {
    return this.selectedAnswerValue === null && !this.isTimeElapsed;
  }

  isSelectedAnswerCorrect() {
    return this.selectedAnswerValue === this.currentQuestionAnswerValue;
  }

  patchState(partialState) {
    this.#state = { ...this.#state, ...partialState };
  }
}
