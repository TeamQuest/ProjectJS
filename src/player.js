class Character {
    constructor(name) {
        this.name = name;
        this.hp = 100;
        this._speed = 100;
        this._isMoving = false;
        this._destination = {
            x: Constants.PLAYER_SPAWN_X,
            y: Constants.PLAYER_SPAWN_Y
        };
        this._prevPosition = null;  // initialized with Sprite
        this._blocked = null;  // initialized with Sprite
    }

    attachSprite(sprite) {
        this.sprite = sprite;
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.sprite.body.velocity.normalize().scale(this._speed);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setSize(16, 8);
        this.sprite.body.setOffset(8, 24);
        this._prevPosition = { x: this.sprite.x, y: this.sprite.y };
        this._blocked = this.sprite.body.blocked;
    }

    attachController(controller) {
        this.controller = controller;
    }

    update() {
        this._handleMovement();
    }

    isBlocked() {
        return this._blocked.down || this._blocked.up || this._blocked.left || this._blocked.right;
    }

    _moveWithStep(key, stepSizeX, stepSizeY) {
        this._isMoving = true;
        this._destination.x = this.sprite.x + stepSizeX;
        this._destination.y = this.sprite.y + stepSizeY;
        this.sprite.anims.play(key, true);
    }

    _hasArrived(error) {
        return !this._isMoving ||
            is_between(this._destination.x, this._prevPosition.x, this.sprite.x, error) &&
            is_between(this._destination.y, this._prevPosition.y, this.sprite.y, error);
    }

    _handleMovement() {
        const allowedError = 0.33;  // allowed error in pixels
        const stepSize = 16;
        if (this._hasArrived(allowedError) || this.isBlocked()) {
            this._isMoving = false;
        }
        if (!this._isMoving) {
            // Stop any previous movement from the last frame
            this.sprite.body.setVelocity(0);
            // Horizontal movement
            if (this.controller.left.isDown) {
                this.sprite.body.setVelocityX(-this._speed);
                this._moveWithStep('playerLeft', -stepSize, 0);
            } else if (this.controller.right.isDown) {
                this.sprite.body.setVelocityX(this._speed);
                this._moveWithStep('playerRight', stepSize, 0);
            } else if (this.controller.up.isDown) {
                this.sprite.body.setVelocityY(-this._speed);
                this._moveWithStep('playerUp', 0, -stepSize);
            } else if (this.controller.down.isDown) {
                this.sprite.body.setVelocityY(this._speed);
                this._moveWithStep('playerDown', 0, stepSize);
            } else {
                this.sprite.anims.stopOnRepeat();
            }
        }
        this._prevPosition.x = this.sprite.x;
        this._prevPosition.y = this.sprite.y;
    }
}

function is_between(expected, xval, yval, error=0) {
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
//           at player.js: 42
