import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', submitHandler);
function submitHandler(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let numberedDelay = Number(delay.value);
  let numberedStep = Number(step.value);
  const numberedAmount = Number(amount.value);
  for (let i = 1; i <= numberedAmount; i += 1) {
    createPromise(i, numberedDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    numberedDelay += numberedStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
