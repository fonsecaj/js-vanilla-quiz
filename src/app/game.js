import DATA from './data.json';
import { EventEmitter } from './event-emitter';

export class Game {
  constructor(parentElement, store) {
    this.parentElement = parentElement;
    this.finish = new EventEmitter();
    this.store = store;
  }

  #getCurrentQuestionTitle() {
    return this.store.state.questions[this.store.state.currentQuestionIndex].question;
  }

  #getCurrentQuestionAnswers() {
    return this.store.state.questions[this.store.state.currentQuestionIndex].answers;
  }

  #handleAnswersSelection() {
    const form = document.getElementById('answer-form');
    const answers = document.getElementsByName('question-1');

    answers.forEach(answer => {
      answer.addEventListener('input', () => {
        // const data = new FormData(form);
        // let output = "";
        // for (const [prop, value] of data) {
        //   output = `${output}${entry[0]}=${entry[1]}\r`;
        // }
        console.log(answer.value);
        if (answer.value === this.store.state.currentQuestionIndex) {}
        const nextId = this.store.state.currentQuestionIndex + 1;
        if (this.store.state.questions.length > nextId) {
          this.store.patchState({
            currentQuestionIndex: nextId,
          })
          this.render();
        } else {
          console.log('finish');
          this.finish.emit();
          this.store.patchState({
            currentQuestionIndex: 0,
            selectedAnswer: null,
            isTimeElapsed: false,
          })
        }
      })
    });
  }

  render() {
    this.parentElement.innerHTML = `
      <div id="game" class="app-game">
        <form id="answer-form" class="app-answer-form">
          <fieldset>
            <legend>${this.#getCurrentQuestionTitle()}</legend>
          ${
            this.#getCurrentQuestionAnswers().reduce(
              (acc, answer) => acc += `
                <label class="app-answer-item">
                  <input
                    name="question-1"
                    type="radio"
                    value="${answer.id}"
                    tabindex="-1"
                  ></input>
                  ${answer.content}
                </label>
              `,
              ''
            )
          }
          </fieldset>
        </form>
      </div>
    `;

    this.#handleAnswersSelection();
  }
}