
document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((games) => {
      const gameList = document.getElementById("game-list");
      games.forEach((game) => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
          <div class="game-title">${game.title} <small>(${game.platform})</small> ⭐ ${game.rating}</div>
          <p><strong>Description:</strong> ${game.description}</p>
          <p><strong>Rewards:</strong></p>
          <ul>
            ${game.rewards.map(r => `<li class="reward-entry">${r}</li>`).join("")}
          </ul>
        `;
        gameList.appendChild(card);
      });
    });
});
