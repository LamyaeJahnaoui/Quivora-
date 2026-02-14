import { TimerService } from "../Service/TimerService.js";

export class TimerController {
  constructor(durationInSeconds, onFinish) {
    this.timerElement = document.getElementById("timer");
    this.timerService = new TimerService(durationInSeconds);

    this.start(onFinish);
  }

  async start(onFinish) {
    await this.timerService.start(
      (timeLeft) => {
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;

        this.timerElement.textContent =
          `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

        if (timeLeft <= 20) {
          this.timerElement.classList.add("timer-danger");
        }
      },
      async () => {
        if (onFinish) await onFinish();
      }
    );
  }
}
