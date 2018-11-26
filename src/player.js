class Character {
    constructor(name) {
        this.name = name;
        this.hp = 100;
        this._speed = 100;
    }

    attachSprite(sprite) {
        this.sprite = sprite;
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.sprite.body.velocity.normalize().scale(this._speed);
        this.sprite.setCollideWorldBounds(true);
    }

    attachController(controller) {
        this.controller = controller;
    }

    update() {
        // Stop any previous movement from the last frame
        this.sprite.body.setVelocity(0);
        // Horizontal movement
        if (this.controller.left.isDown) {
            this.sprite.body.setVelocityX(-this._speed);
            this.sprite.anims.play('playerLeft', true);
        } else if (this.controller.right.isDown) {
            this.sprite.body.setVelocityX(this._speed);
            this.sprite.anims.play('playerRight', true);
        } else if (this.controller.up.isDown) {
            this.sprite.body.setVelocityY(-this._speed);
            this.sprite.anims.play('playerUp', true);
        } else if (this.controller.down.isDown) {
            this.sprite.body.setVelocityY(this._speed);
            this.sprite.anims.play('playerDown', true);
        } else {
            this.sprite.anims.stopOnRepeat();
        }
    }
}

// Consider using: `export default Character;` (JS ES6)
// module.exports = Character;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^
//           this doesn't work 
//           Uncaught ReferenceError: module is not defined
//           at player.js: 42
