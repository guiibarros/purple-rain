class Drop {
  x = Math.floor(Math.random() * (1050 + 250) - 250);
  y = Math.floor(Math.random() * (1000 - 10) - 1000);
  width = 1;
  height = 25;

  color = '#6a0dad'
  gravity = Math.random() * (1 - 0.02) + 0.02;
  dropAcceleration = 0;
  dropSpeed = 1.5;
  windForce = 0;

  update() {
    this.dropAcceleration += this.gravity;

    this.y += this.dropSpeed * this.dropAcceleration;
    this.x += this.windForce;

    if (this.dropAcceleration >= 8) {
      this.dropAcceleration = 8;
    }

    if (this.gravity <= 0.8) {
      this.color = '#6a0dad44';
      this.height = 20;
    } 

    this.handleResetDropOnOffCanvas();
  }

  handleChangeWindForce(force) {
    this.windForce = Number(force);
  }

  handleChangeDropSpeed(speed) {
    this.dropSpeed = Number(speed);
  }

  handleResetDropOnOffCanvas() {
    if (this.y >= 500) {
      this.x = Math.floor(Math.random() * (1050 + 250) - 250);
      this.y = Math.floor(Math.random() * (100 - 10) - 100);
      this.dropAcceleration = 0;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Game {
  canvas;
  ctx;
  drops = [];
  rainDrops;
  windForce;
  dropSpeed;

  start = () => {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.rainDrops = document.querySelector('#drops');
    this.windForce = document.querySelector('#wind');
    this.dropSpeed = document.querySelector('#drop');

    this.handleGenerateRain();
    this.rainDrops.addEventListener('change', () => this.handleGenerateRain());

    this.windForce.addEventListener('change', () => {
      this.drops.forEach(drop => drop.handleChangeWindForce(this.windForce.value));
    });

    this.dropSpeed.addEventListener('change', () => {
      this.drops.forEach(drop => drop.handleChangeDropSpeed(this.dropSpeed.value));
    });

    this.draw();
    this.update();
  }

  handleGenerateRain() {
    this.drops = new Array(Number(this.rainDrops.value));

    for (let i = 0; i < this.drops.length; i++) {
      this.drops[i] = new Drop();
    }
  }

  update = () => {
    this.drops.forEach(drop => drop.update());

    this.draw();
    requestAnimationFrame(this.update);
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drops.forEach(drop => drop.draw(this.ctx));
  }
}

const game = new Game();

window.addEventListener('load', game.start);