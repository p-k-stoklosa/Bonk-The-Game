const startGame = document.querySelector('.start_game');
const exitMenu = document.querySelector('.exit_menu');
const fields = document.querySelector('.fields');
const score = document.querySelector('.results .score p');
const hiddenMenu = document.querySelector('.hidden_menu');
const hiddenMenuPoints = document.querySelector('.hidden_menu p');
const time = document.querySelector('.results .time p');
const audio = document.querySelector('.audio');

let playerScore = 0;
let timeToEnd = 60;
let mainFunctionWorking = false;
let mainInterval;
let timeInterval;

let blockedNumbers = [];

const handleAddingImages = () => {
    const randomNumber = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
    if (blockedNumbers.includes(randomNumber)) {
        return handleAddingImages();
    } else {
        blockedNumbers.push(randomNumber);
        const field = document.querySelector(`.field-${randomNumber} .field-image`);
        const image = document.createElement('img');
        image.setAttribute('src', 'images/enemy.png');
        field.appendChild(image);
        setTimeout(() => {
            const addedImage = document.querySelector(`.field-${randomNumber} .field-image img`);
            const indexToDelete = blockedNumbers.indexOf(randomNumber);
            if (addedImage !== null) {
                addedImage.remove();
                if (indexToDelete > -1) {
                    blockedNumbers.splice(indexToDelete, 1);
                }
            } else {
                if (indexToDelete > -1) {
                    blockedNumbers.splice(indexToDelete, 1);
                }
            }
        }, 1500);
    }
}

const handleRemoveImages = (e) => {
    const clickedTag = e.target.tagName;
    const image = e.target;
    if (clickedTag.toLowerCase() === 'img') {
        audio.play();
        image.remove();
        playerScore += 100;
        score.textContent = playerScore;
        if (playerScore > 0) {
            hiddenMenuPoints.textContent = `YOU WON WITH ${playerScore} POINTS!`;
        } else {
            hiddenMenuPoints.textContent = `0 POINTS DO NOT COUNT`;
        }
    }
}

const exitHiddenMenu = () => {
    hiddenMenu.style.display = 'none';
    score.textContent = '----';
    time.textContent = '01:00';
    playerScore = 0;
    timeToEnd = 60;
}

const handleTimer = () => {
    timeInterval = setInterval(() => {
        timeToEnd--;
        if (timeToEnd == 0) {
            return mainFunction();
        } else if (timeToEnd > 9) {
            time.textContent = `00:${timeToEnd}`;
        } else {
            time.textContent = `00:0${timeToEnd}`;
        }
    }, 1000);
}

const mainFunction = () => {
    if (!mainFunctionWorking) {
        mainFunctionWorking = !mainFunctionWorking;
        handleTimer();
        mainInterval = setInterval(handleAddingImages, 500);
    } else if (timeToEnd == 0) {
        mainFunctionWorking = !mainFunctionWorking;
        hiddenMenu.style.display = 'block';
        blockedNumbers.splice(0, blockedNumbers.length);
        clearInterval(mainInterval);
        clearInterval(timeInterval);
    }
}

startGame.addEventListener('click', mainFunction);
fields.addEventListener('click', handleRemoveImages);
exitMenu.addEventListener('click', exitHiddenMenu);
document.querySelector('.welcome button').addEventListener('click', () => {
    document.querySelector('.welcome').style.display = 'none';
})