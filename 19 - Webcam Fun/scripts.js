const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {

      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error('Access camera', err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);

  let pixels = ctx.getImageData(0, 0, width, height);

  pixels = redEffect(pixels);

  ctx.putImageData(pixels, 0, 0);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');

  link.href = data;
  link.setAttribute('download', 'handsome');
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt:="Selfmade photobooth"/>`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.lenght; i += 4) {
    pixels.data[i] = pixels.data[i] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 80;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.3;
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
