import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDateRef: document.querySelector('#datetime-picker'),
  startCountDownBtnRef: document.querySelector('button[data-start]'),
  reloadBtnRef: document.querySelector('button[data-reload]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};
const {
  inputDateRef,
  startCountDownBtnRef,
  reloadBtnRef,
  daysRef,
  hoursRef,
  minutesRef,
  secondsRef,
  spanRefs,
} = refs;

let intervalId = null;

startCountDownBtnRef.setAttribute('disabled', 'true');
reloadBtnRef.addEventListener('click', () => {
  window.location.reload();
});
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please enter date in future');
      startCountDownBtnRef.setAttribute('disabled', 'true');
      return;
    }
    startCountDownBtnRef.removeAttribute('disabled');
    Notiflix.Notify.success("Done! Let's go?");

    startCountDownBtnRef.addEventListener('click', startCountDownOnBtnClick);
  },
};

function startCountDownOnBtnClick() {
  startCountDownBtnRef.setAttribute('disabled', 'true');
  const scheduledTime = new Date(inputDateRef.value);
  intervalId = setInterval(() => {
    const diff = scheduledTime.getTime() - Date.now();
    const countedTime = convertMs(diff);
    const { days, hours, minutes, seconds } = countedTime;

    daysRef.textContent = days;
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);
    if (
      daysRef.textContent === '0' &&
      hoursRef.textContent === '00' &&
      minutesRef.textContent === '00' &&
      secondsRef.textContent === '00'
    ) {
      clearInterval(intervalId);
      Notiflix.Notify.info('Your countdown timer has finished');
    }
  }, 1000);
}

flatpickr(inputDateRef, options);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
