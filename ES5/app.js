'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lives = 5;
var scores = 0;
var crossed = 0;
var gameOver = false;
var alertMessage = document.querySelector('.alert');
var timer = document.querySelector('.countDown');

// Enemies our player must avoid
var Enemy = function Enemy(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;
    if (this.x > 700) {
        this.x = -150;
        var someSpeed = Math.floor(Math.random() * 8 + 1);
        this.speed = 60 * someSpeed;
    }
    /*
    //Check Collisions between Enemy bug and Player.
    */
    var enemyYMaxTop = this.y - 55;
    var enemyYMaxBottom = this.y + 55;
    var enemyXMaxLeft = this.x - 60;
    var enemyXMaxRight = this.x + 60;

    if (player.y > enemyYMaxTop && player.y < enemyYMaxBottom && player.x < enemyXMaxRight && player.x > enemyXMaxLeft) {
        document.querySelector('.aLives').innerText = lives -= 1;
        player.updateView('Ooops! You Have an Accedient ', '#f44336');
        player.gameOver();
        player.resetPosition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    function Player(x, y) {
        _classCallCheck(this, Player);

        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update(dt) {
            // console.log('Position X : '+ this.x)
            console.log('Position Y : ' + this.y);

            if (this.x === key.x && this.y === key.y) {
                scores += 10;
                document.querySelector('.aScores').innerText = scores;
                window.gem = new Gem();
                window.heart = new Heart();
                window.key = new Key();
                this.updateView('Great! ' + scores + ' points', '#4CAF50');
                this.resetPosition();
            }
        }
    }, {
        key: 'resetPosition',
        value: function resetPosition() {
            this.y = 380;
            this.x = 200;
        }
    }, {
        key: 'updateView',
        value: function updateView(message, color) {
            alertify.notify(message, 1);
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            if (lives <= 0) {
                lives = 0;
                var message = confirm('Your Game is Over \nclick the button to start again!');
                if (message == true) {
                    document.querySelector('.aLives').innerText = lives = 5;
                    document.querySelector('.aScores').innerText = scores = 0;
                    document.querySelector('.aGameOver').innerText = 'False';
                    window.heart = new Heart();
                } else {
                    alert('Thanks for playing our game.');
                    document.querySelector('.aLives').innerText = lives = 5;
                    document.querySelector('.aScores').innerText = scores = 0;
                    document.querySelector('.aGameOver').innerText = 'False';
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }, {
        key: 'handleInput',
        value: function handleInput(key) {
            //Up Key
            if (key === 'up') {
                if (this.y <= -20) {
                    this.y += 0;
                } else {
                    this.y = this.y - 80;
                }
                //Down Key
            } else if (key === 'down') {
                if (this.y >= 380) {
                    this.y += 0;
                } else {
                    this.y = this.y + 80;
                }
                //Left Key
            } else if (key === 'left') {
                if (this.x < 100) {
                    this.x += 0;
                } else {
                    this.x = this.x - 100;
                }
                //Right Key
            } else if (key === 'right') {
                if (this.x >= 400) {
                    this.x += 0;
                } else {
                    this.x = this.x + 100;
                }
            }
        }
    }]);

    return Player;
}();

var gems = [{ name: 'Blue-Gem', image: 'images/Gem-Blue.png', value: 50 }, { name: 'Green-Gem', image: 'images/Gem-Green.png', value: 20 }, { name: 'Orange-Gem', image: 'images/Gem-Orange.png', value: 10 }];

var players = ['images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-princess-girl.png', 'images/char-boy.png'];
var x_blocks = [0, 100, 200, 300, 400];
var y_blocks = [60, 140, 220];

var Gem = function () {
    function Gem() {
        _classCallCheck(this, Gem);

        var g = gems[Math.floor(Math.random() * gems.length)];
        this.name = g.name;
        this.image = g.image;
        this.value = g.value;
        this.x = x_blocks[Math.floor(Math.random() * x_blocks.length)];
        this.y = y_blocks[Math.floor(Math.random() * y_blocks.length)];
    }

    _createClass(Gem, [{
        key: 'gemRePosition',
        value: function gemRePosition() {
            if (gem.x === this.x && gem.y === this.y) {
                gem.x = x_blocks[Math.floor(Math.random() * x_blocks.length)];
                gem.y = y_blocks[Math.floor(Math.random() * y_blocks.length)];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.image), this.x, this.y);
        }
    }, {
        key: 'collected',
        value: function collected() {
            var gemYTop = this.y - 40;
            var gemYBottom = this.y + 40;
            var gemXLeft = this.x - 40;
            var gemXRight = this.x + 40;

            if (player.x > gemXLeft && player.x < gemXRight && player.y > gemYTop && player.y < gemYBottom) {
                scores += this.value;
                player.updateView('You Got +' + this.value + ' Points', '#4CAF50');
                window.gem = {};
            }
        }
    }]);

    return Gem;
}();

window.gem = new Gem();

var Heart = function () {
    function Heart() {
        _classCallCheck(this, Heart);

        this.image = 'images/Heart.png';
        this.x = x_blocks[Math.floor(Math.random() * x_blocks.length)];
        this.y = y_blocks[Math.floor(Math.random() * y_blocks.length)];
    }

    _createClass(Heart, [{
        key: 'heartRePosition',
        value: function heartRePosition() {
            if (gem.x === this.x && gem.y === this.y) {
                gem.x = x_blocks[Math.floor(Math.random() * x_blocks.length)];
                gem.y = y_blocks[Math.floor(Math.random() * y_blocks.length)];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.image), this.x, this.y);
        }
    }, {
        key: 'collected',
        value: function collected() {
            var heartYTop = this.y - 40;
            var heartYBottom = this.y + 40;
            var heartXLeft = this.x - 40;
            var heartXRight = this.x + 40;

            if (player.x > heartXLeft && player.x < heartXRight && player.y > heartYTop && player.y < heartYBottom) {
                document.querySelector('.aLives').innerText = lives += 1;
                player.updateView('You Got +1 Live', '#2196F3');
                window.heart = {};
            }
        }
    }]);

    return Heart;
}();

window.heart = new Heart();

var Selector = function () {
    function Selector() {
        _classCallCheck(this, Selector);

        this.image = 'images/Selector.png';
        this.x = 400;
        this.y = 380;
    }

    _createClass(Selector, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.image), this.x, this.y);
        }
    }, {
        key: 'stepped',
        value: function stepped() {
            if (player.x === 400 && player.y === 380) {
                player.sprite = players[Math.floor(Math.random() * players.length)];
                player.resetPosition();
                player.updateView('Charactor Has Changed', '#ff9800');
            }
        }
    }]);

    return Selector;
}();

var Rock = function () {
    function Rock(x, y) {
        _classCallCheck(this, Rock);

        this.image = 'images/Rock.png';
        this.x = x;
        this.y = y;
        gem.gemRePosition();
        heart.heartRePosition();
    }

    _createClass(Rock, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.image), this.x, this.y);
        }
    }, {
        key: 'rockColl',
        value: function rockColl() {
            if (player.x === this.x && player.y === this.y) {
                document.querySelector('.aLives').innerText = lives -= 1;
                // player.updateView('Oooops!');
                player.updateView('Ooops!!');
                player.gameOver();
                player.resetPosition();
            }
        }
    }]);

    return Rock;
}();

var x_blocksKeys = [0, 100, 200, 300, 400];

var Key = function () {
    function Key() {
        _classCallCheck(this, Key);

        this.image = 'images/Key.png';
        this.x = x_blocksKeys[Math.floor(Math.random() * x_blocks.length)];
        this.y = -20;
    }

    _createClass(Key, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.image), this.x, this.y);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.x === player.x && this.y === player.y) {
                console.log('Collected The Key');
                window.key = {};
                gem.gemRePosition();
                heart.heartRePosition();
            }
        }
    }]);

    return Key;
}();

window.key = new Key();

var rock1 = new Rock(300, 140);
var rock2 = new Rock(0, 60);
var rock3 = new Rock(100, 220);
var allRocks = [rock1, rock2, rock3];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

window.selector = new Selector();

var player = new Player();
var enemy1 = new Enemy(-80, 1, Math.floor(Math.random() * 10 + 1) * 90);
var enemy2 = new Enemy(-200, 30, Math.floor(Math.random() * 7 + 1) * 70);
var enemy3 = new Enemy(-80, 100, Math.floor(Math.random() * 8 + 1) * 80);
var enemy4 = new Enemy(-200, 90 + 80 * 1, Math.floor(Math.random() * 6 + 1) * 80);
var enemy5 = new Enemy(-100, 200 + 80 * 1, Math.floor(Math.random() * 7 + 1) * 70);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});