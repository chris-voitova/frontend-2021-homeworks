const field = {
  width: 505,
  borderX: 400,
  borderY: 450,
  waterCoord: 0,
};

const enemyProps = {
  width: 98,
  height: 56,
};

const playerProps = {
  width: 70,
  height: 86,
  step: 50,
};

class Character {
  constructor(positionX, positionY, width, height) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
  }
}

// Enemies our player must avoid
class Enemy extends Character {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  constructor(
    positionX,
    positionY,
    speed,
    width = enemyProps.width,
    height = enemyProps.height
  ) {
    super(positionX, positionY, width, height);

    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.positionX += this.speed * dt;
    if (this.positionX > field.width) {
      this.positionX = 0;
    }
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Character {
  constructor(
    positionX,
    positionY,
    width = playerProps.width,
    height = playerProps.height,
    stepOnField = playerProps.step
  ) {
    super(positionX, positionY, width, height);

    this.sprite = "images/char-boy.png";
    this.initPosition = {
      positionX: positionX,
      positionY: positionY,
    };
    this.stepOnField = stepOnField;
  }
  checkCollisions(enemy) {
    if (
      enemy.positionX < this.positionX + this.width &&
      enemy.positionX + enemy.width > this.positionX &&
      enemy.positionY < this.positionY + this.height &&
      enemy.positionY + enemy.height > this.positionY
    ) {
      alert("you are lose!");
      this.goToInitPosition();
    }
  }
  goToInitPosition() {
    this.positionX = this.initPosition.positionX;
    this.positionY = this.initPosition.positionY;
  }
  update() {
    if (this.positionY <= field.waterCoord) {
      alert("you are win!");
      this.goToInitPosition();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  }
  handleInput(key) {
    switch (key) {
      case "up":
        this.positionY -= this.stepOnField;
        break;
      case "down":
        this.positionY += this.stepOnField;
        if (this.positionY > field.borderY) {
          this.positionY = field.borderY;
        }
        break;
      case "left":
        this.positionX -= this.stepOnField;
        if (this.positionX < this.stepOnField) {
          this.positionX = this.stepOnField;
        }
        break;
      case "right":
        this.positionX += this.stepOnField;
        if (this.positionX > field.borderX) {
          this.positionX = field.borderX;
        }
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemiesValues = [
  [0, 280, 60],
  [0, 200, 100],
  [30, 130, 80],
];
const allEnemies = enemiesValues.map((value) => new Enemy(...value));

// Place the player object in a variable called player

const player = new Player(215, 450);

function checkCollisions() {
  allEnemies.forEach((enemy) => {
    player.checkCollisions(enemy);
  });
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
