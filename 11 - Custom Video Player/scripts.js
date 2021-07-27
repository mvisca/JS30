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
  video[this.name] = this.value;
}

function doProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function doDragProgress(e) {
    const percent = (e.offsetX / progress.offsetWidth);
    video.currentTime = video.duration * percent;
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', doProgress);

toggle.addEventListener('click', togglePlay);

skippers.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', doRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', doRangeUpdate));

let mousedown = false;
progress.addEventListener('click', doDragProgress);
progress.addEventListener('mousemove', (e) => mousedown && doDragProgress(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
