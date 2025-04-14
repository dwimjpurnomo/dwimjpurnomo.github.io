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
          let totalEarning = 0;
          let currency = '';

          if (Array.isArray(game.rewards) && game.rewards.length > 0) {
            totalEarning = game.rewards.reduce((sum, r) => sum + r.number, 0);
            currency = game.rewards[0].currency || '';
          }

          const card = document.createElement("div");
          card.className = "game-card";
          card.innerHTML = `
            <a href="game-detail.html?id=${game.id}">
              <img src="${game.image}" alt="${game.title}" class="game-image"/>
            </a>
            <div class="game-title">${game.title}</div>
            <div class="max-earning">Dapatkan hingga ${currency}${totalEarning.toFixed(2)}</div>
            <button class="play-button" onclick="location.href='game-detail.html?id=${game.id}'">
              Lebih detil dan mainkan
            </button>
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

    let totalEarning = 0;
    let currency = '';
    if (Array.isArray(game.rewards) && game.rewards.length > 0) {
      totalEarning = game.rewards.reduce((sum, r) => sum + r.number, 0);
      currency = game.rewards[0].currency || '';
    }

    document.getElementById("game-id").textContent = game.id;

    document.getElementById("total-earning").innerHTML =
      `<strong>Dapatkan hingga:</strong> ${currency}${totalEarning.toFixed(2)}`;

          game.rewards.forEach(reward => {
            const li = document.createElement('li');
            li.textContent = `${reward.currency}${reward.number} ketika menyelesaikan ${reward.level}`;
            gameRewards.appendChild(li);
          });
        }
      }
      
    });
});
