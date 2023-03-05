const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};
const { startBtnEl, stopBtnEl, bodyEl } = refs;
let intervalId = 0;

startBtnEl.addEventListener('click', styleBgColorOnClick);
stopBtnEl.addEventListener('click', stopStylingOnClick);

function styleBgColorOnClick() {
  startBtnEl.setAttribute('disabled', 'true');
  stopBtnEl.removeAttribute('disabled');
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopStylingOnClick() {
  startBtnEl.removeAttribute('disabled');
  stopBtnEl.setAttribute('disabled', 'true');
  clearInterval(intervalId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
