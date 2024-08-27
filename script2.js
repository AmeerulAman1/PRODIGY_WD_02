let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.style.backgroundColor = '#f44336';
        lapBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        startPauseBtn.textContent = 'Resume';
        startPauseBtn.style.backgroundColor = '#4caf50';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    lapCounter = 0;
    running = false;
    timeDisplay.textContent = '00:00:00.00';
    startPauseBtn.textContent = 'Start';
    startPauseBtn.style.backgroundColor = '#4caf50';
    lapsList.innerHTML = '';
    lapBtn.disabled = true;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    timeDisplay.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                              (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                              (seconds > 9 ? seconds : "0" + seconds) + "." + 
                              (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}

function recordLap() {
    lapCounter++;
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}
