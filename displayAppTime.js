function getCurrentTime() {
  const time = {};
  const currentTime = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  
  time.year = currentTime.getFullYear();
  time.month = currentTime.getMonth() === 11 ? 12 : currentTime.getMonth() + 1;
  time.date = currentTime.getDate();
  time.day = week[currentTime.getDay()];
  time.hour = currentTime.getHours();
  time.minute = currentTime.getMinutes();
  time.second = currentTime.getSeconds();

  return time;
}

function setDefaultAppTime(getCurrentTime, AppTime) {
  const time = getCurrentTime();
  
  AppTime.year = time.year;
  AppTime.month = time.month;
  AppTime.date = time.date;
  AppTime.day = time.day;
  AppTime.hour = time.hour;
  AppTime.minute = time.minute;
  AppTime.second = time.second;

  // AppTime 초기 렌더링
  const y_m_d_d_time_box = document.querySelectorAll('.y-m-d-d-time-box span');
  const h_m_s_time_box = document.querySelectorAll('.h-m-s-time-box span');

  y_m_d_d_time_box.forEach(element => {
    if (element.className === 'month' || element.className === 'day') {
      element.textContent = AppTime[element.className].toString();
    } else {
      element.textContent = AppTime[element.className].toString().padStart(2, 0);
    }
  });
  h_m_s_time_box.forEach(element => {
    element.textContent = AppTime[element.className].toString().padStart(2, 0);
  }); 
}

export default function displayAppTime(AppTime) {
  setDefaultAppTime(getCurrentTime, AppTime);

  setInterval(() => {
    const currtenTime = getCurrentTime();
    
    // 값 비교 후 렌더링
    for(let currentTimeUnit in currtenTime) {
      if (AppTime[currentTimeUnit] !== currtenTime[currentTimeUnit]) {
        AppTime[currentTimeUnit] = currtenTime[currentTimeUnit];

        const targetTimeUnitEl = document.querySelector(`.time-display .${currentTimeUnit}`);
        
        if (currentTimeUnit === 'minute' || currentTimeUnit === 'second') {          
          targetTimeUnitEl.textContent = AppTime[currentTimeUnit].toString().padStart(2, 0);
        } else {
          targetTimeUnitEl.textContent = AppTime[currentTimeUnit];
        }
      }
    }
  }, 1000);
}