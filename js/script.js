
var score = 0;

function Ant(x, y, parentElem) {
  this.isKilled = false;
  this.x = x;
  this.y = y;
  this.antHeight = ANT_HEIGHT;
  this.antWidth = ANT_WIDTH;
  this.dx = getRandomNumber(0, 50) > 25 ? DIRECTION : -DIRECTION;
  this.dy = getRandomNumber(0, 50) > 25 ? DIRECTION : -DIRECTION;;
  this.element = null;

  this.init = function () {
    this.element = document.createElement('img');
    this.element.setAttribute('class', 'ant');
    this.element.setAttribute('src', './assets/ant.gif');
    this.boxWidth = 40;
    this.boxHeight = 40;
    this.cursor = 'url(./assets/hammer.cur), auto';

    applyStyles(this.element, {
      position: 'absolute',
      height: this.antHeight + 'px',
      width: this.antWidth + 'px',
      top: getRandomNumber(0, CONTAINER_WIDTH_HEIGHT - ANT_HEIGHT) + 'px',
      left: getRandomNumber(0, CONTAINER_WIDTH_HEIGHT - ANT_WIDTH) + 'px',
      background: 'rgb(' + this.color + ')',
      cursor: this.cursor,
    });

    this.element.addEventListener('click', this.smashAndremoveAnt);
    parentElem && parentElem.appendChild(this.element);
  }

  this.draw = function () {
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;
  }

  this.smashAndremoveAnt = function () {
    score++;
    this.isKilled == true;
    var that = this;
    // setTimeout(function () {
    that.parentElement.removeChild(that);
    // }, 1000);
  }

  this.checkAntColission = function (ant1, ant2) {
    return (
      ant1.x < ant2.x + ant2.antWidth &&
      ant1.x + ant1.antWidth > ant2.x &&
      ant1.y < ant2.y + ant2.antHeight &&
      ant1.y + ant1.antHeight > ant2.y
    )
  }

  this.updatePosition = function (ants) {
    for (var i = 0; i < ants.length; i++) {

      if (this === ants[i]) continue;

      if (this.checkAntColission(this, ants[i])) {
        this.dx = -this.dx;
        this.dy = -this.dy;
        ants[i].dx = -ants[i].dx;
        ants[i].dy = -ants[i].dy;
      }
    }
  }

  this.checkWallColission = function () {

    if (this.x <= 0) {
      this.dx = DIRECTION;
    }

    if (this.x >= CONTAINER_WIDTH_HEIGHT - this.antWidth) {
      this.dx = -DIRECTION;
    }

    if (this.y <= 0) {
      this.dy = DIRECTION;
    }

    if (this.y >= CONTAINER_WIDTH_HEIGHT - this.antHeight) {
      this.dy = -DIRECTION;
    }
  }
}

function MakeAnimation(parentElementId, total_ants, speed) {
  var ants = [];
  var scoreBoard = document.getElementById('scoreBoard');

  var container = document.getElementById(parentElementId);
  applyStyles(container, {
    position: 'relative',
    height: CONTAINER_WIDTH_HEIGHT + 'px',
    width: CONTAINER_WIDTH_HEIGHT + 'px',
    border: '2px black solid',
    cssFloat: 'left',
    marginRight: 20 + 'px',
  });

  this.init = function () {

    for (var i = 0; i < total_ants; i++) {
      var x = getRandomNumber(0, CONTAINER_WIDTH_HEIGHT) - ANT_WIDTH;
      var y = getRandomNumber(0, CONTAINER_WIDTH_HEIGHT) - ANT_WIDTH;
      var ant = new Ant(x, y, container);
      ants.push(ant);
      ant.init();
      ant.draw();
    }

    setInterval(this.animate.bind(this), speed);
  }

  var drawScore = function () {
    scoreBoard.innerHTML = "Your Score: " + score;
  }

  this.animate = function () {
    ants.forEach(ant => {
      ant.move();
      ant.draw();
      drawScore();
      ant.checkWallColission();
      ant.updatePosition(ants);
    });
  }
}
