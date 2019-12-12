
let lives = 5;
let scores = 0;
let crossed = 0;
let gameOver = false;
const alertMessage = document.querySelector('.alert');
let timer = document.querySelector('.countDown');

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        this.x += this.speed * dt;
        if(this.x > 700){
            this.x = -150;
            let someSpeed = Math.floor(Math.random() * 8 + 1)
            this.speed = 60 * someSpeed;
        }
/*
//Check Collisions between Enemy bug and Player.
*/
        const enemyYMaxTop = this.y - 55;
        const enemyYMaxBottom = this.y + 55;
        const enemyXMaxLeft = this.x - 60;
        const enemyXMaxRight = this.x + 60;

        if(player.y > enemyYMaxTop && player.y < enemyYMaxBottom && player.x < enemyXMaxRight && player.x > enemyXMaxLeft){
            document.querySelector('.aLives').innerText = lives -= 1;
            player.updateView('Ooops! You Have an Accedient ', '#f44336')
            player.gameOver();
            player.resetPosition();
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(x, y){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
    }

    update(dt){
        // console.log('Position X : '+ this.x)
        console.log('Position Y : ' + this.y)

        if(this.x === key.x && this.y === key.y){
            scores += 10;
            document.querySelector('.aScores').innerText = scores;
            window.gem = new Gem();
            window.heart = new Heart();
            window.key = new Key();
            this.updateView(`Great! ${scores} points`, '#4CAF50');
            this.resetPosition();
        }
    }

    resetPosition(){
        this.y = 380;
        this.x = 200;
    }
    updateView(message, color){
        alertify.notify(message, 1);
    }
    gameOver(){
     if(lives <= 0){
            lives = 0;
            const message = confirm('Your Game is Over \nclick the button to start again!');
            if(message == true){
                document.querySelector('.aLives').innerText = lives = 5;
                document.querySelector('.aScores').innerText = scores = 0;
                document.querySelector('.aGameOver').innerText = 'False';
                window.heart = new Heart();
            }else{
                alert('Thanks for playing our game.');
                document.querySelector('.aLives').innerText = lives = 5;
                document.querySelector('.aScores').innerText = scores = 0;
                document.querySelector('.aGameOver').innerText = 'False';
            }
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key){
            //Up Key
            if(key === 'up'){
                if(this.y <= -20){
                    this.y += 0;
                }else{
                    this.y = this.y - 80;
                }
            //Down Key
            } else if(key === 'down'){
                if(this.y >= 380){
                    this.y += 0;
                }else{
                    this.y = this.y + 80;
                }
            //Left Key
            }else if(key === 'left'){
                if(this.x < 100){
                    this.x += 0;
                }else{
                    this.x = this.x - 100;
                }
            //Right Key
            }else if(key === 'right'){
                if(this.x >= 400){
                    this.x += 0;
                }else{
                    this.x = this.x + 100;
                }
            }
    }
}

const gems = [
    {name: 'Blue-Gem', image: 'images/Gem-Blue.png', value: 50},
    {name: 'Green-Gem', image: 'images/Gem-Green.png', value: 20},
    {name: 'Orange-Gem', image: 'images/Gem-Orange.png', value: 10}
];

const players = ['images/char-cat-girl.png',
                    'images/char-horn-girl.png',
                    'images/char-princess-girl.png',
                    'images/char-boy.png'];
const x_blocks = [0, 100, 200, 300, 400];
const y_blocks = [60, 140, 220];

class Gem{
    constructor(){
        let g = gems[Math.floor(Math.random() * gems.length)];
        this.name = g.name;
        this.image = g.image;
        this.value = g.value;
        this.x = x_blocks[Math.floor(Math.random() * x_blocks.length)]
        this.y = y_blocks[Math.floor(Math.random() * y_blocks.length)]

    }
    gemRePosition(){
        if(gem.x === this.x && gem.y === this.y){
            gem.x = x_blocks[Math.floor(Math.random() * x_blocks.length)]
            gem.y = y_blocks[Math.floor(Math.random() * y_blocks.length)]
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.image), this.x,this.y);
    }
    collected(){
        const gemYTop = this.y - 40;
        const gemYBottom = this.y + 40;
        const gemXLeft = this.x - 40;
        const gemXRight = this.x + 40;

        if(player.x > gemXLeft && player.x < gemXRight && player.y > gemYTop && player.y < gemYBottom){
            scores += this.value;
            player.updateView(`You Got +${this.value} Points`, '#4CAF50');
            window.gem = {};
        }
    }
}

window.gem = new Gem();

class Heart{
    constructor(){
        this.image = 'images/Heart.png';
        this.x = x_blocks[Math.floor(Math.random() * x_blocks.length)]
        this.y = y_blocks[Math.floor(Math.random() * y_blocks.length)]

    }
    heartRePosition(){
        if(gem.x === this.x && gem.y === this.y){
            gem.x = x_blocks[Math.floor(Math.random() * x_blocks.length)]
            gem.y = y_blocks[Math.floor(Math.random() * y_blocks.length)]
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.image), this.x,this.y);
    }
    collected(){
        const heartYTop = this.y - 40;
        const heartYBottom = this.y + 40;
        const heartXLeft = this.x - 40;
        const heartXRight = this.x + 40;

        if(player.x > heartXLeft && player.x < heartXRight && player.y > heartYTop && player.y < heartYBottom){
            document.querySelector('.aLives').innerText = lives += 1;
            player.updateView('You Got +1 Live', '#2196F3');
            window.heart = {};
        }
    }
}

window.heart = new Heart();

class Selector{
    constructor(){
        this.image = 'images/Selector.png'
        this.x = 400;
        this.y = 380;
    }
    render(){
        ctx.drawImage(Resources.get(this.image), this.x,this.y);
    }
    stepped(){
        if(player.x === 400 && player.y === 380){
            player.sprite = players[Math.floor(Math.random() * players.length)];
            player.resetPosition();
            player.updateView('Charactor Has Changed', '#ff9800');
        }
    }

}


class Rock{
    constructor(x, y){
        this.image = 'images/Rock.png';
        this.x = x;
        this.y = y;
        gem.gemRePosition();
        heart.heartRePosition();
    }
    render(){
        ctx.drawImage(Resources.get(this.image), this.x,this.y);
    }
    rockColl(){
        if(player.x === this.x && player.y === this.y){
            document.querySelector('.aLives').innerText = lives -=1;
            // player.updateView('Oooops!');
            player.updateView('Ooops!!');
            player.gameOver();
            player.resetPosition();
        }
    }
}


const x_blocksKeys = [0, 100, 200, 300, 400];
class Key{
    constructor(){
        this.image = 'images/Key.png';
        this.x = x_blocksKeys[Math.floor(Math.random() * x_blocks.length)];
        this.y = -20;
    }
    render(){
        ctx.drawImage(Resources.get(this.image), this.x,this.y);
    }

    update(){
        if(this.x === player.x && this.y === player.y){
            console.log('Collected The Key');
            window.key = {};
            gem.gemRePosition();
            heart.heartRePosition();
        }
    }
}


window.key = new Key();

const rock1 = new Rock(300, 140);
const rock2 = new Rock(0, 60);
const rock3 = new Rock(100, 220);
const allRocks = [rock1, rock2, rock3];


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

window.selector = new Selector();


const player = new Player();
const enemy1 = new Enemy(-80, 1, Math.floor(Math.random() * 10 + 1) * 90);
const enemy2 = new Enemy(-200, 30, Math.floor(Math.random() * 7 + 1) * 70);
const enemy3 = new Enemy(-80, 100, Math.floor(Math.random() * 8 + 1) * 80);
const enemy4 = new Enemy(-200, 90 + 80 * 1, Math.floor(Math.random() * 6 + 1) * 80);
const enemy5 = new Enemy(-100, 200 + 80 * 1, Math.floor(Math.random() * 7 + 1) * 70);

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
