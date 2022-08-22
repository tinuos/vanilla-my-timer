import StopWatchTime from "./StopWatchTime.js";

// Left Botton Control
function controlLeftBtn(event) {
  const leftBtnEl = event.target;
  const rightBtnEl = leftBtnEl.nextElementSibling;
  const lapsTableEl = document.querySelector('.time-laps-table table');
  const tableHeadEl = lapsTableEl.children[0];
  const tableBodyEl = lapsTableEl.children[1];
  
  switch(leftBtnEl.name) {
    case 'record':
      tableHeadEl.innerHTML = `
        <tr>
          <th>구간</th>
          <th>구간기록</th>
          <th>전체시간</th>
        </tr>
      `
      recordTime(tableBodyEl);
      break;
    case 'reset':
      leftBtnEl.name = 'record';
      leftBtnEl.textContent = '구간기록';
      leftBtnEl.disabled = true;

      rightBtnEl.name = 'start';
      rightBtnEl.classList.remove('btn-red');
      rightBtnEl.classList.add('btn-blue');
      rightBtnEl.textContent = '시작';

      resetStopWatch(tableHeadEl, tableBodyEl);
      break;
  }
}

function recordTime(tableBodyEl) {
  const trEl = document.createElement('tr');
  const lapTime = `${StopWatchTime.mForLaps.toString().padStart(2, 0)}:${StopWatchTime.sForLaps.toString().padStart(2, 0)}`;
  const totalTime = `${StopWatchTime.m.toString().padStart(2, 0)}:${StopWatchTime.s.toString().padStart(2, 0)}`;
  const template = `
    <td>${++StopWatchTime.lapCount}</td>
    <td>${lapTime}</td>
    <td>${totalTime}</td>
  `;
  
  trEl.innerHTML = template;
  tableBodyEl.prepend(trEl);

  StopWatchTime.mForLaps = 0;
  StopWatchTime.sForLaps = 0;
}

function resetStopWatch(tableHeadEl, tableBodyEl) {
  const m_s_displayEl = document.querySelector('.stopwatch .m-s-display');
  const mEl = m_s_displayEl.children[0];
  const sEl = m_s_displayEl.children[1];

  StopWatchTime.m = 0;
  StopWatchTime.s = 0;
  StopWatchTime.mForLaps = 0;
  StopWatchTime.sForLaps = 0;
  StopWatchTime.lapCount = 0;
  clearInterval(StopWatchTime.increaseTime);
  
  mEl.textContent = '00';
  sEl.textContent = '00';
  tableHeadEl.innerHTML = null;
  tableBodyEl.innerHTML = null;
}

// Right Button Control
function controlRightBtn(event) {
  const rightBtnEl = event.target;
  const leftBtnEl = rightBtnEl.previousElementSibling;

  switch(rightBtnEl.name) {
    case 'start':
      rightBtnEl.name = 'pause';
      rightBtnEl.classList.remove('btn-blue');
      rightBtnEl.classList.add('btn-red');
      rightBtnEl.textContent = '중지';

      leftBtnEl.disabled = false;

      startStopWatch();
      break;
    case 'pause':
      rightBtnEl.name = 'restart';
      rightBtnEl.classList.remove('btn-red');
      rightBtnEl.classList.add('btn-blue');
      rightBtnEl.textContent = '계속';
    
      leftBtnEl.name = 'reset';
      leftBtnEl.textContent = '초기화';

      pauseStopWatch();
      break;
    case 'restart':
      rightBtnEl.name = 'pause';
      rightBtnEl.classList.remove('btn-blue');
      rightBtnEl.classList.add('btn-red');
      rightBtnEl.textContent = '중지';

      leftBtnEl.name = 'record';
      leftBtnEl.textContent = '구간기록';

      startStopWatch();
      break;
  }
}

function startStopWatch() {
  const m_s_displayEl = document.querySelector('.stopwatch .m-s-display');
  const mEl = m_s_displayEl.children[0];
  const sEl = m_s_displayEl.children[1];

  StopWatchTime.increaseTime = setInterval(() => {
    if (StopWatchTime.m === 99 && StopWatchTime.s === 59) {
      alert('스톱워치 기능 허용 시간이 초과되어 초기화됩니다.');
      resetStopWatch();
    }

    StopWatchTime.s += 1;
    StopWatchTime.sForLaps += 1;
    
    if (StopWatchTime.s === 60) {
      StopWatchTime.s = 0;
      StopWatchTime.m += 1;
      StopWatchTime.mForLaps += 1;
    }
   
    if (StopWatchTime.m !== Number(mEl.textContent)) {
      mEl.textContent = StopWatchTime.m.toString().padStart(2, 0);
    }

    sEl.textContent = StopWatchTime.s.toString().padStart(2, 0);
    
  }, 1000);
}

function pauseStopWatch() {
  clearInterval(StopWatchTime.increaseTime);
}

export default function loadStopWatch() {
  const leftBtn = document.getElementById('stopwatch-left-btn');
  const rightBtn = document.getElementById('stopwatch-right-btn');

  leftBtn.disabled = true;

  leftBtn.addEventListener('click', controlLeftBtn);
  rightBtn.addEventListener('click', controlRightBtn);
}