class Character {
    constructor(name) {
        this.name = name;
        this.speed = 100;
        this.dmg = 20;
        this.isMoving = false;
        this.destination = {
            x: Constants.PLAYER_SPAWN_X,
            y: Constants.PLAYER_SPAWN_Y
        };
        this.prevPosition = null;  // initialized with Sprite
        this.blocked = null;  // initialized with Sprite
        this.items = [];
        this.eq = [];
        this.stats = {
            hp: 100,
            power: 10,
            maxhp: 150,
        }
        this.wantsInteraction = false;
    }

    attachSprite(sprite) {
        this.sprite = sprite;
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.sprite.body.velocity.normalize().scale(this.speed);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setSize(16, 8);
        this.sprite.body.setOffset(8, 24);
        this.prevPosition = {x: this.sprite.x, y: this.sprite.y};
        this.blocked = this.sprite.body.blocked;
    }

    hasItem(itemName) {
        const index = this.items.indexOf(itemName);
        return index >= 0;
    }

    removeItem(itemName) {
        const index = this.items.indexOf(itemName);
        this.items.splice(index, 1);
    }

    removeEQ(itemName) {
        const index = this.eq.indexOf(itemName);
        this.eq.splice(index, 1);
    }

    attachController(controller) {
        this.controller = controller;
    }

    update() {
        this.handleMovement();
        this.handleInteraction();
    }

    isBlocked() {
        return this.blocked.down || this.blocked.up || this.blocked.left || this.blocked.right;
    }

    moveWithStep(key, stepSizeX, stepSizeY) {
        /*
         * NOTE
         *
         * DISABLING THE GRID MOVEMENT.
         * DEPRECATED THE USE OF THIS FUNCTION.
         * LEFT FOR COMPATIBILITY WITH ANIMATIONS
         *
         */
        // this.isMoving = true;
        // this.destination.x = this.sprite.x + stepSizeX;
        // this.destination.y = this.sprite.y + stepSizeY;
        this.sprite.anims.play(key, true);
    }

    hasArrived(error) {
        if (this.prevPosition.x == this.sprite.x && this.prevPosition.y == this.sprite.y) {
            return true;
        }
        return !this.isMoving ||
            isBetween(this.destination.x, this.prevPosition.x, this.sprite.x, error) &&
            isBetween(this.destination.y, this.prevPosition.y, this.sprite.y, error);
    }

    handleInteraction() {
        // Necessary to disable reacting to mashing SPACE key
        let isInteractionExpected = !this.wantsInteraction && this.controller.space.isDown;
        this.wantsInteraction = this.controller.space.isDown;

        if (isInteractionExpected) {
            // Hard-coded NPC interaction
            var posx = this.sprite.x
            var posy = this.sprite.y
            for (var id in npcs) {
                if (npcs[id].isClose(posx, posy)) {
                    npcs[id].startQuest();
                }
            }
        }
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

    onMeetEnemy(player, enemyMeet) {


        enemy = enemyMeet;
        camera.shake(300);
        player.setVelocity(0);

        this.time.addEvent({
            delay: 300, callback: () => {
                this.isMoving = false;
                // start battle
                this.scene.switch('BattleScene');

            }, callbackScope: this
        });
        enemy.destroy();
    }
}

function isBetween(expected, xval, yval, error = 0) {
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
