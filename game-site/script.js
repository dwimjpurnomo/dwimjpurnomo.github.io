document.addEventListener("DOMContentLoaded", () => {
  const gameList = document.getElementById("game-list");
  const gameTitle = document.getElementById("game-title");
  const gameImage = document.getElementById("game-image");
  const gameDescription = document.getElementById("game-description");
  const gameRewards = document.getElementById("game-rewards");

  fetch("data.json")
    .then((response) => response.json())
    .then((games) => {
      // Home page game list
      if (gameList) {
        games.forEach((game) => {
          const card = document.createElement("div");
          card.className = "game-card";
          card.innerHTML = `
            <img src="${game.image}" alt="${game.title}" class="game-image"/>
            <div class="game-title">${game.title}</div>
            <div class="max-earning">$${Math.max(...game.rewards.map(r => parseFloat(r.split(' ')[0])))}</div>
            <button class="play-button" onclick="location.href='game-detail.html?id=${game.id}'">Play Game</button>
          `;
          gameList.appendChild(card);
        });
      }

      // Detail page
      const params = new URLSearchParams(window.location.search);
      const gameId = params.get('id');
      if (gameId && gameTitle && gameDescription && gameRewards) {
        const game = games.find(g => g.id === gameId);
        if (game) {
          gameTitle.textContent = game.title;
          if (gameImage) gameImage.src = game.image;
          gameDescription.textContent = game.description;
          game.rewards.forEach(reward => {
            const li = document.createElement('li');
            li.textContent = reward;
            gameRewards.appendChild(li);
          });
        }
      }
    });
});
