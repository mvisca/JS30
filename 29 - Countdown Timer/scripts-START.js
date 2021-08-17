let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round(then - Date.now()) / 1000;
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const min = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const display = `${min}:${secs < 10 ? '0' : ''}${secs}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjMin = minutes < 10 ? `0${minutes}` : minutes;
  const adjHour = hour > 12 ? `${hour - 12}:${adjMin} PM` : `${hour}:${adjMin} AM`;
  endTime.textContent = `Be back at ${adjHour}`;
}

function startTimer(e) {
  timer(this.dataset.time);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
