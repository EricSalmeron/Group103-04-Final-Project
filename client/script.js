/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-new */
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '5632c77d22msh70c6d62094e11eep1c2c19jsn4061b7fbefc3',
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function filterList(array, filterInputValue) {
  const newArray = array.filter((item) => {
    const lowCaseName = lowerCaseName(item);
    const lowCaseQuery = filterInputValue.toLowerCase();
    return lowCaseName.includes(lowCaseQuery);
  });
  return newArray;
}

function fillNBAInfo (name, logo, rating) {
  document.querySelector('.nbaBox').innerHTML = `
  <div class = "nbaInfo">
      <h1>${name}</h3>
      <h1>Player Rating: ${rating}</h3>
  </div>
  <div class = "thumbnail">
  <img
  src ="${logo}"
  />
  </div>
  `;
}

function fillNBAInfoSecond (name, logo, rating) {
  document.querySelector('.nbaBoxSecond').innerHTML = `
  <div class = "nbaInfo">
      <h1>${name}</h3>
      <h1>Player Rating: ${rating}</h3>
  </div>
  <div class = "thumbnail">
  <img
  src ="${logo}"
  />
  </div>
  `;
}

function fillPlayerInfo(firstname, lastname, id) {
  document.querySelector('.playerBox').innerHTML = `
  <div>
    </div>
    <div class="playerInfo">
      <h1>${capitalizeFirstLetter(
    `${firstname} ${lastname}`
  )}</h3>
      <p>ID: ${(ind = id)}</p>
      ${ind}
    </div>`;
}

function fillPlayerInfoSecond(firstname, lastname, id) {
  document.querySelector('.playerBoxSecond').innerHTML = `
  <div>
    </div>
    <div class="playerInfoTwo">
      <h1>${capitalizeFirstLetter(
    `${firstname} ${lastname}`
  )}</h3>
      <p>ID: ${(ind = id)}</p>
      ${ind}
    </div>`;
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#player_list');
  target.innerHTML = '';

  const listEl = document.createElement('ol');
  target.appendChild(listEl);

  list.forEach((item) => {
    const el = document.createElement('li');
    el.innerText = item;
    listEl.appendChild(el);
  });
}

function injectHTMLTwo(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#player_list_second');
  target.innerHTML = '';

  const listEl = document.createElement('ol');
  target.appendChild(listEl);

  list.forEach((item) => {
    const el = document.createElement('li');
    el.innerText = item;
    listEl.appendChild(el);
  });
}

function processPlayers(list) {
  const range = [...Array(list.length).keys()];
  const newArray = range.map((item) => item);
  return newArray;
}

function updateChart(chart, object) {
  chart.data.labels = labels;
  playerName = `${object[0]} ${object[1]}`;
  chart.data.datasets[0].data[0] = object[2];
  chart.data.datasets[0].data[1] = object[3];
  chart.data.datasets[0].data[2] = object[4];
  chart.data.datasets[0].data[3] = object[5];
  chart.data.datasets[0].data[4] = object[6];
  chart.data.datasets[0].data[5] = object[7];
  chart.data.datasets[0].label = object[8];

  chart.update();
}

async function getPlayer() {
  try {
    const name = document.querySelector('#lastNamePlayer').value;
    const playerName = lowerCaseName(name);
    const newData = await fetch(`https://api-nba-v1.p.rapidapi.com/players?name=${playerName}`, options);
    const data = await newData.json();
    const nameArray = [];

    const allNames = data.response;
    const length = allNames.length;

    for (let i = 0; i < length; i++) {
      nameArray.push(allNames[i].firstname);
    }
    console.log(nameArray);
    const playerID = data.response[0].id;
    const firstName = data.response[0].firstname;
    const lastName = data.response[0].lastname;
    return [playerID, firstName, lastName, nameArray, data];
  } catch (err) {
    console.log('Data Request Failed', err);
  }
}

async function getPlayerTwo() {
  try {
    const name = document.querySelector('#lastNamePlayerSecond').value;
    const playerName = lowerCaseName(name);
    const newData = await fetch(`https://api-nba-v1.p.rapidapi.com/players?name=${playerName}`, options);
    const data = await newData.json();
    const nameArray = [];

    const allNames = data.response;
    const length = allNames.length;

    for (let i = 0; i < length; i++) {
      nameArray.push(allNames[i].firstname);
    }
    console.log(nameArray);
    const playerID = data.response[0].id;
    const firstName = data.response[0].firstname;
    const lastName = data.response[0].lastname;
    return [playerID, firstName, lastName, nameArray, data];
  } catch (err) {
    console.log('Data Request Failed', err);
  }
}

async function getPlayerData(playerID) {
  try {
    const playerData = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerID}&season=2021`, options);
    const data = await playerData.json();
    const teamName = data.response[0].team.name;
    const teamLogo = data.response[0].team.logo;
    const pointsScored = data.response[0].points;
    const {assists} = data.response[0];
    const {steals} = data.response[0];
    const goals = data.response[0].fgm;
    const freeThrows = data.response[0].ftm;
    const threePointers = data.response[0].tpm;
    const totalScore = pointsScored + assists + steals + goals + freeThrows + threePointers;
    return [teamName, teamLogo, pointsScored, assists, steals, goals, freeThrows, threePointers, 
      totalScore];
  } catch (err) {
    console.log('Data Request Failed', err);
  }
}

async function getPlayerDataTwo(playerID) {
  try {
    const playerData = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerID}&season=2021`, options);
    const data = await playerData.json();
    const teamName = data.response[0].team.name;
    const teamLogo = data.response[0].team.logo;
    const pointsScored = data.response[0].points;
    const {assists} = data.response[0];
    const {steals} = data.response[0];
    const goals = data.response[0].fgm;
    const freeThrows = data.response[0].ftm;
    const threePointers = data.response[0].tpm;
    const totalScore = pointsScored + assists + steals + goals + freeThrows + threePointers;
    return [teamName, teamLogo, pointsScored, assists, steals, goals, freeThrows, threePointers, 
      totalScore];
  } catch (err) {
    console.log('Data Request Failed', err);
  }
}

const labels = ['Points Scored', 'assists', 'steals', 'goals', 'Free Throws', 'Three-Pointers'];
function initChart(chart, object) {
  const data = {
    labels: labels,
    datasets: [{
      label: 'Player Name',
      backgroundColor: 'rgb(255, 99, 131)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0]
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  return new Chart(
    chart,
    config
  );
}

// setting up chart //
const ctx = document.querySelector('#myChart');
let chartData;
const playerChart = initChart(ctx, chartData);



// setting other variables//
let player;
let playerInfo;
let playerList = [];
let newFilterList = []

document.querySelector('#search').addEventListener('click', async (event) => {
  player = await getPlayer(event.target.value);
  playerList = player[3];
  injectHTML(playerList);
});

document.querySelector('#search2').addEventListener('click', async (event) => {
  searchName = newFilterList[0];
  searchPlayer = player[4].response.filter((obj) => obj.firstname === searchName);
  id = searchPlayer[0].id;
  console.log(id);
  playerInfo = await getPlayerData(id);
  console.log(playerInfo);
  console.log(playerInfo[0]);
  console.log(playerInfo[1]);
  fillPlayerInfo(player[1], player[2], player[0]);
  fillNBAInfo(playerInfo[0], playerInfo[1], playerInfo[8]);
  chartData = [player[1],
    player[2],
    playerInfo[2],
    playerInfo[3],
    playerInfo[4],
    playerInfo[5],
    playerInfo[6],
    playerInfo[7],
    `${player[1]} ${player[2]}`];

  updateChart(playerChart, chartData);
});

document.querySelector('#firstNamePlayer').addEventListener('input', (event) => {
  newFilterList = filterList(playerList, event.target.value);
  injectHTML(newFilterList);
})

const ctx2 = document.querySelector('#myChart2');
let chartdata2;
const playerChart2 = initChart(ctx2, chartdata2);

let playerTwo;
let playerInfoTwo;
let PlayerListTwo = [];
let newFilterListTwo = [];

document.querySelector('#search3').addEventListener('click', async (event) => {
  playerTwo = await getPlayerTwo(event.target.value);
  playerListTwo = playerTwo[3];
  injectHTMLTwo(playerListTwo);
});

document.querySelector('#search4').addEventListener('click', async (event) => {
  searchName = newFilterListTwo[0];
  searchPlayer = playerTwo[4].response.filter((obj) => obj.firstname === searchName);
  id = searchPlayer[0].id
  console.log(id)
  playerInfoTwo = await getPlayerDataTwo(id)
  console.log(playerInfoTwo)
  fillPlayerInfoSecond(playerTwo[1], playerTwo[2], playerTwo[0]);
  fillNBAInfoSecond(playerInfoTwo[0], playerInfoTwo[1], playerInfoTwo[8]);
  chartdata2 = [playerTwo[1],
    playerTwo[2],
    playerInfoTwo[2],
    playerInfoTwo[3],
    playerInfoTwo[4],
    playerInfoTwo[5],
    playerInfoTwo[6],
    playerInfoTwo[7],
    `${playerTwo[1]} ${playerTwo[2]}`];
  
  updateChart(playerChart2, chartdata2);
});

document.querySelector('#firstNamePlayerSecond').addEventListener('input', (event) => {
  newFilterListTwo = filterList(playerListTwo, event.target.value);
  injectHTMLTwo(newFilterListTwo);
})