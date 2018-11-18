let [accX, accY, delay] = [0, 0, 0];
let reset = null;
let changed = false;

window.onwheel = e => {
  if (accY < 1 && accY > -1) {
    e.preventDefault();
  }
  clearInterval(reset);
  const {deltaX, deltaY, timeStamp} = e;
  if (timeStamp - delay > 250) {
    [accX, accY, delay, changed] = [0, 0, timeStamp, false];
    return;
  }
  delay = timeStamp;
  accX += deltaX;
  accY += deltaY;
  if (accX < -1500) {
    if (!changed) {
      history.go(-1);
      changed = true;
    }
    resetUI();
  } else if (accX > 1500) {
    if (!changed) {
      history.go(1);
      changed = true;
    }
    resetUI();
  } else if (Math.abs(accY) < 2 && Math.abs(accX) > 25) {
    document.documentElement.style.transform = `translateX(${-accX/4}px)`;
    reset = setInterval(resetUI, 50);
  }
};

function resetUI() {
  document.documentElement.style.transform = `translateX(0px)`;
}
