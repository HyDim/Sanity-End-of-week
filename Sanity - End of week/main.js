$(document).ready(function () {
  var menu;
  let health = document.getElementById("health");

  $("#visit").click(function () {
    menu = switchMenu("bossSection");
  });

  $("#return").click(function () {
    menu = switchMenu("mainSection");
  });

  function switchMenu(menu) {
    $(".sectionLeft").children().css("display", "none");
    $("." + menu).css("display", "block");
    return menu;
  }

  $("#fightBoss").click(function () {
    health.value -= game.clickValue;
  });
});

var game = {
  score: 0,
  totalScore: 0,
  totalClicks: 0,
  clickValue: 10,
  damage: 10,
  bossHealth: 100,
  version: 0.0,

  addToScore: function (amount) {
    this.score += amount;
    this.totalScore += amount;
    display.updateScore();
  },

  getScorePerSecond: function () {
    var scorePerSecond = 0;
    for (i = 0; i < building.name.length; i++) {
      scorePerSecond += building.income[i] * building.count[i];
    }
    return scorePerSecond;
  },
};

var building = {
  name: ["Cursor", "Drug", "Gaem"],
  image: [
    "https://img.icons8.com/ios-filled/2x/cursor.png",
    "https://www.pngrepo.com/png/189223/180/drugs-drug.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/64px-WoW_icon.svg.png",
  ],
  count: [0, 0, 0],
  income: [1, 5, 10],
  cost: [15, 30, 100],

  purchase: function (index) {
    if (game.score >= this.cost[index]) {
      game.score -= this.cost[index];
      this.count[index]++;
      this.cost[index] = Math.ceil(this.cost[index] * 1.1);
      display.updateScore();
      display.updateShop();
      display.updateUpgrades();
    }
  },
};

var upgrade = {
  name: ["Buff Clicker", "Buffer Clicker", "Gym membership"],
  description: [
    "Buffs up your clickers with pre-workout (+1 damage per clicker)",
    "MORE POWEEEEEEEER (doubles your clicker damage)",
    "Get off ur fat ass (doubles your clicking power)",
  ],
  image: [
    "https://th.bing.com/th/id/R.359315fe3d66a68bb9f6acb3247746be?rik=wOxAnhj64D0PVw&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.359315fe3d66a68bb9f6acb3247746be?rik=wOxAnhj64D0PVw&pid=ImgRaw&r=0",
    "https://cdn0.iconfinder.com/data/icons/fitness-32/512/as427g_14-128.png",
  ],
  type: ["building", "building", "click"],
  cost: [100, 1000, 200],
  buildingIndex: [0, 0, -1],
  requirement: [1, 5, 1],
  bonus: [2, 2, 2],
  purchased: [false, false, false],

  purchase: function (index) {
    if (!this.purchased[index] && game.score >= this.cost[index]) {
      if (
        this.type[index] == "building" &&
        building.count[this.buildingIndex[index]] >= this.requirement[index]
      ) {
        game.score -= this.cost[index];
        building.income[this.buildingIndex[index]] *= this.bonus[index];
        this.purchased[index] = true;

        display.updateUpgrades();
        display.updateScore();
      } else if (
        this.type[index] == "click" &&
        game.totalClicks >= this.requirement[index]
      ) {
        game.score -= this.cost[index];
        game.clickValue *= this.bonus[index];
        this.purchased[index] = true;

        display.updateUpgrades();
        display.updateScore();
      }
    }
  },

  /*bought: function(index) {
    if(this.purchased[index] == true) {
      document.getElementById().style.backgroundColor = 'blue';
    }
  }*/
};

var achievement = {
  name: ["Cracked", "The gang", "Relax"],
  description: [
    "Kinda cracked my guy (restore 1 sanity)",
    "Yo boy pulled up (have 1 clickers)",
    "Ahhh peace, at last (click Bob once)",
  ],
  image: [
    "https://th.bing.com/th/id/R.90f689a09e9fa18411eb5a4ec70265e9?rik=ixKyJMv1uzzc6g&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.ada944e9ebfc94088b13e89bc185417b?rik=G1F9Qnry48wHuQ&riu=http%3a%2f%2fwww.majpetroleum.co.za%2fman-pointing-down-sml-nb.png&ehk=BICZQ%2b2g08E%2fOHSRYizDj0R6X2OjspsfqlXuLn5dIgQ%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.440c78ec76dc45ab4211c008b51e4906?rik=oqAHFPEGKiUdxw&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2fi%2fv%2fx%2fK%2fG%2f4%2fmylogo-th.png&ehk=6NI97CqvwlTBkBideeUTWA5wdQG3rWpKNH2r0YOI9wk%3d&risl=&pid=ImgRaw&r=0",
  ],
  type: ["score", "building", "click"],
  requirement: [1, 1, 1],
  objectIndex: [-1, 0, -1],
  awarded: [false, false, false],

  earn: function (index) {
    this.awarded[index] = true;
  },
};

var display = {
  updateScore: function () {
    document.getElementById("score").innerHTML = game.score;
    document.getElementById("scorePerSecond").innerHTML =
      game.getScorePerSecond();
    document.title = game.score + " Sanity: End of week";
  },

  updateShop: function () {
    document.getElementById("shopContainer").innerHTML = "";
    for (i = 0; i < building.name.length; i++) {
      document.getElementById("shopContainer").innerHTML +=
        '<table class="shopButton unselectable" onclick="building.purchase(' +
        i +
        ')"><tr><td id="image"><img src="' +
        building.image[i] +
        '"></td><td id="nameAndCost"><p>' +
        building.name[i] +
        "</p><p><span>" +
        building.cost[i] +
        '</span> Sanity</p></td><td id="amount"><span>' +
        building.count[i] +
        "</span></td></tr></table>";
    }
  },

  updateUpgrades: function () {
    document.getElementById("upgradeContainer").innerHTML = "";
    for (i = 0; i < upgrade.name.length; i++) {
      if (!upgrade.purchased[i]) {
      }
      if (
        upgrade.type[i] == "building" &&
        building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]
      ) {
        document.getElementById("upgradeContainer").innerHTML +=
          '<img src="' +
          upgrade.image[i] +
          '" id="' +
          upgrade.name[i] +
          '" title="' +
          upgrade.name[i] +
          " &#10; " +
          upgrade.description[i] +
          " &#10; (" +
          upgrade.cost[i] +
          ' Sanity)"onclick=" upgrade.purchase(' +
          i +
          ')">';
      } else if (
        upgrade.type[i] == "click" &&
        game.totalClicks >= upgrade.requirement[i]
      ) {
        document.getElementById("upgradeContainer").innerHTML +=
          '<img src="' +
          upgrade.image[i] +
          '" id="' +
          upgrade.name[i] +
          '" title="' +
          upgrade.name[i] +
          " &#10; " +
          upgrade.description[i] +
          " &#10; (" +
          upgrade.cost[i] +
          ' Sanity)" onclick="upgrade.purchase(' +
          i +
          ')">';
      }
    }
  },

  updateAchievements: function () {
    document.getElementById("achievementContainer").innerHTML = "";
    for (i = 0; i < achievement.name.length; i++) {
      if (achievement.awarded[i]) {
        document.getElementById("achievementContainer").innerHTML +=
          "<img src=" +
          achievement.image[i] +
          '" title="' +
          achievement.name[i] +
          " &#10; " +
          achievement.description[i] +
          '">';
      }
    }
  },
};

function saveGame() {
  var gameSave = {
    score: game.score,
    totalScore: game.totalScore,
    totalClicks: game.totalClicks,
    clickValue: game.clickValue,
    version: game.version,
    buildingCount: building.count,
    buildingIncome: building.income,
    buildingCost: building.cost,
    upgradePurchased: upgrade.purchased,
    achievementAwarded: achievement.awarded,
  };
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
  var savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (localStorage.getItem("gameSave") !== null) {
    if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
    if (typeof savedGame.totalScore !== "undefined")
      game.totalScore = savedGame.totalScore;
    if (typeof savedGame.totalClicks !== "undefined")
      game.totalClicks = savedGame.totalClicks;
    if (typeof savedGame.clickValue !== "undefined")
      game.clickValue = savedGame.clickValue;
    if (typeof savedGame.buildingCount !== "undefined") {
      for (i = 0; i < savedGame.buildingCount.length; i++) {
        building.count[i] = savedGame.buildingCount[i];
      }
    }
    if (typeof savedGame.buildingIncome !== "undefined") {
      for (i = 0; i < savedGame.buildingIncome.length; i++) {
        building.income[i] = savedGame.buildingIncome[i];
      }
    }
    if (typeof savedGame.buildingCost !== "undefined") {
      for (i = 0; i < savedGame.buildingCost.length; i++) {
        building.cost[i] = savedGame.buildingCost[i];
      }
    }
    if (typeof savedGame.upgradePurchased !== "undefined") {
      for (i = 0; i < savedGame.upgradePurchased.length; i++) {
        upgrade.purchased[i] = savedGame.upgradePurchased[i];
      }
    }
    if (typeof savedGame.achievementAwarded !== "undefined") {
      for (i = 0; i < savedGame.achievementAwarded.length; i++) {
        achievement.awarded[i] = savedGame.achievementAwarded[i];
      }
    }
  }
}

function resetGame() {
  if (confirm("U sure abt that Bossman?")) {
    var gameSave = {};
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
    location.reload();
  }
}

document.getElementById("clicker").addEventListener(
  "click",
  function () {
    game.totalClicks++;
    game.addToScore(game.clickValue);
  },
  false
);

window.onload = function () {
  loadGame();
  display.updateScore();
  display.updateUpgrades();
  display.updateAchievements();
  display.updateShop();
};

setInterval(function () {
  for (i = 0; i < achievement.name.length; i++) {
    if (
      achievement.type[i] == "score" &&
      game.totalScore >= achievement.requirement[i]
    )
      achievement.earn(i);
    else if (
      achievement.type[i] == "click" &&
      game.totalClicks >= achievement.requirement[i]
    )
      achievement.earn(i);
    else if (
      achievement.type[i] == "building" &&
      building.count[achievement.objectIndex[i]] >= achievement.requirement[i]
    )
      achievement.earn(i);
  }

  game.score += game.getScorePerSecond();
  game.totalScore += game.getScorePerSecond();
  display.updateScore();
  display.updateAchievements();
}, 1000);

setInterval(function () {
  display.updateScore();
  display.updateUpgrades();
}, 10000);

setInterval(function () {
  saveGame();
}, 30000);

document.addEventListener(
  "keydown",
  function (event) {
    if (event.ctrlKey && event.which == 83) {
      event.preventDefault();
      saveGame();
    }
  },
  false
);
