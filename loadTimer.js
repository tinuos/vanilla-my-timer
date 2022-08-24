import AppTime from "./AppTime.js";
import TimerTime from "./TimerTime.js";

function setTimeBoxButton(timeSetContainer) {
  const hTimeBox = timeSetContainer.children[0];
  const hTimeUpBtn = hTimeBox.querySelector('.fa-angle-up');
  const hTimeDownBtn = hTimeBox.querySelector('.fa-angle-down');
  const mTimeBox = timeSetContainer.children[1];
  const mTimeUpBtn = mTimeBox.querySelector('.fa-angle-up');
  const mTimeDownBtn = mTimeBox.querySelector('.fa-angle-down');
  const sTimeBox = timeSetContainer.children[2];
  const sTimeUpBtn = sTimeBox.querySelector('.fa-angle-up');
  const sTimeDownBtn = sTimeBox.querySelector('.fa-angle-down');

  hTimeUpBtn.addEventListener('click', upTime);
  mTimeUpBtn.addEventListener('click', upTime);
  sTimeUpBtn.addEventListener('click', upTime);

  hTimeDownBtn.addEventListener('click', downTime);
  mTimeDownBtn.addEventListener('click', downTime);
  sTimeDownBtn.addEventListener('click', downTime);
}

function upTime(event) {
  const targetParent = event.target.parentElement.parentElement;
  const TIME_ID = targetParent.id;
  const timeAttr = TIME_ID.substring(0, 1);
  const spanEl = targetParent.querySelector(`span.${TIME_ID}`);
  const spanValue = Number(spanEl.textContent);
  
  if (TIME_ID === 'hour') {
    if (TimerTime[timeAttr] < 99) {
      TimerTime[timeAttr] += 1;

      if (spanValue !== TimerTime[timeAttr]) {
        spanEl.textContent = TimerTime[timeAttr].toString().padStart(2, 0);
      }
    }
  } else {
    if (TimerTime[timeAttr] < 59) {
      TimerTime[timeAttr] += 1;

      if (spanValue !== TimerTime[timeAttr]) {
        spanEl.textContent = TimerTime[timeAttr].toString().padStart(2, 0);
      }
    }
  }
}

function downTime(event) {
  const targetParent = event.target.parentElement.parentElement;
  const TIME_ID = targetParent.id;
  const timeAttr = TIME_ID.substring(0, 1);
  const spanEl = targetParent.querySelector(`span.${TIME_ID}`);
  const spanValue = Number(spanEl.textContent);
  
  if (TimerTime[timeAttr] > 0) {
    TimerTime[timeAttr] -= 1;

    if (spanValue !== TimerTime[timeAttr]) {
      spanEl.textContent = TimerTime[timeAttr].toString().padStart(2, 0);
    }
  }
}

function setControlBoxButton(controlBox) {
  const rightBtnEl = controlBox.querySelector('button[name="start"]');

  rightBtnEl.addEventListener('click', controlRightBtn);
}

function startSecondsInterval(timeSetContainer) {
  const hTimeBox = timeSetContainer.children[0];
  const mTimeBox = timeSetContainer.children[1];
  const sTimeBox = timeSetContainer.children[2];
  const spanHourEl = hTimeBox.querySelector('.hour');
  const spanMinuteEl = mTimeBox.querySelector('.minute');
  const spanSecondEl = sTimeBox.querySelector('.second');

  TimerTime.timerInterval = setInterval(() => {
    let totalTime = TimerTime.s + (TimerTime.m * 60) + (TimerTime.h * 60 * 60);
    let h = 0, m = 0, s = 0;

    totalTime -= 1;

    if (totalTime === -1) {
      completedTimer(timeSetContainer);
      return;
    }

    h = parseInt(totalTime / 60 / 60);
    m = parseInt((totalTime % 3600) / 60);
    s = totalTime % 60;
    
    if (TimerTime.h !== h) {
      TimerTime.h = h;
      spanHourEl.textContent = TimerTime.h.toString().padStart(2, 0);
    }

    if (TimerTime.m !== m) {
      TimerTime.m = m;
      spanMinuteEl.textContent = TimerTime.m.toString().padStart(2, 0);
    }

    if (TimerTime.s !== s) {
      TimerTime.s = s;
      spanSecondEl.textContent = TimerTime.s.toString().padStart(2, 0);
    }

  }, 1000);
}

function startTimer(rightBtnEl, timeSetContainer) {
  const hTimeBox = timeSetContainer.children[0];
  const mTimeBox = timeSetContainer.children[1];
  const sTimeBox = timeSetContainer.children[2];
  const hTimeUpBtn = hTimeBox.querySelector('.fa-angle-up');
  const mTimeUpBtn = mTimeBox.querySelector('.fa-angle-up');
  const sTimeUpBtn = sTimeBox.querySelector('.fa-angle-up');
  const hTimeDownBtn = hTimeBox.querySelector('.fa-angle-down');
  const mTimeDownBtn = mTimeBox.querySelector('.fa-angle-down');
  const sTimeDownBtn = sTimeBox.querySelector('.fa-angle-down');
  
  const expectedTimeBox = timeSetContainer.nextElementSibling;
  const appTotalTime = AppTime.second + (AppTime.minute * 60) + (AppTime.hour * 60 * 60);
  const timerTotalTime = TimerTime.s + (TimerTime.m * 60) + (TimerTime.h * 60 * 60);
  const expectedHour = parseInt((appTotalTime + timerTotalTime) / 3600) % 24;
  const expectedMinute = parseInt(((appTotalTime + timerTotalTime) % 3600) / 60);
  const expectedSecond = (appTotalTime + timerTotalTime);

  const controlBox = rightBtnEl.parentElement;
  const leftBtnEl = document.createElement('button');

  if (TimerTime.h === 0 && TimerTime.m === 0 && TimerTime.s === 0) {
    return;
  }

  // 1. 버튼 추가 및 변경
  rightBtnEl.name = 'pause';
  rightBtnEl.classList.remove('btn-blue');
  rightBtnEl.classList.add('btn-red');
  rightBtnEl.textContent = '일시정지';
  leftBtnEl.name = 'cancel';
  leftBtnEl.classList.add('btn', 'btn-darkgrey');
  leftBtnEl.textContent = '취소';
  leftBtnEl.addEventListener('click', controlLeftBtn);
  controlBox.prepend(leftBtnEl);
  controlBox.style.justifyContent = 'space-between';
  
  // 2. up & down 버튼 동작 막기
  hTimeUpBtn.style.display = 'none';
  mTimeUpBtn.style.display  = 'none';
  sTimeUpBtn.style.display  = 'none';
  hTimeDownBtn.style.display  = 'none';
  mTimeDownBtn.style.display  = 'none';
  sTimeDownBtn.style.display  = 'none';

  // 3. 예상 시간 표시
  (expectedTimeBox.style.opacity !== null) ? expectedTimeBox.style.opacity = '1': null;
  expectedTimeBox.textContent = `
    ${expectedHour} : ${(expectedSecond > 0 ? (expectedMinute + 1) : expectedMinute).toString().padStart(2, 0)}`;  

  // 4. 인터벌 함수 실행
  startSecondsInterval(timeSetContainer);
}

function pauseTimer(rightBtnEl, timeSetContainer) {
  const expectedTimeBox = timeSetContainer.nextElementSibling;

  // 1. 인터벌 함수 중지
  clearInterval(TimerTime.timerInterval);

  // 2. 버튼 교체
  rightBtnEl.name = 'restart';
  rightBtnEl.classList.remove('btn-red');
  rightBtnEl.classList.add('btn-blue');
  rightBtnEl.textContent = '계속';

  // 3. 예상 시간 흐리게 표시
  expectedTimeBox.style.opacity = '0.4';
}

function restartTimer(rightBtnEl, timeSetContainer) {
  const expectedTimeBox = timeSetContainer.nextElementSibling;
  
  const appTotalTime = AppTime.second + (AppTime.minute * 60) + (AppTime.hour * 60 * 60);
  const timerTotalTime = TimerTime.s + (TimerTime.m * 60) + (TimerTime.h * 60 * 60);
  const expectedHour = parseInt((appTotalTime + timerTotalTime) / 3600) % 24;
  const expectedMinute = parseInt(((appTotalTime + timerTotalTime) % 3600) / 60);
  const expectedSecond = (appTotalTime + timerTotalTime);

  // 1. 인터벌 함수 다시 시작
  startSecondsInterval(timeSetContainer);

  // 2. 버튼 교체
  rightBtnEl.name = 'pause';
  rightBtnEl.classList.remove('btn-blue');
  rightBtnEl.classList.add('btn-red');
  rightBtnEl.textContent = '일시정지';

  // 3. 예상 시간 다시 진하게 표시
  // - 중지 기간 추가 계산은 변수 할당 시 처리.
  expectedTimeBox.textContent = `
  ${expectedHour} : ${(expectedSecond > 0 ? (expectedMinute + 1) : expectedMinute).toString().padStart(2, 0)}`;  
  expectedTimeBox.style.opacity = '1';
}

function controlRightBtn(event) {
  const BUTTON_TYPE = event.target.name;
  const timeSetContainer = event.target.parentElement.parentElement.firstElementChild;
  const rightBtnEl = event.target;

  switch (BUTTON_TYPE) {
    case 'start':
      startTimer(rightBtnEl, timeSetContainer);
      break;
    case 'pause':
      pauseTimer(rightBtnEl, timeSetContainer);
      break;
    case 'restart':
      restartTimer(rightBtnEl, timeSetContainer);
      break;
  }
}

function controlLeftBtn(event) {
  const BUTTON_TYPE = event.target.name;
  const timeSetContainer = event.target.parentElement.parentElement.firstElementChild;
  const controlBox = event.target.parentElement;
  
  switch (BUTTON_TYPE) {
    case 'cancel':
      resetTimer(timeSetContainer, controlBox);
      break;
  }
}

function resetTimer(timeSetContainer, controlBox) {
  const hTimeBox = timeSetContainer.children[0];
  const mTimeBox = timeSetContainer.children[1];
  const sTimeBox = timeSetContainer.children[2];
  const hTimeUpBtn = hTimeBox.querySelector('.fa-angle-up');
  const mTimeUpBtn = mTimeBox.querySelector('.fa-angle-up');
  const sTimeUpBtn = sTimeBox.querySelector('.fa-angle-up');
  const hTimeDownBtn = hTimeBox.querySelector('.fa-angle-down');
  const mTimeDownBtn = mTimeBox.querySelector('.fa-angle-down');
  const sTimeDownBtn = sTimeBox.querySelector('.fa-angle-down');
  const spanHourEl = hTimeBox.querySelector('.hour');
  const spanMinuteEl = mTimeBox.querySelector('.minute');
  const spanSecondEl = sTimeBox.querySelector('.second');
  const expectedTimeBox = timeSetContainer.nextElementSibling;
  const leftBtnEl = controlBox.firstElementChild;
  const rightBtnEl = controlBox.lastElementChild;
  
  // 1. 인터벌 함수 중지 및 데이터 객체 초기화 
  TimerTime.h = 0;
  TimerTime.m = 0;
  TimerTime.s = 0;
  clearInterval(TimerTime.timerInterval);

  // 2. up & down 버튼 초기화
  hTimeUpBtn.style.display = 'initial';
  mTimeUpBtn.style.display  = 'initial';
  sTimeUpBtn.style.display  = 'initial';
  hTimeDownBtn.style.display  = 'initial';
  mTimeDownBtn.style.display  = 'initial';
  sTimeDownBtn.style.display  = 'initial';

  // 3. 데이터 표시 초기화
  // - 시, 분, 초, 예상 시간
  spanHourEl.textContent = '00';
  spanMinuteEl.textContent = '00';
  spanSecondEl.textContent = '00';
  expectedTimeBox.textContent = null;

  // 4. 컨트롤 버튼 초기화
  if (leftBtnEl.name === 'cancel') {
    controlBox.removeChild(leftBtnEl);
    controlBox.style.justifyContent = 'center';
  }

  if (rightBtnEl.name === 'pause') {
    rightBtnEl.classList.remove('btn-red');
    rightBtnEl.classList.add('btn-blue');
  }

  rightBtnEl.name = 'start';
  rightBtnEl.textContent = '시작';
}

function completedTimer(timeSetContainer) {
  const timerContainer = timeSetContainer.parentElement;
  const controlBox = timerContainer.querySelector('.control-box');
  const completePopUp = document.querySelector('.complete-pop-up');
  const completeBtnEl = completePopUp.lastElementChild;

  clearInterval(TimerTime.timerInterval);
  completePopUp.style.display = 'flex';
  
  completeBtnEl.addEventListener('click', () => {
    resetTimer(timeSetContainer, controlBox);
    completePopUp.style.display = 'none';
  })
}

export default function loadTimer() {
  const timerContainer = document.querySelector('.timer');
  const timeSetContainer = timerContainer.querySelector('.time-set');
  const controlBox = timerContainer.querySelector('.control-box');

  setTimeBoxButton(timeSetContainer);
  setControlBoxButton(controlBox);
}