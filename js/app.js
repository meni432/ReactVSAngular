import AirPlane from './Airplane.js';
import {Parachutist} from "./Parachutist.js";
import {ParachutistType, SpeedParameters} from "./Parachutist.js";
import Coordinate from "./Coordinate.js";
import {Boat} from "./Boat.js";
import {GameManager} from "./GameManager.js";


let m_backgroundImage = new Image();
m_backgroundImage.src = './resources/background.png';

const m_gameOverBackgroundImage = new Image();
m_gameOverBackgroundImage.src = './resources/game-over-background.png';
const speed = 20; // lower is faster

// Main program

let imgW;
let imgH;
let clearX;
let clearY;
let ctx;
let canvas;

let airplane;
let boat;

let m_parachutistArray = [];
const m_gameManager = new GameManager();

const m_airPlaneImage = new Image();   // Create new img element
m_airPlaneImage.src = './resources/plane.png'; // Set source path

let m_parachutistImage = new Image();
m_parachutistImage.src = './resources/parachutist-angular.png';

let m_parachutistAngularImage = new Image();
m_parachutistAngularImage.src = './resources/parachutist-angular.png';

let m_parachutistReactImage = new Image();
m_parachutistReactImage.src = './resources/parachutist-react.png';

let m_parachutistSaladImage = new Image();
m_parachutistSaladImage.src = './resources/parachutist-salad.png';

const m_boatImage = new Image();
m_boatImage.src = './resources/boat.png';

const m_seaImage = new Image();
m_seaImage.src = './resources/sea.png';

m_backgroundImage.onload = function () {
    imgW = m_backgroundImage.width;
    imgH = m_backgroundImage.height;

    // get canvas context
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function (evt) {
        onMouseMoveEvent(evt);
    }, false);

    airplane = new AirPlane(m_airPlaneImage.width, imgW);
    boat = new Boat(m_boatImage.width, imgW);

    // set refresh rate
    return setInterval(draw, speed);
};

function moveBoat(x) {
    boat.moveTo(x);
}

function onMouseMoveEvent(evt) {
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    moveBoat(x);
}

function addParachutistInProbability() {
    const random = Math.floor(Math.random() * 5000);
    const airplaneCoordinate = airplane.getCurrentCoordinate();
    if (random >= 1 && random <= 10) {
        const newParachutist = new Parachutist(new Coordinate(airplaneCoordinate.x, 30), new Coordinate(airplaneCoordinate.x, 600), ParachutistType.ANGULAR, SpeedParameters.FAST);
        m_parachutistArray.push(newParachutist);
    } else if (random >= 20 && random <= 40) {
        const newParachutist = new Parachutist(new Coordinate(airplaneCoordinate.x, 30), new Coordinate(airplaneCoordinate.x, 600), ParachutistType.REACT);
        m_parachutistArray.push(newParachutist);
    }
    else if (random >=  60 && random <= 80) {
        const airplaneCoordinate = airplane.getCurrentCoordinate();
        const newParachutist = new Parachutist(new Coordinate(airplaneCoordinate.x, 30), new Coordinate(airplaneCoordinate.x, 600), ParachutistType.SALAD, SpeedParameters.VERY_FAST);
        m_parachutistArray.push(newParachutist);
    }
}

function drawParachutists(ctx) {
    let newParachutistArray = [];
    m_parachutistArray.forEach((parachutist) => {
        const parachutistType = parachutist.parachutistType;
        if (!parachutist.isStopped) {
            const newParachutistCoordinate = parachutist.getNextDrawingCoordinate();
            const parachutistImage = getParachutistImage(parachutistType);
            if (!checkIfParachutistsInBoatArea(newParachutistCoordinate)) {
                ctx.drawImage(parachutistImage, newParachutistCoordinate.x, newParachutistCoordinate.y);
                newParachutistArray.push(parachutist);
            } else {
                m_gameManager.handleInABoatArea(parachutistType);
            }
        } else {
            m_gameManager.handleParachutistFallToWater(parachutistType);
        }
    });

    m_parachutistArray = newParachutistArray;
}

function getParachutistImage(parachutistType) {
    switch (parachutistType) {
        case ParachutistType.ANGULAR:
            return m_parachutistAngularImage;
            break;

        case ParachutistType.REACT:
            return m_parachutistReactImage;
            break;

        case ParachutistType.SALAD:
            return m_parachutistSaladImage;
            break;

        default:
            break;
    }
}


function checkIfParachutistsInBoatArea(parachutistCoordinate) {
    const boatCoordinate = boat.getCurrentCoordinate();

    const x1 = boatCoordinate.x;
    const x2 = boatCoordinate.x + m_boatImage.width;
    const y1 = boatCoordinate.y;
    const y2 = boatCoordinate.y + m_boatImage.height;

    const x = parachutistCoordinate.x;
    const y = parachutistCoordinate.y;

    return (x > x1 && x < x2 &&
        y > y1);
}

function drawGameState(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";

    ctx.fillText("Lives : " + m_gameManager.lives, 30, 50);
    ctx.fillText(m_gameManager.react, 30, 275);
    ctx.fillText(m_gameManager.angular, 1040, 275);
}

function draw() {
    ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
    if (m_gameManager.isAlive()) {
        // draw image
        ctx.drawImage(m_backgroundImage, 0, 0, imgW, imgH);
        const newAirplaneCoordinate = airplane.getNextDrawingCoordinate();
        ctx.drawImage(m_airPlaneImage, newAirplaneCoordinate.x, newAirplaneCoordinate.y);
        const nextBoatCoordinate = boat.getNextDrawingCoordinate();
        drawParachutists(ctx);
        ctx.drawImage(m_boatImage, nextBoatCoordinate.x, nextBoatCoordinate.y);
        ctx.drawImage(m_seaImage, 0, 510);
        addParachutistInProbability();
        drawGameState(ctx);
    } else {
        ctx.drawImage(m_gameOverBackgroundImage, 0, 0, imgW, imgH);
        drawGameState(ctx);
    }
}