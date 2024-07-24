let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateTime() {
    const now = Date.now();
    const diff = now - startTime + elapsedTime;
    const milliseconds = parseInt((diff % 1000) / 10);
    const seconds = parseInt((diff / 1000) % 60);
    const minutes = parseInt((diff / (1000 * 60)) % 60);
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startStop() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapTimes = [];
}

function recordLap() {
    if (isRunning) {
        const now = Date.now();
        const diff = now - startTime + elapsedTime;
        const milliseconds = parseInt((diff % 1000) / 10);
        const seconds = parseInt((diff / 1000) % 60);
        const minutes = parseInt((diff / (1000 * 60)) % 60);
        const lapTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
        lapTimes.push(lapTime);
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        laps.appendChild(lapDiv);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
