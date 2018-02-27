// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * 100 * this.speed;
    if(this.x > 505) this.x = -100;
    // 碰撞检测
    var that = this;
    var rect1 = {
        x: that.x,
        y: that.y,
        width: 100,
        height: 100,
    }
    var rect2 = {
        x: player.x,
        y: player.y,
        width: 100,
        height: 100,
    }
    if(impactChecking(rect1, rect2)){
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 200;
    this.y = 380;
    this.img = 'images/char-boy.png';
}
Player.prototype.update = function () {
    // this.render();
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.img), this.x, this.y);
}
Player.prototype.handleInput = function (keyboard) {
    var moveX = 0;
    var moveY = 0;
    switch (keyboard){
        case 'left':
            moveX = -100;
            break;
        case 'up':
            moveY = -80;
            break;
        case 'right':
            moveX = 100;
            break;
        case 'down':
            moveY = 80;
            break;
    }
    if(this.x + moveX > 400 || this.x + moveX < 0) return;
    if(this.y + moveY > 380 || this.y + moveY < -80) return;
    this.x += moveX;
    this.y += moveY;
    this.update();
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var enemy = new Enemy(-100, 50);
// enemy.render();
var allEnemies = [new Enemy(-100, 60 ), new Enemy(-100, 140), new Enemy(-100, 230)];
var player = new Player();

// 碰撞检测
function impactChecking(rect1, rect2) {
    return  rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y
}


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
