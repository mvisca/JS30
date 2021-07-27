// Select the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skippers = document.querySelectorAll('[data-skip]');

// Build the functions
function togglePlay() {
  const act = video.paused ? 'play' : 'pause';
  video[act]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function doRangeUpdate() {
  console.log(this.value);
  console.log(this.name);
  video[this.name] = this.value;
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);

toggle.addEventListener('click', togglePlay);

skippers.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', doRangeUpdate));
