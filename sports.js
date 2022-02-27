const bydefault = async () => {
  const res = await fetch("https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=");
  const data = await res.json();
  searchList(data.player);
};
bydefault();

const playersAll = document.getElementById("players");
const searchList = (array) => {
  const players = array
    .map((player) => {
      // console.log(player);
      if (player.strThumb !== null) {
        return `
        <div class="col">
        <div class="card" onclick="showDetails('${player.idPlayer}')">
          <img src="${player.strThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <p class="card-text">${player.strNationality}</p>
            <p class="card-text">${player.strBirthLocation}</p>
          </div>
        </div>
      </div>
    `;
      }
    })
    .join("");
  playersAll.innerHTML = players;
};

//*seaech e pawa--
const searchPlayer = async () => {
  const inputValue = document.getElementById("input").value;

  if (inputValue === "" || inputValue < 0 || inputValue >= 0) {
    document.getElementById("para").classList.remove("d-none");
    playersAll.textContent = "";
    details.textContent = "";
  } else {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`);
    const data = await res.json();
    if (data.player === null) {
      document.getElementById("para").classList.remove("d-none");
      playersAll.textContent = "";
      details.textContent = "";
    } else {
      searchList(data.player);
      document.getElementById("para").classList.add("d-none");
      details.textContent = "";
    }
  }
  document.getElementById("input").value = "";
};

const details = document.getElementById("details");

const showDetails = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const detailsPlayer = data.players
        .map((player) => {
          if (player.idPlayer === id) {
            return `
          <div class="row g-0">
          <div class="col-md-4">
            <img src="${player.strThumb}" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Born: ${player.dateBorn}</h5>
              <h5 class="card-title">Team: ${player.strTeam}</h5>
              <h5 class="card-title">Position: ${player.strPosition}</h5>
              <h5 class="card-title">Sport: ${player.strSport}</h5>
              <h5 class="card-title">Height: ${player.strHeight}</h5>
              <p class="card-text">${player.strDescriptionEN}</p>
            </div>
          </div>
        </div>
          `;
          }
        })
        .join("");
      details.innerHTML = detailsPlayer;
    });
};
