class Character {
    constructor(name) {
        this.name = name;
        this.hp = 100;
        this.speed = 100;
        this.dmg = 20;
        this.isMoving = false;
        this.destination = {
            x: Constants.PLAYER_SPAWN_X,
            y: Constants.PLAYER_SPAWN_Y
        };
        this.prevPosition = null;  // initialized with Sprite
        this.blocked = null;  // initialized with Sprite
    }

    attachSprite(sprite) {
        this.sprite = sprite;
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.sprite.body.velocity.normalize().scale(this.speed);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setSize(16, 8);
        this.sprite.body.setOffset(8, 24);
        this.prevPosition = { x: this.sprite.x, y: this.sprite.y };
        this.blocked = this.sprite.body.blocked;
    }

    attachController(controller) {
        this.controller = controller;
    }

    update() {
        this.handleMovement();
    }

    isBlocked() {
        return this.blocked.down || this.blocked.up || this.blocked.left || this.blocked.right;
    }

    moveWithStep(key, stepSizeX, stepSizeY) {
        this.isMoving = true;
        this.destination.x = this.sprite.x + stepSizeX;
        this.destination.y = this.sprite.y + stepSizeY;
        this.sprite.anims.play(key, true);
    }

    hasArrived(error) {
        return !this.isMoving ||
            isBetween(this.destination.x, this.prevPosition.x, this.sprite.x, error) &&
            isBetween(this.destination.y, this.prevPosition.y, this.sprite.y, error);
    }

    handleMovement() {
        const allowedError = 0.33;  // allowed error in pixels
        const stepSize = 16;
        if (this.hasArrived(allowedError) || this.isBlocked()) {
            this.isMoving = false;
        }
        if (!this.isMoving) {
            // Stop any previous movement from the last frame
            this.sprite.body.setVelocity(0);
            // Horizontal movement
            if (this.controller.left.isDown) {
                this.sprite.body.setVelocityX(-this.speed);
                this.moveWithStep('playerLeft', -stepSize, 0);
            } else if (this.controller.right.isDown) {
                this.sprite.body.setVelocityX(this.speed);
                this.moveWithStep('playerRight', stepSize, 0);
            } else if (this.controller.up.isDown) {
                this.sprite.body.setVelocityY(-this.speed);
                this.moveWithStep('playerUp', 0, -stepSize);
            } else if (this.controller.down.isDown) {
                this.sprite.body.setVelocityY(this.speed);
                this.moveWithStep('playerDown', 0, stepSize);
            } else {
                this.sprite.anims.stopOnRepeat();
            }
        }
        this.prevPosition.x = this.sprite.x;
        this.prevPosition.y = this.sprite.y;
    }

    onMeetEnemy() {

        // shake the world
        camera.shake(300);

        // start battle
        this.scene.start('BattleScene');
    }
}

function isBetween(expected, xval, yval, error=0) {
    if (xval < yval) {
        return xval - error <= expected && expected <= yval + error;
    }
    else {
        return yval - error <= expected && expected <= xval + error;
    }
}




// Consider using: `export default Character;` (JS ES6)
// module.exports = Character;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^
//           this doesn't work
//           Uncaught ReferenceError: module is not defined
//           at hero.js: 42
