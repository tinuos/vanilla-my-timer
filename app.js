const appTime = {
  year: null,
  month: null,
  day: null,
  date: null,
  hour: null,
  minute: null,
  second: null,
  fullTimeDisplayString: null,
}

function getCurrentTime() {
  const time = {};
  const currentTime = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const minuteString = currentTime.getMinutes().toString();
  
  time.year = currentTime.getFullYear();
  time.month = currentTime.getMonth() === 11 ? 12 : currentTime.getMonth() + 1;
  time.date = currentTime.getDate();
  time.day = week[currentTime.getDay()];
  time.hour = currentTime.getHours();
  time.minute = Number(minuteString.padStart(2, 0));
  time.second = currentTime.getSeconds();

  return time;
}

function setDefaultAppTime(getCurrentTime) {
  const time = getCurrentTime();
  
  appTime.year = time.year;
  appTime.month = time.month;
  appTime.date = time.date;
  appTime.day = time.day;
  appTime.hour = time.hour;
  appTime.minute = time.minute;
  appTime.second = time.second;

  // appTime 초기 렌더링
  const y_m_d_d_time_box = document.querySelectorAll('.y-m-d-d-time-box span');
  const h_m_s_time_box = document.querySelectorAll('.h-m-s-time-box span');

  y_m_d_d_time_box.forEach(element => {
    element.textContent = appTime[element.className];
  });
  h_m_s_time_box.forEach(element => {
    element.textContent = appTime[element.className];
  }); 
}

function displayApptime() {
  setInterval(() => {
    const currtenTime = getCurrentTime();
    
    // 값 비교 후 렌더링
    for(let currentTimeUnit in currtenTime) {
      if (appTime[currentTimeUnit] !== currtenTime[currentTimeUnit]) {
        appTime[currentTimeUnit] = currtenTime[currentTimeUnit];

        const targetTimeUnitEl = document.querySelector(`.time-display .${currentTimeUnit}`);

        targetTimeUnitEl.textContent = appTime[currentTimeUnit];
      }
    }
  }, 1000);
}

function init() { 
  // 1. appTime 초기 설정 및 렌더링
  setDefaultAppTime(getCurrentTime);

  // 2. 실시간 시간 표시
  displayApptime();
}

init();