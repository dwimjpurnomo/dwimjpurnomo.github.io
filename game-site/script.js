document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((games) => {
      const gameList = document.getElementById("game-list");
      games.forEach((game) => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
          <div class="game-title">${game.title}</div>
          <div class="max-earning">$${Math.max(...game.rewards.map(r => parseFloat(r.split(' ')[0])))}</div>
          <button class="play-button" onclick="location.href='game-detail.html?id=${game.id}'">Play Game</button>
        `;
        gameList.appendChild(card);
      });
    });
});
