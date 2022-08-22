import AppTime from "./AppTime.js";
import displayAppTime from "./displayAppTime.js";
import loadStopWatch from "./loadStopWatch.js";

function init() { 
  // 1. 시간 표시 기능
  displayAppTime(AppTime);

  // 2. 스톱워치 기능
  loadStopWatch();
}

init();