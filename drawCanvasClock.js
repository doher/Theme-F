'use strict';

let cvs = document.getElementById('CVS'),
    context = cvs.getContext('2d'),
    centerX = 200,
    centerY = 200;

const CANVAS_WIDTH = cvs.width,
    CANVAS_HEIGHT = cvs.height,
    RADIUS = 150;

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function drawClock() {
    context.fillStyle = 'white';
    context.strokeStyle = 'blue';
    context.lineWidth = 10;

    context.beginPath();
    context.arc(centerX, centerY, RADIUS, 2 * Math.PI, false);
    context.stroke();
    context.fill();

    for (let i = 0; i < 12; ++i) {
        context.fillStyle = 'green';

        let angle = i * 30,
            numX = RADIUS * Math.sin(toRadians(angle)) + centerX,
            numY = RADIUS * Math.cos(toRadians(angle)) + centerY;

        context.beginPath();
        context.arc(numX, numY, 5, 2 * Math.PI, false);
        context.stroke();
        context.fill();
    }
}

function clearAll() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawDigits() {
    let currTime = new Date();

    context.fillStyle = 'black';
    context.font = 'normal 27px Arial';
    context.fillText(formatTime(currTime), 150, 120);
}

function formatTime(dt) {
    let hours = dt.getHours(),
        minutes = dt.getMinutes(),
        seconds = dt.getSeconds();

    return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

function str0l(val, len) {
    let strVal = val.toString();

    while (strVal.length < len) {
        strVal = '0' + strVal;
    }

    return strVal;
}

function drawArrows() {
    let currTime = new Date(),
        hours = currTime.getHours(),
        minutes = currTime.getMinutes(),
        seconds = currTime.getSeconds();

    drawHourArrow(hours);
    drawMinuteArrow(minutes);
    drawSecondArrow(seconds);
}

function drawSecondArrow(seconds) {
    let angle = -seconds * 6,
        numX = (RADIUS * 0.9) * Math.sin(toRadians(angle) - Math.PI) + centerX,
        numY = (RADIUS * 0.9) * Math.cos(toRadians(angle) - Math.PI) + centerY;

    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(numX, numY);
    context.stroke();
}

function drawMinuteArrow(minutes) {
    let angle = -minutes * 6,
        numX = (RADIUS * 0.7) * Math.sin(toRadians(angle) - Math.PI) + centerX,
        numY = (RADIUS * 0.7) * Math.cos(toRadians(angle) - Math.PI) + centerY;

    context.strokeStyle = 'blue';
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(numX, numY);
    context.stroke();
}

function drawHourArrow(hours) {
    let angle = -hours * 30,
        numX = (RADIUS * 0.5) * Math.sin(toRadians(angle) - Math.PI) + centerX,
        numY = (RADIUS * 0.5) * Math.cos(toRadians(angle) - Math.PI) + centerY;

    context.strokeStyle = 'black';
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(numX, numY);
    context.stroke();
}

setInterval(function () {
    clearAll();
    drawClock();
    drawDigits();
    drawArrows();
}, 1000);