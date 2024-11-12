document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = e.target.children[0].value,
        lastName = e.target.children[1].value,
        country = e.target.children[2].value,
        score = e.target.children[3].value;
    const errorPrompter = document.querySelector(".main_error-prompter");

    errorPrompter.style.display = "none";

    if (firstName === '' || lastName === '' || country === '' || score === '') {
        errorPrompter.style.display = "block";
        return;
    }

    const scoreboardContainer = document.querySelector(".main_scoreboard-wrapper");
    const scoreboardElement = document.createElement("div");

    scoreboardElement.classList.add("main_scoreboard");

    scoreboardElement.innerHTML = `
        <div>
            <p class="main_player-name">${firstName} ${lastName}</p>
            <p class="main_time-stamp">${generateDateAndTime()}</p>
        </div>
        <p class="main_player-country">${country}</p>
        <p class="main_player-score">${score}</p>
        <div class="main_scoreboard-btn-container">
            <button class="delete-btn">&#x1f5d1;</button>
            <button class="increment-btn">+5</button>
            <button class="decrement-btn">-5</button>
        </div>
    `;
    scoreboardContainer.appendChild(scoreboardElement);
    sortScoreBoard();
    activateBtnEventListener();
    addTotalScore();  // Update total score after adding a new player
});

function activateBtnEventListener() {
    document.querySelectorAll(".main_scoreboard-btn-container").forEach((el) => {
        el.addEventListener("click", (e) => {
            const buttonType = e.target.className;
            const scorePlayer = e.target.parentElement.parentElement.querySelector(".main_player-score");

            if (buttonType === "delete-btn") {
                e.target.parentElement.parentElement.remove();
            } else {
                const scoreChange = buttonType === "increment-btn" ? 5 : -5;
                scorePlayer.textContent = Math.max(0, parseInt(scorePlayer.textContent) + scoreChange);
            }

            sortScoreBoard();
            addTotalScore();  // Update total score after score change
        });
    });
}

function sortScoreBoard() {
    const scoreboardContainer = document.querySelector(".main_scoreboard-wrapper");
    const scoreBoards = Array.from(document.querySelectorAll(".main_scoreboard"));

    const sortedElements = scoreBoards.sort((a, b) => {
        const scoreA = parseInt(a.querySelector(".main_player-score").textContent);
        const scoreB = parseInt(b.querySelector(".main_player-score").textContent);
        return scoreB - scoreA;
    });

    sortedElements.forEach((el) => {
        scoreboardContainer.appendChild(el);
    });
}

function addTotalScore() {
    const scoreElements = document.querySelectorAll(".main_player-score");
    let totalScore = 0;

    scoreElements.forEach((scoreElement) => {
        totalScore += parseInt(scoreElement.textContent);
    });

    const totalScoreElement = document.querySelector(".total_score");
    totalScoreElement.textContent = `Total Score: ${totalScore}`;
}

function generateDateAndTime() {
    const dateObject = new Date();
    const month = dateObject.toLocaleString("default", { month: "short" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const time = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return `${month} ${day}, ${year} ${time}`;
}
