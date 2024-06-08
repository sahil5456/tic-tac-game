const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("active");
}

let playerXIcon = "fas fa-times",
    playerOIcon = "far fa-circle",
    playerSign = "X";

function clickedBox(element) {
    if (players.classList.contains("active")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
    } else {
        playerSign = "X";
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
    }
    element.setAttribute("id", playerSign);
    element.style.pointerEvents = "none";
    selectWinner();
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign;
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) ||
        checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
        }, 700);
    } else if (Array.from(allBox).every(box => box.id !== "")) {
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.textContent = "Match has been drawn!";
        }, 700);
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}
