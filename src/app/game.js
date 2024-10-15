import { EventEmitter } from './event-emitter';

export class Game {
  #timerId;

  constructor(parentElement, store) {
    this.parentElement = parentElement;
    this.finish = new EventEmitter();
    this.store = store;
  }

  #handleAnswersSelection() {
    const answers = document.getElementsByName(`question-${this.store.currentQuestionIndex}`);

    answers.forEach(answer => {
      answer.addEventListener('input', () => {
        const selectedAnswerValue = parseInt(answer.value);

        this.store.patchState({
          selectedAnswerValue,
          score: selectedAnswerValue === this.store.currentQuestionAnswerValue ? this.store.score + 1 : this.store.score,
        });

        this.#stopTimer();
        this.render();
      })
    });
  }

  #handleNextQuestionNavigation() {
    const nextButton = document.getElementById('next-btn');

    if (!nextButton) return;

    nextButton.addEventListener('click', () => {
      const nextId = this.store.currentQuestionIndex + 1;
      if (this.store.questions.length > nextId) {
        this.store.patchState({
          currentQuestionIndex: nextId,
          selectedAnswerValue: null,
          isTimeElapsed: false,
        });
        this.render(true);
      } else {
        this.store.patchState({
          currentQuestionIndex: 0,
          selectedAnswerValue: null,
          isTimeElapsed: false,
        });
        this.finish.emit();
      }
    });
  }

  #startTimer() {
    this.#timerId = setTimeout(() => {
      this.store.patchState({ isTimeElapsed: true });
      this.#stopTimer()
      this.render();
    }, 15_000);
  }

  #stopTimer() {
    clearTimeout(this.#timerId);
  }

  #getCurrentQuestionTemplate() {
    return `
      <fieldset>
        <legend class="ty-title">
          <span>${this.store.currentQuestionTitle}</span>
        </legend>

        ${this.#getAnswersTemplate()}
      </fieldset>
    `;
  }

  #getAnswersTemplate() {
    return this.store.currentQuestionAnswers.reduce(
      (html, answer) => `
        ${html}
        <label class="option ${!this.store.canSelectAnswer && answer.value === this.store.currentQuestionAnswerValue ? 'option--valid' : ''}">
          <input
            name="question-${this.store.currentQuestionIndex}"
            type="radio"
            value="${answer.value}"
            tabindex="-1"
            ${this.store.selectedAnswerValue === answer.value ? 'checked' : ''}
            ${!this.store.canSelectAnswer ? 'disabled' : ''}
          ></input>

          <span class="ty-label">
            ${answer.label}
          </span>
        </label>
      `,
      ''
    );
  }

  #getAnswerExplanationTemplate() {
    return `
      <div class="animated-bottom-sheet">
        <p class="ty-body">${this.store.currentQuestionExplanation}</p>
        <button id="next-btn" type="button" class="light-btn">Next →</button>
      </div>
    `;
  }

  #getTimerTemplate() {
    return `
      <div class="animated-timer">
        ${this.store.canSelectAnswer ? '<div></div>' : ''}
      </div>
    `;
  }

  #renderGame() {
    this.parentElement.innerHTML = `
      <div class="quiz-container">
        <form novalidate>
          ${this.#getCurrentQuestionTemplate()}
        </form>

        <div class="quiz-info">
          ${!this.store.canSelectAnswer ? this.#getAnswerExplanationTemplate() : this.#getTimerTemplate()}
        </div>
      </div>
    `;

    this.#handleAnswersSelection();
    this.#handleNextQuestionNavigation();

    if (this.store.canSelectAnswer) {
      this.#startTimer();
    }
  }

  render(shouldAnimate) {
    if (shouldAnimate) {
      const transitionAttribute = 'data-transition';
      this.parentElement.setAttribute(transitionAttribute, 'true');

      setTimeout(() => {
        this.#renderGame();
        this.parentElement.setAttribute(transitionAttribute, 'false');
      }, 200);

      return;
    }

    this.#renderGame();
  }
}
