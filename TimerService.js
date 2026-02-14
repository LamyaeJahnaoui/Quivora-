// TimerService.js
export class TimerService {
    constructor(timeInSeconds = 300) {
        this.timeLeft = timeInSeconds;
        this.interval = null;
    }

    async start(onTick, onFinish) {
        this.interval = setInterval(async () => {
            this.timeLeft--;
            if (onTick) await onTick(this.timeLeft);

            if (this.timeLeft <= 0) {
                clearInterval(this.interval);
                if (onFinish) await onFinish();
            }
        }, 1000);
    }

    async stop() {
        clearInterval(this.interval);
    }

    async getTimeLeft() {
        return this.timeLeft;
    }

    async reset(timeInSeconds) {
        this.timeLeft = timeInSeconds;
        clearInterval(this.interval);
    }
}
